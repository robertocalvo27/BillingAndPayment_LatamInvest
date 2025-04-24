import { QualityDocument } from '../../../types/quality-management';

// Documentos para la categoría "Servicio al Cliente"
export const customerServiceDocs: QualityDocument[] = [
  {
    id: 'SGC-SAC-001',
    title: 'Procedimiento de Atención al Cliente',
    type: 'procedure',
    category: 'customer_service',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-03-15',
    description: 'Define el proceso y los lineamientos para la atención y soporte al cliente, asegurando una respuesta oportuna y efectiva.',
    content: `
# Procedimiento de Atención al Cliente

## 1. Objetivo
Establecer los lineamientos y actividades necesarias para proporcionar una atención al cliente efectiva, oportuna y de calidad, garantizando la satisfacción de los clientes con los servicios y productos de Bizflow Tech.

## 2. Alcance
Este procedimiento aplica a todas las interacciones con clientes, incluyendo soporte técnico, consultas, solicitudes de información, gestión de quejas y reclamaciones.

## 3. Responsabilidades
- **Especialista de Atención al Cliente**: Responsable principal de la recepción y gestión de las solicitudes de los clientes.
- **Líder de Servicio al Cliente**: Supervisa el proceso de atención y resuelve casos complejos.
- **Equipo Técnico**: Proporciona soporte especializado cuando es necesario.
- **Gerente de Servicio al Cliente**: Responsable general del área y de la mejora continua del servicio.

## 4. Procedimiento

### 4.1 Recepción de Solicitudes
1. Recibir las solicitudes de los clientes a través de los canales oficiales (teléfono, correo electrónico, portal de soporte).
2. Registrar la solicitud en el sistema de gestión de tickets, asignando un número único.
3. Clasificar la solicitud según su tipo (consulta, incidencia, queja, solicitud de cambio).
4. Asignar prioridad según la matriz de impacto-urgencia definida en "SGC-SAC-005 Matriz de Priorización".

### 4.2 Análisis y Asignación
1. Realizar un análisis inicial de la solicitud para determinar su complejidad.
2. Asignar el ticket al especialista correspondiente según el área y nivel de complejidad.
3. Establecer el tiempo de respuesta esperado según la prioridad asignada.
4. Notificar al cliente la recepción de su solicitud y el tiempo estimado de respuesta.

### 4.3 Gestión y Resolución
1. Investigar la solicitud, recopilando toda la información necesaria.
2. Consultar la base de conocimiento para identificar soluciones a problemas conocidos.
3. Escalar a niveles superiores de soporte si es necesario, siguiendo la matriz de escalamiento.
4. Implementar la solución o respuesta adecuada.
5. Documentar detalladamente las acciones realizadas en el sistema de tickets.

### 4.4 Cierre y Seguimiento
1. Confirmar con el cliente que la solución implementada resuelve su solicitud.
2. Solicitar retroalimentación sobre el servicio prestado mediante la encuesta de satisfacción.
3. Cerrar el ticket en el sistema una vez confirmada la resolución.
4. Realizar seguimiento post-cierre en casos críticos o recurrentes.

### 4.5 Análisis y Mejora Continua
1. Realizar análisis periódicos de las solicitudes y tiempos de respuesta.
2. Identificar patrones o problemas recurrentes.
3. Proponer e implementar acciones de mejora.
4. Actualizar la base de conocimiento con nuevas soluciones.

## 5. Niveles de Servicio
- Prioridad Crítica: Respuesta inicial en 1 hora, resolución en 4 horas
- Prioridad Alta: Respuesta inicial en 2 horas, resolución en 8 horas
- Prioridad Media: Respuesta inicial en 4 horas, resolución en 24 horas
- Prioridad Baja: Respuesta inicial en 8 horas, resolución en 48 horas

## 6. Registros
- SGC-REG-SAC-001: Registro de Solicitudes de Clientes
- SGC-REG-SAC-002: Encuesta de Satisfacción del Cliente
- SGC-REG-SAC-003: Informe Mensual de Atención al Cliente
- SGC-REG-SAC-004: Registro de Quejas y Reclamaciones

## 7. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2024-03-15 | Versión inicial | Laura Sánchez | Miguel Torres |
`
  },
  {
    id: 'SGC-SAC-002',
    title: 'Procedimiento de Gestión de Quejas y Reclamaciones',
    type: 'procedure',
    category: 'customer_service',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-03-20',
    description: 'Establece el proceso para recibir, analizar y resolver de manera efectiva las quejas y reclamaciones de los clientes.',
    content: `
# Procedimiento de Gestión de Quejas y Reclamaciones

## 1. Objetivo
Establecer un proceso sistemático para la recepción, análisis, resolución y seguimiento de quejas y reclamaciones de los clientes, con el fin de restaurar su satisfacción y utilizar esta información para la mejora continua de los productos y servicios.

## 2. Alcance
Este procedimiento aplica a todas las quejas y reclamaciones presentadas por los clientes relacionadas con los productos, servicios o procesos de Bizflow Tech.

## 3. Responsabilidades
- **Especialista de Atención al Cliente**: Recibe y registra las quejas y reclamaciones.
- **Analista de Calidad**: Participa en el análisis de causas y propuesta de acciones correctivas.
- **Gerente de Servicio al Cliente**: Aprueba las soluciones propuestas y los recursos necesarios.
- **Responsables de Área**: Implementan acciones correctivas en sus áreas correspondientes.

## 4. Procedimiento

### 4.1 Recepción y Registro
1. Recibir la queja o reclamación a través de cualquier canal oficial de comunicación.
2. Agradecer al cliente por su retroalimentación y explicar el proceso de gestión.
3. Registrar la queja en el "SGC-REG-SAC-004 Registro de Quejas y Reclamaciones".
4. Asignar un código único y comunicarlo al cliente para seguimiento.
5. Clasificar según gravedad: crítica, alta, media o baja.

### 4.2 Análisis y Evaluación
1. Recopilar toda la información relacionada con la queja (historial del cliente, interacciones previas, etc.).
2. Determinar si la queja es procedente según los términos de servicio y políticas de la empresa.
3. Realizar un análisis de causa raíz utilizando herramientas como 5 Porqués o Diagrama de Ishikawa.
4. Involucrar a las áreas responsables en el análisis cuando sea necesario.

### 4.3 Resolución
1. Determinar la solución más adecuada para el cliente.
2. Establecer acciones inmediatas para mitigar el impacto de la situación.
3. Diseñar acciones correctivas para evitar recurrencia.
4. Documentar la solución propuesta y obtener las aprobaciones necesarias.
5. Comunicar la solución al cliente de manera clara y oportuna.

### 4.4 Seguimiento y Cierre
1. Implementar la solución acordada con el cliente.
2. Verificar que las acciones tomadas sean efectivas.
3. Solicitar retroalimentación del cliente sobre la solución implementada.
4. Cerrar formalmente la queja una vez que el cliente confirme su satisfacción.
5. Registrar el cierre en el sistema y actualizar los indicadores.

### 4.5 Análisis y Mejora
1. Realizar análisis periódicos (mensual) de todas las quejas recibidas.
2. Identificar tendencias y problemas recurrentes.
3. Proponer mejoras a procesos, productos o servicios.
4. Seguimiento a la implementación de acciones correctivas y preventivas.
5. Presentar resultados en la revisión por la dirección.

## 5. Tiempos de Respuesta
- Acuse de recibo: Máximo 24 horas desde la recepción
- Análisis y propuesta de solución: Máximo 3 días hábiles para quejas normales, 1 día para quejas críticas
- Implementación de la solución: Según complejidad, máximo 10 días hábiles
- Seguimiento post-solución: 5 días hábiles después del cierre

## 6. Registros
- SGC-REG-SAC-004: Registro de Quejas y Reclamaciones
- SGC-REG-SAC-005: Análisis de Causa Raíz
- SGC-REG-SAC-006: Plan de Acciones Correctivas
- SGC-REG-SAC-007: Encuesta de Satisfacción Post-Resolución

## 7. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2024-03-20 | Versión inicial | Carlos Jiménez | Miguel Torres |
`
  },
  {
    id: 'SGC-SAC-003',
    title: 'Procedimiento de Medición de Satisfacción del Cliente',
    type: 'procedure',
    category: 'customer_service',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-03-25',
    description: 'Define la metodología para evaluar, medir y analizar el nivel de satisfacción de los clientes con respecto a productos y servicios.',
    content: `
# Procedimiento de Medición de Satisfacción del Cliente

## 1. Objetivo
Establecer una metodología sistemática para evaluar, medir y analizar el nivel de satisfacción de los clientes de Bizflow Tech con respecto a sus productos y servicios, con el fin de identificar oportunidades de mejora y aumentar la fidelización.

## 2. Alcance
Este procedimiento aplica a todas las actividades relacionadas con la medición de la satisfacción de clientes, incluyendo el diseño de instrumentos, recolección de datos, análisis y presentación de resultados.

## 3. Responsabilidades
- **Analista de Experiencia del Cliente**: Diseña instrumentos y coordina la aplicación de encuestas.
- **Especialistas de Atención al Cliente**: Promueven la participación de los clientes en las encuestas.
- **Analista de Datos**: Procesa y analiza los resultados obtenidos.
- **Gerente de Servicio al Cliente**: Supervisa el proceso y presenta resultados a la dirección.

## 4. Procedimiento

### 4.1 Planificación de la Medición
1. Definir los objetivos específicos de la medición de satisfacción.
2. Identificar los segmentos de clientes a evaluar.
3. Establecer la periodicidad de las mediciones según tipo de cliente y servicio.
4. Seleccionar los métodos e instrumentos de medición apropiados (encuestas, entrevistas, focus groups).
5. Definir los indicadores clave de desempeño (KPI) a monitorear.

### 4.2 Diseño de Instrumentos
1. Diseñar cuestionarios con preguntas claras y específicas.
2. Incluir tanto preguntas cuantitativas (escala Likert 1-5) como cualitativas.
3. Incluir el Índice de Satisfacción del Cliente (CSI) y Net Promoter Score (NPS).
4. Validar los instrumentos con un grupo piloto antes de su implementación general.
5. Documentar los instrumentos en el formato "SGC-FOR-SAC-001 Instrumentos de Medición".

### 4.3 Implementación y Recolección de Datos
1. Implementar los instrumentos según la planificación establecida.
2. Aplicar encuestas post-servicio inmediatamente después de cada interacción.
3. Realizar encuestas de satisfacción general con periodicidad semestral.
4. Garantizar tasas de respuesta representativas mediante incentivos adecuados.
5. Almacenar los datos recopilados en el sistema CRM de manera estructurada.

### 4.4 Análisis de Resultados
1. Procesar los datos cuantitativos calculando indicadores clave (promedios, porcentajes, NPS).
2. Realizar análisis cualitativos de comentarios y sugerencias.
3. Comparar resultados con mediciones anteriores para identificar tendencias.
4. Segmentar análisis por tipo de cliente, producto y canal de atención.
5. Identificar áreas de oportunidad y fortalezas en la prestación del servicio.

### 4.5 Acciones de Mejora
1. Establecer planes de acción para las áreas con resultados por debajo de las metas.
2. Definir responsables y fechas de implementación para cada acción.
3. Comunicar los resultados y planes de acción a las áreas involucradas.
4. Implementar mejoras en procesos, productos o servicios según los hallazgos.
5. Realizar seguimiento a la efectividad de las acciones implementadas.

### 4.6 Comunicación de Resultados
1. Preparar informes ejecutivos para la dirección con periodicidad trimestral.
2. Comunicar resultados relevantes a los equipos internos.
3. Informar a los clientes sobre las mejoras implementadas a partir de su retroalimentación.
4. Incluir los resultados en la revisión por la dirección del Sistema de Gestión de Calidad.

## 5. Indicadores Clave
- Net Promoter Score (NPS): Meta mínima de +30
- Índice de Satisfacción del Cliente (CSI): Meta mínima del 85%
- Tasa de respuesta a encuestas: Meta mínima del 30%
- Tiempo de resolución de problemas: Según niveles de servicio definidos

## 6. Registros
- SGC-FOR-SAC-001: Instrumentos de Medición
- SGC-REG-SAC-008: Resultados de Encuestas de Satisfacción
- SGC-REG-SAC-009: Análisis de Tendencias de Satisfacción
- SGC-REG-SAC-010: Plan de Acción de Mejoras

## 7. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2024-03-25 | Versión inicial | Elena Morales | Miguel Torres |
`
  },
  {
    id: 'SGC-SAC-004',
    title: 'Procedimiento de Soporte Técnico',
    type: 'procedure',
    category: 'customer_service',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-04-01',
    description: 'Establece los lineamientos para proporcionar soporte técnico efectivo a los usuarios de las soluciones de software.',
    content: `
# Procedimiento de Soporte Técnico

## 1. Objetivo
Establecer los lineamientos y actividades necesarias para proporcionar soporte técnico efectivo a los clientes de Bizflow Tech, garantizando la resolución oportuna de incidencias y problemas técnicos relacionados con el software.

## 2. Alcance
Este procedimiento aplica a todas las actividades de soporte técnico proporcionadas a clientes, incluyendo resolución de incidencias, problemas de configuración, errores del sistema y consultas técnicas.

## 3. Responsabilidades
- **Técnico de Soporte Nivel 1**: Primera línea de atención, resuelve incidencias básicas.
- **Especialista de Soporte Nivel 2**: Atiende incidencias de complejidad media y realiza diagnósticos avanzados.
- **Ingeniero de Soporte Nivel 3**: Resuelve incidencias complejas que requieran intervención en código o infraestructura.
- **Líder de Soporte Técnico**: Coordina el equipo y escala a desarrollo cuando es necesario.

## 4. Procedimiento

### 4.1 Recepción y Clasificación
1. Recibir las solicitudes de soporte técnico a través de los canales establecidos.
2. Registrar la incidencia en el sistema de tickets, asignando un número único.
3. Clasificar según tipo: error de sistema, problema de configuración, consulta técnica, solicitud de mejora.
4. Asignar nivel de severidad según impacto en la operación del cliente:
   - Crítica: Sistema completamente inoperativo
   - Alta: Funcionalidad principal afectada
   - Media: Funcionalidad secundaria afectada
   - Baja: Consulta o mejora estética

### 4.2 Diagnóstico Inicial
1. Recopilar información detallada sobre el problema (mensajes de error, comportamiento esperado vs. obtenido).
2. Solicitar capturas de pantalla o registros del sistema cuando sea necesario.
3. Verificar versión del software y entorno donde ocurre el problema.
4. Consultar la base de conocimiento para identificar si es un problema conocido.
5. Reproducir el problema en ambiente de pruebas cuando sea posible.

### 4.3 Resolución por Niveles
#### Nivel 1:
1. Resolver problemas básicos de configuración, uso del sistema y errores comunes.
2. Guiar al usuario para realizar acciones correctivas sencillas.
3. Escalar al Nivel 2 si la solución no está dentro de su alcance.

#### Nivel 2:
1. Realizar diagnósticos avanzados de problemas de configuración y rendimiento.
2. Acceder remotamente al sistema del cliente cuando sea necesario y esté autorizado.
3. Implementar soluciones técnicas de mediana complejidad.
4. Escalar al Nivel 3 los problemas que requieran intervención en código.

#### Nivel 3:
1. Analizar problemas complejos a nivel de código o infraestructura.
2. Desarrollar soluciones temporales (workarounds) cuando sea necesario.
3. Coordinar con el equipo de desarrollo para soluciones permanentes.
4. Documentar detalladamente la causa raíz y solución implementada.

### 4.4 Comunicación con el Cliente
1. Mantener al cliente informado del progreso en todo momento.
2. Proporcionar actualizaciones periódicas según la severidad del caso:
   - Crítica: Cada 2 horas
   - Alta: Cada 4 horas
   - Media: Cada 24 horas
   - Baja: Al tener avances significativos
3. Documentar todas las comunicaciones en el sistema de tickets.

### 4.5 Cierre y Documentación
1. Confirmar con el cliente que la solución resuelve completamente el problema.
2. Documentar la solución detalladamente en el sistema de tickets.
3. Actualizar la base de conocimiento con la nueva solución si es pertinente.
4. Solicitar retroalimentación sobre la calidad del soporte brindado.
5. Cerrar formalmente el ticket en el sistema.

## 5. Acuerdos de Nivel de Servicio (SLA)
### Tiempos de Respuesta:
- Severidad Crítica: 30 minutos
- Severidad Alta: 2 horas
- Severidad Media: 4 horas
- Severidad Baja: 8 horas

### Tiempos de Resolución:
- Severidad Crítica: 4 horas
- Severidad Alta: 8 horas
- Severidad Media: 24 horas
- Severidad Baja: 48 horas

## 6. Registros
- SGC-REG-SAC-011: Registro de Incidencias Técnicas
- SGC-REG-SAC-012: Base de Conocimiento de Soporte Técnico
- SGC-REG-SAC-013: Informe de Cumplimiento de SLA
- SGC-REG-SAC-014: Escalamiento a Desarrollo

## 7. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2024-04-01 | Versión inicial | David Ramírez | Miguel Torres |
`
  },
  {
    id: 'SGC-SAC-005',
    title: 'Instrucción de Trabajo para Onboarding de Clientes',
    type: 'work_instruction',
    category: 'customer_service',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-04-05',
    description: 'Guía detallada para el proceso de incorporación y capacitación de nuevos clientes en el uso de las soluciones de software.',
    content: `
# Instrucción de Trabajo para Onboarding de Clientes

## 1. Objetivo
Proporcionar una guía detallada para el proceso de incorporación (onboarding) de nuevos clientes, garantizando una transición fluida y una correcta capacitación en el uso de las soluciones de software de Bizflow Tech.

## 2. Alcance
Esta instrucción de trabajo aplica a todas las actividades relacionadas con la incorporación de nuevos clientes, desde la firma del contrato hasta la finalización del periodo de acompañamiento inicial.

## 3. Responsabilidades
- **Gerente de Cuentas**: Coordina el proceso general de onboarding.
- **Especialista de Implementación**: Configura el sistema según los requisitos del cliente.
- **Capacitador**: Proporciona entrenamiento a los usuarios.
- **Especialista de Soporte**: Brinda acompañamiento durante el periodo inicial.

## 4. Actividades

### 4.1 Preparación Previa
1. Programar reunión de kickoff dentro de los 5 días posteriores a la firma del contrato.
2. Enviar al cliente el "SGC-FOR-SAC-002 Formulario de Recopilación de Información Inicial".
3. Revisar requerimientos específicos documentados durante la venta.
4. Crear el proyecto de implementación en el sistema de gestión de proyectos.
5. Asignar los recursos necesarios según el tamaño y complejidad del proyecto.

### 4.2 Reunión de Kickoff
1. Presentar al equipo que participará en la implementación.
2. Revisar el alcance del proyecto y confirmar entregables.
3. Presentar el cronograma propuesto y ajustarlo según necesidades del cliente.
4. Definir canales de comunicación y frecuencia de reuniones de seguimiento.
5. Establecer roles y responsabilidades tanto del equipo interno como del cliente.
6. Documentar acuerdos en el "SGC-REG-SAC-015 Acta de Kickoff".

### 4.3 Configuración Inicial
1. Crear la instancia del cliente en el sistema.
2. Configurar parámetros básicos según información recopilada:
   - Estructura organizacional
   - Usuarios y perfiles
   - Personalización de interfaz
   - Integraciones requeridas
3. Realizar pruebas de configuración inicial.
4. Preparar el entorno de capacitación.
5. Documentar la configuración en "SGC-REG-SAC-016 Documento de Configuración".

### 4.4 Capacitación de Usuarios
1. Identificar los perfiles de usuarios a capacitar:
   - Administradores del sistema
   - Usuarios avanzados
   - Usuarios básicos
2. Preparar material de capacitación específico para cada perfil.
3. Realizar sesiones de capacitación según el siguiente esquema:
   - Sesión 1: Funcionalidades básicas (navegación, interfaz, configuración personal)
   - Sesión 2: Funcionalidades específicas por rol
   - Sesión 3: Administración del sistema (solo para administradores)
4. Proporcionar ejercicios prácticos durante cada sesión.
5. Evaluar la comprensión mediante casos de uso reales.
6. Registrar asistencia y resultados en "SGC-REG-SAC-017 Registro de Capacitación".

### 4.5 Migración de Datos
1. Revisar los datos a migrar y su formato actual.
2. Proporcionar plantillas para la recopilación de datos si es necesario.
3. Validar la calidad de los datos proporcionados por el cliente.
4. Ejecutar la migración en el entorno de pruebas.
5. Validar los resultados con el cliente.
6. Ejecutar la migración en el entorno de producción.
7. Documentar el proceso en "SGC-REG-SAC-018 Informe de Migración de Datos".

### 4.6 Pruebas de Aceptación
1. Definir los escenarios de prueba en colaboración con el cliente.
2. Documentar los casos de prueba en "SGC-FOR-SAC-003 Casos de Prueba".
3. Acompañar al cliente durante la ejecución de las pruebas.
4. Registrar los resultados y cualquier incidencia detectada.
5. Implementar ajustes necesarios según resultados.
6. Obtener la aceptación formal del cliente para el paso a producción.

### 4.7 Puesta en Producción
1. Verificar que todas las configuraciones estén completadas.
2. Confirmar que todos los usuarios estén creados y capacitados.
3. Realizar la puesta en producción según el plan establecido.
4. Proporcionar acompañamiento in situ durante el primer día de uso.
5. Establecer un canal prioritario de soporte durante las primeras dos semanas.
6. Documentar la puesta en producción en "SGC-REG-SAC-019 Acta de Go-Live".

### 4.8 Seguimiento Post-Implementación
1. Realizar reuniones de seguimiento con frecuencia decreciente:
   - Primera semana: Diarias
   - Segunda semana: Tres veces por semana
   - Tercer y cuarta semana: Semanal
   - Segundo y tercer mes: Quincenal
2. Identificar y resolver rápidamente cualquier incidencia.
3. Proporcionar capacitación adicional en áreas identificadas como necesarias.
4. Entregar documentación final del proyecto.
5. Realizar reunión de cierre del onboarding al finalizar el tercer mes.
6. Transferir la cuenta al equipo de soporte regular.

## 5. Documentos de Referencia
- SGC-FOR-SAC-002: Formulario de Recopilación de Información Inicial
- SGC-FOR-SAC-003: Casos de Prueba
- SGC-REG-SAC-015: Acta de Kickoff
- SGC-REG-SAC-016: Documento de Configuración
- SGC-REG-SAC-017: Registro de Capacitación
- SGC-REG-SAC-018: Informe de Migración de Datos
- SGC-REG-SAC-019: Acta de Go-Live
- SGC-MAN-SAC-001: Manual de Usuario

## 6. Historial de Revisiones
| Revisión | Fecha | Descripción del Cambio | Autor | Aprobado por |
|----------|-------|------------------------|-------|--------------|
| 1 | 2024-04-05 | Versión inicial | Patricia Vega | Miguel Torres |
`
  }
];

export default customerServiceDocs; 