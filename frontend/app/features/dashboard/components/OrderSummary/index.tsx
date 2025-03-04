import { Link } from "@remix-run/react"
import { ArrowRight } from "lucide-react"
import type { Order } from "../../types";
import styles from "./OrderSummary.module.scss"

export default function OrderSummary({ orders }: { orders: Order[] }) {
  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryHeader}>
        <h2>Recent Orders</h2>
        <Link to="/dashboard/orders" className={styles.viewAll}>
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.summaryContent}>
        <table className={styles.summaryTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                </td>
                <td>${order.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

