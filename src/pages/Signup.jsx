import React from "react";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, formState,watch } = form;
  const { errors } = formState;
  const password = watch("password");

  const handleSignup = () => {
    console.log("Signed Up sucessfully.");
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-dark text-white">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-accent shadow-sm p-8 flex flex-col gap-5"
      >
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
            {...register("username", { required: "Username is required." })}
          />
          <p className="text-red-500 text-xs">{errors.username?.message}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
            {...register("email", { required: "Email is required." })}
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
            {...register("password", { required: "Passowrd is required." })}
          />
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
            {...register("confirmPassword", {
              required: "Confirm your password.",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <p className="text-red-500 text-xs">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          className="mt-4 py-2 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-accent cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Signup;
