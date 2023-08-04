import React, { useEffect } from "react";
import Icon from "../../icons/googleIcon";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const query = { username, password };
    if (!username || !password) return setMessage("Please fill all fields.");
    const response = await axios.post("/api/existUser", { query: query });
    const dataJson = response.data;
    if (dataJson && dataJson.existUser && !dataJson.blockedUser) {
      goToHome();
    } else {
      setMessage(dataJson.message ? dataJson.message : "");
    }
  };
  const goToHome = () => {
    window.location.href = "/";
  };
  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-[70%] bg-white md:mt-[-80px] sm:max-w-md xl:p-0">
          <div className="p-6 sm:p-8">
            <h1 className="text-[2em] mb-3 font-semibold text-gray-900 md:text-2xl">
              Welcome back
            </h1>
            <h6 className="text-[0.8em] mb-7 font-semibold leading-tight tracking-tight text-gray-400 md:text-[0.8em]">
              Welcome back! Please enter your details
            </h6>
            {message && (
              <p className="text-center text-red-600 text-[0.9em] font-bold relative top-[-10px]">
                {message}
              </p>
            )}
            <form className="space-y-2 md:space-y-4" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block drop-shadow-xl shadow-black mb-[1px] text-[0.7em] font-bold text-gray-500 "
                >
                  Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="font-medium border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-[0.5em]"
                  placeholder="Enter your email"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-[1px] drop-shadow-xl shadow-black text-[0.7em] font-bold text-gray-500 "
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="font-medium border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-[0.5em]"
                  required={true}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-3 h-3 border-red-800 rounded bg-gray-50"
                      required={false}
                    />
                  </div>
                  <div className="ml-1 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 text-[0.7em] font-bold drop-shadow-xl shadow-black"
                    >
                      Remember for 30 days
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-gray-700 text-[0.7em] font-bold drop-shadow-xl shadow-black"
                >
                  Forgot password
                </a>
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="text-[0.8em] font-medium w-full text-gray-200 bg-formLogin rounded-md text-sm px-5 py-2 text-center"
              >
                Sign in
              </button>
              <button
                type="button"
                className="flex justify-center w-full text-gray-500 text-[0.8em] font-medium  rounded-md border border-gray-300 text-sm px-5 py-2 text-center"
              >
                <Icon />
                <span className="ml-2">Sign in with Google</span>
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
