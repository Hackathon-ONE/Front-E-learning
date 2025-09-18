import { NextResponse } from "next/server";
import { mockUsers } from "@/data/mockUsers";
import { query } from "@/lib/database";

/**
 * Obtener todos los usuarios
 * GET /api/users
 */
export async function GET(request) {
  try {
    console.log('🔍 Obteniendo usuarios de la base de datos...');
    
    // Consultar usuarios de la base de datos PostgreSQL
    const dbResult = await query(
      'SELECT id, full_name, email, role, profile_photo, active, created_at, updated_at FROM users WHERE active = true ORDER BY created_at DESC'
    );

    if (dbResult.rows.length > 0) {
      console.log(`✅ ${dbResult.rows.length} usuarios encontrados en base de datos`);
      
      const users = dbResult.rows.map(user => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        image: user.profile_photo || '/default-avatar.png',
        active: user.active,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }));

      return NextResponse.json({
        success: true,
        message: "Usuarios obtenidos exitosamente desde base de datos",
        data: users,
        count: users.length,
        source: "database",
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('⚠️ No hay usuarios en base de datos, usando mock data...');
      
      // Fallback a mockUsers si no hay usuarios en la base de datos
      const users = mockUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return NextResponse.json({
        success: true,
        message: "Usuarios obtenidos desde mock data (fallback)",
        data: users,
        count: users.length,
        source: "mock",
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error("❌ Error obteniendo usuarios de base de datos:", error);
    
    // Fallback a mockUsers en caso de error
    console.log('⚠️ Error de DB, usando fallback a mock data...');
    try {
      const users = mockUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      return NextResponse.json({
        success: true,
        message: "Usuarios obtenidos desde mock data (fallback por error)",
        data: users,
        count: users.length,
        source: "mock-fallback",
        timestamp: new Date().toISOString()
      });
    } catch (fallbackError) {
      console.error("❌ Error en fallback:", fallbackError);
      return NextResponse.json(
        { 
          success: false,
          message: "Error interno del servidor",
          error: "INTERNAL_ERROR"
        },
        { status: 500 }
      );
    }
  }
}
