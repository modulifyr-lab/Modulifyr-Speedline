import type { Metadata } from 'next'
import LegalLayout from '../LegalLayout'

export const metadata: Metadata = {
  title:       'Terms of Service — Modulifyr Speedline',
  description: 'Terms of Service for Modulifyr Speedline game purchases and use.',
}

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The rules governing your use of Modulifyr Speedline and your purchased games."
      lastUpdated="May 2026"
    >
      <Section title="1. Who These Terms Apply To">
        <P>
          These Terms of Service govern your access to and use of the Modulifyr Speedline website
          (speedline.modulifyr.com) and all games and downloadable content purchased through it.
          By creating an account or completing a purchase, you agree to these terms in full.
          If you do not agree, do not use the service.
        </P>
        <P>
          Modulifyr Speedline is a division of Modulifyr, a sole proprietorship owned and operated
          by Rijan, registered in Birtamode, Jhapa, Nepal.
        </P>
      </Section>

      <Section title="2. Accounts">
        <P>
          You must create an account to purchase and access games. You are responsible for maintaining
          the security of your account credentials. Modulifyr Speedline is not liable for any loss
          resulting from unauthorised access to your account due to your failure to secure your
          credentials.
        </P>
        <P>
          You may not create accounts on behalf of others without their explicit consent. One account
          per person. Accounts are non-transferable.
        </P>
      </Section>

      <Section title="3. What You Buy — Permanent Game Ownership">
        <P>
          When you purchase a game from Modulifyr Speedline, you are not purchasing a revocable
          licence. You are purchasing the game itself as a permanent digital product. This means:
        </P>
        <ul>
          <Li>You can play the game whenever you want, for as long as you want.</Li>
          <Li>You can install it on any devices you personally own.</Li>
          <Li>Your access does not expire. There are no subscription fees or renewal requirements.</Li>
          <Li>All future patches and updates for the game are included at no additional cost.</Li>
          <Li>
            If Modulifyr Speedline ceases operations, single-player games remain fully playable
            from your local installation. No server connection is required to play single-player titles.
          </Li>
          <Li>
            For multiplayer games, official servers may be taken offline if the studio closes.
            However, multiplayer titles are designed and released with player-hosted server support.
            You will be able to host and connect to player-run servers indefinitely.
          </Li>
        </ul>
        <P>
          Your downloaded game files are yours. We will not remotely disable, delete, or revoke
          access to any game you have legitimately purchased, except in the case of fraud or a
          chargeback initiated by you.
        </P>
      </Section>

      <Section title="4. What You Cannot Do">
        <P>
          Your purchase grants you the right to play the game for personal, non-commercial use.
          The following are prohibited:
        </P>
        <ul>
          <Li>
            <strong>Reselling.</strong> You may not sell, transfer, rent, or give your copy of the
            game or your account to another person. Purchased games are tied to your account and
            are non-transferable.
          </Li>
          <Li>
            <strong>Decompiling and reverse engineering.</strong> You may not decompile, disassemble,
            reverse engineer, or otherwise attempt to extract the source code, assets, or proprietary
            algorithms from any game. The game files contain proprietary intellectual property.
          </Li>
          <Li>
            <strong>Redistribution.</strong> You may not redistribute, upload, or make the game
            files available for download by others through any channel.
          </Li>
          <Li>
            <strong>Commercial use.</strong> You may not use the game or its assets for commercial
            purposes, including but not limited to streaming monetisation beyond standard platform
            policies, asset extraction for use in other projects, or training AI systems.
          </Li>
          <Li>
            <strong>Cheating and exploits.</strong> You may not use cheats, exploits, bots, or
            unauthorised third-party software in multiplayer modes in a way that negatively affects
            other players.
          </Li>
        </ul>
      </Section>

      <Section title="5. Downloadable Content (DLC)">
        <P>
          DLC is subject to the same ownership terms as base games. DLC requires ownership of
          the base game to which it belongs. DLC purchases are permanent and non-transferable.
          Refund terms for DLC follow the same policy as base games — see the Refund Policy.
        </P>
      </Section>

      <Section title="6. Payments">
        <P>
          All payments are processed by Stripe. Modulifyr Speedline does not store your payment
          card details. Prices are displayed in USD. Applicable taxes, if any, are the
          responsibility of the buyer based on their jurisdiction.
        </P>
        <P>
          Purchases are final subject to the Refund Policy. Initiating a chargeback outside of
          the refund process may result in permanent account termination.
        </P>
      </Section>

      <Section title="7. Intellectual Property">
        <P>
          All games, assets, code, music, graphics, and other content produced by Modulifyr
          Speedline remain the intellectual property of Modulifyr. Your purchase grants you
          the right to play and enjoy the game, not to own the intellectual property within it.
        </P>
      </Section>

      <Section title="8. Availability and Service Changes">
        <P>
          Modulifyr Speedline reserves the right to update, modify, or discontinue games and
          services. Updates will not remove features you have already paid for. We will not
          remove a game from your library after purchase.
        </P>
      </Section>

      <Section title="9. Limitation of Liability">
        <P>
          Modulifyr Speedline is provided as-is. To the maximum extent permitted by law,
          Modulifyr is not liable for any indirect, incidental, or consequential damages
          arising from your use of the service. Our total liability in any dispute is limited
          to the amount you paid for the product in question.
        </P>
      </Section>

      <Section title="10. Governing Law">
        <P>
          These terms are governed by the laws of Nepal. Any disputes will be handled under
          Nepalese jurisdiction.
        </P>
      </Section>

      <Section title="11. Contact">
        <P>
          For questions regarding these terms, contact:{' '}
          <a href="mailto:legal@modulifyr.com" className="text-sl-orange hover:underline">
            legal@modulifyr.com
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