import { NextRequest, NextResponse }  from 'next/server'
import { verifyPaddleWebhook }        from '@/lib/paddle'
import { getServerDb }                from '@/lib/firebase-server'
import { games }                      from '@/lib/games'
import { doc, setDoc, Timestamp }     from 'firebase/firestore'

export async function POST(req: NextRequest) {
  const rawBody  = await req.text()
  const sigHeader = req.headers.get('paddle-signature')

  if (!sigHeader) {
    return NextResponse.json({ error: 'No signature.' }, { status: 400 })
  }

  // Verify the webhook came from Paddle
  const valid = await verifyPaddleWebhook(
    rawBody,
    sigHeader,
    process.env.PADDLE_WEBHOOK_SECRET!
  )

  if (!valid) {
    console.error('[paddle-webhook] Invalid signature.')
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  const event = JSON.parse(rawBody)

  // Paddle fires 'transaction.completed' when a payment succeeds
  if (event.event_type === 'transaction.completed') {
    const txn        = event.data
    const customData = txn.custom_data as Record<string, string>

    const uid        = customData?.uid
    const itemIds    = (customData?.itemIds   ?? '').split(',').filter(Boolean)
    const itemTypes  = (customData?.itemTypes ?? '').split(',').filter(Boolean)
    const itemTitles = (customData?.itemTitles ?? '').split('||').filter(Boolean)

    if (!uid || itemIds.length === 0) {
      console.error('[paddle-webhook] Missing uid or itemIds in custom_data.')
      return NextResponse.json({ error: 'Missing custom_data.' }, { status: 400 })
    }

    try {
      const db = await getServerDb()

      await Promise.all(
        itemIds.map(async (itemId, idx) => {
          const itemType  = (itemTypes[idx]  ?? 'game') as 'game' | 'dlc'
          const itemTitle = itemTitles[idx] ?? itemId

          let downloadUrl:  string | null   = null
          let parentGameId: string | undefined

          if (itemType === 'game') {
            const game  = games.find(g => g.id === itemId)
            downloadUrl = game?.downloadUrl ?? null
          } else {
            for (const game of games) {
              const dlc = game.dlcs?.find(d => d.id === itemId)
              if (dlc) {
                downloadUrl  = dlc.downloadUrl ?? null
                parentGameId = game.id
                break
              }
            }
          }

          await setDoc(
            doc(db, 'users', uid, 'library', itemId),
            {
              gameId:           itemId,
              title:            itemTitle,
              purchasedAt:      Timestamp.now(),
              downloadUrl,
              paddleTransactionId:  txn.id,
              type:             itemType,
              ...(parentGameId ? { parentGameId } : {}),
            }
          )
          console.log(`[paddle-webhook] Recorded: ${uid} → ${itemId}`)
        })
      )
    } catch (err) {
      console.error('[paddle-webhook] Firestore write failed:', err)
      return NextResponse.json({ error: 'Database write failed.' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}