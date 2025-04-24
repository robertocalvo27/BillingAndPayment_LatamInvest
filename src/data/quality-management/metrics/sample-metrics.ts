import { QualityMetric } from '../../../types/quality-management';

// Métricas de Software Development
export const softwareDevelopmentMetrics: QualityMetric[] = [
  {
    id: 'metric-dev-001',
    name: 'Tasa de defectos en producción',
    description: 'Número de defectos encontrados por cada 1000 líneas de código en producción',
    category: 'software_development',
    target: 1.5,
    unit: 'defectos/KLOC',
    frequency: 'monthly',
    responsible: 'Director de Desarrollo',
    currentValue: 2.3,
    history: [
      { date: '2024-01-15', value: 3.1, notes: 'Inicio de medición' },
      { date: '2024-02-15', value: 2.8, notes: 'Implementación de code reviews' },
      { date: '2024-03-15', value: 2.5, notes: 'Mejora en pruebas unitarias' },
      { date: '2024-04-15', value: 2.3, notes: 'Automatización de pruebas' },
    ]
  },
  {
    id: 'metric-dev-002',
    name: 'Cobertura de pruebas',
    description: 'Porcentaje de código cubierto por pruebas automatizadas',
    category: 'software_development',
    target: 85,
    unit: '%',
    frequency: 'monthly',
    responsible: 'Líder de QA',
    currentValue: 78,
    history: [
      { date: '2024-01-15', value: 65, notes: 'Línea base' },
      { date: '2024-02-15', value: 68, notes: 'Nuevas pruebas en módulos críticos' },
      { date: '2024-03-15', value: 72, notes: 'Refactorización para testabilidad' },
      { date: '2024-04-15', value: 78, notes: 'Implementación TDD en nuevos módulos' },
    ]
  },
  {
    id: 'metric-dev-003',
    name: 'Velocidad de entrega',
    description: 'Tiempo promedio desde el inicio del desarrollo hasta el despliegue en producción',
    category: 'software_development',
    target: 14,
    unit: 'días',
    frequency: 'monthly',
    responsible: 'Scrum Master',
    currentValue: 18,
    history: [
      { date: '2024-01-15', value: 25, notes: 'Proceso inicial' },
      { date: '2024-02-15', value: 22, notes: 'Mejoras en CI/CD' },
      { date: '2024-03-15', value: 20, notes: 'Automatización de despliegues' },
      { date: '2024-04-15', value: 18, notes: 'Optimización de procesos de revisión' },
    ]
  },
];

// Métricas de Project Management
export const projectManagementMetrics: QualityMetric[] = [
  {
    id: 'metric-pm-001',
    name: 'Desviación de cronograma',
    description: 'Porcentaje de desviación del cronograma planeado vs. real',
    category: 'project_management',
    target: 10,
    unit: '%',
    frequency: 'monthly',
    responsible: 'Director de Proyectos',
    currentValue: 15,
    history: [
      { date: '2024-01-15', value: 25, notes: 'Inicio de medición' },
      { date: '2024-02-15', value: 22, notes: 'Implementación de metodología ágil' },
      { date: '2024-03-15', value: 18, notes: 'Mejora en estimaciones' },
      { date: '2024-04-15', value: 15, notes: 'Planificación con buffers' },
    ]
  },
  {
    id: 'metric-pm-002',
    name: 'Eficiencia de recursos',
    description: 'Porcentaje de utilización efectiva de recursos asignados',
    category: 'project_management',
    target: 85,
    unit: '%',
    frequency: 'monthly',
    responsible: 'Director de Operaciones',
    currentValue: 78,
    history: [
      { date: '2024-01-15', value: 70, notes: 'Línea base' },
      { date: '2024-02-15', value: 72, notes: 'Mejora en asignación de tareas' },
      { date: '2024-03-15', value: 75, notes: 'Implementación de herramientas de seguimiento' },
      { date: '2024-04-15', value: 78, notes: 'Optimización de procesos' },
    ]
  },
];

// Métricas de Customer Service
export const customerServiceMetrics: QualityMetric[] = [
  {
    id: 'metric-cs-001',
    name: 'Satisfacción del cliente',
    description: 'Nivel de satisfacción del cliente en escala de 1-5',
    category: 'customer_service',
    target: 4.5,
    unit: 'puntos',
    frequency: 'monthly',
    responsible: 'Director de Servicio al Cliente',
    currentValue: 4.2,
    history: [
      { date: '2024-01-15', value: 3.8, notes: 'Inicio de medición' },
      { date: '2024-02-15', value: 3.9, notes: 'Capacitación personal de soporte' },
      { date: '2024-03-15', value: 4.1, notes: 'Mejora en tiempos de respuesta' },
      { date: '2024-04-15', value: 4.2, notes: 'Implementación de autoservicio' },
    ]
  },
  {
    id: 'metric-cs-002',
    name: 'Tiempo de resolución de tickets',
    description: 'Tiempo promedio para resolver tickets de soporte',
    category: 'customer_service',
    target: 24,
    unit: 'horas',
    frequency: 'monthly',
    responsible: 'Gerente de Soporte',
    currentValue: 36,
    history: [
      { date: '2024-01-15', value: 48, notes: 'Línea base' },
      { date: '2024-02-15', value: 44, notes: 'Reorganización del equipo de soporte' },
      { date: '2024-03-15', value: 40, notes: 'Implementación de base de conocimiento' },
      { date: '2024-04-15', value: 36, notes: 'Optimización de procesos de escalamiento' },
    ]
  },
];

// Métricas de Quality Assurance
export const qualityAssuranceMetrics: QualityMetric[] = [
  {
    id: 'metric-qa-001',
    name: 'Efectividad de pruebas',
    description: 'Porcentaje de defectos encontrados en fase de prueba vs. producción',
    category: 'quality_assurance',
    target: 90,
    unit: '%',
    frequency: 'monthly',
    responsible: 'Líder de QA',
    currentValue: 82,
    history: [
      { date: '2024-01-15', value: 70, notes: 'Inicio de medición' },
      { date: '2024-02-15', value: 75, notes: 'Implementación de nuevas técnicas de prueba' },
      { date: '2024-03-15', value: 78, notes: 'Mejora en automatización de pruebas' },
      { date: '2024-04-15', value: 82, notes: 'Integración de pruebas en CI/CD' },
    ]
  },
  {
    id: 'metric-qa-002',
    name: 'Densidad de defectos',
    description: 'Número de defectos encontrados por cada 1000 líneas de código en fase de prueba',
    category: 'quality_assurance',
    target: 5,
    unit: 'defectos/KLOC',
    frequency: 'monthly',
    responsible: 'Líder de QA',
    currentValue: 7.5,
    history: [
      { date: '2024-01-15', value: 12, notes: 'Línea base' },
      { date: '2024-02-15', value: 10, notes: 'Mejora en code reviews' },
      { date: '2024-03-15', value: 9, notes: 'Implementación de análisis estático' },
      { date: '2024-04-15', value: 7.5, notes: 'Mejora en calidad del código' },
    ]
  },
];

// Métricas de Continuous Improvement
export const continuousImprovementMetrics: QualityMetric[] = [
  {
    id: 'metric-ci-001',
    name: 'Implementación de mejoras',
    description: 'Porcentaje de acciones de mejora implementadas vs. identificadas',
    category: 'continuous_improvement',
    target: 90,
    unit: '%',
    frequency: 'monthly',
    responsible: 'Director de Calidad',
    currentValue: 75,
    history: [
      { date: '2024-01-15', value: 60, notes: 'Inicio de medición' },
      { date: '2024-02-15', value: 65, notes: 'Implementación de revisiones periódicas' },
      { date: '2024-03-15', value: 70, notes: 'Mejora en seguimiento' },
      { date: '2024-04-15', value: 75, notes: 'Priorización de mejoras críticas' },
    ]
  },
];

// Métricas de Resource Management
export const resourceManagementMetrics: QualityMetric[] = [
  {
    id: 'metric-rm-001',
    name: 'Rotación de personal',
    description: 'Tasa anual de rotación de personal técnico',
    category: 'resource_management',
    target: 10,
    unit: '%',
    frequency: 'monthly',
    responsible: 'Director de RRHH',
    currentValue: 15,
    history: [
      { date: '2024-01-15', value: 18, notes: 'Línea base' },
      { date: '2024-02-15', value: 17, notes: 'Mejora en procesos de onboarding' },
      { date: '2024-03-15', value: 16, notes: 'Revisión de compensaciones' },
      { date: '2024-04-15', value: 15, notes: 'Implementación programa de desarrollo profesional' },
    ]
  },
];

// Métricas de Risk Management
export const riskManagementMetrics: QualityMetric[] = [
  {
    id: 'metric-risk-001',
    name: 'Efectividad de mitigación',
    description: 'Porcentaje de riesgos mitigados exitosamente',
    category: 'risk_management',
    target: 90,
    unit: '%',
    frequency: 'monthly',
    responsible: 'Director de Riesgos',
    currentValue: 80,
    history: [
      { date: '2024-01-15', value: 70, notes: 'Inicio de medición' },
      { date: '2024-02-15', value: 72, notes: 'Mejora en identificación de riesgos' },
      { date: '2024-03-15', value: 75, notes: 'Implementación de controles preventivos' },
      { date: '2024-04-15', value: 80, notes: 'Análisis predictivo de riesgos' },
    ]
  },
];

// Combinar todas las métricas
export const allMetrics: QualityMetric[] = [
  ...softwareDevelopmentMetrics,
  ...projectManagementMetrics,
  ...customerServiceMetrics,
  ...qualityAssuranceMetrics,
  ...continuousImprovementMetrics,
  ...resourceManagementMetrics,
  ...riskManagementMetrics,
]; 