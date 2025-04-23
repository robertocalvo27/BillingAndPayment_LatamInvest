import { QualityDocument, VersionHistory } from '../types/quality-management';
import matter from 'gray-matter';

export async function loadDocument(path: string): Promise<QualityDocument> {
  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error('Error al cargar el documento');
    }
    
    const markdown = await response.text();
    
    try {
      // Intentar parsear con gray-matter para documentos con frontmatter
      const { data, content } = matter(markdown);
      
      // Si el documento tiene frontmatter, usamos esos datos
      if (Object.keys(data).length > 0) {
        return {
          ...data,
          content: content.trim()
        } as QualityDocument;
      } else {
        // Si no tiene frontmatter, extraemos la información del contenido markdown
        const lines = markdown.split('\n');
        const title = lines[0].replace('# ', '').trim();
        let code = '';
        let revision = '';
        let lastUpdated = '';
        let approvedBy = '';

        // Extraer metadatos básicos del markdown
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith('**Código:**')) {
            code = line.replace('**Código:**', '').trim();
          } else if (line.startsWith('**Versión:**')) {
            revision = line.replace('**Versión:**', '').trim();
          } else if (line.startsWith('**Fecha de Aprobación:**')) {
            lastUpdated = line.replace('**Fecha de Aprobación:**', '').trim();
          } else if (line.startsWith('**Aprobado por:**')) {
            approvedBy = line.replace('**Aprobado por:**', '').trim();
          }
        }

        // Procesar el historial de versiones si existe
        const versionHistoryStart = markdown.indexOf('## Historial de Versiones');
        const versionHistory: VersionHistory[] = [];
        
        if (versionHistoryStart !== -1) {
          const tableStartIndex = markdown.indexOf('|', versionHistoryStart);
          const tableEndIndex = markdown.indexOf('\n\n', tableStartIndex);
          
          if (tableStartIndex !== -1) {
            const tableLines = markdown.substring(tableStartIndex, tableEndIndex !== -1 ? tableEndIndex : undefined)
              .split('\n')
              .filter(line => line.trim().startsWith('|') && !line.includes('---'));
              
            // Saltarse la fila de cabecera
            if (tableLines.length > 2) {
              tableLines.splice(0, 2); // Eliminar cabecera y separador
            }
            
            for (const line of tableLines) {
              const cells = line.split('|').filter(cell => cell.trim().length > 0);
              if (cells.length >= 3) {
                versionHistory.push({
                  version: cells[0]?.trim() || '',
                  date: cells[1]?.trim() || '',
                  description: cells[2]?.trim() || '',
                  author: cells[3]?.trim() || ''
                });
              }
            }
          }
        }

        return {
          code,
          title,
          revision,
          lastUpdated,
          approvedBy: { name: approvedBy },
          content: markdown,
          versionHistory
        };
      }
    } catch (parseError) {
      console.error('Error parsing markdown:', parseError);
      
      // Si no podemos parsear el markdown, devolvemos el contenido sin procesar
      return {
        code: path.split('/').pop()?.split('_')[0] || '',
        title: path.split('/').pop()?.split('_')[1]?.replace('.md', '') || 'Documento sin título',
        content: markdown
      };
    }
  } catch (error) {
    console.error('Error loading document:', error);
    throw error;
  }
}

export async function loadAllDocuments(): Promise<QualityDocument[]> {
  try {
    const documents = import.meta.glob('/docs/quality-management/**/*.md');
    const loadedDocs = await Promise.all(
      Object.entries(documents).map(async ([path, loader]) => {
        try {
          const moduleResult = await loader();
          if (moduleResult && typeof moduleResult === 'object' && 'default' in moduleResult) {
            return moduleResult.default as QualityDocument;
          }
          return null;
        } catch (error) {
          console.error(`Error loading document ${path}:`, error);
          return null;
        }
      })
    );
    
    return loadedDocs.filter((doc): doc is QualityDocument => doc !== null);
  } catch (error) {
    console.error('Error loading documents:', error);
    throw new Error('Error al cargar los documentos');
  }
} 