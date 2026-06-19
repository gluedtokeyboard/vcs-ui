import Node from '../Node/Node'
import src from './file.svg'
import { NodeType } from '../../types/directory.types.ts'

export default function File({ id, name }: { id: string; name: string }) {
    return <Node id={id} type={NodeType.FILE} name={name} thumbnail={{src, alt: 'File'}} href={`/files/${id}`} />
}
