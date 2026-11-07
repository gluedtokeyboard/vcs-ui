import { useNavigate } from 'react-router'
import Button, { type ButtonProps } from '../../../../shared/components/buttons/Button/Button.tsx'

type NavigationButtonProps = {
    destination: string | number,
} & Omit<ButtonProps, 'onClick'>

export default function NavigationButton({ icon, text, destination, disabled }: NavigationButtonProps) {
    const navigate = useNavigate()

    function handleClick() {
        // @ts-expect-error
        navigate(destination)
    }

    return <Button icon={icon} text={text} onClick={handleClick} disabled={disabled} />
}
