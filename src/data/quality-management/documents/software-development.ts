import { QualityDocument } from '../../../types/quality-management';

// Ejemplos de documentos para la categoría "Desarrollo de Software"
export const softwareDevelopmentDocs: QualityDocument[] = [
  {
    id: 'SGC-PRO-DS-001',
    title: 'Procedimiento de Análisis de Requerimientos',
    type: 'procedure',
    category: 'software_development',
    status: 'pending',
    revision: '1',
    updatedAt: '2023-11-15',
    description: 'Procedimiento que establece las directrices para la recopilación, análisis y documentación de requerimientos de software.',
    content: `
# Procedimiento de Análisis de Requerimientos

## 1. Objetivo
Establecer las directrices para la recopilación, análisis y documentación de los requerimientos de software, asegurando que se capturen correctamente las necesidades del cliente.

## 2. Alcance
Aplica a todos los proyectos de desarrollo de software desde la fase inicial de recopilación de requerimientos hasta la aprobación del documento de especificación de requerimientos.

## 3. Responsabilidades
- **Analista de Sistemas**: Responsable principal de la recopilación y documentación de requerimientos.
- **Líder de Proyecto**: Revisa y aprueba los documentos de requerimientos.
- **Cliente**: Proporciona información sobre sus necesidades y valida los requerimientos documentados.

## 4. Procedimiento

### 4.1 Identificación de Stakeholders
1. Identificar a todas las partes interesadas que pueden proporcionar requerimientos o que serán afectadas por el sistema.
2. Documentar sus roles, responsabilidades e intereses en el proyecto.

### 4.2 Recopilación de Requerimientos
1. Realizar entrevistas con los stakeholders utilizando el formato "SGC-FOR-DS-001 Entrevista de Requerimientos".
2. Organizar talleres de requerimientos cuando sea necesario para clarificar necesidades complejas.
3. Revisar documentación existente relacionada con los procesos actuales.
4. Documentar los requerimientos funcionales y no funcionales utilizando el formato "SGC-FOR-DS-002 Especificación de Requerimientos".

### 4.3 Análisis y Clasificación
1. Analizar los requerimientos recopilados para identificar ambigüedades, contradicciones o información faltante.
2. Clasificar los requerimientos como:
   - Funcionales
   - No funcionales (rendimiento, seguridad, usabilidad, etc.)
   - Restricciones del proyecto
3. Priorizar los requerimientos en colaboración con el cliente utilizando la técnica MoSCoW (Must, Should, Could, Won't).

### 4.4 Especificación de Requerimientos
1. Elaborar el documento de Especificación de Requerimientos de Software (ERS) utilizando la plantilla "SGC-PLA-DS-001".
2. Incluir para cada requerimiento:
   - Identificador único
   - Descripción clara y precisa
   - Criterios de aceptación
   - Prioridad
   - Dependencias con otros requerimientos

### 4.5 Validación y Aprobación
1. Realizar una revisión interna del documento ERS con el equipo técnico.
2. Presentar el documento ERS al cliente para su revisión.
3. Incorporar los comentarios y correcciones necesarias.
4. Obtener la aprobación formal del cliente mediante la firma del documento.

## 5. Control de Cambios
Cualquier modificación a los requerimientos después de su aprobación debe seguir el "SGC-PRO-DS-007 Procedimiento de Control de Cambios".

## 6. Registros
- SGC-FOR-DS-001 Entrevista de Requerimientos
- SGC-FOR-DS-002 Especificación de Requerimientos
- SGC-PLA-DS-001 Plantilla ERS
- SGC-REG-DS-001 Matriz de Trazabilidad de Requerimientos

## 7. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2023-11-15 | Versión inicial | Ana Martínez | Carlos Vega |
`,
  },
  {
    id: 'SGC-PRO-DS-002',
    title: 'Procedimiento de Diseño de Software',
    type: 'procedure',
    category: 'software_development',
    status: 'pending',
    revision: '1',
    updatedAt: '2023-11-20',
    description: 'Establece las actividades necesarias para transformar los requerimientos en una arquitectura y diseño detallado del sistema.',
    content: `
# Procedimiento de Diseño de Software

## 1. Objetivo
Establecer las actividades necesarias para transformar los requerimientos en una arquitectura y diseño detallado del sistema que sirva como base para la implementación.

## 2. Alcance
Este procedimiento aplica a todas las actividades de diseño de software realizadas durante el ciclo de vida de desarrollo, desde la concepción arquitectónica hasta el diseño detallado de componentes.

## 3. Responsabilidades
- **Arquitecto de Software**: Responsable del diseño de la arquitectura general.
- **Diseñadores/Desarrolladores Senior**: Responsables del diseño detallado.
- **Líder Técnico**: Revisa y aprueba los diseños.
- **Equipo de QA**: Revisa los diseños desde la perspectiva de pruebas.

## 4. Procedimiento

### 4.1 Diseño Arquitectónico
1. Analizar los requerimientos funcionales y no funcionales aprobados.
2. Identificar los principales componentes del sistema y sus interacciones.
3. Definir el estilo arquitectónico a utilizar (capas, microservicios, etc.).
4. Documentar la arquitectura utilizando la plantilla "SGC-PLA-DS-002 Documento de Arquitectura".
5. Realizar una revisión de la arquitectura (Architecture Review Board).

### 4.2 Diseño Detallado
1. Desarrollar el diseño detallado de cada componente identificado en la arquitectura.
2. Crear diagramas UML según sea necesario:
   - Diagramas de clases
   - Diagramas de secuencia
   - Diagramas de estado
   - Diagramas de componentes
3. Definir interfaces de programación (APIs) entre componentes.
4. Diseñar la estructura de la base de datos (modelo de datos).
5. Documentar patrones de diseño a utilizar.

### 4.3 Revisión del Diseño
1. Realizar revisiones por pares del diseño detallado utilizando la lista de verificación "SGC-CHK-DS-001".
2. Evaluar el diseño contra los atributos de calidad requeridos (rendimiento, seguridad, mantenibilidad, etc.).
3. Verificar la trazabilidad entre el diseño y los requerimientos.
4. Documentar los resultados de la revisión en "SGC-REG-DS-002 Registro de Revisión de Diseño".

### 4.4 Refinamiento y Aprobación
1. Incorporar los cambios resultantes de las revisiones.
2. Presentar el diseño al equipo del proyecto para su comprensión.
3. Obtener la aprobación formal del diseño por parte del Líder Técnico y el Gerente de Proyecto.

### 4.5 Comunicación y Distribución
1. Almacenar la documentación de diseño en el repositorio de documentos del proyecto.
2. Comunicar la aprobación del diseño al equipo de desarrollo.
3. Capacitar al equipo según sea necesario en aspectos críticos del diseño.

## 5. Consideraciones de Diseño
- Principios SOLID
- Patrones de diseño apropiados
- Seguridad por diseño
- Escalabilidad y rendimiento
- Mantenibilidad y extensibilidad

## 6. Registros
- SGC-PLA-DS-002 Documento de Arquitectura
- SGC-CHK-DS-001 Lista de Verificación de Diseño
- SGC-REG-DS-002 Registro de Revisión de Diseño
- SGC-DIA-DS-001 Diagramas UML del Sistema

## 7. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2023-11-20 | Versión inicial | Roberto Sánchez | María López |
`,
  },
  {
    id: 'SGC-PRO-DS-003',
    title: 'Procedimiento de Codificación',
    type: 'procedure',
    category: 'software_development',
    status: 'pending',
    revision: '1',
    updatedAt: '2023-11-25',
    description: 'Define las prácticas y estándares para la implementación del código fuente según el diseño establecido.',
    content: `
# Procedimiento de Codificación

## 1. Objetivo
Definir las prácticas y estándares para la implementación del código fuente según el diseño establecido, asegurando la calidad y consistencia del software desarrollado.

## 2. Alcance
Este procedimiento aplica a todas las actividades de codificación realizadas por el equipo de desarrollo de software.

## 3. Responsabilidades
- **Desarrolladores**: Implementar el código siguiendo los estándares establecidos.
- **Líder Técnico**: Asegurar el cumplimiento de los estándares y realizar revisiones de código.
- **Arquitecto de Software**: Proporcionar guía para la implementación de aspectos arquitectónicos complejos.

## 4. Procedimiento

### 4.1 Preparación del Entorno
1. Verificar el acceso al sistema de control de versiones (Git).
2. Configurar el entorno de desarrollo según "SGC-INS-DS-001 Configuración del Entorno".
3. Obtener la última versión del código base.
4. Crear una rama (branch) para la nueva funcionalidad siguiendo la convención de nombres "SGC-EST-DS-001".

### 4.2 Implementación del Código
1. Implementar la funcionalidad asignada siguiendo:
   - El documento de diseño aprobado
   - Los estándares de codificación "SGC-EST-DS-002"
   - Las guías de estilo específicas del lenguaje
2. Documentar el código:
   - Comentarios de cabecera para clases y métodos
   - Comentarios explicativos para lógica compleja
   - Generar documentación API según sea aplicable
3. Realizar pruebas unitarias para cada componente desarrollado.

### 4.3 Revisión de Código
1. Realizar auto-revisión utilizando "SGC-CHK-DS-002 Lista de Verificación de Código".
2. Ejecutar herramientas de análisis estático de código.
3. Corregir todos los problemas identificados.
4. Solicitar revisión por pares mediante Pull Request.
5. Incorporar retroalimentación de la revisión por pares.

### 4.4 Integración
1. Actualizar la rama con la última versión de la rama principal.
2. Resolver conflictos si existen.
3. Ejecutar pruebas unitarias para verificar que todo sigue funcionando.
4. Enviar solicitud de fusión (merge request) para integrar a la rama principal.

### 4.5 Seguimiento y Mejora
1. Realizar reuniones periódicas de refactorización.
2. Revisar métricas de calidad de código.
3. Actualizar los estándares de codificación según sea necesario.

## 5. Estándares de Codificación
- Convenciones de nomenclatura
- Manejo de errores y excepciones
- Uso de comentarios
- Principios SOLID
- Límites de complejidad ciclomática
- Gestión de dependencias

## 6. Herramientas de Soporte
- Sistema de control de versiones: Git
- Herramientas de análisis estático: SonarQube, ESLint
- Herramientas de pruebas: Jest, JUnit
- Integración continua: Jenkins, GitHub Actions

## 7. Registros
- SGC-EST-DS-001 Convención de Nombres para Ramas
- SGC-EST-DS-002 Estándares de Codificación
- SGC-CHK-DS-002 Lista de Verificación de Código
- SGC-INS-DS-001 Configuración del Entorno
- SGC-REG-DS-003 Registro de Revisión de Código

## 8. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2023-11-25 | Versión inicial | Daniel Pérez | Laura Gómez |
`,
  },
  {
    id: 'SGC-PRO-DS-004',
    title: 'Procedimiento de Pruebas de Software',
    type: 'procedure',
    category: 'software_development',
    status: 'pending',
    revision: '1',
    updatedAt: '2023-11-30',
    description: 'Establece las actividades para verificar y validar que el software cumple con los requerimientos especificados.',
    content: `
# Procedimiento de Pruebas de Software

## 1. Objetivo
Establecer las actividades para verificar y validar que el software cumple con los requerimientos especificados y está libre de defectos que comprometan su funcionamiento.

## 2. Alcance
Este procedimiento aplica a todas las actividades de prueba realizadas durante el ciclo de vida de desarrollo, incluyendo pruebas unitarias, de integración, de sistema y de aceptación.

## 3. Responsabilidades
- **Equipo de QA**: Planificar, diseñar y ejecutar pruebas.
- **Desarrolladores**: Realizar pruebas unitarias y apoyar en la resolución de defectos.
- **Líder de QA**: Supervisar el proceso de pruebas y reportar métricas.
- **Gerente de Proyecto**: Asegurar que se asignen recursos adecuados para las pruebas.

## 4. Procedimiento

### 4.1 Planificación de Pruebas
1. Analizar los requerimientos y el diseño del sistema.
2. Desarrollar el Plan de Pruebas utilizando la plantilla "SGC-PLA-DS-003".
3. Definir los niveles de prueba requeridos (unitarias, integración, sistema, aceptación).
4. Identificar los recursos necesarios (personal, entornos, datos).
5. Establecer el cronograma de pruebas alineado con el plan del proyecto.
6. Obtener aprobación del Plan de Pruebas.

### 4.2 Diseño de Casos de Prueba
1. Desarrollar casos de prueba utilizando el formato "SGC-FOR-DS-003".
2. Asegurar la trazabilidad entre casos de prueba y requerimientos.
3. Incluir datos de prueba y resultados esperados.
4. Diseñar pruebas para caminos positivos y negativos.
5. Revisar y aprobar los casos de prueba.

### 4.3 Preparación del Entorno
1. Configurar los entornos de prueba según "SGC-INS-DS-002".
2. Preparar los datos de prueba necesarios.
3. Instalar y configurar herramientas de prueba.
4. Verificar que el software está correctamente desplegado.

### 4.4 Ejecución de Pruebas
1. Ejecutar pruebas unitarias automatizadas en cada compilación.
2. Realizar pruebas de integración entre componentes.
3. Ejecutar pruebas de sistema en el entorno designado.
4. Documentar los resultados utilizando "SGC-REG-DS-004".
5. Registrar defectos encontrados en la herramienta de gestión de defectos.

### 4.5 Gestión de Defectos
1. Clasificar los defectos por severidad y prioridad.
2. Asignar defectos al equipo de desarrollo para su resolución.
3. Verificar las correcciones mediante pruebas de regresión.
4. Mantener actualizado el estado de los defectos.
5. Realizar análisis de causa raíz para defectos críticos.

### 4.6 Pruebas de Aceptación
1. Coordinar con los usuarios las pruebas de aceptación.
2. Ejecutar las pruebas según el plan de aceptación.
3. Documentar los resultados y obtener la aprobación formal.

### 4.7 Reporte y Cierre
1. Generar informes de progreso de pruebas semanales.
2. Preparar el Informe de Resumen de Pruebas al finalizar.
3. Documentar lecciones aprendidas.
4. Archivar la documentación de pruebas.

## 5. Tipos de Pruebas
- Pruebas Unitarias
- Pruebas de Integración
- Pruebas de Sistema
- Pruebas de Rendimiento
- Pruebas de Seguridad
- Pruebas de Usabilidad
- Pruebas de Aceptación

## 6. Criterios de Entrada y Salida
### Criterios de Entrada
- Requerimientos aprobados
- Código completado y revisado
- Entorno de pruebas disponible

### Criterios de Salida
- Todos los casos de prueba ejecutados
- Defectos críticos y mayores resueltos
- Informe de pruebas aprobado

## 7. Registros
- SGC-PLA-DS-003 Plan de Pruebas
- SGC-FOR-DS-003 Formato de Casos de Prueba
- SGC-INS-DS-002 Configuración de Entornos de Prueba
- SGC-REG-DS-004 Registro de Ejecución de Pruebas
- SGC-REG-DS-005 Registro de Defectos

## 8. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2023-11-30 | Versión inicial | Elena Rodríguez | Javier Torres |
`,
  },
  {
    id: 'SGC-PRO-DS-005',
    title: 'Procedimiento de Despliegue y Entrega',
    type: 'procedure',
    category: 'software_development',
    status: 'pending',
    revision: '1',
    updatedAt: '2023-12-05',
    description: 'Define las actividades para la entrega, instalación y puesta en marcha del software en los entornos de producción.',
    content: `
# Procedimiento de Despliegue y Entrega

## 1. Objetivo
Definir las actividades para la entrega, instalación y puesta en marcha del software en los entornos de producción, asegurando una transición controlada y minimizando el impacto en los usuarios.

## 2. Alcance
Este procedimiento aplica a todas las actividades relacionadas con la preparación, empaquetado, distribución, instalación y verificación post-implementación del software desarrollado.

## 3. Responsabilidades
- **Equipo DevOps**: Responsable de la automatización y ejecución del despliegue.
- **Líder Técnico**: Aprueba la versión a desplegar y verifica la documentación técnica.
- **Gerente de Proyecto**: Coordina con las partes interesadas y aprueba el despliegue.
- **Equipo de Soporte**: Proporciona asistencia post-implementación.

## 4. Procedimiento

### 4.1 Preparación para el Despliegue
1. Verificar que el software ha pasado todas las pruebas requeridas.
2. Preparar la documentación de versión (Release Notes) utilizando "SGC-FOR-DS-004".
3. Revisar y actualizar la documentación de usuario y técnica.
4. Obtener las aprobaciones necesarias según "SGC-FOR-DS-005 Lista de Verificación Pre-Despliegue".
5. Notificar a las partes interesadas sobre el despliegue programado.

### 4.2 Creación del Paquete de Despliegue
1. Crear etiquetas (tags) en el repositorio para la versión a desplegar.
2. Generar el paquete de instalación mediante el proceso de CI/CD.
3. Verificar la integridad del paquete generado.
4. Documentar los componentes incluidos en el paquete.
5. Almacenar el paquete en el repositorio de artefactos.

### 4.3 Planificación del Despliegue
1. Desarrollar el Plan de Despliegue utilizando "SGC-PLA-DS-004".
2. Definir la ventana de mantenimiento y comunicarla a los usuarios.
3. Preparar el plan de contingencia y rollback.
4. Asignar responsabilidades específicas para el despliegue.
5. Realizar una reunión de revisión del plan con el equipo.

### 4.4 Ejecución del Despliegue
1. Realizar respaldo de datos y configuraciones actuales.
2. Seguir la secuencia de despliegue documentada en el Plan.
3. Ejecutar scripts de migración de datos si son necesarios.
4. Verificar la instalación usando "SGC-CHK-DS-003 Lista de Verificación Post-Despliegue".
5. Documentar cualquier problema encontrado y las soluciones aplicadas.

### 4.5 Verificación Post-Despliegue
1. Ejecutar pruebas de humo para verificar funcionalidades críticas.
2. Monitorear el rendimiento del sistema durante las primeras horas.
3. Verificar que los usuarios pueden acceder correctamente.
4. Confirmar que las integraciones con otros sistemas funcionan.
5. Decidir si se procede o se revierte el despliegue.

### 4.6 Actividades Post-Implementación
1. Proporcionar soporte intensivo durante el período inicial.
2. Recopilar retroalimentación de los usuarios.
3. Resolver rápidamente los problemas identificados.
4. Actualizar la documentación según sea necesario.
5. Realizar una reunión de retrospectiva del despliegue.

## 5. Métodos de Despliegue
- Despliegue completo
- Despliegue incremental
- Despliegue Blue-Green
- Despliegue Canary

## 6. Gestión de Configuración
- Control de versiones de configuración
- Gestión de entornos (Desarrollo, QA, Staging, Producción)
- Separación de código y configuración
- Cifrado de información sensible

## 7. Registros
- SGC-FOR-DS-004 Notas de Versión
- SGC-FOR-DS-005 Lista de Verificación Pre-Despliegue
- SGC-PLA-DS-004 Plan de Despliegue
- SGC-CHK-DS-003 Lista de Verificación Post-Despliegue
- SGC-REG-DS-006 Registro de Despliegue
- SGC-REG-DS-007 Informe de Incidentes de Despliegue

## 8. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2023-12-05 | Versión inicial | Manuel Castro | Patricia Reyes |
`,
  }
];

export default softwareDevelopmentDocs; 