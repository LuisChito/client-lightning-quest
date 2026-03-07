// Tipos para los datos de los nodos
export interface NodeData {
  label: string
  nombre: string
  balance: number
  estado: 'activo' | 'inactivo'
  isPlaceholder?: boolean
}

// Tipo para información de nodo desde backend
export interface NodoBackend {
  id: number
  nombre: string
  balance: number
  estado: 'activo' | 'inactivo'
}
