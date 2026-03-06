import { Box, Typography } from '@mui/material'
import {
	addEdge,
	Background,
	BackgroundVariant,
	ReactFlow,
	useEdgesState,
	useNodesState,
	type Connection,
	type Edge,
	type EdgeTypes,
	type Node,
	type NodeTypes,
} from '@xyflow/react'
import { useCallback } from 'react'
import '@xyflow/react/dist/style.css'
import ChannelEdge from './ChannelEdge'
import NodeItem from './NodeItem'

const nodeTypes: NodeTypes = {
	networkNode: NodeItem,
}

const edgeTypes: EdgeTypes = {
	channelEdge: ChannelEdge,
}

const initialNodes: Node[] = [
	{ id: 'dave', type: 'networkNode', data: { label: 'dave' }, position: { x: 210, y: 180 } },
	{ id: 'erin', type: 'networkNode', data: { label: 'erin' }, position: { x: 470, y: 190 } },
	{ id: 'alice', type: 'networkNode', data: { label: 'alice' }, position: { x: 100, y: 330 } },
	{ id: 'bob', type: 'networkNode', data: { label: 'bob' }, position: { x: 360, y: 380 } },
	{ id: 'carol', type: 'networkNode', data: { label: 'carol' }, position: { x: 620, y: 300 } },
	{ id: 'backend1', type: 'networkNode', data: { label: 'backend1' }, position: { x: 350, y: 560 } },
]

const initialEdges: Edge[] = [
	{ id: 'dave-erin', source: 'dave', target: 'erin', type: 'channelEdge' },
	{ id: 'alice-bob', source: 'alice', target: 'bob', type: 'channelEdge' },
	{ id: 'alice-carol', source: 'alice', target: 'carol', type: 'channelEdge' },
]

function MapCanvas() {
	const [nodes, , onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

	const onConnect = useCallback(
		(connection: Connection) => {
			setEdges((currentEdges) =>
				addEdge(
					{
						...connection,
						type: 'channelEdge',
					},
					currentEdges,
				),
			)
		},
		[setEdges],
	)

	return (
		<Box
			sx={{
				position: 'relative',
				height: '100%',
				minHeight: { xs: 260, lg: 0 },
				borderRadius: 1.5,
				border: '1px solid rgba(43, 66, 111, 0.45)',
				backgroundColor: '#060c17',
				overflow: 'hidden',
			}}
		>
			<Typography
				variant="caption"
				sx={{
					position: 'absolute',
					top: 12,
					left: 12,
					zIndex: 3,
					color: 'text.secondary',
					letterSpacing: 0.4,
					textTransform: 'uppercase',
				}}
			>
				Network Area
			</Typography>

			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				fitView
				fitViewOptions={{ padding: 0.25 }}
				proOptions={{ hideAttribution: true }}
				defaultEdgeOptions={{ type: 'channelEdge' }}
				connectionLineStyle={{ stroke: '#f0b429', strokeWidth: 2.2 }}
			>
				<Background color="rgba(27, 39, 65, 0.5)" gap={38} variant={BackgroundVariant.Lines} />
			</ReactFlow>
		</Box>
	)
}

export default MapCanvas
