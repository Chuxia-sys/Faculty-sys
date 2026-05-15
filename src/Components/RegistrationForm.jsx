import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          {
            name,
            email,
            password
          }
        );

        console.log(response.data);
        // Optionally redirect or clear form on success
        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        setError(err.response?.data?.message || "Registration failed. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

      <h1 className="text-3xl font-bold text-center mb-6">
        Register
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleRegister}>

        <div>
          <label className="block mb-1 font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
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