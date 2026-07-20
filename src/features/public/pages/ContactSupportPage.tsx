import { Mail, MessageSquareText, LifeBuoy, Ticket } from 'lucide-react';
import { StaticPageShell } from '@/features/public/components/StaticPageShell';

const channels = [
  {
    icon: Mail,
    title: 'Email Support',
    body: 'Best for billing errors, account issues, and anything with a booking reference. We reply within one business day.',
    action: { label: 'support@ticketspan.com', href: 'mailto:support@ticketspan.com' },
  },
  {
    icon: Ticket,
    title: 'Ticket & Booking Issues',
    body: 'Missing tickets, claim links, or QR problems? Check My Tickets first; most issues resolve there.',
    action: { label: 'Go to My Tickets', href: '/tickets' },
  },
  {
    icon: LifeBuoy,
    title: 'Help Center',
    body: 'Search common questions about payments, check-in, and table bookings before waiting on a reply.',
    action: { label: 'Browse Help Center', href: '/help' },
  },
  {
    icon: MessageSquareText,
    title: 'Feedback',
    body: 'Ideas, praise, or something we could do better; feedback goes straight to the team.',
    action: { label: 'Give Feedback', href: '/feedback' },
  },
];

export function ContactSupportPage() {
  return (
    <StaticPageShell
      eyebrow="Support"
      title="Contact Support"
      intro="Pick the channel that fits your issue. Including your booking reference and event name gets you the fastest answer."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {channels.map((channel) => (
          <div key={channel.title} className="flex flex-col gap-3 border border-hairline-strong bg-surface p-5">
            <channel.icon className="size-5 text-brand" />
            <h2 className="font-display text-xl text-foreground">{channel.title}</h2>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{channel.body}</p>
            <a href={channel.action.href} className="text-sm font-medium text-brand hover:underline underline-offset-2">
              {channel.action.label} →
            </a>
          </div>
        ))}
      </div>
      <div className="border border-dashed border-hairline-strong p-5 text-sm text-muted-foreground space-y-2">
        <p className="font-display text-lg text-foreground">Before you write in</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Include the email address used for the booking.</li>
          <li>Add the event name and date, plus a booking reference if you have one.</li>
          <li>For payment issues, include the charge date and amount (never send full card numbers).</li>
        </ul>
        <p className="pt-1">
          Remember: all sales are final. Support can help with
          billing errors, ticket sharing, and account problems.
        </p>
      </div>
    </StaticPageShell>
  );
}
