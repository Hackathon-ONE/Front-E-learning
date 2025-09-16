"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import SubscriptionGuard from "@/components/SubscriptionGuard";

export default function QuizPage() {
  const { id, quizId } = useParams(); // courseId, quizId
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Simular carga de quiz
    setQuiz({
      id: quizId,
      title: "Quiz del Curso",
      questions: [
        {
          id: 1,
          question: "¿Cuál es la principal ventaja de React?",
          options: [
            "Es más rápido que Angular",
            "Permite crear interfaces de usuario interactivas",
            "Es más fácil de aprender que Vue",
            "Todas las anteriores"
          ],
          correct: 3
        },
        {
          id: 2,
          question: "¿Qué es JSX?",
          options: [
            "Una extensión de JavaScript",
            "Un framework de CSS",
            "Una base de datos",
            "Un lenguaje de programación"
          ],
          correct: 0
        },
        {
          id: 3,
          question: "¿Cuál hook se usa para manejar el estado?",
          options: [
            "useEffect",
            "useState",
            "useContext",
            "useReducer"
          ],
          correct: 1
        }
      ]
    });
  }, [quizId]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(percentage);
    setSubmitted(true);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return "¡Excelente! Has aprobado el quiz.";
    if (percentage >= 60) return "Bien, pero puedes mejorar.";
    return "Necesitas repasar el material.";
  };

  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SubscriptionGuard courseId={id}>
      <div className="max-w-4xl mx-auto px-6 py-10">
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

        <h1 className="text-3xl font-bold mb-6 text-center">
          {quiz.title}
        </h1>

        {!submitted ? (
          <div className="space-y-8">
            {quiz.questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-[var(--color-surface)] p-6 rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">
                  {index + 1}. {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={optionIndex}
                        checked={answers[question.id] === optionIndex}
                        onChange={() => handleAnswerChange(question.id, optionIndex)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-[var(--color-text)]">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Enviar Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-[var(--color-surface)] p-8 rounded-lg shadow">
              <div className="mb-6">
                {score >= 60 ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                )}
                <h2 className={`text-3xl font-bold mb-2 ${getScoreColor(score)}`}>
                  {score}%
                </h2>
                <p className="text-lg text-[var(--color-text)] mb-4">
                  {getScoreMessage(score)}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setAnswers({});
                    setScore(null);
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition mr-4"
                >
                  Intentar de Nuevo
                </button>
                <button
                  onClick={() => router.push(`/courses/${id}`)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Volver al Curso
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SubscriptionGuard>
  );
}