import { Box, Divider, Stack, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { border, background } from '../../../../theme/colors'
import type { Node } from '@xyflow/react'
import { useState, useEffect } from 'react'
import { useReactFlow } from '@xyflow/react'

interface NodeDetailsPanelProps {
  node: Node | null
}

function NodeDetailsPanel({ node }: NodeDetailsPanelProps) {
  // ALWAYS call all hooks first (Rules of Hooks)
  const { setNodes } = useReactFlow()
  const [nombre, setNombre] = useState('')
  const [balance, setBalance] = useState(0)
  const [estado, setEstado] = useState<'activo' | 'inactivo'>('activo')

  // Extract node data (safe to access with optional chaining)
  const nodeLabel = (node?.data?.label as string) || 'Unknown'
  const isPlaceholder = node?.data?.isPlaceholder as boolean | undefined

  // Initialize values when node changes
  useEffect(() => {
    // Skip if no node or placeholder
    if (!node || isPlaceholder) return
    
    const nodeData = node.data as { 
      nombre?: string
      balance?: number
      estado?: 'activo' | 'inactivo'
    }
    
    setNombre(nodeData?.nombre || nodeLabel)
    setBalance(nodeData?.balance || 1495918)
    setEstado(nodeData?.estado || 'activo')
  }, [node?.id, nodeLabel, isPlaceholder])

  // Early returns AFTER all hooks
  if (!node || isPlaceholder) {
    return null
  }

  // Actualizar el nodo en tiempo real
  const updateNode = (updates: { nombre?: string; balance?: number; estado?: 'activo' | 'inactivo' }) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          const newData = {
            ...n.data,
            ...updates,
          }
          // Actualizar label si cambia el nombre
          if (updates.nombre !== undefined) {
            newData.label = updates.nombre
          }
          return {
            ...n,
            data: newData,
          }
        }
        return n
      })
    )
  }

  // Formatear balance
  const formatBalance = (sats: number) => {
    return new Intl.NumberFormat('en-US').format(sats)
  }

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: { xs: 180, lg: 0 },
        p: 2,
        borderRadius: 1.5,
        border: `1px solid ${border.subtle}`,
        backgroundColor: background.panelLight,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.25 }}>
          Detalles del Nodo
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ID: {node.id}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: border.divider }} />

      {/* Campos editables - Actualización en tiempo real */}
      <Stack spacing={2}>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => {
            const newNombre = e.target.value
            setNombre(newNombre)
            updateNode({ nombre: newNombre })
          }}
          size="small"
          fullWidth
          variant="outlined"
        />

        <TextField
          label="Balance (sats)"
          type="number"
          value={balance}
          onChange={(e) => {
            const newBalance = Number(e.target.value)
            setBalance(newBalance)
            updateNode({ balance: newBalance })
          }}
          size="small"
          fullWidth
          variant="outlined"
          helperText={`${formatBalance(balance)} satoshis`}
        />

        <FormControl size="small" fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estado}
            label="Estado"
            onChange={(e) => {
              const newEstado = e.target.value as 'activo' | 'inactivo'
              setEstado(newEstado)
              updateNode({ estado: newEstado })
            }}
          >
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Divider sx={{ borderColor: border.divider }} />

      {/* Información adicional (solo lectura) */}
      <Stack spacing={1.1}>
        <Stack direction="row" justifyContent="space-between" gap={1.5}>
          <Typography variant="caption" color="text.secondary">
            Node Type
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            lightning
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1.5}>
          <Typography variant="caption" color="text.secondary">
            Implementation
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            LND
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={1.5}>
          <Typography variant="caption" color="text.secondary">
            Version
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            v0.20.0-beta
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default NodeDetailsPanel

