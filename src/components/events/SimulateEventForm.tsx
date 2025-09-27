'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreateEventForm, Watchlist } from '@/types/events.types';

interface SimulateEventFormProps {
  onSave: (data: CreateEventForm) => void;
  onCancel: () => void;
  isLoading?: boolean;
  watchlists: Watchlist[]; // Para seleccionar a qué watchlist asociar el evento
}

export function SimulateEventForm({ onSave, onCancel, isLoading, watchlists }: SimulateEventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('Manual Simulation');
  const [watchlistId, setWatchlistId] = useState<string>(watchlists[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      title, 
      description, 
      source, 
      watchlistId, 
      type: 'keyword_alert' // Tipo por defecto para simulación manual
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
                label="Título del Evento"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Inicio de sesión sospechoso desde una nueva IP"
        required
      />
      <Input
                label="Descripción del Evento"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Una cuenta de usuario mostró un inicio de sesión desde una dirección IP no reconocida..."
        required
      />
      <Input
                label="Fuente"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
      />
      <div>
                <label className="text-sm font-medium text-gray-700">Asociar con Watchlist</label>
        <select
          value={watchlistId}
          onChange={(e) => setWatchlistId(e.target.value)}
          className="mt-2 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm"
          required
        >
          {watchlists.map(wl => (
            <option key={wl.id} value={wl.id}>{wl.name}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" isLoading={isLoading} disabled={!title || !description || !watchlistId}>
                    Simular y Analizar
        </Button>
      </div>
    </form>
  );
}
