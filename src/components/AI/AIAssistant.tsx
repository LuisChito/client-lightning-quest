// components/AI/AIAssistant.tsx
import { Box, Fab, Paper, Typography, TextField, IconButton, Stack, CircularProgress } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { useState, useRef, useEffect } from 'react'
import { border, lightning } from '../../theme/colors'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const API_URL = import.meta.env.VITE_API_BASE

function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      })
      const data = await res.json()
      setMessages(data.history)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error al conectar.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            width: 290,
            height: 520,
            zIndex: 1300,
            border: `1px solid ${border.medium}`,
            backgroundColor: '#fff',
            borderRadius: 2.5,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              px: 2, py: 1.2,
              borderBottom: `1px solid ${border.medium}`,
              backgroundColor: '#fafafa',
              flexShrink: 0,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                component="img"
                src="/bitcoin-character.png"
                alt="AI"
                sx={{ width: 22, height: 22, objectFit: 'contain' }}
              />
              <Typography variant="body2" fontWeight={700} sx={{ color: lightning.dark, fontSize: 13 }}>
                Habla con Satoshi
              </Typography>
            </Stack>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ p: 0.4 }}>
              <CloseRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Stack>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 1.8,
              py: 1.2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {messages.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', mt: 2, fontSize: 12, lineHeight: 1.6 }}
              >
                Pregúntame cualquier cosa<br />sobre Lightning Network ⚡
              </Typography>
            )}
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  backgroundColor: msg.role === 'user' ? lightning.background : '#f5f5f5',
                  border: `1px solid ${msg.role === 'user' ? lightning.border : '#e0e0e0'}`,
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  px: 1.5, py: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontSize: 12.5, lineHeight: 1.65, whiteSpace: 'pre-wrap', color: '#1a1a1a' }}
                >
                  {msg.content}
                </Typography>
              </Box>
            ))}
            {loading && (
              <Box sx={{ alignSelf: 'flex-start', pl: 0.5, pt: 0.5 }}>
                <CircularProgress size={14} sx={{ color: lightning.primary }} />
              </Box>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* Input */}
          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              px: 1.5, py: 1,
              borderTop: `1px solid ${border.medium}`,
              flexShrink: 0,
              backgroundColor: '#fafafa',
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              multiline
              maxRows={3}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: 12.5,
                  backgroundColor: '#fff',
                  '&.Mui-focused fieldset': { borderColor: lightning.primary },
                },
              }}
            />
            <IconButton
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              size="small"
              sx={{
                color: lightning.primary,
                alignSelf: 'flex-end',
                mb: 0.3,
                '&:disabled': { color: '#ccc' },
              }}
            >
              <SendRoundedIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Stack>
        </Paper>
      )}

      {/* FAB */}
      <Fab
        onClick={() => setOpen(prev => !prev)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1300,
          backgroundColor: lightning.primary,
          width: 56,
          height: 56,
          '&:hover': { backgroundColor: lightning.dark },
        }}
      >
        <Box
          component="img"
          src="/bitcoin-front-bubble.png"
          alt="AI Assistant"
          sx={{ width: 38, height: 38, objectFit: 'contain' }}
        />
      </Fab>
    </>
  )
}

export default AIAssistant