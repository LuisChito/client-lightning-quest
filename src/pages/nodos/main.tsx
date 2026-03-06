import { Box, Container, Paper, Typography } from '@mui/material'

function NodosPage() {
  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 2,
          border: '1px solid rgba(128, 165, 235, 0.22)',
          background: 'linear-gradient(135deg, rgba(18, 32, 60, 0.92), rgba(8, 15, 30, 0.96))',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
          Nodos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gestiona y visualiza los nodos de la red Lightning en testnet.
        </Typography>
        <Box sx={{ mt: 3, height: 220, borderRadius: 2, backgroundColor: 'rgba(53, 87, 147, 0.2)' }} />
      </Paper>
    </Container>
  )
}

export default NodosPage
