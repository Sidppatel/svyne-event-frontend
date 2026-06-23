import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useAuthFlow } from '@/features/auth/hooks/useAuthFlow';

export function SetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const { submitNewPassword, loading, error, notice } = useAuthFlow();
  const [password, setPassword] = useState('');

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle>Set your password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {token ? null : <p className="text-sm text-red-600">Missing token in link.</p>}
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              submitNewPassword(token, password);
            }}
          >
            <div className="space-y-1">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {notice ? <p className="text-sm text-green-600">{notice}</p> : null}
            <Button type="submit" className="w-full" disabled={loading || !token}>
              {loading ? 'Saving…' : 'Set password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
