'use client'

import { useState, useEffect } from 'react'
import { useRouter }  from 'next/navigation'
import Link           from 'next/link'
import { useAuth }    from '@/contexts/AuthContext'

type Mode = 'signin' | 'signup' | 'reset'

export default function AuthPage() {
  const { user, loading, signIn, signUp, signInGoogle, resetPassword } = useAuth()
  const router = useRouter()

  const [mode,      setMode]      = useState<Mode>('signin')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [error,     setError]     = useState('')
  const [success,   setSuccess]   = useState('')
  const [busy,      setBusy]      = useState(false)

  // Redirect if already signed in
  useEffect(() => {
    if (!loading && user) router.replace('/library')
  }, [user, loading, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setBusy(true)

    try {
      if (mode === 'reset') {
        await resetPassword(email)
        setSuccess('Password reset email sent. Check your inbox.')
      } else if (mode === 'signup') {
        await signUp(email, password)
        router.replace('/library')
      } else {
        await signIn(email, password)
        router.replace('/library')
      }
    } catch (err: unknown) {
      setError(parseFirebaseError(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setBusy(true)
    try {
      await signInGoogle()
      router.replace('/library')
    } catch (err: unknown) {
      setError(parseFirebaseError(err))
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sl-darker flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">
          Loading...
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sl-darker flex flex-col">
      {/* Top bar */}
      <div className="border-b border-sl-border px-12 h-16 flex items-center justify-between">
        <Link href="/" className="font-syne font-bold text-[13px] text-sl-white no-underline">
          Modulifyr Speedline
        </Link>
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-muted">
          {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </span>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          {/* Header */}
          <div className="mb-8">
            <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-2">
              {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'New Account' : 'Reset Password'}
            </span>
            <h1 className="font-syne font-extrabold text-[28px] text-sl-white leading-tight">
              {mode === 'signin'
                ? 'Sign in to access your library.'
                : mode === 'signup'
                ? 'Create an account to start buying.'
                : 'Enter your email to reset.'}
            </h1>
          </div>

          {/* Google sign in — only for signin/signup */}
          {mode !== 'reset' && (
            <>
              <button
                onClick={handleGoogle}
                disabled={busy}
                className="w-full flex items-center justify-center gap-3
                           border border-sl-border bg-sl-surface text-sl-light
                           px-4 py-3 font-mono text-[10px] tracking-[0.12em] uppercase
                           transition-colors duration-200 hover:border-sl-mid hover:text-sl-white
                           disabled:opacity-40 disabled:cursor-not-allowed mb-5"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-sl-border" />
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">or</span>
                <div className="flex-1 h-px bg-sl-border" />
              </div>
            </>
          )}

          {/* Error / success */}
          {error   && <p className="font-mono text-[10px] text-sl-orange mb-4 leading-relaxed">{error}</p>}
          {success && <p className="font-mono text-[10px] text-sl-cyan  mb-4 leading-relaxed">{success}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block font-mono text-[9px] tracking-[0.15em] uppercase text-sl-muted mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-sl-surface border border-sl-border
                           px-4 py-3 font-mono text-[12px] text-sl-white
                           placeholder:text-sl-muted outline-none
                           focus:border-sl-orange transition-colors duration-200"
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block font-mono text-[9px] tracking-[0.15em] uppercase text-sl-muted mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  className="w-full bg-sl-surface border border-sl-border
                             px-4 py-3 font-mono text-[12px] text-sl-white
                             placeholder:text-sl-muted outline-none
                             focus:border-sl-orange transition-colors duration-200"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 w-full bg-sl-orange text-sl-white
                         px-4 py-3.5 font-mono text-[10px] tracking-[0.12em] uppercase
                         clip-btn transition-colors duration-200
                         hover:bg-[#c93a28] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy
                ? 'Processing...'
                : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Email'}
            </button>
          </form>

          {/* Mode switchers */}
          <div className="mt-6 flex flex-col gap-2 text-center">
            {mode === 'signin' && (
              <>
                <button onClick={() => { setMode('signup'); setError('') }}
                  className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white transition-colors">
                  No account? Create one
                </button>
                <button onClick={() => { setMode('reset'); setError('') }}
                  className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white transition-colors">
                  Forgot password?
                </button>
              </>
            )}
            {(mode === 'signup' || mode === 'reset') && (
              <button onClick={() => { setMode('signin'); setError('') }}
                className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white transition-colors">
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function parseFirebaseError(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    switch ((err as { code: string }).code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password.'
      case 'auth/email-already-in-use':
        return 'This email is already registered. Sign in instead.'
      case 'auth/weak-password':
        return 'Password must be at least 8 characters.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later.'
      case 'auth/invalid-email':
        return 'Invalid email address.'
      default:
        return 'An error occurred. Please try again.'
    }
  }
  return 'An error occurred. Please try again.'
}
