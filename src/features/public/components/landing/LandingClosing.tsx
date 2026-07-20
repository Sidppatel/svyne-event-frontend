import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatUsPhone } from '@/shared/lib/validation';
import { BrandLockup } from '@/shared/brand/BrandMark';
import { useLandingStore } from '@/features/public/hooks/landingStore';

const closingPills = ['No credit card', 'Cancel anytime', 'Real human replies'];
const formFields = [
  { name: 'name', label: 'Your name', placeholder: 'Amara Okonkwo', type: 'text', half: false },
  { name: 'email', label: 'Email', placeholder: 'amara@skylineterrace.com', type: 'email', half: true },
  { name: 'phone', label: 'Phone', placeholder: '+1 (251) 555-0142', type: 'tel', half: true },
  { name: 'venue', label: 'Venue name', placeholder: 'Skyline Terrace', type: 'text', half: true },
  { name: 'city', label: 'City', placeholder: 'Mobile, AL', type: 'text', half: true },
] as const;

type LeadForm = { name: string; email: string; phone: string; venue: string; city: string };
const emptyForm: LeadForm = { name: '', email: '', phone: '', venue: '', city: '' };

export function ClosingCta() {
  const heroVenue = useLandingStore((s) => s.venueName);
  const [values, setValues] = useState<LeadForm>({ ...emptyForm, venue: heroVenue.trim() });
  const venueTouched = useRef(false);
  useEffect(() => {
    if (!venueTouched.current) setValues((prev) => ({ ...prev, venue: heroVenue.trim() }));
  }, [heroVenue]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const name = values.name.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();
    const venue = values.venue.trim();
    const city = values.city.trim();
    if (!name) {
      setError('Add your name so I know who I’m talking to.');
      return;
    }
    if (!email && !phone) {
      setError('Add an email or a phone number so I can reach you.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { createPlatformLead } = await import('@/features/public/services/platformLeadService');
      await createPlatformLead({
        name,
        companyName: venue || name,
        phone: phone || email,
        website: '',
        description: `Landing form.${email ? ` Email: ${email}` : ''}${phone ? ` · Phone: ${phone}` : ''}${city ? ` · City: ${city}` : ''}${venue ? ` · Venue: ${venue}` : ''}`,
      });
      setSent(true);
    } catch (caught) {
      const { rpcErrorMessage } = await import('@/shared/session');
      setError(rpcErrorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="start" className="scroll-mt-24 bg-(--lp-paper) px-5 pb-4 pt-20 md:px-8 md:pt-28">
      <div className="mx-auto max-w-3xl">
        <div className="lp-frame px-7 py-10 md:px-14 md:py-14">
          <p data-reveal className="lp-eyebrow text-(--lp-green)">
            Open a TicketSpan box office
          </p>
          <h2 data-split className="mt-5 text-3xl text-(--lp-ink) md:text-4xl">
            Your name on the door <em className="text-(--lp-green)">by tomorrow.</em>
          </h2>
          <p data-reveal className="mt-5 max-w-md leading-relaxed text-(--lp-ink-soft)">
            Tell me about your venue. I read every one of these personally, and I&rsquo;ll send you
            a link to your own box office within a day.
          </p>
          <ul
            data-reveal
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-(--lp-ink-soft)"
          >
            {closingPills.map((pill) => (
              <li key={pill}>✳ {pill}</li>
            ))}
          </ul>
          {sent ? (
            <div className="lp-perf mt-10 pt-8" role="status">
              <p className="font-[family-name:var(--lp-display)] text-3xl text-(--lp-ink)">
                Consider it <em className="text-(--lp-green)">reserved.</em>
              </p>
              <p className="mt-3 text-(--lp-ink-soft)">
                Thank you — I&rsquo;ll get back to you within a day with a link to your box office.
              </p>
            </div>
          ) : (
            <form data-reveal onSubmit={submit} className="mt-10 space-y-7" noValidate>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {formFields.map((field) => (
                  <label key={field.name} className={field.half ? '' : 'sm:col-span-2'}>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--lp-ink-soft)">
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      autoComplete={field.name === 'venue' ? 'organization' : field.name === 'city' ? 'address-level2' : field.name === 'phone' ? 'tel' : field.name}
                      value={values[field.name]}
                      onChange={(e) => {
                        if (field.name === 'venue') venueTouched.current = true;
                        setValues((prev) => ({
                          ...prev,
                          [field.name]: field.name === 'phone' ? formatUsPhone(e.target.value) : e.target.value,
                        }));
                      }}
                      placeholder={field.placeholder}
                      className="lp-input mt-2"
                    />
                  </label>
                ))}
              </div>
              {error ? (
                <p className="border-l-2 border-(--lp-green) pl-3 text-sm text-(--lp-ink)" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" disabled={submitting} className="lp-cta w-full">
                {submitting ? 'Sending…' : 'Open my box office →'}
              </button>
            </form>
          )}
          <p data-reveal className="mt-8 font-[family-name:var(--lp-display)] text-xl italic text-(--lp-ink-soft)">
            — Siddh Patel, Chickasaw, AL
          </p>
        </div>
      </div>

      <footer className="mx-auto mt-20 max-w-[90rem]">
        <div className="lp-rule-double" aria-hidden="true" />
        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4 text-(--lp-ink)">
            <BrandLockup tone="ink" />
            <p className="max-w-xs text-sm leading-relaxed text-(--lp-ink-soft)">
              The box office for independent venues. Sell tickets and tables under your own name —
              you keep every penny of your ticket price.
            </p>
            <p className="font-mono text-xs text-(--lp-ink-faint)">Built in Chickasaw, Alabama</p>
          </div>
          <nav className="space-y-4" aria-label="Product">
            <p className="lp-eyebrow text-(--lp-ink-soft)">Product</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#platform" className="lp-link">Platform</a></li>
              <li><a href="#showcase" className="lp-link">Showcase</a></li>
              <li><a href="#pricing" className="lp-link">Pricing</a></li>
              <li><a href="#founder" className="lp-link">Founder</a></li>
            </ul>
          </nav>
          <nav className="space-y-4" aria-label="Support">
            <p className="lp-eyebrow text-(--lp-ink-soft)">Support</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/help" className="lp-link">Help center</Link></li>
              <li><Link to="/contact" className="lp-link">Contact</Link></li>
              <li><a href="mailto:support@ticketspan.com" className="lp-link">support@ticketspan.com</a></li>
              <li><Link to="/terms" className="lp-link">Terms</Link></li>
              <li><Link to="/privacy" className="lp-link">Privacy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-(--lp-line-soft) py-6 text-xs text-(--lp-ink-soft)">
          <p>© {new Date().getFullYear()} TicketSpan. All rights reserved.</p>
          <p className="font-mono">Payments processed by Stripe</p>
        </div>
      </footer>
    </section>
  );
}
