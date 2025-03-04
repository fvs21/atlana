import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import styles from "./StatCard.module.scss"

type StatCardProps = {
  title: string
  value: string
  trend: "up" | "down"
  percentage: string
}

export default function StatCard({ title, value, trend, percentage }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <h3 className={styles.statTitle}>{title}</h3>
      <div className={styles.statValue}>{value}</div>
      <div className={`${styles.statTrend} ${styles[trend]}`}>
        {trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{percentage}</span>
      </div>
    </div>
  )
}

