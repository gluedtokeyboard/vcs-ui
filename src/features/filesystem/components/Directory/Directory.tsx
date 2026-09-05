import Node from '../Node/Node.tsx'
import src from './directory.svg'
import { NodeType } from '../../types/directory.types.ts'

export default function Directory({ id, name }: { id: string; name: string }) {
    return <Node
        id={id} type={NodeType.DIRECTORY} name={name} thumbnail={{src, alt: 'Directory'}}
        href={`/directories/${id}`} />
}
