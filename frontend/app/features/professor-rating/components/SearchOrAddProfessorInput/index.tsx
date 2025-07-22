import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import styles from "./styles.module.scss";
import { filterProfessorNames } from "../../utils";
import { useNavigate } from "@remix-run/react";
import { useSearchProfessors } from "../../api";
import { Professor } from "../../types";

type SearchOrAddProfessorInputProps = {
    name: string;
    setName: (val: string) => void;
    create: boolean;
    setCreate: (val: boolean) => void;
}

export default function SearchOrAddProfessorInput({ name, setName, create, setCreate }: SearchOrAddProfessorInputProps) {
    const [professors, setProfessors] = useState<Omit<Professor, "tags">[]>([]);
    const [opened, setOpened] = useState<boolean>(false);
    const { search, isPending } = useSearchProfessors();
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(!name)
                return;
            
            const res = await search(name);
            setProfessors(res || []);
        }, 500);

        return () => clearTimeout(timeout);
    }, [name]);

    return (
        <div className={styles.inputContainer}>
            <Input
                placeholder="Ingresa el nombre completo del profesor"
                value={name}
                onChange={(e) => {
                    const n = e.target.value;
                    setName(n);

                    if(n.length)
                        setOpened(true);
                    else
                        setOpened(false);
                }}
                onFocus={() => setOpened(true)}
            />
            {(opened && name) && (
                <div className={styles.searchResults}>
                    {professors && (
                        filterProfessorNames(name, (professors)).map((prof) => {
                            return (
                                <button className={styles.professor} onClick={() => navigate("/rating/rate/" + prof.id)}>
                                    {prof.name}
                                </button>
                            )
                        })
                    )}
                    <button className={styles.professor} onClick={() => {
                        setOpened(false);
                        setCreate(true);
                    }}>
                        {name} (Agregar)
                    </button>
                </div>
            )}
        </div>
    )
}