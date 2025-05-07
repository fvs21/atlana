import styles from './styles.module.scss';

export default function Banner({ image }: { image?: string }) {
    return (
        <div className={styles.banner}>
            {image ? (
                <img />
            ) 
            : (
                <div className={styles.noBanner} />
            )}
        </div>
    )
}