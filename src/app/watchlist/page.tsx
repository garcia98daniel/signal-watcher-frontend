'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { CreateWatchlistForm } from '@/components/watchlist/CreateWatchlistForm';
import { CreateWatchlistForm as CreateWatchlistFormData, Watchlist } from '@/types/events.types';
import * as api from '@/lib/api';

function WatchlistCard({ watchlist, onDelete }: { watchlist: Watchlist; onDelete: (id: string) => void; }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{watchlist.name}</CardTitle>
            <CardDescription>{watchlist.description}</CardDescription>
          </div>
          <Badge variant={watchlist.isActive ? 'success' : 'default'}>
            {watchlist.isActive ? 'Activa' : 'Inactiva'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium mb-2 text-sm text-gray-700">Términos ({watchlist.terms.length})</h4>
        <div className="flex flex-wrap gap-2">
          {watchlist.terms.map(term => (
            <Badge key={term.id} variant="secondary" size="sm">{term.term}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button variant="outline" size="sm">Editar</Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(watchlist.id)}>Eliminar</Button>
      </CardFooter>
    </Card>
  );
}

export default function WatchlistPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const data = await api.getWatchlists();
        setWatchlists(data);
      } catch (error) {
        console.error('Failed to fetch watchlists:', error);
      }
    };
    fetchWatchlists();
  }, []);

  const handleCreateWatchlist = async (data: CreateWatchlistFormData) => {
    setIsLoading(true);
    try {
      const newWatchlist = await api.createWatchlist(data);
      setWatchlists([newWatchlist, ...watchlists]);
      setIsModalOpen(false);
    } catch (error) {
      // El toast ya se muestra en api.ts
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWatchlist = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta lista de observación?')) {
      try {
        await api.deleteWatchlist(id);
        setWatchlists(watchlists.filter(wl => wl.id !== id));
      } catch (error) {
        // El toast ya se muestra en api.ts
      }
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Watchlists</h1>
          <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
            <span className="mr-2">+</span> Crear Nueva Watchlist
          </Button>
        </div>

        <div className="space-y-6">
          {watchlists.map(wl => (
            <WatchlistCard key={wl.id} watchlist={wl} onDelete={handleDeleteWatchlist} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nueva Watchlist"
      >
        <CreateWatchlistForm
          onSave={handleCreateWatchlist}
          onCancel={() => setIsModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
}
