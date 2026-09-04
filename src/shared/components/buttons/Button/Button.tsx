import styles from './Button.module.css'

export type ButtonProps = {
    text?: string,
    icon?: string,
    onClick: () => void,
    disabled?: boolean,
}

export default function Button({ text, icon, onClick, disabled = false }: ButtonProps) {
    let className, handleClick
    if (disabled) {
        className = styles.disabled
    } else {
        className = styles.button
        handleClick = onClick
    }
    return <button className={className} onClick={handleClick}>
        {icon && <img src={icon} alt={text} />}
        {text && <span>{text}</span>}
    </button>
}
