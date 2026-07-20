const tiers = [
  {
    name: 'Free forever',
    price: '$0',
    unit: '/mo',
    fee: '6.5% + $1.75',
    feeNote: 'once per order — free events pay $0',
    featured: false,
    cta: 'Start free',
    points: [
      'Unlimited events, ticket types, staff',
      'Free events cost nothing to run',
      'Your own subdomain with SSL',
      'Ticket count and revenue, live',
      'No credit card, cancel anytime',
    ],
  },
  {
    name: 'Pay per event',
    price: 'from $25',
    unit: '/event',
    fee: 'from 6.0% + $1.50',
    feeNote: 'lower buyer fee, that event only',
    featured: true,
    cta: 'Choose per event',
    points: [
      'Advanced analytics for one event',
      'Buy it only when you need it',
      'Scales to $199: full white-label',
      'Perfect for a gala or seasonal run',
    ],
  },
  {
    name: 'Subscription',
    price: 'Custom',
    unit: '',
    fee: 'Lowest fees, tailored',
    feeNote: 'priced to your volume',
    featured: false,
    cta: 'Talk to me',
    points: [
      'Advanced analytics every month',
      'Custom domains included',
      'Extra managers, priority support',
      'Cancel any month, no contract',
    ],
  },
];

export function PricingTeaser() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-(--lp-green) py-20 text-(--lp-ivory) md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p data-reveal className="lp-eyebrow text-(--lp-green-ivory)">
            Pricing
          </p>
          <h2 data-split className="mt-5 text-4xl md:text-5xl">
            Start free. <em className="text-(--lp-green-ivory)">Pay only when you sell.</em>
          </h2>
          <p data-reveal className="mt-6 leading-relaxed text-(--lp-ivory)/75">
            There&rsquo;s one service fee per order, added at checkout and paid by the buyer, so you
            always receive your full ticket price. If you want lower fees or deeper analytics, you
            can unlock them for a single event or by subscription. Nothing gets buried under
            &ldquo;processing&rdquo; and &ldquo;convenience.&rdquo;
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              data-reveal
              key={tier.name}
              className={
                tier.featured
                  ? 'lp-frame flex flex-col px-7 py-8 text-(--lp-ink)'
                  : 'flex flex-col border border-(--lp-line-ivory) px-7 py-8'
              }
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl">{tier.name}</h3>
                {tier.featured ? (
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-(--lp-green)">
                    Most chosen
                  </span>
                ) : null}
              </div>
              <p className="mt-5 font-[family-name:var(--lp-display)] text-4xl font-semibold">
                {tier.price}
                <span className="ml-1 font-mono text-sm font-normal">{tier.unit}</span>
              </p>
              <div
                className={
                  tier.featured
                    ? 'mt-4 border-t border-(--lp-line-soft) pt-3'
                    : 'mt-4 border-t border-(--lp-line-ivory) pt-3'
                }
              >
                <p className="font-mono text-sm">{tier.fee}</p>
                <p className={`font-mono text-[11px] ${tier.featured ? 'text-(--lp-ink-soft)' : 'text-(--lp-ivory)/60'}`}>
                  {tier.feeNote}
                </p>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className={tier.featured ? 'text-(--lp-green)' : 'text-(--lp-green-ivory)'}>
                      ✳
                    </span>
                    <span className={tier.featured ? 'text-(--lp-ink-soft)' : 'text-(--lp-ivory)/80'}>{point}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#start"
                className={
                  tier.featured
                    ? 'lp-cta mt-8 w-full'
                    : 'mt-8 flex h-[52px] items-center justify-center border border-(--lp-ivory)/60 text-[13px] font-medium uppercase tracking-[0.1em] text-(--lp-ivory) transition-colors hover:bg-(--lp-ivory) hover:text-(--lp-green)'
                }
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        <div data-reveal className="mt-10 grid gap-px border border-(--lp-line-ivory) sm:grid-cols-2">
          <div className="p-6">
            <p className="lp-eyebrow text-(--lp-green-ivory)">You keep 100%</p>
            <p className="mt-3 text-sm leading-relaxed text-(--lp-ivory)/75">
              Sell a $50 ticket, receive $50. The buyer pays the fee, never you.
            </p>
            <p className="mt-4 font-mono text-[13px] text-(--lp-ivory)/80">
              $50 ticket → buyer pays $55.00 → <span className="text-(--lp-green-ivory)">you get $50.00</span>
            </p>
          </div>
          <div className="border-t border-(--lp-line-ivory) p-6 sm:border-l sm:border-t-0">
            <p className="lp-eyebrow text-(--lp-green-ivory)">Free events cost nothing</p>
            <p className="mt-3 text-sm leading-relaxed text-(--lp-ivory)/75">
              For free events there&rsquo;s no service fee and nothing to set up with Stripe.
              Guests get their QR pass right away.
            </p>
            <p className="mt-4 font-mono text-[13px] text-(--lp-ivory)/80">
              free ticket → <span className="text-(--lp-green-ivory)">buyer pays $0.00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const trustFacts = [
  {
    term: 'Payments by Stripe',
    detail: 'Card and ACH payments are processed by Stripe. Your card details never touch our servers.',
  },
  {
    term: 'Tax handled at checkout',
    detail: 'Sales tax is calculated at checkout and reported per event — remitted by the platform or by you.',
  },
  {
    term: 'Every scan audited',
    detail: 'Check-ins, failures, and undo actions are logged per event, so the door count always reconciles.',
  },
];

export function TrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
      <h2 data-split className="max-w-xl text-3xl text-(--lp-ink) md:text-4xl">
        Built like it handles money, <em className="text-(--lp-green)">because it does.</em>
      </h2>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {trustFacts.map((fact) => (
          <div data-reveal key={fact.term}>
            <div className="lp-rule-double" aria-hidden="true" />
            <p className="lp-eyebrow mt-5 text-(--lp-green)">{fact.term}</p>
            <p className="mt-3 text-sm leading-relaxed text-(--lp-ink-soft)">{fact.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
