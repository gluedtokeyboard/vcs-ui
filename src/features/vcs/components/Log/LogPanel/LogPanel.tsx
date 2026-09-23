import useLog from '../../../hooks/useLog.ts'
import { useCurrentRepo } from '../../../hooks/useCurrentRepo.ts'
import panelStyles from '../../../../../shared/components/SidebarPanel/SidebarPanel.module.css'
import logPanelStyles from './LogPanel.module.css'
import NotARepositoryPanel from '../../NotARepositoryPanel/NotARepositoryPanel.tsx'
import type { Commit } from '../../../types/commit.types.ts'
import MessagePanel from '../../../../../shared/components/MessagePanel/MessagePanel.tsx'
import SidebarPanel from '../../../../../shared/components/SidebarPanel/SidebarPanel.tsx'

export default function LogPanel() {
    const repo = useCurrentRepo().data
    const log = useLog(repo?.id)
    const commits = log.data
    if (commits) {
        return <Log commits={commits} />
    } else {
        return <NotARepositoryPanel />
    }
}

function Log({ commits }: { commits: Commit[]}) {
    if (commits.length == 0) {
        return <MessagePanel message="You haven't made any commits yet." />
    } else {
        return <SidebarPanel title='Log'>
            {commits.map(commit => <LogEntry key={commit.hash} commit={commit} />)}
        </SidebarPanel>
    }
}

function LogEntry({ commit }: { commit: Commit }) {
    return <div className={`${panelStyles.section} ${logPanelStyles.logEntry}`}>
        <div className={logPanelStyles.hashContainer}>
            <h3 className={panelStyles.h3}>Hash</h3>
            <code className={logPanelStyles.hash}>{commit.hash}</code>
        </div>
        <div className={logPanelStyles.timestampContainer}>
            <h3 className={panelStyles.h3}>Date</h3>
            <time className={logPanelStyles.timestamp} dateTime={commit.timestamp}>{getTimestampString(commit.timestamp)}</time>
        </div>
        <div className={logPanelStyles.messageContainer}>
            <h3 className={panelStyles.h3}>Message</h3>
            <p className={logPanelStyles.commitMessage}>{commit.message}</p>
        </div>
    </div>
}

function getTimestampString(timestamp: string) {
    return new Date(timestamp).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).replace(',', '')
}
