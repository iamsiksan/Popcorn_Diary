import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const form = useForm();
  const {register,control,handleSubmit,formState} = form;
  const {errors} = formState;

  const handleLogin = (data) => {
    setLoggedIn(true);
    console.log("Login form Submitted.",data);
    

    // navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen  text-white">
      <form
      onSubmit={handleSubmit(handleLogin)}
       className="w-full max-w-sm bg-gray-900  rounded-2xl shadow-accent shadow-sm p-8 flex flex-col gap-5"
       noValidate
       >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
            {...register("email",{
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format."
              }
            },
         )}
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
            {...register("password",{required: "Password is required."})}
          />
           <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="mt-4 py-2 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-accent cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Login;
