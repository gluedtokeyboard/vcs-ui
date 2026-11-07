import icon from './back.svg'
import NavigationButton from '../NavigationButton/NavigationButton.tsx'
import { useLocation } from 'react-router'

export default function Back() {
    const location = useLocation()
    const disabled = !location.state?.openedFromExplorer
    return <NavigationButton destination={-1} icon={icon} disabled={disabled} />
}
