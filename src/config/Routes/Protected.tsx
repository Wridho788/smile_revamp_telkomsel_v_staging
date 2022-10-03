/**
 * Name: Protected
 * Description: protecting your pages "src/pages" in routes "src/config/Routes/index.tsx"
 * Ex: <Protected><Dashboard /></Protected>
 * **/

import { Navigate } from "react-router-dom";
import { AUTH_SET_TOKEN } from "redux/features/auth/auth-store-slice";

import { useAppDispatch, useAppSelector } from "../../service/hooks";

// For While Type "any"
const Protected = ({ children }: any) => {
  const access_token = useAppSelector((state) => state.auth.access_token);
  const refresh_token = useAppSelector((state) => state.auth.refresh_token);
  const dispatch = useAppDispatch();
  window.addEventListener("message", function (e) {
    // if (e.origin !== "http://127.0.0.1:3000" && e.origin !== "http://10.37.189.70:7443") console.log(e.origin); // to Preprod
    if (
      e.origin !== "http://127.0.0.1:3000" &&
      e.origin !== "http://10.37.189.70:7443"
    )
      return; // to Staging
    const data = {
      access_token: e.data.access_token ?? "",
      refresh_token: e.data.refresh_token ?? "",
      expires_in: e.data.expires_in ?? 0,
      token_type: e.data.token_type ?? "",
    };
    dispatch(AUTH_SET_TOKEN(data));
  });

  // Check if user didn't authenticated
  if (!access_token && !refresh_token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
