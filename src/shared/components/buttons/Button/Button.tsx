import styles from './Button.module.css'
import useTheme from '../../../hooks/useTheme.ts'
import * as React from 'react'

export type ButtonProps = {
    text?: string,
    icon?: string,
    onClick: () => void,
    disabled?: boolean,
}

export default function Button({ text, icon, onClick, disabled = false }: ButtonProps) {
    const theme = useTheme()?.theme
    const style = {
        '--color': theme?.color,
        '--background-color': theme?.backgroundColor,
        '--hover-background': theme?.hoverBackground,
        '--active-background': theme?.activeBackground,
    } as React.CSSProperties
    let className, handleClick
    if (disabled) {
        className = styles.disabled
    } else {
        className = styles.button
        handleClick = onClick
    }
    return <button style={style} className={className} onClick={handleClick}>
        {icon && <img src={icon} alt={text} />}
        {text && <span>{text}</span>}
    </button>
}
