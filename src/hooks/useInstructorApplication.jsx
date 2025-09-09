"use client";

import { useState } from "react";

export function useInstructorApplication() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    demoUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // pending, approved, rejected
  const [loading, setLoading] = useState(false);

  // Actualizar inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validaciones básicas
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio";
    if (!formData.email) newErrors.email = "El email es obligatorio";
    if (!formData.experience) newErrors.experience = "La experiencia es obligatoria";
    if (!formData.demoUrl) newErrors.demoUrl = "La demo es obligatoria";
    return newErrors;
  };

  // nviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(" /instructor/apply", {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar la aplicación");

      const data = await res.json();
      setStatus(data.status || "pending"); // backend debe devolver status
      setErrors({});
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    status,
    loading,
    handleChange,
    handleSubmit,
  };
}