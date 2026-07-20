import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { StaticPageShell } from '@/features/public/components/StaticPageShell';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqGroup {
  title: string;
  items: FaqItem[];
}

const faqGroups: FaqGroup[] = [
  {
    title: 'Tickets & Bookings',
    items: [
      {
        q: 'Where are my tickets after I pay?',
        a: 'Tickets appear on your My Tickets page immediately after payment, each with its own QR code. You also receive a confirmation email with your booking details.',
      },
      {
        q: 'Can I buy tickets for friends?',
        a: 'Yes. Buy multiple tickets in one order, then share individual tickets from My Tickets using the claim link. Each friend claims their ticket into their own account.',
      },
      {
        q: 'What is a table booking?',
        a: 'A table booking reserves an entire table for your group at the venue. The table listing shows seat capacity and any minimum spend. Table QR codes work the same way as tickets at check-in.',
      },
      {
        q: 'My payment failed but I was charged. What should I do?',
        a: 'Failed payments are usually reversed automatically by your bank within a few days. If a charge persists without a confirmed booking, report it via Contact Support with the date and amount.',
      },
    ],
  },
  {
    title: 'At the Event',
    items: [
      {
        q: 'What do I need at the door?',
        a: 'Your ticket QR code, on your phone or printed. For age-restricted events, bring a valid photo ID matching the ticket holder name.',
      },
      {
        q: 'Can my whole group enter with one QR code?',
        a: 'No. Each ticket admits one person and is voided when scanned. Share tickets with your group before arriving so everyone has their own code.',
      },
      {
        q: 'My QR code will not scan. What should I do?',
        a: 'Raise your screen brightness and remove any screen protector glare. Door staff can also look up your booking by name or email if scanning fails.',
      },
    ],
  },
  {
    title: 'Payments & Refunds',
    items: [
      {
        q: 'What payment methods are accepted?',
        a: 'Cards are accepted on all events. Some events also offer ACH bank payment, which replaces the card service fee with a lower ACH fee.',
      },
      {
        q: 'Why is there a fee and tax on top of the ticket price?',
        a: 'The service fee covers payment processing and platform costs; sales tax is applied where required by law. The full total is always shown before you confirm payment.',
      },
      {
        q: 'Do free events cost anything?',
        a: 'No. Free events cost nothing. When a ticket is free ($0), there is no service fee and no tax — the total is $0, so there is no card or payment step. Your entry pass is issued instantly. Organizers pay nothing to run a free event and do not even need payment setup.',
      },
      {
        q: 'Can I get a refund?',
        a: 'No. All sales are final on this platform; tickets and table bookings cannot be refunded or exchanged. See the All Sales Final policy in the footer for details.',
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        q: 'How do I change my name or email?',
        a: 'Open your Profile page from the account menu and update your details there.',
      },
      {
        q: 'I forgot my password.',
        a: 'Use the "Forgot password" link on the sign-in page to receive a reset email.',
      },
      {
        q: 'Someone sent me a ticket claim link. What do I do?',
        a: 'Open the link and sign in (or create an account). The ticket moves into your account with your name on it, ready for check-in.',
      },
    ],
  },
];

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-hairline-strong bg-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-surface-sunken/60 transition-colors"
        aria-expanded={open}
      >
        {item.q}
        <ChevronDown className={cn('size-4 shrink-0 text-brand transition-transform', open && 'rotate-180')} />
      </button>
      {open ? <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p> : null}
    </div>
  );
}

export function HelpCenterPage() {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const groups = normalized
    ? faqGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(normalized)),
      }))
      .filter((g) => g.items.length > 0)
    : faqGroups;

  return (
    <StaticPageShell
      eyebrow="Support"
      title="Help Center"
      intro="Answers to the most common questions about tickets, tables, payments, and getting into the event."
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search help topics…"
        className="w-full border border-hairline-strong bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
      />
      {groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No results for “{query}”. Try different words or <a href="/contact" className="text-accent-burgundy underline">contact support</a>.
        </p>
      ) : (
        groups.map((group) => (
          <section key={group.title} className="space-y-3">
            <h2 className="font-mono text-[10.5px] font-medium uppercase tracking-[0.3em] text-brand">{group.title}</h2>
            <div className="space-y-2">
              {group.items.map((item) => (
                <FaqRow key={item.q} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
      <div className="border-[1.5px] border-ink bg-surface p-6 text-center space-y-2">
        <p className="font-display text-2xl text-foreground">Still stuck?</p>
        <p className="text-sm text-muted-foreground">
          Our team is happy to help with anything not covered here.
        </p>
        <a
          href="/contact"
          className="mt-2 inline-flex h-11 items-center justify-center bg-brand px-6 text-[13px] font-medium uppercase tracking-[0.1em] text-(--brand-ink) transition-colors hover:bg-brand-hover"
        >
          Contact Support
        </a>
      </div>
    </StaticPageShell>
  );
}
