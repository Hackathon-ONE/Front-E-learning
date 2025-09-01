"use client";

import { useState, useEffect } from "react";

export function useInstructorStatus(userId) {
  const [status, setStatus] = useState(null); // pending, approved, rejected, unknown
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchStatus() {
      try {
        setLoading(true);
        const res = await fetch(`/api/instructor/${userId}/status`);
        if (!res.ok) throw new Error("Error al obtener estado");
        const data = await res.json();
        setStatus(data.status || "unknown");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [userId]);

  return { status, loading, error };
}