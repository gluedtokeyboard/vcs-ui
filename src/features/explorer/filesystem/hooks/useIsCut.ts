import { ClipboardOperationType } from '../types/clipboard.types.ts'
import { useClipboardStore } from '../stores/clipboardStore.ts'
import type { Node } from '../types/directory.types.ts'

export default function useIsCut(nodeId: string) {
    const clipboardOperation = useClipboardStore(s => s.clipboardOperation)
    const cutNode = useClipboardStore(s => s.clipboardNode) as Node
    return clipboardOperation == ClipboardOperationType.CUT && cutNode.id == nodeId
}
