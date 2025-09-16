"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Download, FileText, Video, Image, File } from "lucide-react";
import SubscriptionGuard from "@/components/SubscriptionGuard";

export default function ResourcesPage() {
  const { id } = useParams(); // courseId
  const router = useRouter();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Simular carga de recursos
    setResources([
      {
        id: 1,
        title: "Guía de Instalación",
        type: "pdf",
        size: "2.5 MB",
        url: "/resources/guia-instalacion.pdf"
      },
      {
        id: 2,
        title: "Código de Ejemplo",
        type: "zip",
        size: "1.2 MB",
        url: "/resources/codigo-ejemplo.zip"
      },
      {
        id: 3,
        title: "Presentación del Curso",
        type: "pptx",
        size: "5.8 MB",
        url: "/resources/presentacion.pptx"
      },
      {
        id: 4,
        title: "Diagramas de Arquitectura",
        type: "png",
        size: "3.1 MB",
        url: "/resources/diagramas.png"
      }
    ]);
  }, [id]);

  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-6 h-6 text-red-500" />;
      case "zip":
        return <File className="w-6 h-6 text-blue-500" />;
      case "pptx":
        return <FileText className="w-6 h-6 text-orange-500" />;
      case "png":
      case "jpg":
        return <Image className="w-6 h-6 text-green-500" />;
      case "mp4":
        return <Video className="w-6 h-6 text-purple-500" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

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
          Recursos del Curso {id}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-[var(--color-surface)] p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                {getIcon(resource.type)}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text)] mb-4">
                    {resource.type.toUpperCase()} • {resource.size}
                  </p>
                  <button
                    onClick={() => {
                      // Simular descarga
                      const link = document.createElement('a');
                      link.href = resource.url;
                      link.download = resource.title;
                      link.click();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {resources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
              No hay recursos disponibles
            </h3>
            <p className="text-[var(--color-text)]">
              Los recursos se agregarán pronto.
            </p>
          </div>
        )}
      </div>
    </SubscriptionGuard>
  );
}