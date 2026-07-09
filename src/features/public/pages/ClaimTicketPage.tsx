import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { claimTicket } from '@/features/public/services/ticketService';
import { rpcErrorMessage } from '@/shared/session';
import { useAuth } from '@/shared/auth/useAuth';
import { setReturnTo } from '@/shared/auth/returnTo';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function ClaimTicketPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') ?? '';
  const { user } = useAuth();
  const [status, setStatus] = useState<'pending' | 'done' | 'error'>(token ? 'pending' : 'error');
  const [error, setError] = useState<string | null>(token ? null : 'Missing token.');

  useEffect(() => {
    if (!token || !user) {
      return;
    }
    let active = true;
    const run = async () => {
      try {
        await claimTicket(token);
        if (active) {
          setStatus('done');
        }
      } catch (caught) {
        if (active) {
          setStatus('error');
          setError(rpcErrorMessage(caught));
        }
      }
    };
    void run();
    return () => {
      active = false;
    };
  }, [token, user]);

  if (token && !user) {
    setReturnTo(`/claim?token=${token}`);
    return (
      <div className="mx-auto mt-16 max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Claim your ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              You have been invited to claim a ticket. Sign in or create an account to add it to your tickets.
            </p>
            <Button className="w-full" onClick={() => navigate('/login')}>
              Sign in
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/register')}>
              Create account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Claim ticket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {status === 'pending' ? <p className="text-muted-foreground">Claiming…</p> : null}
          {status === 'done' ? (
            <>
              <p className="text-success">Ticket claimed. It is now in your tickets.</p>
              <Button className="w-full" onClick={() => navigate('/tickets')}>
                View my tickets
              </Button>
            </>
          ) : null}
          {status === 'error' ? <p className="text-destructive">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
