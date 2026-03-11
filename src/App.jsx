import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { CgLogIn } from "react-icons/cg";
import { useGoogleLogin } from "@react-oauth/google";
import ThemeToggle from "./ThemeToggle";

function EmailInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [googleUser, setGoogleUser] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await res.json();
        setGoogleUser(userInfo);
        setIsLoggedIn(true);
        setTimeout(() => {
          setIsLoggedIn(false);
          setGoogleUser(null);
        }, 3000);
      } catch {
        setError("Failed to fetch Google user info.");
      }
    },
    onError: () => setError("Google sign-in was cancelled or failed."),
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setIsLoggedIn(true);

    setTimeout(() => {
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
    }, 2000);
  };

  return (
    <div className="h-full w-full bg-gray-100 dark:bg-black transition-colors duration-500 relative">
      

      <div className="absolute top-4 right-4 sm:top-5 sm:right-6 flex items-center gap-2 z-50">
        <button
          type="button"
          className="text-sm font-medium text-black dark:text-orange-400 hover:underline transition"
          onClick={() => alert("Sign up clicked")}
        >
          Sign Up
        </button>

        <ThemeToggle />
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen shadow-2xl">

      
        <div className="hidden md:block">
          <img
            src="/images/image.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 md:px-10 lg:px-20 space-y-6 bg-white dark:bg-black overflow-y-auto">

          <div className="flex justify-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-28 h-28 object-contain"
            />
          </div>

          
          <div className="text-center space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-black">
              Login to your Account
            </h3>
            <p className="text-xs dark:text-gray-400 text-gray-600">
              Enter your details below to proceed
            </p>
          </div>

         
          <form onSubmit={handleLogin} className="space-y-4">
            
        
            <div>
              <label className="block mb-1 dark:text-white text-black">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-2 rounded-xl border border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
              />
            </div>

           
            <div>
              <label className="block mb-1 dark:text-white text-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-2 rounded-xl border border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-200 transition"
              />
              <div className="flex justify-end mt-2 text-sm">
                <button
                  type="button"
                  className="text-orange-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

           
            <button
              type="submit"
              className="w-full bg-neutral-800 dark:bg-orange-400 text-white dark:text-black font-semibold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-700 transition duration-300"
            >
              <CgLogIn className="text-xl" />
              Login
            </button>
          </form>

      
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-300 dark:border-neutral-700"></div>
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
              or connect with
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-neutral-700"></div>
          </div>

          <div className="mx-1 md:mx-12">
            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              className="w-full font-semibold bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white border border-neutral-400 dark:border-neutral-600 py-1 rounded-3xl flex items-center justify-center gap-4 hover:bg-blue-50  transition"
            >
              <FcGoogle className="text-2xl bg-white rounded-full w-8 h-8" />
              Continue with Google
            </button>
          </div>

          {isLoggedIn && (
            <p className="text-green-500 text-center font-medium">
              {googleUser
                ? `Welcome, ${googleUser.name}!`
                : "Successfully logged in!"}
            </p>
          )}

          <p className="text-xs text-center text-neutral-600 dark:text-neutral-400">
            By clicking continue you agree to our Terms of Service and Privacy Policy
          </p>

        </div>
      </div>
    </div>
  );
}

export default EmailInput;