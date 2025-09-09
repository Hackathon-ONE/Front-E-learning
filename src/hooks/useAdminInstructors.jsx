"use client";

import { useState, useEffect } from "react";

export function useAdminInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); 
  // valores posibles: all, pending, approved, rejected

  useEffect(() => {
    async function fetchInstructors() {
      try {
        setLoading(true);
        // backend: /api/admin/instructors
        const res = await fetch("/api/admin/instructors");
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/instructors`);
        if (!res.ok) throw new Error("Error al cargar instructores");

        const data = await res.json();
        setInstructors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInstructors();
  }, []);

  // Filtrado por estado
  const filtered = instructors.filter((i) =>
    filter === "all" ? true : i.status === filter
  );

  // Acciones CRUD (ejemplo)
  async function approveInstructor(id) {
    // POST /api/admin/instructors/{id}/approve
    setInstructors((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "approved" } : i))
    );
  }

  async function rejectInstructor(id) {
    // POST /api/admin/instructors/{id}/reject
    setInstructors((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "rejected" } : i))
    );
  }

  return {
    instructors: filtered,
    filter,
    setFilter,
    loading,
    error,
    approveInstructor,
    rejectInstructor,
  };
}