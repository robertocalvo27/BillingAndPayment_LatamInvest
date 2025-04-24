import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';
import { Card } from '../common/Card';
import {
  BarChart,
  FileText,
  AlertTriangle,
  Target,
  Users,
  BookOpen,
  Activity,
  Shield
} from 'lucide-react';
import DocumentManagement from './DocumentManagement';
import MetricsManagement from './MetricsManagement';
import { initializeQualityManagementData } from '../../data/quality-management/initialize';
import { useQualityManagementStore } from '../../store/qualityManagementStore';

const QualityDashboard: React.FC = () => {
  const { documents, metrics } = useQualityManagementStore();
  
  // Inicializar datos solo si aún no hay documentos cargados
  useEffect(() => {
    if (documents.length === 0) {
      initializeQualityManagementData();
      console.log('Documentos de calidad inicializados');
    } else {
      console.log('Documentos ya cargados:', documents.length);
      // Log de documentos por categoría para depuración
      const categories = ['software_development', 'project_management', 'customer_service', 'quality_assurance', 'resource_management', 'risk_management', 'continuous_improvement'];
      categories.forEach(category => {
        const count = documents.filter(doc => doc.category === category).length;
        console.log(`Categoría ${category}: ${count} documentos`);
      });
    }
    
    if (metrics.length === 0) {
      console.log('No hay métricas cargadas, inicializando...');
    } else {
      console.log('Métricas ya cargadas:', metrics.length);
    }
  }, [documents.length, metrics.length]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sistema de Gestión de Calidad ISO 9001:2015</h1>
        <div className="flex space-x-2">
          <button className="btn btn-primary">
            Nuevo Documento
          </button>
          <button className="btn btn-secondary">
            Reportar Incidente
          </button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">
            <Activity className="w-4 h-4 mr-2" />
            Vista General
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            Documentación
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart className="w-4 h-4 mr-2" />
            Métricas
          </TabsTrigger>
          <TabsTrigger value="audits">
            <Shield className="w-4 h-4 mr-2" />
            Auditorías
          </TabsTrigger>
          <TabsTrigger value="training">
            <BookOpen className="w-4 h-4 mr-2" />
            Capacitación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    Documentos Activos
                  </span>
                </div>
                <h3 className="text-3xl font-bold mt-4">{documents.length}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {documents.filter(doc => doc.status === 'review').length} pendientes de revisión
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    No Conformidades
                  </span>
                </div>
                <h3 className="text-3xl font-bold mt-4">3</h3>
                <p className="text-sm text-gray-600 mt-1">2 en proceso de resolución</p>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    Objetivos de Calidad
                  </span>
                </div>
                <h3 className="text-3xl font-bold mt-4">85%</h3>
                <p className="text-sm text-gray-600 mt-1">Cumplimiento promedio</p>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                {/* Activity items would go here */}
              </div>
            </div>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Próximas Tareas</h3>
              <div className="space-y-4">
                {/* Task items would go here */}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <DocumentManagement />
        </TabsContent>

        <TabsContent value="metrics">
          <MetricsManagement />
        </TabsContent>

        <TabsContent value="audits">
          <div className="bg-white rounded-lg shadow-card p-6 text-center">
            <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Gestión de Auditorías</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              El módulo de gestión de auditorías estará disponible en próximas actualizaciones.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="bg-white rounded-lg shadow-card p-6 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Gestión de Capacitación</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              El módulo de gestión de capacitación estará disponible en próximas actualizaciones.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityDashboard; 