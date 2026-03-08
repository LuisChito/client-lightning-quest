const LEVEL3_MODAL_SEEN_KEY = 'mission3-level-modal-seen'

export const canStartMission3ModalFlow = (
  xp: number,
  currentMissionId?: string | null,
  hasCompletedFirstChannel: boolean = false,
): boolean => {
  return xp >= 200 && currentMissionId === 'create-invoice' && hasCompletedFirstChannel
}

export const hasSeenMission3ModalFlow = (): boolean => {
  return localStorage.getItem(LEVEL3_MODAL_SEEN_KEY) === 'true'
}

export const markMission3ModalFlowSeen = (): void => {
  localStorage.setItem(LEVEL3_MODAL_SEEN_KEY, 'true')
}

export const resetMission3ModalFlowSeen = (): void => {
  localStorage.removeItem(LEVEL3_MODAL_SEEN_KEY)
}
