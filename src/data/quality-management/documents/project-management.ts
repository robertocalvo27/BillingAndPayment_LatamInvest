import { QualityDocument } from "../../../types/quality-management";

export const projectManagementDocs: QualityDocument[] = [
  {
    id: "SGC-PRY-001",
    title: "Procedimiento para Inicio de Proyectos",
    type: "procedure",
    category: "project_management",
    status: "approved",
    revision: "2",
    updatedAt: "2023-11-10",
    description: "Este procedimiento establece las actividades necesarias para la correcta iniciación de proyectos, incluyendo elaboración de charter, identificación de stakeholders y planificación inicial.",
    content: `
# Procedimiento para Inicio de Proyectos

## 1. Objetivo
Establecer las actividades necesarias para la correcta iniciación de proyectos en Bizflow Tech, asegurando una definición clara del alcance, objetivos y plan inicial.

## 2. Alcance
Este procedimiento aplica a todos los proyectos nuevos de la organización, desde la recepción de la solicitud hasta la aprobación formal del acta de constitución del proyecto.

## 3. Responsabilidades
- Gerente de Proyecto: Responsable principal de la ejecución de este procedimiento
- Director de Operaciones: Aprueba el acta de constitución del proyecto
- Cliente/Patrocinador: Proporciona información inicial y valida alcance

## 4. Procedimiento
### 4.1 Recepción y Análisis de Solicitud
- Recibir solicitud formal de nuevo proyecto
- Analizar viabilidad preliminar
- Designar Gerente de Proyecto
- Registrar solicitud en sistema de gestión de proyectos

### 4.2 Elaboración del Acta de Constitución
- Realizar reuniones de levantamiento de información
- Definir objetivos, alcance preliminar y criterios de éxito
- Identificar restricciones y supuestos
- Elaborar acta de constitución del proyecto
- Definir hitos principales y cronograma de alto nivel

### 4.3 Identificación de Stakeholders
- Identificar y documentar stakeholders internos y externos
- Analizar nivel de influencia e interés
- Desarrollar estrategia inicial de gestión de stakeholders
- Documentar en registro de stakeholders

### 4.4 Presentación y Aprobación
- Presentar acta de constitución a stakeholders clave
- Incorporar feedback y realizar ajustes necesarios
- Obtener firmas de aprobación
- Comunicar inicio formal del proyecto

## 5. Registros
- SGC-REG-018: Acta de Constitución del Proyecto
- SGC-REG-019: Registro de Stakeholders
- SGC-REG-020: Checklist de Iniciación de Proyecto
    `
  },

  {
    id: "SGC-PRY-002",
    title: "Procedimiento para Planificación de Proyectos",
    type: "procedure",
    category: "project_management",
    status: "approved",
    revision: "1",
    updatedAt: "2023-10-25",
    description: "Este procedimiento define las actividades para desarrollar el plan de gestión del proyecto, incluyendo alcance, cronograma, costos, calidad, recursos y riesgos.",
    content: `
# Procedimiento para Planificación de Proyectos

## 1. Objetivo
Establecer las actividades necesarias para desarrollar un plan integral de gestión del proyecto que guíe la ejecución, control y cierre del mismo.

## 2. Alcance
Este procedimiento aplica a todos los proyectos de Bizflow Tech, cubriendo desde la aprobación del acta de constitución hasta la aprobación del plan de gestión del proyecto.

## 3. Responsabilidades
- Gerente de Proyecto: Responsable principal de elaborar el plan
- Equipo de Proyecto: Participa en actividades de planificación
- Director de Operaciones: Revisa y aprueba el plan
- Cliente: Valida y aprueba aspectos relevantes del plan

## 4. Procedimiento
### 4.1 Planificación del Alcance
- Desarrollar el enunciado detallado del alcance
- Crear la estructura de desglose del trabajo (EDT/WBS)
- Definir entregables y criterios de aceptación
- Establecer procesos de control de cambios

### 4.2 Planificación del Cronograma
- Definir actividades basadas en la EDT
- Estimar duraciones y recursos necesarios
- Desarrollar cronograma detallado
- Establecer línea base del cronograma

### 4.3 Planificación de Costos
- Estimar costos de actividades y recursos
- Desarrollar presupuesto detallado
- Establecer línea base de costos
- Definir métodos de control de costos

### 4.4 Planes Adicionales
- Elaborar plan de calidad
- Desarrollar plan de recursos humanos
- Crear plan de comunicaciones
- Elaborar plan de gestión de riesgos
- Desarrollar plan de adquisiciones

### 4.5 Integración y Aprobación
- Integrar todos los planes en un plan de gestión de proyecto
- Revisar consistencia entre planes
- Presentar para aprobación a stakeholders clave
- Comunicar plan aprobado al equipo

## 5. Registros
- SGC-REG-021: Plan de Gestión del Proyecto
- SGC-REG-022: EDT/WBS del Proyecto
- SGC-REG-023: Cronograma del Proyecto
- SGC-REG-024: Presupuesto del Proyecto
- SGC-REG-025: Registro de Riesgos
    `
  },

  {
    id: "SGC-PRY-003",
    title: "Procedimiento para Ejecución y Control de Proyectos",
    type: "procedure",
    category: "project_management",
    status: "approved",
    revision: "1",
    updatedAt: "2023-10-15",
    description: "Este procedimiento establece las actividades para dirigir, gestionar y monitorear el trabajo del proyecto según lo establecido en el plan de gestión.",
    content: `
# Procedimiento para Ejecución y Control de Proyectos

## 1. Objetivo
Establecer las actividades necesarias para dirigir, gestionar y monitorear el trabajo del proyecto conforme al plan de gestión, asegurando el cumplimiento de objetivos.

## 2. Alcance
Este procedimiento aplica a todos los proyectos de Bizflow Tech durante las fases de ejecución y control, desde el inicio de actividades hasta su finalización.

## 3. Responsabilidades
- Gerente de Proyecto: Responsable principal de la ejecución y control
- Equipo de Proyecto: Ejecuta las actividades y reporta avance
- PMO: Supervisa cumplimiento de metodología y estándares
- Cliente: Participa en revisiones de entregables

## 4. Procedimiento
### 4.1 Gestión de la Ejecución
- Dirigir y gestionar el trabajo según el plan
- Coordinar recursos y actividades
- Implementar estándares de calidad
- Generar entregables del proyecto

### 4.2 Gestión del Conocimiento
- Documentar lecciones aprendidas
- Actualizar activos de procesos organizacionales
- Facilitar transferencia de conocimiento
- Mantener repositorio de documentación del proyecto

### 4.3 Monitoreo y Control
- Realizar seguimiento periódico de actividades
- Monitorear cronograma, costos y alcance
- Controlar calidad de entregables
- Verificar cumplimiento de objetivos

### 4.4 Gestión de Cambios
- Recibir y registrar solicitudes de cambio
- Analizar impacto de cambios propuestos
- Aprobar/rechazar solicitudes según procedimiento
- Actualizar planes y documentación

### 4.5 Comunicación y Reportes
- Ejecutar plan de comunicaciones
- Generar reportes de estado periódicos
- Realizar reuniones de seguimiento
- Informar a stakeholders sobre avance y desviaciones

## 5. Registros
- SGC-REG-026: Informes de Estado del Proyecto
- SGC-REG-027: Registro de Control de Cambios
- SGC-REG-028: Actas de Reuniones de Seguimiento
- SGC-REG-029: Registro de Lecciones Aprendidas
    `
  },

  {
    id: "SGC-PRY-004",
    title: "Procedimiento para Cierre de Proyectos",
    type: "procedure",
    category: "project_management",
    status: "approved",
    revision: "1",
    updatedAt: "2023-10-05",
    description: "Este procedimiento define las actividades necesarias para el cierre formal de un proyecto o fase, incluyendo la aceptación de entregables y documentación de lecciones aprendidas.",
    content: `
# Procedimiento para Cierre de Proyectos

## 1. Objetivo
Establecer las actividades necesarias para el cierre formal y adecuado de un proyecto o fase, asegurando la aceptación de entregables y documentación de lecciones aprendidas.

## 2. Alcance
Este procedimiento aplica al cierre de todos los proyectos y fases significativas de proyectos en Bizflow Tech, desde la finalización de entregables hasta la liberación de recursos.

## 3. Responsabilidades
- Gerente de Proyecto: Responsable principal del cierre formal
- Equipo de Proyecto: Finaliza actividades pendientes
- Cliente: Acepta formalmente los entregables
- PMO: Verifica cumplimiento del procedimiento

## 4. Procedimiento
### 4.1 Verificación de Entregables
- Confirmar finalización de todos los entregables
- Verificar cumplimiento de criterios de aceptación
- Resolver pendientes y no conformidades
- Obtener aceptación formal del cliente

### 4.2 Cierre Administrativo
- Completar documentación del proyecto
- Cerrar contratos y acuerdos con proveedores
- Realizar evaluaciones de desempeño del equipo
- Liberar recursos asignados al proyecto

### 4.3 Documentación Final
- Actualizar registro de lecciones aprendidas
- Documentar mejores prácticas identificadas
- Compilar documentación técnica y de gestión
- Archivar documentación según políticas

### 4.4 Evaluación del Proyecto
- Analizar cumplimiento de objetivos
- Evaluar desempeño en tiempo, costo y calidad
- Identificar factores de éxito y áreas de mejora
- Elaborar informe final del proyecto

### 4.5 Celebración y Comunicación
- Comunicar finalización a todos los stakeholders
- Reconocer contribuciones del equipo
- Realizar reunión de cierre del proyecto
- Transferir responsabilidades para fase operativa

## 5. Registros
- SGC-REG-030: Acta de Cierre del Proyecto
- SGC-REG-031: Informe Final del Proyecto
- SGC-REG-032: Registro Final de Lecciones Aprendidas
- SGC-REG-033: Encuesta de Satisfacción del Cliente
    `
  }
];

export default projectManagementDocs; 