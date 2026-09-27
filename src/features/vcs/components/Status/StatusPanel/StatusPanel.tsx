import { useCurrentRepo } from '../../../hooks/useCurrentRepo.ts'
import NotARepositoryPanel from '../../NotARepositoryPanel/NotARepositoryPanel.tsx'
import SidebarPanel from '../../../../../shared/components/SidebarPanel/SidebarPanel.tsx'
import panelStyles from '../../../../../shared/components/SidebarPanel/SidebarPanel.module.css'
import statusPanelStyles from './StatusPanel.module.css'
import UnorderedList from '../../../../../shared/components/UnorderedList/UnorderedList.tsx'
import useStatus from '../../../hooks/useStatus.ts'
import type { Status } from '../../../types/repo.types.ts'
import { getRepoRelativePath } from '../../../utils.ts'
import type { StrictOmit } from '../../../../../shared/types/general.types.ts'
import { stringComparator } from '../../../../../shared/lib/utils.ts'

export default function StatusPanel() {
    const repo = useCurrentRepo().data
    const status = useStatus(repo?.id)?.data
    if (!status) {
        return <NotARepositoryPanel />
    } else {
        return <Status status={status} />
    }
}

type StatusKey = keyof StrictOmit<Status, 'currentBranch' | 'branches'>
type StatusHeadingsAndFileFns = {
    [K in StatusKey]: readonly [string, (item: Status[K][number]) => string]
}

type StatusProps = {
    status: Status,
}

function Status({ status }: StatusProps) {
    const statusHeadingsAndFileFns: StatusHeadingsAndFileFns = {
        stagedAdditions: ['Files Staged For Addition', (stagingEntry) => stagingEntry.relativePath],
        stagedDeletions: ['Files Staged For Removal', (stagingEntry) => stagingEntry.relativePath],
        unstagedModifications: ['Unstaged Modifications', (node) => getRepoRelativePath(node.path)],
        unstagedDeletions: ['Unstaged Deletions', getRepoRelativePath],
        untrackedFiles: ['Untracked Files', (node) => getRepoRelativePath(node.path)],
    }
    return <SidebarPanel title='Status'>
        {(Object.keys(statusHeadingsAndFileFns) as StatusKey[]).map((key) => (
            renderStatusSection(status, key, statusHeadingsAndFileFns)
        ))}
    </SidebarPanel>
}

function renderStatusSection<K extends StatusKey>(
        status: Status, key: K, statusHeadingsAndFileFns: StatusHeadingsAndFileFns) {
    const items = status[key]
    const [heading, fileFn] = statusHeadingsAndFileFns[key]
    const files = items.map(fileFn).sort(stringComparator.compare)
    return <StatusSection heading={heading} files={files} />
}

type StatusSectionProps = {
    heading: string,
    files: string[],
}

function StatusSection({ heading, files }: StatusSectionProps) {
    return <section className={`${panelStyles.section} ${statusPanelStyles.section}`}>
        <h3 className={panelStyles.h3}>{heading}</h3>
        {files.length == 0
            ? <NoFiles />
            : <UnorderedList gap='0.15rem'>
                {files.map(file => <div className={statusPanelStyles.file}>{file}</div>)}
              </UnorderedList>
        }
    </section>
}

function NoFiles() {
    return <div className={statusPanelStyles.noFiles}>{'<no files>'}</div>
}
