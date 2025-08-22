// Import Dependencies
import { Navigate, useLocation, useOutlet } from "react-router";
// Local Imports
// import { useAuthContext } from "@/app/contexts/auth/context";
import { GHOST_ENTRY_PATH, REDIRECT_URL_KEY } from "@/constants/app";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function AuthGuard() {
  const outlet = useOutlet();
  // const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: IRootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <Navigate
        to={`${GHOST_ENTRY_PATH}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  return <>{outlet}</>;
}
