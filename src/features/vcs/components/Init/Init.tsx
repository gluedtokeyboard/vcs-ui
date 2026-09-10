import Button from '../../../../shared/components/buttons/Button/Button.tsx'
import icon from './init.svg'
import { getCurrentWorkingDirectory } from '../../../filesystem/utils.ts'
import useInit from '../../hooks/useInit.ts'

export default function Init() {
    const init = useInit()

    function handleClick() {
        const cwdId = getCurrentWorkingDirectory().id
        init.mutate({ repoRootId: cwdId })
    }

    return <Button onClick={handleClick} text='Init' icon={icon} />
}
