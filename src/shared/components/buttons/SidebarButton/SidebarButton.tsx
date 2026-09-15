import Button from '../Button/Button.tsx'
import useSidebar from '../../../hooks/useSidebar.ts'
import type { ComponentFunction } from '../../../types/general.types.ts'

type SidebarButtonProps = {
    icon?: string,
    text?: string,
    ContentComponent: ComponentFunction,
}

export default function SidebarButton({ icon, text, ContentComponent }: SidebarButtonProps) {
    const { setContent } = useSidebar()!

    function handleClick() {
        setContent(ContentComponent)
    }

    return <Button icon={icon} text={text} onClick={handleClick} />
}
