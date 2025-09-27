import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Statistics from '@/components/dashboard/statistics';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="flex flex-col items-center justify-center text-center px-4 ">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Bienvenido a Signal Watcher
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Un sistema de monitoreo y análisis de eventos de seguridad impulsado por IA. Navega a las páginas de watchlists o eventos para comenzar.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/watchlist">
            <Button size="lg" variant="primary">
              Ir a Watchlists
            </Button>
          </Link>
          <Link href="/events">
            <Button size="lg" variant="secondary">
              Ir a Eventos
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-6xl">
        <Statistics />
      </div>
    </main>
  );
}
