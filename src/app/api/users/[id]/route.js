import { NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { mockUsers } from '@/data/mockUsers';

/**
 * Obtener información de un usuario específico
 * GET /api/users/[id]
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    console.log('🔍 Obteniendo usuario:', id);

    // Buscar el usuario en la base de datos
    const dbResult = await query(
      'SELECT id, full_name, email, role, profile_photo, about, active FROM users WHERE id = $1 AND active = true',
      [id]
    );

    if (dbResult.rows.length > 0) {
      const user = dbResult.rows[0];
      console.log('✅ Usuario encontrado en base de datos:', user.email);

      const userData = {
        id: user.id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        image: user.profile_photo || '/default-avatar.png',
        bio: user.about || 'Usuario especializado en el área',
        specialty: user.role === 'INSTRUCTOR' ? 'Instructor' : 'Especialista',
        active: user.active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return NextResponse.json(userData);
    }

    // Fallback a mock data
    console.log('⚠️ Usuario no encontrado en DB, buscando en mock data...');
    const mockUser = mockUsers.find(u => u.id.toString() === id.toString());

    if (mockUser) {
      console.log('✅ Usuario encontrado en mock data:', mockUser.email);
      return NextResponse.json({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        image: mockUser.image || '/default-avatar.png',
        bio: mockUser.bio || 'Usuario especializado en el área',
        specialty: mockUser.specialty || 'Especialista',
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    console.log('❌ Usuario no encontrado en DB ni mock data');
    return NextResponse.json(
      { error: 'Usuario no encontrado' },
      { status: 404 }
    );

  } catch (error) {
    console.error('❌ Error obteniendo usuario:', error);

    // Fallback a mock data en caso de error
    console.log('⚠️ Error de DB, usando fallback a mock data...');
    try {
      const { id } = params;
      const mockUser = mockUsers.find(u => u.id.toString() === id.toString());

      if (mockUser) {
        console.log('✅ Usuario encontrado en fallback mock data:', mockUser.email);
        return NextResponse.json({
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          image: mockUser.image || '/default-avatar.png',
          bio: mockUser.bio || 'Usuario especializado en el área',
          specialty: mockUser.specialty || 'Especialista',
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    } catch (fallbackError) {
      console.error('❌ Error en fallback:', fallbackError);
      return NextResponse.json(
        { error: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  }
}
