import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

      <h1 className="text-3xl font-bold text-center mb-6">
        Register
      </h1>

      <form className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-16"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>

    </div>
  );
}