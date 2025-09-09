"use client";

import { useState, useEffect } from "react";

export function useAdminDashboard() {
  const [metrics, setMetrics] = useState({
    users: 0,
    sales: 0,
    courses: 0,
    requests: 0,
  });
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        // backend: /api/admin/dashboard
        const res = await fetch("/api/admin/dashboard");
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`);
        if (!res.ok) throw new Error("Error al cargar métricas");

        const data = await res.json();
        // Estructura esperada (ejemplo):
        // { metrics: {...}, lineData: [...], barData: [...], pieData: [...] }

        setMetrics(data.metrics);
        setLineData(data.lineData);
        setBarData(data.barData);
        setPieData(data.pieData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return { metrics, lineData, barData, pieData, loading };
}