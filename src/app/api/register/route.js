import { NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { mockUsers } from '@/data/mockUsers';

export async function POST(request) {
  try {
    const { name, email, password, role = 'STUDENT' } = await request.json();

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe en la base de datos
    let existingUser;
    try {
      const dbResult = await query(
        'SELECT id FROM users WHERE email = $1',
        [email.toLowerCase()]
      );
      existingUser = dbResult.rows[0];
    } catch (dbError) {
      console.warn('Error consultando base de datos, usando mock data:', dbError.message);
      // Fallback a mock data si hay error de DB
      existingUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    // Crear nuevo usuario en la base de datos usando la estructura correcta
    let newUser;
    try {
      const result = await query(
        'INSERT INTO users (full_name, email, password_hash, role, profile_photo, active, is_subscribed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, full_name, email, role, profile_photo, created_at',
        [
          name.trim(),
          email.toLowerCase().trim(),
          password, // En producción, deberías hashear la contraseña
          role.toUpperCase(),
          '/default-avatar.png',
          true, // active
          false // is_subscribed
        ]
      );
      newUser = result.rows[0];
      console.log('✅ Usuario registrado en base de datos:', {
        id: newUser.id,
        name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (dbError) {
      console.warn('Error guardando en base de datos, usando mock data:', dbError.message);
      // Fallback a mock data si hay error de DB
      newUser = {
        id: `user_${Date.now()}`,
        full_name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        role: role.toUpperCase(),
        profile_photo: '/default-avatar.png',
        created_at: new Date().toISOString(),
      };
      console.log('⚠️ Usuario registrado en mock data:', {
        id: newUser.id,
        name: newUser.full_name,
        email: newUser.email,
        role: newUser.role,
      });
    }

    // Retornar éxito (sin la contraseña)
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      {
        message: 'Usuario registrado exitosamente',
        user: userWithoutPassword,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
