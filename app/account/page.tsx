'use client'

import { useState, useEffect } from 'react'
import { useRouter }           from 'next/navigation'
import Link                    from 'next/link'
import {
  updateProfile,
  updatePassword,
  updateEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from 'firebase/auth'
import { addToWishlist, removeFromWishlist, isWishlisted, getWishlist } from '@/lib/wishlist'
import { auth }     from '@/lib/firebase'
import { useAuth }  from '@/contexts/AuthContext'
import Nav          from '@/components/Nav'
import Footer       from '@/components/Footer'

export default function AccountPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [displayName,    setDisplayName]    = useState('')
  const [newEmail,       setNewEmail]       = useState('')
  const [newPassword,    setNewPassword]    = useState('')
  const [currentPwd,     setCurrentPwd]     = useState('')
  const [deleteConfirm,  setDeleteConfirm]  = useState('')
  const [savingName,     setSavingName]     = useState(false)
  const [savingEmail,    setSavingEmail]    = useState(false)
  const [savingPwd,      setSavingPwd]      = useState(false)
  const [deleting,       setDeleting]       = useState(false)
  const [msg,            setMsg]            = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    if (!loading && !user) router.replace('/auth?next=/account')
  }, [user, loading, router])

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName)
    if (user?.email)       setNewEmail(user.email)
  }, [user])

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 5000)
  }

  const isPasswordUser = user?.providerData.some(p => p.providerId === 'password')

  async function reauth(): Promise<boolean> {
    if (!user) return false
    try {
      if (isPasswordUser) {
        if (!currentPwd) { flash('err', 'Enter your current password to confirm.'); return false }
        const cred = EmailAuthProvider.credential(user.email!, currentPwd)
        await reauthenticateWithCredential(user, cred)
      } else {
        await reauthenticateWithPopup(user, new GoogleAuthProvider())
      }
      return true
    } catch {
      flash('err', 'Re-authentication failed. Check your password and try again.')
      return false
    }
  }

  async function saveName(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !auth.currentUser) return
    setSavingName(true)
    try {
      await updateProfile(auth.currentUser, { displayName })
      flash('ok', 'Display name updated.')
    } catch { flash('err', 'Failed to update name.') }
    finally { setSavingName(false) }
  }

  async function saveEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !auth.currentUser) return
    if (!(await reauth())) return
    setSavingEmail(true)
    try {
      await updateEmail(auth.currentUser, newEmail)
      flash('ok', 'Email updated. You may need to verify your new address.')
    } catch (err: unknown) {
      flash('err', (err as { message?: string }).message ?? 'Failed to update email.')
    } finally { setSavingEmail(false); setCurrentPwd('') }
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !auth.currentUser) return
    if (newPassword.length < 8) { flash('err', 'Password must be at least 8 characters.'); return }
    if (!(await reauth())) return
    setSavingPwd(true)
    try {
      await updatePassword(auth.currentUser, newPassword)
      flash('ok', 'Password updated.')
      setNewPassword('')
    } catch { flash('err', 'Failed to update password.') }
    finally { setSavingPwd(false); setCurrentPwd('') }
  }

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !auth.currentUser) return
    if (deleteConfirm !== 'DELETE') { flash('err', 'Type DELETE exactly to confirm.'); return }
    if (!(await reauth())) return
    setDeleting(true)
    try {
      await deleteUser(auth.currentUser)
      router.replace('/')
    } catch { flash('err', 'Failed to delete account. Try signing out and back in first.') }
    finally { setDeleting(false) }
  }

  if (loading || !user) return (
    <div className="min-h-screen bg-sl-darker flex items-center justify-center">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">Loading...</span>
    </div>
  )

  return (
    <>
      <Nav />
      <section className="relative z-10 pt-32 pb-12 border-b border-sl-border">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sl-muted font-mono text-[9px] tracking-[0.12em] uppercase">
            <Link href="/library" className="no-underline hover:text-sl-white transition-colors">Library</Link>
            <span className="text-sl-border">/</span>
            <span className="text-sl-orange">Account Settings</span>
          </div>
          <h1 className="font-syne font-extrabold text-[32px] sm:text-[40px] text-sl-white leading-tight">
            Account Settings
          </h1>
          <p className="text-sl-muted text-[14px] mt-1">{user.email}</p>
        </div>
      </section>

      <section className="relative z-10 py-[56px]">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col gap-0.5">

          {msg && (
            <div className={`px-5 py-3 mb-2 font-mono text-[10px] tracking-[0.1em] uppercase border ${msg.type === 'ok' ? 'border-sl-cyan text-sl-cyan bg-[rgba(47,184,200,0.06)]' : 'border-sl-orange text-sl-orange bg-[rgba(232,69,48,0.06)]'}`}>
              {msg.text}
            </div>
          )}

          {/* Display name */}
          <FormSection title="Display Name">
            <form onSubmit={saveName} className="flex gap-2 flex-wrap">
              <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
                className="flex-1 min-w-[200px] bg-sl-surface border border-sl-border px-4 py-2.5 font-mono text-[12px] text-sl-white outline-none focus:border-sl-orange transition-colors" />
              <SubmitBtn loading={savingName}>Save Name</SubmitBtn>
            </form>
          </FormSection>

          {/* Email */}
          <FormSection title="Email Address">
            <form onSubmit={saveEmail} className="flex flex-col gap-2">
              <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required
                className="bg-sl-surface border border-sl-border px-4 py-2.5 font-mono text-[12px] text-sl-white outline-none focus:border-sl-orange transition-colors" />
              {isPasswordUser && <CurrentPwdField value={currentPwd} onChange={setCurrentPwd} />}
              <SubmitBtn loading={savingEmail}>Update Email</SubmitBtn>
            </form>
          </FormSection>

          {/* Password — only for email/password accounts */}
          {isPasswordUser && (
            <FormSection title="Change Password">
              <form onSubmit={savePassword} className="flex flex-col gap-2">
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} placeholder="New password (min. 8 characters)"
                  className="bg-sl-surface border border-sl-border px-4 py-2.5 font-mono text-[12px] text-sl-white placeholder:text-sl-muted outline-none focus:border-sl-orange transition-colors" />
                <CurrentPwdField value={currentPwd} onChange={setCurrentPwd} />
                <SubmitBtn loading={savingPwd}>Update Password</SubmitBtn>
              </form>
            </FormSection>
          )}

          {/* Quick links */}
          <FormSection title="Account">
            <div className="flex flex-wrap gap-2">
              <Link href="/library" className="font-mono text-[9px] tracking-[0.1em] uppercase border border-sl-border text-sl-mid px-4 py-2 no-underline hover:border-sl-white hover:text-sl-white transition-colors">My Library</Link>
              <Link href="/account/orders" className="font-mono text-[9px] tracking-[0.1em] uppercase border border-sl-border text-sl-mid px-4 py-2 no-underline hover:border-sl-white hover:text-sl-white transition-colors">Order History</Link>
              <Link href="/account/wishlist" className="font-mono text-[9px] tracking-[0.1em] uppercase border border-sl-border text-sl-mid px-4 py-2 no-underline hover:border-sl-white hover:text-sl-white transition-colors">My Wishlist</Link>
            </div>
          </FormSection>

          {/* Delete account */}
          <FormSection title="Delete Account" danger>
            <p className="text-sl-muted text-[13px] leading-relaxed mb-3">
              This permanently deletes your account. Your purchase records are retained for accounting purposes but your login access will be removed. This cannot be undone.
            </p>
            <form onSubmit={handleDelete} className="flex flex-col gap-2">
              <input type="text" value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder='Type DELETE to confirm'
                className="bg-sl-surface border border-[rgba(232,69,48,0.4)] px-4 py-2.5 font-mono text-[12px] text-sl-white placeholder:text-sl-muted outline-none focus:border-sl-orange transition-colors" />
              {isPasswordUser && <CurrentPwdField value={currentPwd} onChange={setCurrentPwd} />}
              <button type="submit" disabled={deleting || deleteConfirm !== 'DELETE'}
                className="self-start bg-[rgba(232,69,48,0.15)] border border-[rgba(232,69,48,0.4)] text-sl-orange px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase hover:bg-[rgba(232,69,48,0.25)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                {deleting ? 'Deleting...' : 'Delete My Account'}
              </button>
            </form>
          </FormSection>

        </div>
      </section>
      <Footer />
    </>
  )
}

function FormSection({ title, children, danger = false }: { title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div className="bg-sl-surface border border-sl-border px-6 py-5">
      <h2 className={`font-syne font-bold text-[15px] mb-1 ${danger ? 'text-sl-orange' : 'text-sl-white'}`}>{title}</h2>
      <div className={`w-5 h-0.5 mb-4 ${danger ? 'bg-sl-orange' : 'bg-sl-border'}`} />
      {children}
    </div>
  )
}

function CurrentPwdField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input type="password" value={value} onChange={e => onChange(e.target.value)} placeholder="Current password to confirm"
      className="bg-sl-darker border border-sl-border px-4 py-2.5 font-mono text-[12px] text-sl-white placeholder:text-sl-muted outline-none focus:border-sl-orange transition-colors" />
  )
}

function SubmitBtn({ children, loading }: { children: React.ReactNode; loading: boolean }) {
  return (
    <button type="submit" disabled={loading}
      className="self-start bg-sl-orange text-sl-white px-5 py-2.5 font-mono text-[9px] tracking-[0.1em] uppercase clip-btn hover:bg-[#c93a28] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
      {loading ? 'Saving...' : children}
    </button>
  )
}