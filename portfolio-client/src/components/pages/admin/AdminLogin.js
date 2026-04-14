import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true); // start loader

      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/portfolio/login",
        form,
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.data);
        navigate("/admin");
      }
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      <div className="bg-[#ffffff] p-8 rounded-xl shadow-lg w-[350px] flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center">Admin Login 🔐</h1>

        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded bg-gray-400 text-white"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-gray-400 text-white"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-tertiary text-white py-2 rounded flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
