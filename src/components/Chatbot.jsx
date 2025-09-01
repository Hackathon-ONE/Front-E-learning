"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaCommentDots, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import logochat from '../assets/logochat.png';
import { knowledgeBase } from '../app/chatbot/knowledgeBase';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { id: Date.now(), text: '¡Hola! Soy tu Bot de E-learning. ¿En qué puedo ayudarte?', sender: 'bot' }
      ]);
    } else {
      setMessages([]);
    }
  }, [isOpen]);

  const processMessage = (text) => {
    const lowerText = text.toLowerCase();
    const match = knowledgeBase.find(r => r.keywords.some(k => lowerText.includes(k)));
    return match ? match.response : "No entendí tu pregunta. Prueba con palabras clave como 'inicio' o 'login'.";
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    const botMsg = { id: Date.now() + 1, text: processMessage(inputValue), sender: 'bot' };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInputValue('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 w-14 h-14 bg-[var(--color-primary)] text-[var(--color-primary-text)] rounded-full flex items-center justify-center shadow-lg z-50 hover:scale-110 transition-transform"
      >
        <Image 
        src={logochat} 
        alt="Logo" 
        width={36} 
        height={36}
        className="items-center border-black" 
        priority 
        unoptimized
        />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-[calc(100%-1rem)] max-w-xs sm:max-w-sm md:w-80 lg:w-96 max-h-[80vh] bg-[var(--color-surface)] rounded-2xl shadow-lg flex flex-col overflow-hidden z-50">
  {/* Header */}
    <div className="flex items-center justify-between bg-[var(--color-primary)] text-[var(--color-primary-text)] p-3 sm:p-4 font-bold">
     <div className="flex items-center space-x-2">
      <Image 
        src={logochat} 
        alt="Logo" 
        width={40} 
        height={40} 
        priority 
        unoptimized 
      />
      <span className="text-sm sm:text-base md:text-lg">Bot de E-learning</span>
    </div>
    <button onClick={() => setIsOpen(false)} className="text-gray-500 text-xl sm:text-2xl">
      <FaTimes />
    </button>
   </div>

   {/* Mensajes */}
   <div className="flex-grow p-2 sm:p-4 overflow-y-auto flex flex-col text-gray-500 gap-2 bg-[var(--color-bg)]">
    {messages.map(msg => (
      <div
        key={msg.id}
        className={`p-2 sm:p-3 rounded-lg max-w-[80%] break-words text-sm sm:text-base text-gray-500 leading-relaxed ${
          msg.sender === 'user'
            ? 'bg-[var(--color-primary)] text-[var(--color-primary-text)] self-end rounded-br-sm'
            : 'bg-[var(--color-card-primary)] text-[var(--color-text)] self-start rounded-bl-sm'
        }`}
      >
        {msg.text}
      </div>
    ))}
    <div ref={messagesEndRef} />
   </div>

   {/* Quick Suggestions */}
   <div className="flex flex-wrap gap-2 p-2 sm:p-3 bg-[var(--color-bg)] border-t border-[var(--color-muted)]">
    {knowledgeBase.map((item, index) => (
      <button
        key={index}
        onClick={() => {
          setInputValue(item.keywords[0]);
          handleSendMessage({ preventDefault: () => {} });
        }}
        className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-[var(--color-primary)] text-gray-800 hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-primary-text)] transition-colors"
      >
        {item.keywords[0]}
      </button>
    ))}
   </div>

   {/* Input */}
   <form className="flex p-2 sm:p-3 border-t border-[var(--color-muted)] bg-[var(--color-surface)]" onSubmit={handleSendMessage}>
    <input
      type="text"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      placeholder="Escribe tu pregunta..."
      className="flex-grow border border-[var(--color-muted)] rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm outline-none focus:border-[var(--color-primary)]"
    />
    <button
      type="submit"
      className="ml-2 w-10 h-10 sm:w-12 sm:h-12 bg-[var(--color-primary)] text-[var(--color-primary-text)] rounded-full flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-colors"
    >
      <FaPaperPlane />
    </button>
   </form>
  </div>
  );
};