import { useFilesystemStore } from '../stores/filesystemStore.ts'

export default function useNodeIsSelected() {
    return useFilesystemStore(s => s.selectedNodeId) != null
}
