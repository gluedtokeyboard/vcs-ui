import { VcsEvent } from '../../../vcs/events/eventTypes.ts'
import type { AppEvents } from '../../../../app/events/AppEvents.ts'
import { useFilesystemStore } from '../../stores/filesystemStore.ts'
import { eventBus } from '../../../../app/events'

const clearSelectedNodeEvents = [
    VcsEvent.STAGING_ADD,
    VcsEvent.STAGING_RM,
    VcsEvent.RESET,
    VcsEvent.CHECKOUT_BRANCH,
    VcsEvent.MERGE_SUCCESS,
    VcsEvent.MERGE_FAILURE,
] as const

type Payload = AppEvents[typeof clearSelectedNodeEvents[number]]

const clearSelection = useFilesystemStore.getState().clearSelection

function clearSelectedNode(_payload: Payload) {
    clearSelection()
}

clearSelectedNodeEvents.forEach(event => eventBus.subscribe(event, clearSelectedNode))
