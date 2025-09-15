import { NextResponse } from "next/server";
import { coursesPageData } from "@/data/courses";

/**
 * Obtener información de un curso específico
 * GET /api/courses/[id]
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Buscar el curso
    const course = coursesPageData.find(c => c.id.toString() === id.toString());
    
    if (!course) {
      return NextResponse.json(
        { error: "Curso no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);

  } catch (error) {
    console.error("Error obteniendo curso:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
