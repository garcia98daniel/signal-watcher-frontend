'use client';

import { useEffect, useState } from 'react';

interface AppStatistics {
  totalWatchlists: number;
  totalTerms: number;
  totalEvents: number;
  analyzedEvents: number;
  eventsBySeverity: Record<string, number>;
  eventsByStatus: Record<string, number>;
}

const Statistics = () => {
  const [stats, setStats] = useState<AppStatistics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/statistics');
        if (!response.ok) {
          throw new Error('Error al cargar las estadísticas');
        }
        const data = await response.json();
        setStats(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      }
    };

    fetchStatistics();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!stats) {
    return <div>Cargando estadísticas...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Listas de Observación</h3>
        <p className="text-3xl">{stats.totalWatchlists}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Términos Monitoreados</h3>
        <p className="text-3xl">{stats.totalTerms}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Eventos de Seguridad</h3>
        <p className="text-3xl">{stats.totalEvents}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Eventos Analizados por IA</h3>
        <p className="text-3xl">{stats.analyzedEvents}</p>
      </div>
    </div>
  );
};

export default Statistics;
