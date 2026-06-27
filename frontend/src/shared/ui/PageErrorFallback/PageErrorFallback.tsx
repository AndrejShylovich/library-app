import { Link } from "react-router-dom";

import "./PageErrorFallback.css";

export const PageErrorFallback: React.FC = () => {
  return (
    <div className="page-error-fallback">
      <h2>Page Error</h2>

      <p>
        Please return to the homepage or try again later.
      </p>

      <Link
        to="/"
        className="page-error-fallback-link"
      >
        Go Home
      </Link>
    </div>
  );
};