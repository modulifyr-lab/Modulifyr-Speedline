import type { Metadata } from 'next'
import LegalLayout from '../LegalLayout'

export const metadata: Metadata = {
  title:       'Refund Policy — Modulifyr Speedline',
  description: 'Refund policy for Modulifyr Speedline game purchases. 48-hour return window.',
}

export default function RefundPage() {
  return (
    <LegalLayout
      title="Refund Policy"
      subtitle="Our refund terms and what permanent game ownership means for you."
      lastUpdated="May 2026"
    >
      <Section title="What Permanent Ownership Means">
        <P>
          When you buy a game from Modulifyr Speedline, you are not buying a licence that can
          be revoked. You are buying the game itself — permanently.
        </P>
        <P>
          This is what that means in practice:
        </P>
        <ul>
          <Li>
            <strong className="text-sl-white">No expiry.</strong> Your copy of the game does not
            expire. There are no subscriptions, no renewals, no annual fees. You pay once.
          </Li>
          <Li>
            <strong className="text-sl-white">No remote removal.</strong> We will not revoke,
            disable, or remove a game from your library after a legitimate purchase. Your
            downloaded game files are yours to keep.
          </Li>
          <Li>
            <strong className="text-sl-white">All patches included.</strong> Every update, bug fix,
            and patch released for a game you own is delivered to you at no additional cost.
          </Li>
          <Li>
            <strong className="text-sl-white">If the studio closes — single-player games.</strong>{' '}
            Single-player games require no server connection to play. If Modulifyr Speedline ceases
            operations, your game continues to work from your local installation indefinitely.
            Nothing changes for you.
          </Li>
          <Li>
            <strong className="text-sl-white">If the studio closes — multiplayer games.</strong>{' '}
            Official multiplayer servers may be taken offline in the event of studio closure.
            However, all Modulifyr Speedline multiplayer games are built with player-hosted
            server support from day one. You will be able to run and connect to community-operated
            servers at no cost, indefinitely.
          </Li>
        </ul>
        <P>
          What you cannot do with your copy: resell it, transfer it to another account, decompile
          or reverse engineer the game files, or redistribute the game. See the Terms of Service
          for the full list.
        </P>
      </Section>

      <Section title="Refund Window">
        <P>
          You may request a refund within <strong className="text-sl-white">48 hours</strong> of
          your original purchase. After 48 hours, purchases are final and no refund will be issued.
        </P>
        <P>
          This window applies to all products: base games and DLC.
        </P>
      </Section>

      <Section title="How to Request a Refund">
        <P>
          To request a refund within the 48-hour window, email us at{' '}
          <a href="mailto:support@modulifyr.com" className="text-sl-orange hover:underline">
            support@modulifyr.com
          </a>{' '}
          with the subject line <strong className="text-sl-white">Refund Request</strong> and include:
        </P>
        <ul>
          <Li>The email address associated with your account.</Li>
          <Li>The name of the game or DLC you are requesting a refund for.</Li>
          <Li>Your reason for the refund (optional but helpful).</Li>
        </ul>
        <P>
          We will process the refund and respond within 2 business days. Refunds are returned
          to the original payment method via Stripe. Processing times depend on your bank
          or card provider and are typically 5–10 business days after we issue the refund.
        </P>
        <P>
          Upon issuing a refund, the game will be removed from your library.
        </P>
      </Section>

      <Section title="Exceptions — When Refunds Are Not Issued">
        <ul>
          <Li>Requests made more than 48 hours after purchase.</Li>
          <Li>
            Accounts that have initiated a chargeback through their bank or card provider
            instead of following this refund process. Chargebacks result in immediate
            account termination in addition to the refund.
          </Li>
          <Li>
            Purchases where the 48-hour window has been manipulated or circumvented
            (e.g. purchasing, playing extensively, and refunding repeatedly).
          </Li>
          <Li>
            DLC refunds where the associated base game has already been refunded.
          </Li>
        </ul>
      </Section>

      <Section title="Technical Issues">
        <P>
          If you are experiencing a technical problem with a game, contact support before
          requesting a refund. Many issues are resolvable. Refunds issued due to technical
          problems that have since been patched cannot be reversed.
        </P>
        <P>
          Contact:{' '}
          <a href="mailto:support@modulifyr.com" className="text-sl-orange hover:underline">
            support@modulifyr.com
          </a>
        </P>
      </Section>
    </LegalLayout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-syne font-bold text-[18px] text-sl-white mb-1">{title}</h2>
      <div className="w-7 h-0.5 bg-sl-orange mb-4" />
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sl-light text-[14px] leading-[1.8]">{children}</p>
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sl-light text-[14px] leading-[1.8]">
      <span className="mt-2 w-1 h-1 rounded-full bg-sl-orange flex-shrink-0" />
      <span>{children}</span>
    </li>
  )
}