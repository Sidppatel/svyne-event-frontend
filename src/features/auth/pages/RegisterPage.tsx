import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useAuthFlow } from '@/features/auth/hooks/useAuthFlow';
import { GoogleSignInButton } from '@/features/auth/components/GoogleSignInButton';

export function RegisterPage() {
  const { magicLink, google, loading, error, notice } = useAuthFlow();
  const [email, setEmail] = useState('');

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter your email and we will send a secure sign-in link. Your role and tenant are assigned by the
            backend.
          </p>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              magicLink(email);
            }}
          >
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {notice ? <p className="text-sm text-green-600">{notice}</p> : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending…' : 'Send sign-in link'}
            </Button>
          </form>
          <GoogleSignInButton onToken={google} />
          <div className="text-sm text-gray-600">
            <Link to="/login">Back to sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
