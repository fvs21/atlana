import { Calendar, GraduationCap, Instagram } from 'lucide-react';
import styles from './styles.module.scss';

type InformationProps = {
    major?: string;
    semester?: number;
    instagram?: string;
}

export default function Information({ major, semester, instagram }: InformationProps) {
    return (
        <div className={styles.informationContainer}>
            <h1 className={styles.title}>
                Información
            </h1>
            <ul className={styles.informationList}>
                <li className={!major ? styles.notAdded : ""}>
                    <GraduationCap size={20} />
                    {major ? major : "Sin agregar"}
                </li>
                <li className={semester == -1 ? styles.notAdded : ""}>
                    <Calendar size={20} />
                    {semester != -1 ? `${semester}° semestre` : "Sin agregar"}
                </li>
                <li className={!instagram ? styles.notAdded : ""}>
                    <Instagram size={20} />
                    {instagram ? (
                        <a
                            href={`https://www.instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @{instagram}
                        </a>
                    ) : "Sin agregar"}
                </li>
            </ul>
        </div>
    )
}