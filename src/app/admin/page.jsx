"use client";

import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from "recharts";
import Link from "next/link";
import { lineData, pieData, barData, instructorRequests, COLORS } from "@/data/adminDashboard";
/* import { useAdminInstructors } from "@/hooks/useAdminInstructors";
import { useAdminDashboard } from "@/hooks/useAdminDashboard"; */
import withRole from "@/components/withRole";

function AdminPage() {
  /* const {
    instructors,
    filter,
    setFilter,
    approveInstructor,
    rejectInstructor,
  } = useAdminInstructors();

  const { metrics, lineData, barData, pieData } = useAdminDashboard(); */

  return (
    <div 
      className="min-h-screen p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-1 sm:mb-2">
          Panel de Administración
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-muted)] px-2 sm:px-4">
          Bienvenido al panel de control. Aquí tienes una visión general del estado de la plataforma.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Users Card */}
        <div className="bg-[var(--color-card-primary)] rounded-xl p-4 sm:p-5 transition-all hover:shadow-lg border border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8H4a5 5 0 014.5 2.67A6.97 6.97 0 007 16c0 .34.024.673.07 1h5.86z" />
              </svg>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              +12%
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-[var(--color-card-primary-text)]">Total Usuarios</h2>
          <p className="text-2xl sm:text-3xl font-bold text-blue-500">1,245</p>
          <p className="text-sm sm:text-base text-gray-500">+142 este mes</p>
        </div>

        <div className="bg-[var(--color-card-primary)] shadow rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.616 1.065 2.853 1.065V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.617-1.065-2.853-1.065V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[var(--color-card-primary-text)]">Ventas</h2>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-500">$8,460</p>
          <p className="text-sm sm:text-base text-gray-500">+8% respecto al mes anterior</p>
        </div>

        <div className="bg-[var(--color-card-primary)] shadow rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[var(--color-card-primary-text)]">Tickets Soporte</h2>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-red-500">34</p>
          <p className="text-sm sm:text-base text-gray-500">-5% cerrados más rápido</p>
        </div>

        <div className="bg-[var(--color-card-primary)] shadow rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 01-.788 0l-7 3a1 1 0 010 1.84l7 3a1 1 0 00.788 0l7-3a1 1 0 010-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.707 18.5a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 011.414-1.414l1.414 1.414a1 1 0 010 1.414z" />
                <path fillRule="evenodd" d="M18.5 11.5a1 1 0 01-1 1h-13a1 1 0 01-1-1v-1a1 1 0 011-1h13a1 1 0 011 1v1zm-13-3a1 1 0 01-1-1v-1a1 1 0 011-1h13a1 1 0 011 1v1a1 1 0 01-1 1h-13z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[var(--color-card-primary-text)]">Cursos Publicados</h2>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-orange-500">58</p>
          <p className="text-sm sm:text-base text-gray-500">+3 nuevos esta semana</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Gráfico de línea */}
        <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[var(--color-card-primary-text)]">Crecimiento de Usuarios y Ventas</h2>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} className="text-gray-500" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--color-terciary)", 
                    color: "var(--color-primary)", 
                    fontSize: "12px",
                    border: "1px solid var(--color-muted)",
                    borderRadius: "0.5rem"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="usuarios" 
                  stroke="#6366F1" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="ventas" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de pastel */}
        <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[var(--color-card-primary-text)]">Estado de Usuarios</h2>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  className="text-xs"
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="var(--color-bg)" 
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  contentStyle={{ 
                    backgroundColor: "var(--color-terciary)", 
                    color: "var(--color-primary)", 
                    fontSize: "12px",
                    border: "1px solid var(--color-muted)",
                    borderRadius: "0.5rem"
                  }} 
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ 
                    fontSize: '12px', 
                    paddingTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[var(--color-card-primary-text)]">Cursos más populares</h2>
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={barData} 
              className="text-gray-500"
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-muted)" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 10 }}
                interval={0}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--color-terciary)", 
                  color: "var(--color-progress-text)", 
                  fontSize: "12px",
                  border: "1px solid var(--color-muted)",
                  borderRadius: "0.5rem"
                }} 
                formatter={(value) => [`${value} estudiantes`, 'Estudiantes']}
              />
              <Bar 
                dataKey="estudiantes" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
                name="Estudiantes"
              >
                {barData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(var(--primary-hue), 80%, ${70 - (index * 5)}%)`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de solicitudes de instructores */}
      <div className="bg-[var(--color-card-secondary)] shadow rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
          <h2 className="text-base sm:text-lg font-semibold text-[var(--color-card-primary-text)]">
            Solicitudes recientes de Instructores
          </h2>
          <Link 
            href="/admin/instructors" 
            className="text-xs sm:text-sm text-primary hover:text-primary-hover flex items-center gap-1"
          >
            Ver todas <span className="hidden sm:inline">las solicitudes</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="rounded-lg border border-[var(--color-muted)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-muted)]">
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Experiencia
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-3 py-3 text-right text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[var(--color-card-secondary)] text-gray-400 divide-y divide-[var(--color-muted)]">
                {instructorRequests.slice(0, 5).map((req) => (
                  <tr 
                    key={req.id}
                    className="hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                          {req.nombre.charAt(0)}
                        </div>
                        <div className="ml-2 sm:ml-4">
                          <div className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-100">
                            {req.nombre}
                          </div>
                          <div className="text-xs text-gray-400 sm:hidden">
                            {req.experiencia.split(' ').slice(0, 3).join(' ')}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-400 hidden sm:table-cell">
                      {req.experiencia}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        req.estado === 'Pendiente' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                          : req.estado === 'Aprobado' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {req.estado}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-gray-400 text-sm font-medium">
                      <Link
                        href={`/admin/instructors/${req.id}`}
                        className="text-primary hover:text-primary/80 text-xs sm:text-sm px-2 sm:px-3 py-1.5 rounded-md font-medium transition-colors"
                      >
                        <span className="hidden sm:inline">Ver</span> Detalles
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {instructorRequests.length > 5 && (
            <div className="bg-[var(--color-surface)] px-4 py-3 flex items-center justify-between border-t border-[var(--color-muted)] sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <Link
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-[var(--color-muted)] text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Anterior
                </Link>
                <Link
                  href="#"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-[var(--color-muted)] text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Siguiente
                </Link>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de{' '}
                    <span className="font-medium">{instructorRequests.length}</span> resultados
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <Link
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-[var(--color-muted)] bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Anterior</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      aria-current="page"
                      className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-3 py-1.5 border text-xs font-medium"
                    >
                      1
                    </Link>
                    <Link
                      href="#"
                      className="bg-white border-[var(--color-muted)] text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-1.5 border text-xs font-medium"
                    >
                      2
                    </Link>
                    <Link
                      href="#"
                      className="bg-white border-[var(--color-muted)] text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 py-1.5 border text-xs font-medium"
                    >
                      3
                    </Link>
                    <Link
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-[var(--color-muted)] bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Siguiente</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRole(AdminPage, ["ADMIN"]);