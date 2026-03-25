import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Login() {

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);

      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      console.log("User Info:", res.data);
    
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <button
      type="button"
      className="text-sm font-medium text-black dark:text-orange-400 hover:underline transition"
      onClick={() => login()}
    >
      Sign Up
    </button>
  );
}

export default Login;