import { Book, GraduationCap, Instagram } from 'lucide-react';
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
                {major && (
                    <li>
                        <GraduationCap size={20} />
                        {major}
                    </li>
                )}
                {semester && (
                    <li>
                        <Book size={20} />
                        {semester}° semestre
                    </li>
                )}
                {instagram && (
                    <li>
                        <Instagram size={20} />
                        <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
                            {instagram}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}