import { create } from 'zustand'

type StatusBarStore = {
    status: string | null,
    setStatus: (status: string, durationMs?: number) => void,
    clearStatus: () => void,
}

export const useStatusBarStore = create<StatusBarStore>((set, get) => ({
    status: null,

    setStatus(status: string, durationMs: number = 0) {
        set({ status })
        if (durationMs != 0) {
            setTimeout(() => get().clearStatus(), durationMs)
        }
    },

    clearStatus() {
        set({ status: null })
    }
}))
