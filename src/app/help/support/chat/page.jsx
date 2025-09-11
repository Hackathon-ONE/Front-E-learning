"use client";

import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaUser, FaHeadset } from "react-icons/fa";

export default function LiveSupportChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "agent",
      text: "Hola, soy tu agente de soporte. ¿En qué puedo ayudarte?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simular respuesta automática
    setTimeout(() => {
      const agentMsg = {
        id: Date.now() + 1,
        sender: "agent",
        text: "Gracias por tu mensaje. Estoy revisando tu consulta...",
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 1500);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text)" }}
    >
      <div className="w-full max-w-md h-[80vh] flex flex-col bg-[var(--color-surface)] rounded-2xl shadow-lg overflow-hidden">
        <header className="p-4 bg-[var(--color-primary)] text-[var(--color-primary-text)] font-bold text-lg flex items-center gap-2">
          <FaHeadset className="w-5 h-5" />
          Chat en vivo con soporte
        </header>

        <section className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--color-bg)]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "agent" && (
                <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)] text-[var(--color-text)] flex items-center justify-center">
                  <FaHeadset className="text-[var(--color-text)] w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-[70%] text-sm text-[var(--color-text)] ${
                  msg.sender === "user"
                    ? "bg-[var(--color-primary)] text-[var(--color-primary-text)]"
                    : "bg-[var(--color-card-primary)] text-[var(--color-text)]"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-[var(--color-text)] flex items-center justify-center">
                  <FaUser className="text-[var(--color-card-primary-text)] w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        <form
          onSubmit={handleSendMessage}
          className="p-3 border-t border-[var(--color-muted)] flex gap-2 bg-[var(--color-bg)]"
        >
          <input
            type="text"
            name="message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 rounded-full border border-[var(--color-muted)] bg-[var(--color-card-primary)] text-[var(--color-card-primary-text)] outline-none focus:border-[var(--color-primary)]"
          />
          <button
            aria-label="Enviar mensaje"
            type="submit"
            className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-text)] flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </main>
  );
}