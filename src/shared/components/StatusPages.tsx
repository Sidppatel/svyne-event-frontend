import { Link } from 'react-router-dom';

function Shell({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto mt-24 max-w-md text-center">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="mt-2 text-gray-600">{message}</p>
      <Link to="/" className="mt-4 inline-block text-indigo-600">
        Go home
      </Link>
    </div>
  );
}

export function NotAuthorizedPage() {
  return (
    <Shell
      title="Not authorized"
      message="Your account does not have access to this area, or it belongs to a different tenant."
    />
  );
}

export function NotFoundPage() {
  return <Shell title="Page not found" message="The page you were looking for does not exist." />;
}
