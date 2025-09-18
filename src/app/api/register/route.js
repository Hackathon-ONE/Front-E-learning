import { NextResponse } from "next/server";
import { mockUsers } from "@/data/mockUsers";
import { query } from "@/lib/database";

/**
 * Endpoint de registro de usuarios
 * POST /api/register
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role = 'STUDENT' } = body;

    // Validaciones
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: "Todos los campos son requeridos",
          error: "MISSING_FIELDS"
        },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          message: "Formato de email inválido",
          error: "INVALID_EMAIL"
        },
        { status: 400 }
      );
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return NextResponse.json(
        { 
          success: false,
          message: "La contraseña debe tener al menos 6 caracteres",
          error: "PASSWORD_TOO_SHORT"
        },
        { status: 400 }
      );
    }

    let newUser = null;

    try {
      // Verificar si el usuario ya existe en la base de datos
      console.log('🔍 Verificando si usuario existe en base de datos:', email);
      const existingUserResult = await query(
        'SELECT id, email FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (existingUserResult.rows.length > 0) {
        console.log('❌ Usuario ya existe en base de datos:', email);
        return NextResponse.json(
          { 
            success: false,
            message: "El usuario ya existe con este email",
            error: "USER_EXISTS"
          },
          { status: 409 }
        );
      }

      // Crear nuevo usuario en la base de datos
      console.log('📝 Creando usuario en base de datos:', email);
      const insertResult = await query(
        `INSERT INTO users (full_name, email, password_hash, role, profile_photo, active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING id, full_name, email, role, profile_photo, created_at`,
        [
          name.trim(),
          email.trim().toLowerCase(),
          password, // En producción, aquí deberías hashear la contraseña con bcrypt
          role.toUpperCase(),
          '/default-avatar.png',
          true,
          new Date().toISOString(),
          new Date().toISOString()
        ]
      );

      newUser = insertResult.rows[0];
      console.log('✅ Usuario creado en base de datos:', {
        id: newUser.id,
        name: newUser.full_name,
        email: newUser.email,
        role: newUser.role
      });

    } catch (dbError) {
      console.error('❌ Error con base de datos, usando fallback a mock data:', dbError);
      
      // Fallback a mockUsers si hay error de base de datos
      const existingUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        return NextResponse.json(
          { 
            success: false,
            message: "El usuario ya existe con este email",
            error: "USER_EXISTS"
          },
          { status: 409 }
        );
      }

      // Crear usuario en mock data como fallback
      newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        role: role.toUpperCase(),
        image: '/default-avatar.png',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('✅ Usuario creado en mock data (fallback):', {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
    }

    // Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: "Usuario registrado exitosamente",
        user: {
          id: newUser.id,
          name: newUser.full_name || newUser.name,
          email: newUser.email,
          role: newUser.role,
          image: newUser.profile_photo || newUser.image || '/default-avatar.png',
          createdAt: newUser.created_at || newUser.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error en registro:", error);
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
