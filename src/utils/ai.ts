import { AIAnalysis, CreateEventForm, SeverityLevel } from '@/types/events.types';

const keywords: { [key in SeverityLevel]: string[] } = {
  CRITICAL: ['breach', 'leak', 'phishing', 'exploit', 'compromised', 'vulnerability', 'attack'],
  HIGH: ['suspicious', 'unauthorized', 'malware', 'threat', 'exposed'],
  MED: ['misconfigured', 'warning', 'failed login', 'anomaly', 'unusual'],
  LOW: ['mention', 'reputation', 'policy violation', 'test'],
};

const suggestedActions: { [key in SeverityLevel]: string[] } = {
  CRITICAL: [
    'Immediately activate incident response protocol.',
    'Isolate affected systems from the network.',
    'Notify legal and compliance departments.',
    'Begin forensic analysis of compromised assets.',
  ],
  HIGH: [
    'Investigate the source and impact of the activity.',
    'Block suspicious IP addresses or user agents.',
    'Review security logs for related events.',
    'Escalate to the senior security team.',
  ],
  MED: [
    'Review the configuration or policy in question.',
    'Monitor the affected user or system for further anomalies.',
    'Document the event and the investigation findings.',
  ],
  LOW: [
    'Monitor the source for further mentions or context.',
    'Log the event for trend analysis.',
    'No immediate action required, but keep under observation.',
  ],
};

/**
 * Simula un análisis de IA para un evento de seguridad.
 * Determina la severidad basada en palabras clave y genera un resumen y acciones.
 */
export function runMockAIAnalysis(eventData: CreateEventForm): Omit<AIAnalysis, 'id' | 'eventId' | 'processedAt' | 'correlationId'> {
  const textToAnalyze = `${eventData.title.toLowerCase()} ${eventData.description.toLowerCase()}`;

  let determinedSeverity: SeverityLevel = 'LOW';

  // Determinar la severidad basada en palabras clave
  for (const level of ['CRITICAL', 'HIGH', 'MED'] as SeverityLevel[]) {
    if (keywords[level].some(keyword => textToAnalyze.includes(keyword))) {
      determinedSeverity = level;
      break;
    }
  }

  // Generar un resumen simple
  const summary = `An event of **${determinedSeverity}** severity has been detected. The event, titled "${eventData.title}," originated from ${eventData.source} and appears to be related to the "${eventData.watchlistId}" watchlist. The analysis suggests a potential ${determinedSeverity === 'CRITICAL' || determinedSeverity === 'HIGH' ? 'security threat' : 'policy or reputational issue'}.`;

  return {
    summary,
    severity: determinedSeverity,
    confidence: Math.random() * (0.99 - 0.75) + 0.75, // Confianza aleatoria entre 75% y 99%
    suggestedActions: suggestedActions[determinedSeverity],
    reasoning: `The severity was determined based on the presence of keywords related to ${determinedSeverity.toLowerCase()} threats in the event data. The summary is a standardized output based on the event's core attributes.`,
  };
}
