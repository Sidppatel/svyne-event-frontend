import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  createPaymentIntent,
  getPaymentStatus,
  cancelBooking,
  getBooking,
} from '@/features/public/services/paymentService';
import { eventClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import { clearAllPendingCarts } from '@/features/public/services/pendingCart';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Lock, ShieldCheck, Ticket, Calendar, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import type { Booking } from '@/shared/proto/bookings';
import type { Event } from '@/shared/proto/event';

interface IntentState {
  clientSecret: string;
  publishableKey: string;
  amountCents: number;
  holdExpiresAt: number; // unix seconds, 0 = none
}

const NOTCH = { ['--svyne-notch' as string]: 'var(--background)' } as CSSProperties;

export function CheckoutPage() {
  const { bookingsId = '' } = useParams();
  const navigate = useNavigate();
  const [intent, setIntent] = useState<IntentState | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    let active = true;
    
    // Fetch Payment Intent
    createPaymentIntent(bookingsId)
      .then((res) => {
        if (!active) return;
        setIntent({
          clientSecret: res.clientSecret,
          publishableKey: res.publishableKey,
          amountCents: Number(res.amountCents),
          holdExpiresAt: Number(res.holdExpiresAt),
        });
        const key = res.publishableKey || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
        setStripePromise(loadStripe(key));
      })
      .catch((caught) => active && setError(rpcErrorMessage(caught)));

    // Fetch Booking & Event Details
    getBooking(bookingsId)
      .then((b) => {
        if (!active) return;
        setBooking(b);
        return callRpc(() => eventClient.getEvent({ value: b.eventsId }));
      })
      .then((evt) => {
        if (active && evt) {
          setEventData(evt);
        }
      })
      .catch((err) => {
        console.error('Failed to load booking metadata:', err);
      });

    return () => {
      active = false;
    };
  }, [bookingsId]);

  if (error) {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card className="border border-destructive/20 bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-display text-destructive">Checkout Unavailable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground leading-normal">{error}</p>
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="w-full h-10">
              <ArrowLeft className="h-4 w-4 mr-2" /> Go back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!intent || !stripePromise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-xs text-muted-foreground tracking-widest uppercase font-black">Preparing secure checkout…</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: intent.clientSecret, appearance: { theme: 'stripe' } }}
    >
      <div className="max-w-6xl mx-auto py-4 space-y-6">
        <div className="flex items-center justify-between border-b border-border/30 pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold font-display tracking-tight text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" /> Secure Checkout
            </h1>
            <p className="text-xs text-muted-foreground">Double-check your tickets and complete booking.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="h-9 text-xs">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Apple Wallet style Ticket Stub Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              {/* Event Cover Image / Header */}
              <div className="bg-muted p-5 border-b border-border/40 space-y-2">
                {eventData && (
                  <>
                    <div className="inline-flex rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                      {eventData.category || 'Event'}
                    </div>
                    <h2 className="text-xl font-bold font-display tracking-tight text-foreground">{eventData.title}</h2>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>Upcoming Event</span>
                    </div>
                  </>
                )}
                {!eventData && (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 w-16 bg-muted-foreground/20 rounded" />
                    <div className="h-6 w-3/4 bg-muted-foreground/20 rounded" />
                  </div>
                )}
              </div>

              {/* Perforation perforation line */}
              <div className="svyne-ticket-edge" style={NOTCH} />

              <div className="p-6 space-y-6">
                {/* Cart Lines */}
                {booking && booking.lines && booking.lines.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 border-b border-border/20 pb-2">Tickets Selected</p>
                    <div className="divide-y divide-border/20">
                      {booking.lines.map((line) => (
                        <div key={line.bookingLinesId} className="flex justify-between items-center py-2.5 text-xs">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-foreground flex items-center gap-1">
                              <Ticket className="h-3.5 w-3.5 text-marigold" /> {line.label}
                            </span>
                            <span className="text-[10px] text-muted-foreground block">Category: {line.kind}</span>
                          </div>
                          <span className="font-bold text-foreground">
                            1 Ticket
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse space-y-2 py-4">
                    <div className="h-4 w-full bg-muted-foreground/10 rounded" />
                    <div className="h-4 w-full bg-muted-foreground/10 rounded" />
                  </div>
                )}

                {/* Subtotals & Fees */}
                {booking && (
                  <div className="border-t border-border/30 pt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-medium text-foreground">{centsToUSD(booking.subtotalCents)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Service Fee</span>
                      <span className="font-medium text-foreground">{centsToUSD(booking.feeCents)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-black text-foreground border-t border-border/20 pt-3 uppercase tracking-wider font-display">
                      <span>Total Amount</span>
                      <span className="text-lg text-marigold font-display font-semibold">{centsToUSD(booking.totalCents)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Secure Trust Signals */}
            <div className="rounded-xl border border-border bg-card/40 p-4 space-y-3.5 shadow-sm text-xs">
              <div className="flex items-center gap-2 text-foreground font-bold uppercase tracking-wider border-b border-border/20 pb-2.5 font-display">
                <ShieldCheck className="h-4.5 w-4.5 text-success" /> Guaranteed Security
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Transactions are encrypted with SSL 256-bit technology. Payment credentials are never stored on Svyne servers, routing securely through Stripe.
              </p>
            </div>
          </div>

          {/* Right Column: Stripe Payment Form */}
          <div className="lg:col-span-7">
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: intent.clientSecret, appearance: { theme: 'stripe' } }}
            >
              <CheckoutForm bookingsId={bookingsId} intent={intent} />
            </Elements>
          </div>
        </div>
      </div>
    </Elements>
  );
}

function CheckoutForm({ bookingsId, intent }: { bookingsId: string; intent: IntentState }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [polling, setPolling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const [secondsLeft, setSecondsLeft] = useState<number | null>(() =>
    intent.holdExpiresAt > 0 ? Math.max(0, intent.holdExpiresAt - Math.floor(Date.now() / 1000)) : null,
  );
  
  const expired = secondsLeft !== null && secondsLeft <= 0;
  const cancelledRef = useRef(false);

  // Hold countdown
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const pollUntilPaid = useCallback(async () => {
    setPolling(true);
    for (let attempt = 0; attempt < 20; attempt += 1) {
      try {
        const status = await getPaymentStatus(bookingsId);
        if (status.bookingStatus === 'Paid') {
          clearAllPendingCarts();
          navigate(`/bookings/${bookingsId}`);
          return;
        }
        if (status.paymentStatus === 'Failed') {
          setMessage('Payment failed. Please try another method.');
          setPolling(false);
          return;
        }
      } catch {
        // Transient rpc issue, continue polling
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
    clearAllPendingCarts();
    navigate(`/bookings/${bookingsId}`);
  }, [bookingsId, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || expired) return;
    setSubmitting(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/bookings/${bookingsId}` },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message ?? 'Payment could not be completed.');
      setSubmitting(false);
      return;
    }
    if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
      await pollUntilPaid();
      return;
    }
    setSubmitting(false);
  }

  async function handleCancel() {
    cancelledRef.current = true;
    try {
      await cancelBooking(bookingsId);
    } catch {
      /* best effort cancellation */
    }
    navigate(-1);
  }

  const mm = secondsLeft === null ? null : Math.floor(secondsLeft / 60);
  const ss = secondsLeft === null ? null : secondsLeft % 60;

  return (
    <Card className="border border-border bg-card shadow-2xl overflow-hidden rounded-2xl">
      <CardHeader className="flex items-center justify-between border-b border-border/20 px-6 py-4 flex-row">
        <CardTitle className="text-lg font-bold font-display text-foreground">Billing Details</CardTitle>
        <span className="text-lg font-bold font-display text-marigold">
          {centsToUSD(intent.amountCents)}
        </span>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Reservation expiry countdown alert */}
        {secondsLeft !== null && !expired ? (
          <div className="flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-xs font-semibold text-primary">
            <Clock className="h-4 w-4 animate-pulse shrink-0" />
            <span>Seats held secure for {mm}:{String(ss).padStart(2, '0')}</span>
          </div>
        ) : null}

        {expired ? (
          <div className="space-y-4 text-center py-6">
            <p className="text-sm text-destructive font-bold">Your reservation hold expired. Please return to the event page to reserve your tickets again.</p>
            <Button variant="outline" onClick={() => navigate(-1)} className="w-full h-11 text-xs">
              Back to Event
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <PaymentElement />
            
            {message ? (
              <p className="text-xs font-semibold text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3 leading-normal animate-shake">
                {message}
              </p>
            ) : null}
            
            <div className="flex gap-3 pt-3">
              <Button 
                type="submit" 
                size="lg" 
                className="flex-1 h-12 text-sm uppercase font-bold tracking-wider bg-primary hover:bg-primary/90 text-white rounded-xl shadow-[0_8px_20px_rgba(211,47,47,0.25)]" 
                disabled={!stripe || submitting || polling}
              >
                {polling ? 'Confirming…' : submitting ? 'Processing…' : `Complete Checkout`}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="lg" 
                onClick={handleCancel} 
                className="h-12 text-sm border-border hover:bg-muted"
                disabled={submitting || polling}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
