import { Box, Typography, Paper } from '@mui/material'
import { useState, useEffect } from 'react'
import { lightning, status } from '../../theme/colors'

interface NodeCreationAnimationProps {
  open: boolean
  onComplete: () => void
}

const steps = [
  { text: 'Inicializando nodo...', delay: 0 },
  { text: 'Conectando a la red...', delay: 800 },
  { text: 'Nodo creado', delay: 1600 },
  { text: 'Tu nodo ahora forma parte de la red Lightning', delay: 2200, isSuccess: true },
]

function NodeCreationAnimation({ open, onComplete }: NodeCreationAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!open) {
      return
    }

    // Reset usando estado previo para evitar cascading renders
    if (currentStep !== 0) {
      setCurrentStep(0)
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    // Mostrar cada paso secuencialmente
    steps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setCurrentStep(index)
      }, step.delay)
      timers.push(timer)
    })

    // Cerrar automáticamente después de mostrar el último paso
    const closeTimer = setTimeout(() => {
      onComplete()
    }, 3000)
    timers.push(closeTimer)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onComplete])

  if (!open) return null

  const currentStepData = steps[currentStep]
  const isSuccess = currentStepData?.isSuccess

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 999,
        maxWidth: 400,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 3,
          borderRadius: 3,
          border: `2px solid ${isSuccess ? status.success : lightning.primary}`,
          background: '#ffffff',
          boxShadow: isSuccess 
            ? `0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px ${status.success}20, 0 0 40px ${status.success}15`
            : `0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px ${lightning.primary}20, 0 0 40px ${lightning.primary}15`,
          animation: 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '@keyframes slideInRight': {
            '0%': {
              transform: 'translateX(120%) scale(0.8)',
              opacity: 0,
            },
            '100%': {
              transform: 'translateX(0) scale(1)',
              opacity: 1,
            },
          },
        }}
      >
        {/* Indicador de progreso */}
        <Box
          sx={{
            width: '100%',
            height: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: 3,
            mb: 2.5,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
              height: '100%',
              background: isSuccess 
                ? `linear-gradient(90deg, ${status.success}, ${status.success}dd)`
                : `linear-gradient(90deg, ${lightning.primary}, ${lightning.light})`,
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: 3,
              boxShadow: isSuccess
                ? `0 0 10px ${status.success}40`
                : `0 0 10px ${lightning.primary}40`,
            }}
          />
        </Box>

        {/* Texto del paso actual */}
        <Typography
          variant="body1"
          sx={{
            color: isSuccess ? status.success : 'rgba(0, 0, 0, 0.87)',
            fontWeight: isSuccess ? 700 : 600,
            fontSize: isSuccess ? '1rem' : '0.95rem',
            lineHeight: 1.6,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            animation: 'fadeInUp 0.4s ease-out',
            '@keyframes fadeInUp': {
              '0%': { 
                opacity: 0,
                transform: 'translateY(10px)',
              },
              '100%': { 
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {isSuccess && (
            <Box
              component="span"
              sx={{
                fontSize: '1.5rem',
                animation: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                '@keyframes bounceIn': {
                  '0%': { transform: 'scale(0)', opacity: 0 },
                  '50%': { transform: 'scale(1.2)' },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                },
              }}
            >
              ✓
            </Box>
          )}
          {currentStepData?.text}
        </Typography>

        {/* Indicador de carga solo en pasos que no son el final */}
        {!isSuccess && (
          <Box
            sx={{
              display: 'flex',
              gap: 0.8,
              mt: 2,
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${lightning.primary}, ${lightning.light})`,
                  animation: 'wave 1.4s ease-in-out infinite',
                  animationDelay: `${index * 0.15}s`,
                  boxShadow: `0 0 10px ${lightning.primary}40`,
                  '@keyframes wave': {
                    '0%, 100%': {
                      opacity: 0.3,
                      transform: 'scale(0.7) translateY(0)',
                    },
                    '50%': {
                      opacity: 1,
                      transform: 'scale(1.3) translateY(-8px)',
                    },
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default NodeCreationAnimation
