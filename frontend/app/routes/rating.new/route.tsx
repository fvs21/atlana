import { Input } from "~/components/ui/input";
import styles from "./styles.module.scss";
import SearchOrAddProfessorInput from "~/features/professor-rating/components/SearchOrAddProfessorInput";
import { useState } from "react";
import LabeledSelect from "~/components/labeled-select";
import { DEPARTMENTS } from "~/features/professor-rating/constants";
import { Button } from "~/components/ui/button";
import { useCreateProfessor } from "~/features/professor-rating/api";
import { useNavigate } from "@remix-run/react";
import { toast } from "sonner";

export default function Page() {
    const [name, setName] = useState<string>("");
    const [create, setCreate] = useState<boolean>(false);
    const [department, setDepartment] = useState<string>("");

    const navigate = useNavigate();

    const { create: createFn, isPending, createDisabled } = useCreateProfessor();

    async function handleSubmit() {
        if(!name || createDisabled)
            return;

        try {
            const res = await createFn({ name, department });
            
            navigate("/rating/rate/" + res?.professor.id);
        } catch(error) {
            toast.error("Error inesperado");
        }
    }

    return (
        <div className={styles.searchOrCreateProfessor}>
            <h1 className={styles.title}>
                Busca o agrega a un profesor
            </h1>
            <SearchOrAddProfessorInput 
                name={name}
                setName={setName}
                create={create}
                setCreate={setCreate}
            />
            {create && (
                <div className={styles.createProfessorContainer}>
                   <LabeledSelect 
                        label="Selecciona el departamento/facultad del maestro"
                        name="department"
                        options={DEPARTMENTS}
                        value={department}
                        onChange={setDepartment}
                   /> 
                   <div className="pt-4">
                        <Button className="primaryButton" onClick={handleSubmit}>
                            Crear
                        </Button>
                   </div>
                </div>
            )}
        </div>
    )
}