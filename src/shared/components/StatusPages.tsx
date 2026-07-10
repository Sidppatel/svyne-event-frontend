import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/shared/auth/store';

function Shell({
  title,
  message,
  children,
}: {
  title: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mt-24 max-w-md text-center">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      <p className="mt-2 text-ink-soft">{message}</p>
      <div className="mt-4 flex justify-center gap-4">
        <Link to="/" className="text-primary">
          Go home
        </Link>
        {children}
      </div>
    </div>
  );
}

export function NotAuthorizedPage() {
  const navigate = useNavigate();
  const clear = useAuthStore((state) => state.clear);

  
  
  
  function switchAccount() {
    clear();
    navigate('/login', { replace: true });
  }

  return (
    <Shell
      title="Not authorized"
      message="Your account does not have access to this area, or it belongs to a different tenant."
    >
      <button type="button" onClick={switchAccount} className="text-primary">
        Sign in as a different user
      </button>
    </Shell>
  );
}

export function NotFoundPage() {
  return <Shell title="Page not found" message="The page you were looking for does not exist." />;
}
