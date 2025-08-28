"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Button from "./ui/Button";
import Link from "next/link";

const courses = [
  {
    title: "Introducción a React",
    description:
      "Aprende los fundamentos de React y construye interfaces modernas.",
    image: "/courses/react.jpg",
    reviews: "⭐️⭐️⭐️⭐️☆ (120 reviews)",
    demo: "https://www.youtube.com/watch?v=MHn66JJH5zs",
  },
  {
    title: "Backend con Node.js",
    description:
      "Construye APIs rápidas y escalables con Node.js y Express.",
    image: "/courses/node.jpg",
    reviews: "⭐️⭐️⭐️⭐️⭐️ (200 reviews)",
    demo: "https://www.youtube.com/watch?v=ItAru_T2dKs",
  },
  {
    title: "Diseño con Tailwind",
    description:
      "Domina Tailwind CSS y crea aplicaciones con estilos modernos.",
    image: "/courses/tailwind.jpg",
    reviews: "⭐️⭐️⭐️⭐️☆ (80 reviews)",
    demo: "https://www.youtube.com/watch?v=Nj-wcVn3XgU",
  },
  {
    title: "Introducción a Java",
    description:
      "Aprende los fundamentos de Java para construir aplicaciones web.",
    image: "/courses/java.jpg",
    reviews: "⭐️⭐️⭐️⭐️☆ (120 reviews)",
    demo: "https://www.youtube.com/watch?v=W86KTBSiX2o",
  },
  {
    title: "Introducción a C#",
    description:
      "Aprende los fundamentos de C# para construir aplicaciones web.",
    image: "/courses/csharp.jpg",
    reviews: "⭐️⭐️⭐️⭐️⭐️ (110 reviews)",
    demo: "https://www.youtube.com/watch?v=tIhDJEJk5x8",
  },
];

export default function CoursesCarousel() {
  return (
    <section className="py-14 bg-surface text-foreground">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

        {/* 📖 Columna Izquierda */}
        <div className="md:col-span-1 flex flex-col justify-center text-left px-4 md:px-0 mt-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 mt-12"
            style={{ color: "var(--color-text)" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            Nuestros Cursos
          </motion.h2>
          <p className="text-base md:text-lg text-muted mb-6 leading-relaxed">
            Aprende de manera práctica con cursos creados por expertos de LATAM.
            Diseñados para que desarrolles{" "}
            <span className="text-primary font-semibold">habilidades reales</span>{" "}
            y consigas nuevas oportunidades laborales.
          </p>
          <Link href="/courses" passHref>
            <Button className="bg-primary text-white px-6 py-2 rounded-lg shadow cursor-pointer hover:bg-[#3f3e3c] transition w-full md:w-fit"
              variant="primary">
              Explorar Todos
            </Button>
          </Link>
        </div>

        {/* 🎠 Columna Derecha - Carrusel */}
        <div className="md:col-span-2 px-2 sm:px-0">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {courses.map((course, idx) => (
              <SwiperSlide key={idx} className="flex justify-center">
                <motion.div
                  className="bg-white dark:bg-bg rounded-xl shadow-md overflow-hidden flex flex-col w-full max-w-sm min-h-[360px] p-4 mb-12"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Imagen */}
                  <div className="h-40 w-full relative overflow-hidden rounded-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-4 flex-1 flex flex-col justify-between text-gray-600 dark:text-gray-300">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-foreground">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-snug">
                        {course.description}
                      </p>
                      <p className="text-xs font-medium text-yellow-500">
                        {course.reviews}
                      </p>
                    </div>

                    {/* Botones */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <a
                        href={course.demo}
                        target="_blank"
                        className="w-full sm:w-1/2 bg-primary text-white text-sm text-center py-1.5 rounded-lg shadow hover:bg-[#3f3e3c] transition"
                      >
                        Ver Demo
                      </a>
                      <Link href={`/courses/${course.id}/overview`}>
                        <Button className="w-full p-2 bg-gray-200 dark:bg-gray-900 text-sm text-foreground py-1.5 rounded-lg shadow hover:bg-[#ffdb70] dark:hover:bg-primary-hover transition">
                          Suscribirse
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 🎨 Custom Pagination Style */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #fca311; /* naranja */
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background-color: #fca311;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}