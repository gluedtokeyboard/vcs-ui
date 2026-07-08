import { NodeType } from '../../types/directory.types.ts'
import type { Node } from '../../types/directory.types.ts'
import { useParams } from 'react-router'
import { useDirectoryOrRoot } from '../../hooks/useDirectoryOrRoot.ts'
import Directory from '../Directory/Directory.tsx'
import styles from './Explorer.module.css'
import { useFilesystemStore } from '../../stores/filesystemStore.ts'
import * as React from 'react'
import File from '../File/File.tsx'
import { getBasename } from '../../../../../shared/lib/utils.ts'
import useIsEditingFile from '../../hooks/useIsEditingFile.ts'

export default function Explorer() {
    const { id } = useParams()
    const currentWorkingDirectory = useFilesystemStore.getState().currentWorkingDirectory
    const setCurrentWorkingDirectory = useFilesystemStore(s => s.setCurrentWorkingDirectory)
    const isEditingFile = useIsEditingFile()
    let directoryId
    if (isEditingFile) {
        directoryId = currentWorkingDirectory
    } else {
        directoryId = id
    }
    const { isLoading, data, error } = useDirectoryOrRoot(directoryId)
    let contents, className, message
    const clearSelection = useFilesystemStore(s => s.clearSelection)

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target != event.currentTarget) {
            return
        }
        clearSelection()
    }

    if (isLoading) {
        message = 'Loading...'
        className = styles.explorerEmpty
    }
    if (error) {
        message = 'An error has occurred.'
        className = styles.explorerEmpty
    }
    if (data) {
        setCurrentWorkingDirectory(data.id)
        const nodes = getNodeComponents(data.contents)
        if (nodes.length > 0) {
            contents = nodes
            className = styles.explorerGrid
        } else {
            message = 'This directory is empty.'
            className = styles.explorerEmpty
        }
    }
    return <div className={className} onClick={handleClick}>
        {contents ? contents : <div>{message}</div>}
    </div>
}

function getNodeComponents(nodes: Node[]) {
    const comparator = getComparator(nodeTypeComparator, nodeNameComparator)
    nodes.sort(comparator)
    return nodes.map((node) => {
        const name = getBasename(node.path)
        const props = {
            id: node.id,
            name
        }
        const Component = {
            [NodeType.DIRECTORY]: Directory,
            [NodeType.FILE]: File,
        }[node.type]
        return <Component key={node.id} {...props} />
    })
}

function nodeTypeComparator(node1: Node, node2: Node): number {
    if (node1.type == node2.type) {
        return 0
    } else if (node1.type == NodeType.DIRECTORY) {
        return -1
    } else {
        return 1
    }
}

const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base',
})

function nodeNameComparator(node1: Node, node2: Node) {
    const basename1 = getBasename(node1.path)
    const basename2 = getBasename(node2.path)
    return collator.compare(basename1, basename2)
}

type Comparator<T> = (a: T, b: T) => number

function getComparator<T>(...comparators: Comparator<T>[]): Comparator<T> {
    function comparatorFn(a: T, b: T): number {
        for (let comparator of comparators) {
            const result = comparator(a, b)
            if (result != 0) {
                return result
            }
        }
        return 0
    }
    return comparatorFn
}
