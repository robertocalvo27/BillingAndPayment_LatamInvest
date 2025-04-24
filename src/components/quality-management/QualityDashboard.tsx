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
import { initializeQualityManagementData } from '../../data/quality-management/initialize';
import { useQualityManagementStore } from '../../store/qualityManagementStore';

const QualityDashboard: React.FC = () => {
  const { documents } = useQualityManagementStore();
  
  // Inicializar datos solo si aún no hay documentos cargados
  useEffect(() => {
    if (documents.length === 0) {
      initializeQualityManagementData();
      console.log('Documentos de calidad inicializados');
    }
  }, [documents.length]);

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
                <h3 className="text-3xl font-bold mt-4">124</h3>
                <p className="text-sm text-gray-600 mt-1">12 pendientes de revisión</p>
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
          {/* Metrics content */}
        </TabsContent>

        <TabsContent value="audits">
          {/* Audits content */}
        </TabsContent>

        <TabsContent value="training">
          {/* Training content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualityDashboard; 