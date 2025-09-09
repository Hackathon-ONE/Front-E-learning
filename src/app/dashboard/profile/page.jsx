"use client";

import { useState /*, useEffect */ } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import GridProjects from "@/components/GridCertificates";
import { useSession } from "next-auth/react";
import { profileStats, completedCourses, inProgressCourses } from "@/data/users";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState(profileStats);
  const [completed, setCompleted] = useState(completedCourses);
  const [inProgress, setInProgress] = useState(inProgressCourses);

  const bio = session?.user?.bio || "Hola! Soy..."; 
  const avatar = session?.user?.image || "/default-avatar.png";
  const name = session?.user?.name || "Usuario";
  const [editableBio, setEditableBio] = useState(bio);

  // Ejemplo de cómo importar datos desde la base de datos (Java/Spring Boot):
  /*
  import { useEffect, useState } from "react";

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);
        // Cambia la URL por tu endpoint real de Spring Boot
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`);
        if (!res.ok) throw new Error("Error al obtener datos del perfil");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // Puedes mostrar loading y error así:
  if (loading) return <div className="text-center py-10">Cargando perfil...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  */

  return (
    <section className="py-10 px-6 container mx-auto">
      {/* Perfil */}
      <div className="bg-surface rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-start">
      <Image
        src={avatar}
        alt={name}
        width={120}
        height={120}
        className="rounded-full border-4 border-primary"
      />
        <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground">{name}</h1>
          <h2 className="text-2xl font-bold text-foreground">Bio</h2>

          {isEditing ? (
            <textarea
              className="w-full mt-2 p-2 rounded-lg border bg-bg text-foreground"
              value={editableBio}
              onChange={(e) => setEditableBio(e.target.value)}
            />
          ) : (
            <p className="mt-2 text-muted">{bio}</p>
          )}

          <div className="mt-3 flex gap-3">
            <Button onClick={() => setIsEditing(!isEditing)} variant="primary">
              {isEditing ? "Guardar" : "Editar Perfil"}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {stats.map((s, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-surface rounded-xl shadow p-4 text-center"
          >
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-sm text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Cursos finalizados */}
      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Formaciones Finalizadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {completedCourses.map((c, i) => (
          <div
            key={i}
            className="bg-surface shadow rounded-xl p-4 flex flex-col items-center"
          >
            <Image
              src={c.image}
              alt={c.title}
              width={120}
              height={120}
              className="rounded-md mb-3"
            />
            <h3 className="text-foreground font-medium">{c.title}</h3>
            <span className="text-green-500 text-sm mt-1">Completado </span>
          </div>
        ))}
      </div>

      {/* Cursos en progreso */}
      <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Cursos en Progreso</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inProgressCourses.map((c, i) => (
          <div
            key={i}
            className="bg-surface shadow rounded-xl p-4 flex gap-4 items-center"
          >
            <Image
              src={c.image}
              alt={c.title}
              width={100}
              height={100}
              className="rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-foreground font-medium">{c.title}</h3>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${c.progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-muted">{c.progress}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl font-semibold mt-10 mb-4">
        <GridProjects />
      </div>
    </section>
  );
}