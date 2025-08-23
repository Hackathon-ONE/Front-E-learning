'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { Card } from '@/components/ui/Card';
import { Star } from 'lucide-react';

SwiperCore.use([Navigation, Autoplay]);

const testimonials = [
  {
    name: "Ana Gómez",
    profession: "Desarrolladora Frontend",
    avatar: "/avatars/ana.jpg",
    review: "Esta plataforma ha transformado la manera en que aprendo y aplico nuevas tecnologías. ¡Recomendada al 100%!",
    rating: 5
  },
  {
    name: "Carlos Méndez",
    profession: "Diseñador UX/UI",
    avatar: "/avatars/carlos.jpg",
    review: "El contenido es muy completo y práctico. Los instructores son claros y motivadores.",
    rating: 4
  },
  {
    name: "Laura Fernández",
    profession: "Project Manager",
    avatar: "/avatars/laura.jpg",
    review: "Gracias a esta plataforma mejoré mis habilidades en gestión de proyectos y herramientas digitales.",
    rating: 5
  },
  {
    name: "Jorge Ramírez",
    profession: "Data Analyst",
    avatar: "/avatars/jorge.jpg",
    review: "Los cursos son de alta calidad, con ejercicios y ejemplos reales que me ayudaron a crecer profesionalmente.",
    rating: 5
  },
  {
    name: "María López",
    profession: "Marketing Specialist",
    avatar: "/avatars/maria.jpg",
    review: "Aprender aquí es fácil y dinámico. La interfaz y los recursos son muy amigables.",
    rating: 4
  },
  {
    name: "David Torres",
    profession: "Fullstack Developer",
    avatar: "/avatars/david.jpg",
    review: "Excelente plataforma para mejorar habilidades técnicas. Los proyectos prácticos son muy útiles.",
    rating: 5
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
        Testimonios
      </h2>
      <div className="px-4 md:px-16">
        <Swiper
          navigation
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-full flex mt-6 mb-6">
            <Card className="flex flex-col justify-between items-center p-2 text-center bg-[var(--color-card-secondary)] dark:bg-[var(--color-card-secondary-dark)] rounded-2xl shadow-lg w-full h-[300px] transition-transform transform hover:scale-105">
              <div className="flex flex-col items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-24 h-24 rounded-full mb-2 object-cover"
                />
                <h4 className="font-semibold text-md text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">{t.name}</h4>
                <p className="text-[var(--color-card-secondary-text)] text-sm mb-2">{t.profession}</p>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={index < t.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-[var(--color-card-secondary-text)] text-sm overflow-auto">{t.review}</p>
            </Card>
          </SwiperSlide>          
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          background-color: var(--color-surface);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: var(--color-primary);
          top: 50%;
          transform: translateY(-50%);
          transition: background-color 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: var(--color-primary);
          color: #fff;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 16px;
        }
      `}</style>
    </section>
  );
}