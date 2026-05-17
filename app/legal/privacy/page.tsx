import type { Metadata } from 'next'
import LegalLayout from '../LegalLayout'

export const metadata: Metadata = {
  title:       'Privacy Policy — Modulifyr Speedline',
  description: 'Privacy Policy for Modulifyr Speedline — what data we collect and how we use it.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="What data Modulifyr Speedline collects, why, and how it is used."
      lastUpdated="May 2026"
    >
      <Section title="1. Overview">
        <P>
          Modulifyr Speedline collects the minimum data required to operate the service —
          account creation, purchase records, and payment processing. We do not sell your data.
          We do not run advertising. This page explains exactly what we collect and why.
        </P>
      </Section>

      <Section title="2. Data We Collect">
        <P><strong className="text-sl-white">Account data.</strong> When you create an account, we collect your email address. If you sign in with Google, we also receive your display name and profile photo from Google. This data is stored in Firebase Authentication.</P>
        <P><strong className="text-sl-white">Purchase records.</strong> When you complete a purchase, we store a record containing: your Firebase user ID, the game or DLC purchased, the date of purchase, and the Paddle transaction ID for reference. This is stored in Firestore and constitutes your game library.</P>
        <P><strong className="text-sl-white">Payment data.</strong> All payment processing is handled by Paddle. Modulifyr Speedline never sees or stores your card number, billing address, or any other payment details. Paddle&apos;s privacy policy governs how your payment data is handled. You can read it at paddle.com/privacy.</P>
        <P><strong className="text-sl-white">Usage data.</strong> We do not currently run analytics or tracking scripts. We do not use cookies beyond what Firebase Authentication requires for session management.</P>
      </Section>

      <Section title="3. How We Use Your Data">
        <ul>
          <Li>To create and manage your account.</Li>
          <Li>To process and record your purchases.</Li>
          <Li>To display your game library.</Li>
          <Li>To provide download access to games you have purchased.</Li>
          <Li>To send transactional emails (purchase confirmations, password resets). We do not send marketing emails without your explicit consent.</Li>
        </ul>
      </Section>

      <Section title="4. Third-Party Services">
        <P>
          We use the following third-party services, each with their own privacy policies:
        </P>
        <ul>
          <Li><strong className="text-sl-white">Firebase (Google).</strong> Authentication and database. firebase.google.com/support/privacy</Li>
          <Li><strong className="text-sl-white">Paddle.</strong> Payment processing. paddle.com/legal/privacy</Li>
          <Li><strong className="text-sl-white">Vercel.</strong> Website hosting. vercel.com/legal/privacy-policy</Li>
        </ul>
        <P>
          Data processed by these services is governed by their respective policies. We have
          selected these providers because they maintain strong data protection standards.
        </P>
      </Section>

      <Section title="5. Data Retention">
        <P>
          Account data is retained for as long as your account exists. Purchase records are
          retained permanently — they are the record of what you own. If you delete your account,
          we will delete your account data within 30 days, though transaction records may be
          retained for legal and accounting purposes.
        </P>
      </Section>

      <Section title="6. Your Rights">
        <P>
          You can request a copy of the data we hold about you, request correction of inaccurate
          data, or request deletion of your account by contacting us at{' '}
          <a href="mailto:privacy@modulifyr.com" className="text-sl-orange hover:underline">
            privacy@modulifyr.com
          </a>. We will respond within 30 days.
        </P>
      </Section>

      <Section title="7. Data Security">
        <P>
          Access to user data in Firestore is restricted by security rules — users can only
          read their own library. Server-side writes are performed by a locked-down service
          account with no other permissions. Payment data never touches our servers.
        </P>
      </Section>

      <Section title="8. Contact">
        <P>
          Privacy-related enquiries:{' '}
          <a href="mailto:privacy@modulifyr.com" className="text-sl-orange hover:underline">
            privacy@modulifyr.com
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