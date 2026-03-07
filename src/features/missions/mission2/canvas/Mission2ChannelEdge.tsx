import { BaseEdge, EdgeLabelRenderer, type EdgeProps, getBezierPath } from '@xyflow/react'
import { lightning, background } from '../../../../theme/colors'

function ChannelEdge(props: EdgeProps) {
	const channelData = props.data as { label?: string; sats?: number } | undefined
	const channelLabel = channelData?.label ?? 'canal'
	const channelSats = channelData?.sats

	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX: props.sourceX,
		sourceY: props.sourceY,
		sourcePosition: props.sourcePosition,
		targetX: props.targetX,
		targetY: props.targetY,
		targetPosition: props.targetPosition,
	})

	return (
		<>
			<BaseEdge path={edgePath} style={{ stroke: lightning.primary, strokeWidth: 2.2 }} />
			<EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						fontSize: 10,
						fontWeight: 600,
						color: lightning.dark,
						background: background.panel,
						padding: '2px 6px',
						borderRadius: 8,
						border: `1px solid ${lightning.border}`,
						pointerEvents: 'none',
					}}
				>
					{channelLabel}
					{typeof channelSats === 'number' ? ` (${channelSats} sats)` : ''}
				</div>
			</EdgeLabelRenderer>
		</>
	)
}

export default ChannelEdge
