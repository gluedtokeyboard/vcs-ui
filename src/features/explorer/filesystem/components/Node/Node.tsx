import styles from './Node.module.css'
import { Link, useNavigate } from 'react-router'
import { useFilesystemStore } from '../../stores/filesystemStore.ts'
import type { NodeType } from '../../types/directory.types.ts'
import * as React from 'react'

type NodeProps = {
    id: string,
    type: NodeType,
    name: string,
    thumbnail: {
        src: string,
        alt: string,
    },
    href: string,
}

export default function Node({ id, type, name, thumbnail: { src, alt }, href }: NodeProps) {
    const selectedId = useFilesystemStore(s => s.selectedNodeId)
    const selectNode = useFilesystemStore(s => s.selectNode)
    const clearSelection = useFilesystemStore(s => s.clearSelection)
    const selected = selectedId == id
    const nodeClassName = selected ? styles.nodeSelected : styles.node
    const navigate = useNavigate()

    function handleClick(e: React.MouseEvent) {
        e.preventDefault()
        if (selected) {
            clearSelection()
        } else {
            selectNode(id, type)
        }
    }

    function handleDoubleClick() {
        clearSelection()
        return navigate(href, {})
    }

    return (
        <Link to={href} className={nodeClassName} onClick={handleClick} onDoubleClick={handleDoubleClick}>
            <img className={styles.icon} src={src} alt={alt} />
            <div className={styles.name}>{name}</div>
        </Link>
    )
}
