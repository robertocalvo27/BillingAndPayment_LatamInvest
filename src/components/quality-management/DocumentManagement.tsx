import React, { useState } from 'react';
import { useQualityManagementStore } from '../../store/qualityManagementStore';
import { Card } from '../common/Card';
import DocumentViewer from './DocumentViewer';
import {
  FileText,
  FolderOpen,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { ProcessCategory, DocumentType } from '../../types/quality-management';

const DocumentCategories: Record<ProcessCategory, { title: string; description: string }> = {
  software_development: {
    title: "Desarrollo de Software",
    description: "Procesos y estándares para el desarrollo de soluciones digitales"
  },
  project_management: {
    title: "Gestión de Proyectos",
    description: "Metodologías y procedimientos para la gestión de proyectos"
  },
  customer_service: {
    title: "Servicio al Cliente",
    description: "Protocolos y estándares de atención al cliente"
  },
  quality_assurance: {
    title: "Aseguramiento de Calidad",
    description: "Procedimientos y controles de calidad"
  },
  resource_management: {
    title: "Gestión de Recursos",
    description: "Administración de recursos humanos y materiales"
  },
  risk_management: {
    title: "Gestión de Riesgos",
    description: "Evaluación y mitigación de riesgos"
  },
  continuous_improvement: {
    title: "Mejora Continua",
    description: "Procesos de mejora y optimización"
  }
};

const DocumentTypes: Record<DocumentType, { title: string; description: string }> = {
  policy: {
    title: "Políticas",
    description: "Directrices y lineamientos organizacionales"
  },
  procedure: {
    title: "Procedimientos",
    description: "Pasos detallados para ejecutar procesos"
  },
  work_instruction: {
    title: "Instrucciones de Trabajo",
    description: "Guías específicas para tareas"
  },
  form: {
    title: "Formularios",
    description: "Documentos para registro de información"
  },
  record: {
    title: "Registros",
    description: "Evidencias de actividades realizadas"
  },
  manual: {
    title: "Manuales",
    description: "Documentación completa de sistemas o procesos"
  }
};

const DocumentManagement: React.FC = () => {
  const { documents, documentFilters } = useQualityManagementStore();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const mandatoryDocs = [
    {
      code: "SGC-POL-001",
      title: "Política de Calidad",
      category: "quality_assurance",
      type: "policy",
      description: "Política de calidad de Bizflow enfocada en soluciones tecnológicas ágiles y de alto impacto"
    },
    {
      code: "SGC-MAN-001",
      title: "Manual de Calidad",
      category: "quality_assurance",
      type: "manual",
      description: "Manual del Sistema de Gestión de Calidad ISO 9001:2015"
    },
    {
      code: "SGC-PRO-001",
      title: "Control de Documentos y Registros",
      category: "quality_assurance",
      type: "procedure",
      description: "Procedimiento para el control de documentos y registros del SGC"
    },
    {
      code: "SGC-PRO-002",
      title: "Auditorías Internas",
      category: "quality_assurance",
      type: "procedure",
      description: "Procedimiento para la realización de auditorías internas"
    },
    {
      code: "SGC-PRO-003",
      title: "Gestión de Riesgos y Oportunidades",
      category: "risk_management",
      type: "procedure",
      description: "Procedimiento para la gestión de riesgos y oportunidades"
    }
  ];

  if (selectedDocument) {
    return <DocumentViewer documentCode={selectedDocument} onBack={() => setSelectedDocument(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header y Acciones */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documentación del SGC</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gestión documental del Sistema de Gestión de Calidad ISO 9001:2015
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Documento
          </button>
          <button className="btn btn-secondary flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Categorías de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(DocumentCategories).map(([key, category]) => (
          <Card key={key} className="hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <FolderOpen className="w-6 h-6 text-primary-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {documents.filter(doc => doc.category === key).length} docs
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lista de Documentos */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Documentos Obligatorios</h3>
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowUpDown className="w-4 h-4 mr-1" />
              Ordenar
            </button>
          </div>
          <div className="space-y-4">
            {mandatoryDocs.map((doc) => (
              <div
                key={doc.code}
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedDocument(doc.code)}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">{doc.code}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Aprobado
                      </span>
                    </div>
                    <h4 className="text-base font-medium text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Rev. 1.0</p>
                    <p className="text-xs text-gray-500">Actualizado: 2024-03-20</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocumentManagement; 