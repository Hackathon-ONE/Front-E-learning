import api from "@/lib/axiosClient";

export async function handleLogin(email, password) {
  try {
    const { token } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", token);
    // redirigir a home
    window.location.href = "/";
  } catch (err) {
    console.error("Login error:", err);
  }
}
