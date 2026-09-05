export const ClipboardOperationType = {
    CUT: 'CUT',
    COPY: 'COPY',
} as const

export type ClipboardOperationType = typeof ClipboardOperationType[keyof typeof ClipboardOperationType]
