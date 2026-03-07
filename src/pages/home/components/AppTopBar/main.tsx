import PersonIcon from '@mui/icons-material/Person'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Box, Stack, Typography, Chip, Divider, Modal, Button } from '@mui/material'
import { border, background, lightning } from '../../../../theme/colors'
import { useState, useEffect } from 'react'
import { useMissionStore } from '../../../../features/missions/shared/store/useMissionStore'
import { loadGameProgress } from '../../../../features/missions/shared/services/missionProgress.service'

function AppTopBar() {
  const [playerName, setPlayerName] = useState('')
  const [mission2ModalOpen, setMission2ModalOpen] = useState(false)
  const [mission2ModalShown, setMission2ModalShown] = useState(false)
  const [mission2ModalStorageKey, setMission2ModalStorageKey] = useState('mission2-unlock-modal-shown:guest')
  const { xp, missionCounter, currentMission, loadProgress } = useMissionStore()

  useEffect(() => {
    const name = localStorage.getItem('playerName')
    const normalizedName = name?.trim() || 'guest'
    const storageKey = `mission2-unlock-modal-shown:${normalizedName}`

    setMission2ModalStorageKey(storageKey)
    setMission2ModalShown(localStorage.getItem(storageKey) === 'true')

    if (name) {
      setPlayerName(name)
    }
    
    // Cargar progreso de misiones
    const savedProgress = loadGameProgress()
    if (savedProgress) {
      loadProgress(savedProgress.xp || 0, savedProgress.missionCounter || 0, savedProgress.completedMissions || [])
    } else {
      loadProgress(0, 0, [])
    }
  }, [])

  useEffect(() => {
    if (missionCounter >= 1 && !mission2ModalShown) {
      setMission2ModalOpen(true)
      setMission2ModalShown(true)
      localStorage.setItem(mission2ModalStorageKey, 'true')
    }
  }, [missionCounter, mission2ModalShown, mission2ModalStorageKey])

  const handleCloseMission2Modal = () => {
    setMission2ModalOpen(false)
  }

  return (
    <Box
      sx={{
        px: 2,
        py: 1.1,
        border: `1px solid ${border.light}`,
        borderRadius: 1.5,
        backgroundColor: background.panel,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} flexWrap="wrap">
        {/* Información del jugador */}
        <Stack direction="row" alignItems="center" spacing={1.5} divider={<Divider orientation="vertical" flexItem />}>
          <Chip
            icon={<PersonIcon sx={{ fontSize: '1rem' }} />}
            label={playerName || 'Jugador'}
            size="small"
            sx={{
              fontWeight: 600,
              backgroundColor: background.secondary,
              color: lightning.dark,
              border: `1px solid ${lightning.border}`,
            }}
          />
          
          <Chip
            icon={<EmojiEventsIcon sx={{ fontSize: '1rem', color: lightning.primary }} />}
            label={`${xp} XP`}
            size="small"
            sx={{
              fontWeight: 600,
              backgroundColor: background.secondary,
              color: 'text.primary',
              border: `1px solid ${lightning.border}`,
            }}
          />

          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              fontWeight: 500,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            {currentMission?.title || 'Todas las misiones completadas'}
          </Typography>
        </Stack>
      </Stack>

      <Modal
        open={mission2ModalOpen}
        onClose={handleCloseMission2Modal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 520,
            p: 3,
            borderRadius: 2,
            border: `2px solid ${lightning.primary}`,
            background: background.panel,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
            outline: 'none',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, color: lightning.dark, mb: 1 }}>
            Mision 2 Desbloqueada
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
            Alcanzaste 100 XP.
          </Typography>
          <Button
            variant="contained"
            onClick={handleCloseMission2Modal}
            sx={{
              fontWeight: 700,
              background: `linear-gradient(180deg, ${lightning.primary} 0%, ${lightning.dark} 100%)`,
            }}
          >
            Continuar
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default AppTopBar
