import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import type { Transaction } from "../../types";
import styles from "./TransactionTable.module.scss";

export default function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const [sortField, setSortField] = useState<keyof Transaction>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })

  return (
    <div className={styles.transactionTableContainer}>
      <div className={styles.tableActions}>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search transactions..." className={styles.searchInput} />
        </div>
        <button className={styles.filterBtn}>
          <Filter size={16} />
          Filter
        </button>
      </div>

      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")} className={styles.sortableHeader}>
              Transaction ID
              {sortField === "id" && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </th>
            <th onClick={() => handleSort("orderId")} className={styles.sortableHeader}>
              Order ID
              {sortField === "orderId" &&
                (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </th>
            <th onClick={() => handleSort("date")} className={styles.sortableHeader}>
              Date
              {sortField === "date" && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </th>
            <th onClick={() => handleSort("type")} className={styles.sortableHeader}>
              Type
              {sortField === "type" && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </th>
            <th onClick={() => handleSort("amount")} className={styles.sortableHeader}>
              Amount
              {sortField === "amount" &&
                (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </th>
            <th onClick={() => handleSort("status")} className={styles.sortableHeader}>
              Status
              {sortField === "status" &&
                (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>#{transaction.id}</td>
              <td>#{transaction.orderId}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>
                <span className={`type-badge ${transaction.type.toLowerCase()}`}>{transaction.type}</span>
              </td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>
                <span className={`status-badge ${transaction.status.toLowerCase()}`}>{transaction.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button className={styles.paginationBtn} disabled>
          Previous
        </button>
        <div className={styles.paginationPages}>
          <button className={`${styles.paginationPage} ${styles.active}`}>1</button>
          <button className={styles.paginationPage}>2</button>
          <button className={styles.paginationPage}>3</button>
          <span>...</span>
          <button className={styles.paginationPage}>10</button>
        </div>
        <button className={styles.paginationBtn}>Next</button>
      </div>
    </div>
  )
}

