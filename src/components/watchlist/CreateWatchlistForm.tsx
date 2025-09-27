'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreateWatchlistForm as CreateWatchlistFormData, WatchlistTerm } from '@/types/events.types';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface CreateWatchlistFormProps {
  onSave: (data: CreateWatchlistFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreateWatchlistForm({ onSave, onCancel, isLoading }: CreateWatchlistFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState<Array<{ term: string; type: WatchlistTerm['type'] }>>([]);
  const [currentTerm, setCurrentTerm] = useState('');
  const [currentTermType, setCurrentTermType] = useState<WatchlistTerm['type']>('keyword');

  const handleAddTerm = () => {
    if (currentTerm.trim() !== '') {
      setTerms([...terms, { term: currentTerm.trim(), type: currentTermType }]);
      setCurrentTerm('');
    }
  };

  const handleRemoveTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, terms });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
                label="Nombre de la Watchlist"
        value={name}
        onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Protección de Marca"
        required
      />
      <Input
                label="Descripción (Opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Monitoreando intentos de phishing"
      />

      <div>
                <label className="text-sm font-medium text-gray-700">Términos</label>
        <div className="flex items-center space-x-2 mt-2">
          <Input
            value={currentTerm}
            onChange={(e) => setCurrentTerm(e.target.value)}
                        placeholder="Añadir un término (ej: 'paypal')"
            className="flex-grow"
          />
          <select
            value={currentTermType}
            onChange={(e) => setCurrentTermType(e.target.value as WatchlistTerm['type'])}
            className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm"
          >
                        <option value="keyword">Palabra Clave</option>
                        <option value="brand">Marca</option>
                        <option value="domain">Dominio</option>
                        <option value="other">Otro</option>
          </select>
                    <Button type="button" onClick={handleAddTerm} variant="secondary">Añadir</Button>
        </div>
        <div className="mt-4 space-y-2">
          {terms.map((term, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div>
                <span className="font-medium">{term.term}</span>
                <span className="ml-2 text-xs text-gray-500">({term.type})</span>
              </div>
              <button type="button" onClick={() => handleRemoveTerm(index)} className="text-gray-500 hover:text-red-600">
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" isLoading={isLoading} disabled={!name || terms.length === 0}>
                    Guardar Watchlist
        </Button>
      </div>
    </form>
  );
}
