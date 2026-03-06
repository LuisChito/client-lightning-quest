import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './components/header'

function MainLayout() {
  return (
    <Box className="app-shell">
      <Header />
      <Box component="main" className="page-content">
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
