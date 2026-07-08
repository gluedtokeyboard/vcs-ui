import { create } from "zustand";
import type { NodeType } from '../types/directory.types.ts'

type FilesystemStore = {
    selectedNodeId: string | null,
    selectedNodeType: NodeType | null,
    selectNode: (id: string, type: NodeType) => void,
    clearSelection: () => void,
    currentWorkingDirectory: string,
    setCurrentWorkingDirectory: (directory: string) => void,
}

export const useFilesystemStore = create<FilesystemStore>((set) => ({
    selectedNodeId: null,
    selectedNodeType: null,
    selectNode: (id: string, type: NodeType) => set({ selectedNodeId: id, selectedNodeType: type }),
    clearSelection: () => set({ selectedNodeId: null, selectedNodeType: null }),
    currentWorkingDirectory: '',
    setCurrentWorkingDirectory: (directory: string) => set({ currentWorkingDirectory: directory }),
}))
