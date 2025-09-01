"use client";

import { useState, useEffect } from "react";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 filtros
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/courses?search=${search}&page=${page}`
        );
        if (!res.ok) throw new Error("Error al cargar cursos");
        const data = await res.json();
        setCourses(data.items);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [search, page]);

  return {
    courses,
    loading,
    error,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
  };
}