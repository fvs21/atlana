import { Calendar, GraduationCap, Instagram, University } from 'lucide-react';
import styles from './styles.module.scss';
import { MAJORS_LIST } from '~/constants/majors';

type InformationProps = {
    major?: string;
    semester?: number;
    instagram?: string;
    university: string;
}

export default function Information({ major, semester, instagram, university }: InformationProps) {
    return (
        <div className={styles.informationContainer}>
            <h1 className={styles.title}>
                Información
            </h1>
            <ul className={styles.informationList}>
                <li>
                    <University size={20}/>
                    {university}
                </li>
                <li className={!major ? styles.notAdded : ""}>
                    <GraduationCap size={20} />
                    {major ? MAJORS_LIST.find(majorItem => majorItem.value === major)?.name : "Sin agregar"}
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