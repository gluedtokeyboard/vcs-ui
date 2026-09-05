import { useClipboardStore } from '../stores/clipboardStore.ts'

export default function useHasClipboardContent() {
    return useClipboardStore(s => s.clipboardNode) != null
}
