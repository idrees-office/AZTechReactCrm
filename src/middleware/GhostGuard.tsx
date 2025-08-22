// import { Navigate, useOutlet } from "react-router";
// import { useAuthContext } from "@/app/contexts/auth/context";
// import { HOME_PATH, REDIRECT_URL_KEY } from "@/constants/app";

// export default function GhostGuard() {
//   const outlet = useOutlet();
//   const { isAuthenticated } = useAuthContext();

//   const url = `${new URLSearchParams(window.location.search).get(
//     REDIRECT_URL_KEY,
//   )}`;

//   if (isAuthenticated) {
//     if (url && url !== "") {
//       return <Navigate to={url} />;
//     }
//     return <Navigate to={HOME_PATH} />;
//   }

//   return <>{outlet}</>;
// }

import { Navigate, useOutlet } from "react-router";
import { useSelector } from "react-redux";
import { HOME_PATH, REDIRECT_URL_KEY } from "@/constants/app";
import { IRootState } from "@/store";

export default function GhostGuard() {
  const outlet = useOutlet();
  // ✅ Get data from authSlice
  const { isAuthenticated } = useSelector((state: IRootState) => state.auth);
  const url = `${new URLSearchParams(window.location.search).get(
    REDIRECT_URL_KEY
  )}`;

  if (isAuthenticated) {
    if (url && url !== "") {
      return <Navigate to={url} />;
    }
    return <Navigate to={HOME_PATH} />;
  }

  return <>{outlet}</>;
}

