import { create } from 'zustand'

interface Mission3UiState {
  showLevel3ReachedModal: boolean
  showSelectDestinationModal: boolean
  showInvoiceExplanationModal: boolean
  showSourceNodeAutofillModal: boolean
  invoiceAutofillRequest: string | null
  invoiceAutofillSourceNodeId: string | null
  invoiceAutofillVersion: number
  startFlow: () => void
  continueToSelectDestination: () => void
  onDestinationSelected: () => void
  startInvoiceAutofillFlow: (paymentRequest: string, sourceNodeId: string) => void
  closeSourceNodeAutofillModal: () => void
  closeAll: () => void
}

export const useMission3Store = create<Mission3UiState>((set) => ({
  showLevel3ReachedModal: false,
  showSelectDestinationModal: false,
  showInvoiceExplanationModal: false,
  showSourceNodeAutofillModal: false,
  invoiceAutofillRequest: null,
  invoiceAutofillSourceNodeId: null,
  invoiceAutofillVersion: 0,

  startFlow: () =>
    set({
      showLevel3ReachedModal: true,
      showSelectDestinationModal: false,
      showInvoiceExplanationModal: false,
      showSourceNodeAutofillModal: false,
    }),

  continueToSelectDestination: () =>
    set({
      showLevel3ReachedModal: false,
      showSelectDestinationModal: true,
      showInvoiceExplanationModal: false,
      showSourceNodeAutofillModal: false,
    }),

  onDestinationSelected: () =>
    set({
      showLevel3ReachedModal: false,
      showSelectDestinationModal: false,
      showInvoiceExplanationModal: true,
      showSourceNodeAutofillModal: false,
    }),

  startInvoiceAutofillFlow: (paymentRequest: string, sourceNodeId: string) =>
    set((state) => ({
      showLevel3ReachedModal: false,
      showSelectDestinationModal: false,
      showInvoiceExplanationModal: false,
      showSourceNodeAutofillModal: true,
      invoiceAutofillRequest: paymentRequest,
      invoiceAutofillSourceNodeId: sourceNodeId,
      invoiceAutofillVersion: state.invoiceAutofillVersion + 1,
    })),

  closeSourceNodeAutofillModal: () =>
    set({
      showSourceNodeAutofillModal: false,
    }),

  closeAll: () =>
    set({
      showLevel3ReachedModal: false,
      showSelectDestinationModal: false,
      showInvoiceExplanationModal: false,
      showSourceNodeAutofillModal: false,
      invoiceAutofillRequest: null,
      invoiceAutofillSourceNodeId: null,
    }),
}))
