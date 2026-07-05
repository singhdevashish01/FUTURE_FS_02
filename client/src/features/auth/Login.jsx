import { useState } from "react";
import { loginUser } from "../../services/authApi";

function Login() {
  const [email, setEmail] = useState("admin@leadflowcrm.com");
  const [password, setPassword] = useState("LeadFlowAdmin2026Secure");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password });

      localStorage.setItem("leadflowAuth", "true");
      localStorage.setItem("leadflowToken", response.data.token);
      localStorage.setItem("leadflowUser", JSON.stringify(response.data));

      window.location.href = "/";
    } catch (error) {
      setError("Invalid login credentials or server unavailable.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">LeadFlow CRM</h1>

        <p className="text-gray-600 text-center mb-8">Secure Admin Login</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Admin Credentials
        </p>

        <div className="mt-2 text-center text-sm">
          <p>
            <strong>Email:</strong> admin@leadflowcrm.com
          </p>
          <p>
            <strong>Password:</strong> LeadFlowAdmin2026Secure
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;