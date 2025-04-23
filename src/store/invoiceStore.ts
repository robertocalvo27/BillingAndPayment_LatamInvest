import { create } from 'zustand';
import { Invoice, InvoiceStatus } from '../types';
import { mockInvoices } from '../data/mockData';

interface InvoiceState {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchInvoices: () => Promise<void>;
  getInvoiceById: (id: number) => Invoice | undefined;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Promise<void>;
  updateInvoice: (id: number, invoice: Partial<Invoice>) => Promise<void>;
  updateInvoiceStatus: (id: number, status: InvoiceStatus) => Promise<void>;
  deleteInvoice: (id: number) => Promise<void>;
  setCurrentInvoice: (invoice: Invoice | null) => void;
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoices: [],
  currentInvoice: null,
  isLoading: false,
  error: null,
  
  fetchInvoices: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we're using mock data
      setTimeout(() => {
        set({ invoices: mockInvoices, isLoading: false });
      }, 500);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  getInvoiceById: (id) => {
    return get().invoices.find(invoice => invoice.id === id);
  },
  
  addInvoice: async (invoiceData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      const newInvoice = {
        ...invoiceData,
        id: Math.max(0, ...get().invoices.map(i => i.id)) + 1,
      } as Invoice;
      
      setTimeout(() => {
        set(state => ({ 
          invoices: [...state.invoices, newInvoice],
          isLoading: false 
        }));
      }, 500);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  updateInvoice: async (id, invoiceData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        set(state => ({
          invoices: state.invoices.map(invoice => 
            invoice.id === id ? { ...invoice, ...invoiceData } : invoice
          ),
          currentInvoice: state.currentInvoice?.id === id 
            ? { ...state.currentInvoice, ...invoiceData } 
            : state.currentInvoice,
          isLoading: false
        }));
      }, 500);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  updateInvoiceStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        set(state => ({
          invoices: state.invoices.map(invoice => 
            invoice.id === id ? { ...invoice, estado: status } : invoice
          ),
          currentInvoice: state.currentInvoice?.id === id 
            ? { ...state.currentInvoice, estado: status } 
            : state.currentInvoice,
          isLoading: false
        }));
      }, 500);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  deleteInvoice: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        set(state => ({
          invoices: state.invoices.filter(invoice => invoice.id !== id),
          currentInvoice: state.currentInvoice?.id === id ? null : state.currentInvoice,
          isLoading: false
        }));
      }, 500);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  setCurrentInvoice: (invoice) => {
    set({ currentInvoice: invoice });
  }
}));