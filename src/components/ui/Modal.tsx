import { Box, Modal as MuiModal, Typography, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { lightning } from '../../theme/colors'

interface ChannelModalProps {
	open: boolean
	onClose: () => void
	onConfirm: (amount: number) => void
	sourceNodeName: string
	sourceBalance: number
}

export function ChannelModal({ open, onClose, onConfirm, sourceNodeName, sourceBalance }: ChannelModalProps) {
	const [amount, setAmount] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		if (open) {
			setAmount('')
			setError('')
		}
	}, [open])

	const handleConfirm = () => {
		const channelSats = Number.parseInt(amount, 10)
		
		if (!amount || amount.trim() === '') {
			setError('Ingresa una cantidad')
			return
		}
		
		if (!Number.isFinite(channelSats) || channelSats <= 0) {
			setError('Ingresa una cantidad válida mayor que 0')
			return
		}
		
		if (channelSats > sourceBalance) {
			setError(`El canal no puede superar ${sourceBalance} sats`)
			return
		}
		
		onConfirm(channelSats)
		onClose()
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleConfirm()
		} else if (e.key === 'Escape') {
			onClose()
		}
	}

	return (
		<MuiModal
			open={open}
			onClose={onClose}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					position: 'relative',
					width: 480,
					maxWidth: '90vw',
					bgcolor: '#ffffff',
					borderRadius: 3,
					border: `2px solid ${lightning.primary}`,
					boxShadow: `0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)`,
					p: 4,
					outline: 'none',
					animation: 'modalSlideIn 0.3s ease-out',
					'@keyframes modalSlideIn': {
						'0%': {
							opacity: 0,
							transform: 'scale(0.9) translateY(-20px)',
						},
						'100%': {
							opacity: 1,
							transform: 'scale(1) translateY(0)',
						},
					},
				}}
			>
				{/* Efecto de brillo en el borde */}
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						borderRadius: 3,
						background: `radial-gradient(circle at 50% 0%, ${lightning.primary}20 0%, transparent 60%)`,
						pointerEvents: 'none',
					}}
				/>

				{/* Título */}
				<Typography
					variant="h5"
					sx={{
						color: lightning.primary,
						fontWeight: 700,
						mb: 1,
						textAlign: 'center',
					}}
				>
					⚡ Abrir Canal
				</Typography>

				{/* Información del nodo */}
				<Box
					sx={{
						mb: 3,
						p: 2,
						borderRadius: 2,
						background: 'rgba(0, 0, 0, 0.04)',
						border: '1px solid rgba(0, 0, 0, 0.08)',
					}}
				>
					<Typography
						sx={{
							fontSize: '0.85rem',
							color: 'rgba(0, 0, 0, 0.6)',
							mb: 0.5,
						}}
					>
						Nodo origen
					</Typography>
					<Typography
						sx={{
							fontSize: '1.1rem',
							color: lightning.primary,
							fontWeight: 600,
							mb: 1.5,
						}}
					>
						{sourceNodeName}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography
							sx={{
								fontSize: '0.85rem',
								color: 'rgba(0, 0, 0, 0.6)',
							}}
						>
							Balance disponible:
						</Typography>
						<Typography
							sx={{
								fontSize: '1.2rem',
								color: 'rgba(0, 0, 0, 0.87)',
								fontFamily: 'monospace',
								fontWeight: 700,
							}}
						>
							{sourceBalance.toLocaleString()} sats
						</Typography>
					</Box>
				</Box>

				{/* Input de cantidad */}
				<Box sx={{ mb: 3 }}>
					<Typography
						sx={{
							fontSize: '0.9rem',
							color: 'rgba(0, 0, 0, 0.87)',
							mb: 1.5,
							fontWeight: 500,
						}}
					>
						¿De cuántos sats quieres crear el canal?
					</Typography>
					<TextField
						fullWidth
						autoFocus
						type="number"
						value={amount}
						onChange={(e) => {
							setAmount(e.target.value)
							setError('')
						}}
						onKeyDown={handleKeyPress}
						placeholder="Ej: 5000"
						error={!!error}
						helperText={error}
						sx={{
							'& .MuiOutlinedInput-root': {
								backgroundColor: 'rgba(0, 0, 0, 0.04)',
								fontSize: '1.2rem',
								fontFamily: 'monospace',
								'& fieldset': {
									borderColor: 'rgba(0, 0, 0, 0.23)',
									borderWidth: 2,
								},
								'&:hover fieldset': {
									borderColor: lightning.primary,
								},
								'&.Mui-focused fieldset': {
									borderColor: lightning.primary,
									boxShadow: `0 0 0 3px ${lightning.primary}20`,
								},
								'&.Mui-error fieldset': {
									borderColor: '#d32f2f',
								},
							},
							'& .MuiOutlinedInput-input': {
								color: 'rgba(0, 0, 0, 0.87)',
								padding: '16px',
							},
							'& .MuiFormHelperText-root': {
								fontSize: '0.85rem',
								marginTop: 1,
							},
						}}
					/>
				</Box>

				{/* Botones */}
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						justifyContent: 'flex-end',
					}}
				>
					<button
						onClick={onClose}
						style={{
							padding: '12px 28px',
							borderRadius: '10px',
							border: '2px solid rgba(0, 0, 0, 0.23)',
							backgroundColor: 'transparent',
							color: 'rgba(0, 0, 0, 0.6)',
							fontWeight: 600,
							fontSize: '1rem',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.5)'
							e.currentTarget.style.color = 'rgba(0, 0, 0, 0.87)'
							e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.23)'
							e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)'
							e.currentTarget.style.backgroundColor = 'transparent'
						}}
					>
						Cancelar
					</button>
					<button
						onClick={handleConfirm}
						style={{
							padding: '12px 28px',
							borderRadius: '10px',
							border: 'none',
							background: `linear-gradient(135deg, ${lightning.primary} 0%, ${lightning.secondary} 100%)`,
							color: '#000',
							fontWeight: 700,
							fontSize: '1rem',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
							boxShadow: `0 4px 16px ${lightning.primary}40`,
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'translateY(-2px)'
							e.currentTarget.style.boxShadow = `0 6px 20px ${lightning.primary}60`
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'translateY(0)'
							e.currentTarget.style.boxShadow = `0 4px 16px ${lightning.primary}40`
						}}
					>
						Crear Canal
					</button>
				</Box>
			</Box>
		</MuiModal>
	)
}
