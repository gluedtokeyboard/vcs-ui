import type { Branch } from '../../../types/branch.types.ts'
import styles from './Branch.module.css'
import CheckoutBranch from '../CheckoutBranch/CheckoutBranch.tsx'
import DeleteBranch from '../DeleteBranch/DeleteBranch.tsx'
import ThemeProvider from '../../../../../shared/providers/ThemeProvider.tsx'

export default function Branch({ branch, isCurrentBranch }: { branch: Branch, isCurrentBranch: boolean }) {
    const theme = {
        hoverBackground: '#ddd',
        activeBackground: '#ccc',
    }
    return <div className={styles.branch}>
        <div className={styles.branchName}>
            {branch.name}
            {isCurrentBranch ? <span className={styles.currentBranchIndicator}> (current branch)</span> : null}
        </div>
        <div className={styles.buttons}>
            <ThemeProvider value={theme}>
                <DeleteBranch branch={branch} isCurrentBranch={isCurrentBranch} />
                <CheckoutBranch branch={branch} isCurrentBranch={isCurrentBranch} />
            </ThemeProvider>
        </div>
    </div>
}
