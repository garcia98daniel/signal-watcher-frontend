// Tipos para el sistema Signal Watcher

export type SeverityLevel = 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';

export type EventStatus = 'PENDING' | 'ANALYZED' | 'RESOLVED' | 'DISMISSED';

export interface WatchlistTerm {
  id: string;
  term: string;
  type: 'brand' | 'domain' | 'keyword' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface Watchlist {
  id: string;
  name: string;
  description?: string;
  terms: WatchlistTerm[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SecurityEvent {
  id: string;
  title: string;
  description: string;
  source: string;
  matchedTerms: string[];
  watchlistId: string;
  severity?: SeverityLevel;
  status: EventStatus;
  aiAnalysis?: AIAnalysis;
  rawData?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AIAnalysis {
  id: string;
  eventId: string;
  summary: string;
  severity: SeverityLevel;
  confidence: number; // 0-1
  suggestedActions: string[];
  reasoning: string;
  processedAt: string;
  correlationId: string;
}

export interface EventSimulation {
  type: 'suspicious_domain' | 'brand_mention' | 'keyword_alert' | 'phishing_attempt';
  title: string;
  description: string;
  source: string;
  severity?: SeverityLevel;
  metadata?: Record<string, unknown>;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  correlationId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CreateWatchlistForm {
  name: string;
  description?: string;
  terms: Array<{
    term: string;
    type: WatchlistTerm['type'];
  }>;
}

export interface CreateEventForm {
  title: string;
  description: string;
  source: string;
  watchlistId: string;
  type: EventSimulation['type'];
  metadata?: Record<string, unknown>;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface UIState {
  watchlists: LoadingState;
  events: LoadingState;
  aiAnalysis: LoadingState;
}

// Dashboard types
export interface DashboardStats {
  totalWatchlists: number;
  activeWatchlists: number;
  totalEvents: number;
  pendingEvents: number;
  criticalEvents: number;
  eventsToday: number;
}

export interface EventsByDay {
  date: string;
  count: number;
  criticalCount: number;
}

export interface SeverityDistribution {
  severity: SeverityLevel;
  count: number;
  percentage: number;
}