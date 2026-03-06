import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { AppBar, Box, Button, Chip, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const navButtonSx = {
	textTransform: 'none',
	'&.active': {
		color: '#f7cd64',
		backgroundColor: 'rgba(240, 180, 41, 0.12)',
	},
}

function Header() {
	return (
		<AppBar position="static" elevation={0} color="transparent" className="header-bar">
			<Container maxWidth="lg">
				<Toolbar disableGutters className="header-toolbar">
					<Stack direction="row" spacing={1.25} alignItems="center">
						<Box
							component={NavLink}
							to="/"
							sx={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: 1.25,
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							<Box
								component="img"
								src="/isotipo.png"
								alt="Lightning Quest logo"
								sx={{ width: 24, height: 24, objectFit: 'contain' }}
							/>
							<Typography variant="h6" component="h1" sx={{ fontWeight: 700, letterSpacing: 0.3 }}>
								Lightning Game
							</Typography>
						</Box>
						<Chip
							size="small"
							label="Testnet"
							sx={{
								borderColor: 'rgba(240, 180, 41, 0.45)',
								color: '#f7cd64',
								backgroundColor: 'rgba(240, 180, 41, 0.09)',
							}}
							variant="outlined"
						/>
					</Stack>

					<Stack direction="row" spacing={1} alignItems="center">
						<Button component={NavLink} to="/nodos" color="inherit" sx={navButtonSx}>
							Nodos
						</Button>
						<Button component={NavLink} to="/canales" color="inherit" sx={navButtonSx}>
							Canales
						</Button>
						<Button component={NavLink} to="/pagos" color="inherit" sx={navButtonSx}>
							Pagos
						</Button>
						<IconButton color="inherit" className="menu-button" aria-label="menu">
							<MenuRoundedIcon />
						</IconButton>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
