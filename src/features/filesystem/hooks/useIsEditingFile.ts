import { useMatches } from 'react-router'

export default function useIsEditingFile() {
    // @ts-ignore
    return useMatches()[0].handle?.isEditingFile
}
