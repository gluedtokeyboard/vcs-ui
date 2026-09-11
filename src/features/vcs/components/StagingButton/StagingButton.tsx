import Button from '../../../../shared/components/buttons/Button/Button.tsx'
import { useCurrentRepo } from '../../hooks/useCurrentRepo.ts'
import { useFilesystemStore } from '../../../filesystem/stores/filesystemStore.ts'
import { NodeType } from '../../../filesystem/types/directory.types.ts'
import type { Repo } from '../../types/repo.types.ts'
import useStageFile from '../../hooks/useStageFile.ts'

type StagingButtonProps = {
    text: string,
    icon: string,
    useStageFileHook: () => ReturnType<typeof useStageFile>,
}

export default function StagingButton({ text, icon, useStageFileHook }: StagingButtonProps) {
    const repo = useCurrentRepo().data
    const selectedNodeType = useFilesystemStore(store => store.selectedNodeType)
    const enabled = repo && selectedNodeType == NodeType.FILE
    const stageFile = useStageFileHook()

    function handleClick() {
        const repoId = (repo as Repo).id
        const fileId = useFilesystemStore.getState().selectedNodeId as string
        stageFile.mutate({
            repoId,
            fileId,
        })
    }

    return <Button onClick={handleClick} icon={icon} text={text} disabled={!enabled} />
}
