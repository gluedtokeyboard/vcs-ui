import { Children, type PropsWithChildren } from 'react'
import styles from './UnorderedList.module.css'

type UnorderedListProps = PropsWithChildren<{
    gap: string,
}>

export default function UnorderedList({ gap, children }: UnorderedListProps) {
    return <ul className={styles.ul} style={{ gap }}>
        {Children.map(children, (child) => (
            <li className={styles.li}>{child}</li>
        ))}
    </ul>
}
