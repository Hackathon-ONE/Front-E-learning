import { NextResponse } from "next/server";

/**
 * Verificar estado del backend
 * GET /api/backend-status
 */
export async function GET(request) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9002/api';
    
    // Simular verificación de backend
    const isBackendAvailable = true; // En producción, aquí harías una petición real
    
    return NextResponse.json({
      success: true,
      message: "Estado del backend verificado",
      data: {
        backendUrl,
        isOnline: isBackendAvailable,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        version: "1.0.0"
      }
    });

  } catch (error) {
    console.error("Error verificando backend:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Error verificando backend",
        error: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}
