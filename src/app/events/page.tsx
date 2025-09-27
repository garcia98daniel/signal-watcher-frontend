'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { SimulateEventForm } from '@/components/events/SimulateEventForm';
import * as api from '@/lib/api';
import { CreateEventForm, SecurityEvent, Watchlist } from '@/types/events.types';
import { ArrowRightIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';


function EventCard({ event }: { event: SecurityEvent }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight truncate">{event.title}</CardTitle>
                        <CardDescription className="mt-1">Fuente: {event.source} | Watchlist: {event.watchlistId}</CardDescription>
          </div>
          <Badge severity={event.severity} size="lg">{event.severity || 'N/A'}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {event.aiAnalysis ? (
          <div>
            <p className="text-sm text-gray-700">{event.aiAnalysis.summary}</p>
            <div className="mt-4">
                            <h4 className="font-medium text-sm text-gray-800">Acciones Sugeridas:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                {event.aiAnalysis.suggestedActions.map((action, i) => <li key={i}>{action}</li>)}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <ClockIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Esperando análisis de IA...</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50/50 px-6 py-3 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <time dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleString()}</time>
        </div>
        <Button variant="ghost" size="sm">
                    Ver Detalles  <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function EventsPage() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, watchlistsData] = await Promise.all([
          api.getEvents(),
          api.getWatchlists(),
        ]);
        setEvents(eventsData);
        setWatchlists(watchlistsData);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        // TODO: Mostrar errores en la UI
      }
    };
    fetchData();
  }, []);

    const handleSimulateEvent = async (data: CreateEventForm) => {
    setIsLoading(true);
    try {
      const newEvent = await api.simulateEvent(data);
      setEvents([newEvent, ...events]);
      setIsModalOpen(false);
    } catch (error) {
      // El toast ya se muestra en api.ts
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Security Events</h1>
          <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
                        <span className="mr-2">⚡</span> Simular Nuevo Evento
          </Button>
        </div>

        <div className="space-y-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
                title="Simular un Nuevo Evento de Seguridad"
      >
        <SimulateEventForm
          onSave={handleSimulateEvent}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isLoading}
          watchlists={watchlists}
        />
      </Modal>
    </>
  );
}
