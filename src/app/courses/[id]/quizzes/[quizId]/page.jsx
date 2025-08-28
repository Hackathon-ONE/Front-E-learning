"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

// Datos hardcodeados para demo
const mockQuiz = {
  title: "Quiz: Fundamentos de React",
  description:
    "Pon a prueba tus conocimientos sobre los conceptos básicos de React.",
  questions: [
    {
      text: "¿Cuál es el hook principal para manejar estado en componentes funcionales?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      answer: 0,
    },
    {
      text: "¿Cómo se llama el proceso de pasar datos de un componente padre a uno hijo?",
      options: ["Props", "State", "Context", "Redux"],
      answer: 0,
    },
    {
      text: "¿Qué hook se utiliza para efectos secundarios?",
      options: ["useEffect", "useMemo", "useCallback", "useRef"],
      answer: 0,
    },
  ],
};

export default function QuizDetailPage() {
  const { quizId } = useParams();
  // Para datos reales desde la API:
  /*
  const [quiz, setQuiz] = useState(null);
  useEffect(() => {
    async function fetchQuiz() {
      const res = await fetch(`/api/quizzes/${quizId}`);
      const data = await res.json();
      setQuiz(data);
    }
    if (quizId) fetchQuiz();
  }, [quizId]);
  if (!quiz) return <p>Cargando quiz...</p>;
  */
  // Para demo:
  const [quiz] = useState(mockQuiz);

  return (
    <main className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center py-8 px-2 sm:px-4">
      <section className="w-full max-w-2xl bg-[var(--color-surface)] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <CheckCircle
            size={48}
            className="text-[var(--color-primary)] mb-2"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] text-center">
            {quiz.title}
          </h1>
          <p className="text-[var(--color-muted)] text-center">
            {quiz.description}
          </p>
        </div>
        <ul className="flex flex-col gap-6">
          {quiz.questions.map((q, idx) => (
            <li
              key={idx}
              className="bg-[var(--color-card-primary)] rounded-xl shadow p-4"
            >
              <p className="font-semibold text-[var(--color-text)] mb-2">
                {idx + 1}. {q.text}
              </p>
              <ul className="flex flex-col gap-2">
                {q.options.map((opt, i) => (
                  <li
                    key={i}
                    className={`px-4 py-2 rounded-lg border ${
                      i === q.answer
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 font-bold"
                        : "border-gray-200"
                    } text-[var(--color-text)]`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}