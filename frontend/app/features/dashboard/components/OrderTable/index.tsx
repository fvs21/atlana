import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import type { Order } from "../../types";
import styles from "./OrderTable.module.scss";

type OrderTableProps = {
    orders: Order[]
    showTransactions?: boolean
}

export default function OrderTable({ orders, showTransactions = false }: OrderTableProps) {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
    const [sortField, setSortField] = useState<keyof Order>("date")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

    const toggleExpand = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId)
    }

    const handleSort = (field: keyof Order) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const sortedOrders = [...orders].sort((a: any, b: any) => {
        if (sortDirection === "asc") {
            return a[sortField] > b[sortField] ? 1 : -1
        } else {
            return a[sortField] < b[sortField] ? 1 : -1
        }
    })

    return (
        <div className={styles.orderTableContainer}>
            <div className={styles.tableActions}>
                <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search orders..." className={styles.searchInput} />
                </div>
                <button className={styles.filterBtn}>
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            <table className={styles.orderTable}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("id")} className={styles.sortableHeader}>
                            Order ID
                            {sortField === "id" && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                        </th>
                        <th onClick={() => handleSort("customer")} className={styles.sortableHeader}>
                            Customer
                            {sortField === "customer" &&
                                (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                        </th>
                        <th onClick={() => handleSort("date")} className={styles.sortableHeader}>
                            Date
                            {sortField === "date" && (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                        </th>
                        <th onClick={() => handleSort("status")} className={styles.sortableHeader}>
                            Status
                            {sortField === "status" &&
                                (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                        </th>
                        <th onClick={() => handleSort("amount")} className={styles.sortableHeader}>
                            Amount
                            {sortField === "amount" &&
                                (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOrders.map((order) => (
                        <>
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                                </td>
                                <td>${order.amount.toFixed(2)}</td>
                                <td>
                                    {showTransactions && order.transactions && order.transactions.length > 0 && (
                                        <button
                                            className={styles.expandBtn}
                                            onClick={() => toggleExpand(order.id)}
                                            aria-label={expandedOrder === order.id ? "Collapse transactions" : "Expand transactions"}
                                        >
                                            {expandedOrder === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    )}
                                </td>
                            </tr>
                            {showTransactions && expandedOrder === order.id && order.transactions && (
                                <tr className={styles.transactionRow}>
                                    <td colSpan={6}>
                                        <div className={styles.transactionDetails}>
                                            <h4>Transactions</h4>
                                            <table className={styles.nestedTable}>
                                                <thead>
                                                    <tr>
                                                        <th>Transaction ID</th>
                                                        <th>Date</th>
                                                        <th>Type</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.transactions.map((transaction) => (
                                                        <tr key={transaction.id}>
                                                            <td>#{transaction.id}</td>
                                                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                                            <td>
                                                                <span className={`type-badge ${transaction.type.toLowerCase()}`}>
                                                                    {transaction.type}
                                                                </span>
                                                            </td>
                                                            <td>${transaction.amount.toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
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

