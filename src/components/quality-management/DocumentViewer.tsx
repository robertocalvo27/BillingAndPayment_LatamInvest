import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Clock, CheckCircle2, History } from 'lucide-react';
import { Card } from '../common/Card';
import { QualityDocument, VersionHistory } from '../../types/quality-management';
import { loadDocument } from '../../utils/documentLoader';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocumentViewerProps {
  documentCode: string;
  onBack: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentCode, onBack }) => {
  const [document, setDocument] = useState<QualityDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para determinar la ruta del documento según su código
  const getDocumentPath = (code: string): string => {
    const parts = code.split('-');
    const type = parts[1].toLowerCase();
    let folder = '';
    
    switch (type) {
      case 'pol':
        folder = 'policies';
        break;
      case 'man':
        folder = 'manuals';
        break;
      case 'pro':
        folder = 'procedures';
        break;
      case 'sac':
        folder = 'procedures/service';
        break;
      case 'pry':
        folder = 'procedures';
        break;
      case 'gr':
        folder = 'procedures/risk';
        break;
      case 'qa':
        folder = 'procedures/quality';
        break;
      case 'rh':
        folder = 'procedures/resource';
        break;
      default:
        folder = '';
    }

    const fileName = `${code}_${getDocumentName(code)}.md`;
    return `/docs/quality-management/${folder}/${fileName}`;
  };

  const getDocumentName = (code: string): string => {
    switch (code) {
      case 'SGC-POL-001':
        return 'PoliticaCalidad';
      case 'SGC-MAN-001':
        return 'ManualCalidad';
      case 'SGC-PRO-001':
        return 'ControlDocumentos';
      case 'SGC-PRO-002':
        return 'AuditoriasInternas';
      case 'SGC-PRO-003':
        return 'GestionRiesgos';
      case 'SGC-SAC-001':
        return 'AtencionCliente';
      case 'SGC-SAC-002':
        return 'GestionQuejas';
      case 'SGC-SAC-003':
        return 'MedicionSatisfaccion';
      case 'SGC-SAC-004':
        return 'SoporteTecnico';
      case 'SGC-SAC-005':
        return 'OnboardingClientes';
      case 'SGC-PRY-001':
        return 'IniciodeProyectos';
      case 'SGC-PRY-002':
        return 'PlanificaciondeProyectos';
      case 'SGC-PRY-003':
        return 'EjecucionyControldeProyectos';
      case 'SGC-PRY-004':
        return 'CierredeProyectos';
      case 'SGC-GR-001':
        return 'IdentificacionRiesgos';
      case 'SGC-GR-002':
        return 'TratamientoRiesgos';
      case 'SGC-GR-003':
        return 'GestionCrisis';
      case 'SGC-GR-004':
        return 'MonitoreoRiesgos';
      case 'SGC-GR-005':
        return 'GestionRiesgosOperacionales';
      case 'SGC-QA-001':
        return 'GestionNoConformidades';
      case 'SGC-QA-002':
        return 'AuditoriasInternas';
      case 'SGC-QA-003':
        return 'ControlCalibracionEquipos';
      case 'SGC-QA-004':
        return 'RevisionDireccion';
      case 'SGC-QA-005':
        return 'MejoraContinua';
      case 'SGC-RH-001':
        return 'GestionCapacidadesCompetencias';
      case 'SGC-RH-002':
        return 'GestionAsignacionRecursos';
      case 'SGC-RH-003':
        return 'GestionAmbienteTrabajo';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Usar getDocumentPath para obtener la ruta correcta
        const docPath = getDocumentPath(documentCode);
        console.log('Fetching document from:', docPath);
        
        const doc = await loadDocument(docPath);
        setDocument(doc);
      } catch (err) {
        console.error('Error loading document:', err);
        setError('Error al cargar el documento');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error || 'No se pudo cargar el documento'}</p>
        <button 
          onClick={onBack}
          className="mt-4 text-primary-600 hover:text-primary-800 underline"
        >
          Volver a la lista de documentos
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a Documentos
        </button>
        <button className="btn btn-secondary flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Descargar PDF
        </button>
      </div>

      {/* Document Info */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500">{document.id}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Aprobado
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{document.title}</h1>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Rev. {document.revision || '1.0'}</p>
              <p className="text-xs text-gray-500">Actualizado: {document.updatedAt || '-'}</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{document.content}</Markdown>
          </div>
        </div>
      </Card>

      {/* Version History - Only display if available */}
      {document.versionHistory && document.versionHistory.length > 0 && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <History className="w-5 h-5 mr-2" />
              Historial de Versiones
            </h3>
            <div className="space-y-4">
              {document.versionHistory.map((version: VersionHistory, index: number) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">Revisión {version.version}</p>
                      <p className="text-gray-500">{version.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">{version.date}</p>
                    <p className="text-gray-500">Por: {version.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DocumentViewer; 