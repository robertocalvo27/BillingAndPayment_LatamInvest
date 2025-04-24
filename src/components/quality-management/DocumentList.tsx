import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QualityDocument } from '../../types/quality-management';
import qualityPolicies from '../../data/quality-management/documents/quality-policies';
import resourceProcedures from '../../data/quality-management/documents/resource-procedures';
import qualityProcedures from '../../data/quality-management/documents/quality-procedures';
import customerServiceDocs from '../../data/quality-management/documents/customer-service';
import riskManagementDocs from '../../data/quality-management/documents/risk-management';
import { formatDate } from '../../utils/dateUtils';

interface DocumentListProps {
  category: string;
  type?: string;
}

const DocumentList: React.FC<DocumentListProps> = ({ category, type }) => {
  const [documents, setDocuments] = useState<QualityDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let docs: QualityDocument[] = [];
    
    // Combine all document sources
    const allDocs = [
      ...qualityPolicies, 
      ...resourceProcedures, 
      ...qualityProcedures,
      ...customerServiceDocs,
      ...riskManagementDocs
    ];
    
    // Filter by category and type if provided
    if (category && type) {
      docs = allDocs.filter(doc => doc.category === category && doc.type === type);
    } else if (category) {
      docs = allDocs.filter(doc => doc.category === category);
    } else if (type) {
      docs = allDocs.filter(doc => doc.type === type);
    } else {
      docs = allDocs;
    }
    
    setDocuments(docs);
  }, [category, type]);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar documentos..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredDocuments.length === 0 ? (
        <p className="text-gray-500 py-4 text-center">No se encontraron documentos que coincidan con los criterios.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full h-16 border-gray-300 border-b py-8">
                <th className="text-left pl-4">ID</th>
                <th className="text-left">Título</th>
                <th className="text-left">Descripción</th>
                <th className="text-left">Versión</th>
                <th className="text-left">Fecha</th>
                <th className="text-left">Estado</th>
                <th className="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="h-16 border-gray-300 border-b">
                  <td className="pl-4">{doc.id}</td>
                  <td className="max-w-xs truncate">{doc.title}</td>
                  <td className="max-w-xs truncate">{doc.description}</td>
                  <td>{doc.version}</td>
                  <td>{formatDate(doc.updatedAt)}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                      doc.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {doc.status === 'approved' ? 'Aprobado' :
                       doc.status === 'draft' ? 'Borrador' : 'Revisión'}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/quality-management/view/${doc.id}`} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentList; 