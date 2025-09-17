import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    console.log('📊 Obteniendo usuarios de la base de datos...');
    
    const result = await query(
      'SELECT id, full_name, email, role, profile_photo, created_at FROM users ORDER BY created_at DESC'
    );
    
    console.log(`✅ ${result.rows.length} usuarios encontrados`);
    
    return NextResponse.json({
      success: true,
      count: result.rows.length,
      users: result.rows
    });
    
  } catch (error) {
    console.error('❌ Error obteniendo usuarios:', error.message);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Error obteniendo usuarios de la base de datos',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
