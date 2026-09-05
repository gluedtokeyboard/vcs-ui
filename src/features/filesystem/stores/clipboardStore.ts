import { create } from 'zustand'
import type { Directory, Node } from '../types/directory.types.ts'
import type { ClipboardOperationType } from '../types/clipboard.types.ts'

type ClipboardStore = {
    clipboardNode: Node | null,
    clipboardSourceDirectory: Directory | null,
    clipboardOperation: ClipboardOperationType | null,
    setClipboardContent: (node: Node, sourceDirectory: Directory, operation: ClipboardOperationType) => void,
    clearClipboardContent: () => void,
}

export const useClipboardStore = create<ClipboardStore>((set) => ({
    clipboardNode: null,
    clipboardSourceDirectory: null,
    clipboardOperation: null,
    setClipboardContent: (node: Node, sourceDirectory: Directory, operation: ClipboardOperationType) => set({
        clipboardNode: node,
        clipboardSourceDirectory: sourceDirectory,
        clipboardOperation: operation
    }),
    clearClipboardContent: () => set({
        clipboardNode: null,
        clipboardSourceDirectory: null,
        clipboardOperation: null,
    }),
}))
