import { Link } from "@remix-run/react"
import { ArrowRight } from "lucide-react"
import type { Transaction } from "../../types"
import styles from "./TransactionSummary.module.scss"

export default function TransactionSummary({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryHeader}>
        <h2>Recent Transactions</h2>
        <Link to="/dashboard/transactions" className={styles.viewAll}>
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.summaryContent}>
        <table className={styles.summaryTable}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Order ID</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>#{transaction.id}</td>
                <td>#{transaction.orderId}</td>
                <td>
                  <span className={`type-badge ${transaction.type.toLowerCase()}`}>{transaction.type}</span>
                </td>
                <td>${transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

