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
  AlertCircle,
  ArrowLeft
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProcessCategory | null>(null);

  // Obtener documentos filtrados por categoría "software_development"
  const softwareDevelopmentDocuments = documents.filter(
    doc => doc.category === 'software_development'
  );

  // Obtener documentos filtrados por categoría "project_management"
  const projectManagementDocuments = documents.filter(
    doc => doc.category === 'project_management'
  );

  // Otros filtros para el resto de categorías
  const customerServiceDocuments = documents.filter(
    doc => doc.category === 'customer_service'
  );

  const qualityAssuranceDocuments = documents.filter(
    doc => doc.category === 'quality_assurance'
  );

  const resourceManagementDocuments = documents.filter(
    doc => doc.category === 'resource_management'
  );

  const riskManagementDocuments = documents.filter(
    doc => doc.category === 'risk_management'
  );

  const continuousImprovementDocuments = documents.filter(
    doc => doc.category === 'continuous_improvement'
  );

  // Obtener documentos de la categoría seleccionada o todos si no hay categoría seleccionada
  const filteredDocuments = selectedCategory 
    ? documents.filter(doc => doc.category === selectedCategory)
    : [];

  // Función para manejar el clic en una categoría
  const handleCategoryClick = (category: ProcessCategory) => {
    setSelectedCategory(category);
  };

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

  // Si hay una categoría seleccionada, mostrar los documentos de esa categoría
  if (selectedCategory) {
    const categoryName = DocumentCategories[selectedCategory].title;
    
    return (
      <div className="space-y-6">
        {/* Cabecera con botón para volver */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a categorías
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{categoryName}</h2>
            <p className="mt-1 text-sm text-gray-500">
              {DocumentCategories[selectedCategory].description}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="btn btn-primary flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Documento
            </button>
          </div>
        </div>
        
        {/* Barra de búsqueda */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Buscar en ${categoryName}...`}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Lista de documentos de la categoría */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Documentos de {categoryName}</h3>
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <ArrowUpDown className="w-4 h-4 mr-1" />
                Ordenar
              </button>
            </div>
            <div className="space-y-4">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedDocument(doc.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary-50 rounded-lg">
                        <FileText className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-500">{doc.id}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            doc.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {doc.status === 'approved' ? (
                              <><CheckCircle2 className="w-3 h-3 mr-1" />Aprobado</>
                            ) : doc.status === 'pending' ? (
                              <><Clock className="w-3 h-3 mr-1" />Pendiente</>
                            ) : (
                              <><AlertCircle className="w-3 h-3 mr-1" />En revisión</>
                            )}
                          </span>
                        </div>
                        <h4 className="text-base font-medium text-gray-900">{doc.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Rev. {doc.revision}</p>
                        <p className="text-xs text-gray-500">Actualizado: {doc.updatedAt}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No hay documentos en esta categoría</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categorías de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(DocumentCategories).map(([key, category]) => (
          <Card 
            key={key} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCategoryClick(key as ProcessCategory)}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <FolderOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                  
                  {/* Mostrar número de documentos para cada categoría */}
                  <div className="mt-3">
                    {key === 'software_development' && (
                      <p className="text-sm font-medium text-gray-700">
                        {softwareDevelopmentDocuments.length} docs
                      </p>
                    )}
                    {key === 'project_management' && (
                      <p className="text-sm font-medium text-gray-700">
                        {projectManagementDocuments.length} docs
                      </p>
                    )}
                    {key === 'customer_service' && (
                      <p className="text-sm font-medium text-gray-700">
                        {customerServiceDocuments.length} docs
                      </p>
                    )}
                    {key === 'quality_assurance' && (
                      <p className="text-sm font-medium text-gray-700">
                        {qualityAssuranceDocuments.length} docs
                      </p>
                    )}
                    {key === 'resource_management' && (
                      <p className="text-sm font-medium text-gray-700">
                        {resourceManagementDocuments.length} docs
                      </p>
                    )}
                    {key === 'risk_management' && (
                      <p className="text-sm font-medium text-gray-700">
                        {riskManagementDocuments.length} docs
                      </p>
                    )}
                    {key === 'continuous_improvement' && (
                      <p className="text-sm font-medium text-gray-700">
                        {continuousImprovementDocuments.length} docs
                      </p>
                    )}
                  </div>
                </div>
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