"use client";

import { useState } from "react";
import { PlayCircle, Clock, CheckCircle, Linkedin, Github, Twitter } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { courseDetailMock } from "@/data/courses";
import { lessonsMock } from "@/data/lessons";
import { linkedCoursesMock } from "@/data/linkedCourses";
import { instructorMock } from "@/data/instructors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CourseDetailPage({ courseId }) {
  const router = useRouter();
  const [course] = useState(courseDetailMock);
  const [lessons] = useState(lessonsMock);
  const [linkedCourses] = useState(linkedCoursesMock);
  const [instructor] = useState(instructorMock);
  const [progress] = useState(100);



/*   const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // 👇 ajusta estas URLs según tu backend
        const courseRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`);
        const courseData = await courseRes.json();

        const lessonsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/lessons`);
        const lessonsData = await lessonsRes.json();

        const instructorRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructors/${courseData.instructorId}`);
        const instructorData = await instructorRes.json();

        setCourse(courseData);
        setLessons(lessonsData);
        setInstructor(instructorData);

        // ejemplo simple de progreso (lecciones completadas / total)
        const completed = lessonsData.filter(l => l.completed).length;
        setProgress(Math.round((completed / lessonsData.length) * 100));
      } catch (err) {
        console.error("Error cargando curso:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId]);

  if (loading) {
    return <p className="p-6">Cargando curso...</p>;
  }

  if (!course) {
    return <p className="p-6">Curso no encontrado.</p>;
  } */


  return (
    <section className="p-6 md:p-12 space-y-8">
          <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg font-medium 
                           bg-[var(--color-surface)] text-[var(--color-text)] 
                           hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-text)]
                           transition w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm sm:text-base">Volver</span>
          </button>
      {/* Header */}
      <header className="rounded-2xl p-8 shadow-md flex flex-col md:flex-row md:items-center md:justify-between bg-primary text-primary-text">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-sm text-secondary">
            Carga horaria: {course.duration} · Alumnos: {course.students}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <Link href={`/courses/${courseId}/lessons/${lessons[0].id}`}>
            <button type="button" aria-label="Acceder al curso" className="px-6 cursor-pointer py-2 rounded-lg shadow transition bg-[var(--color-muted)] text-[var(--color-primary-text)] hover:scale-105">
              Acceder Curso
            </button>
          </Link>
        </div>
      </header>

      {/* Progreso */}
      <div className="rounded-xl shadow p-6 bg-surface">
        <h2 className="text-lg font-semibold mb-4">Progreso del curso</h2>
        <div className="w-full rounded-full h-3 bg-card-secondary">
          <div className="h-3 rounded-full bg-primary" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm mt-2 text-muted">{progress}% completado</p>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar izquierdo */}
        <aside className="space-y-8 lg:col-span-1">
          {/* Cursos vinculados */}
          <div className="rounded-xl shadow p-6 bg-surface">
            <h3 className="text-lg font-semibold mb-4">Formaciones con este curso</h3>
            <ul className="space-y-3">
              {linkedCourses.map((c) => (
                <li key={c.id} className="p-3 rounded-lg hover:bg-[var(--color-surface)] transition bg-card-secondary">
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="text-xs hover:text-primary">{c.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructor */}
          <div className="rounded-xl shadow p-6 text-center bg-surface">
            <Image
              aria-label={instructor.name}
              src={instructor.avatar}
              alt={instructor.name}
              width={128}
              height={64}
              unoptimized
              priority
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">{instructor.name}</h3>
            <p className="text-sm mb-4 text-muted">{instructor.bio}</p>
            <div className="flex justify-center gap-4">
              <a href={instructor.social.linkedin} target="_blank"><Linkedin className="w-5 h-5 hover:text-primary" /></a>
              <a href={instructor.social.github} target="_blank"><Github className="w-5 h-5 hover:text-primary" /></a>
              <a href={instructor.social.twitter} target="_blank"><Twitter className="w-5 h-5 hover:text-primary" /></a>
            </div>
          </div>
        </aside>

        {/* Aulas */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Aulas</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="flex items-center justify-between p-4 rounded-xl hover:shadow-lg transition bg-[var(--color-card-primary)]">
                <div className="flex items-center gap-3">
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-accent" />
                  ) : (
                    <PlayCircle className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <h3 className="text-md font-semibold">{lesson.title}</h3>
                    <p className="text-xs flex items-center gap-1 text-muted">
                      <Clock className="w-4 h-4" /> {lesson.duration}
                    </p>
                  </div>
                </div>
                <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                  <button type="button" aria-label="Ver lección" className="text-sm cursor-pointer text-primary hover:scale-110 transition">
                    {lesson.completed ? "Revisar" : "Ver ahora"}
                  </button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}