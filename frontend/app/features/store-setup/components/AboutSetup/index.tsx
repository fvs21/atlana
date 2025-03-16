"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "~/components/ui/textarea"
import styles from "./styles.module.scss"
import { Button } from "~/components/ui/button"
import { useStore, useUpdateAbout } from "../../api"


export default function AboutSetup({ edit, save }: { edit: boolean, save: () => void }) {
    const { data } = useStore();

    const [content, setContent] = useState<string>(data?.about as string);

    const { update, isPending, updateDisabled } = useUpdateAbout();

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleSubmit = async () => {
        if(!content || updateDisabled) return;

        try {
            await update({ about: content });   
            save();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.aboutSetup}>
            {!edit ? (
                <div className={styles.aboutPreview}>
                    {content ? (
                        <div className={styles.about}>
                            {content}
                        </div>
                    ) : <span className={styles.noAbout}>No has agregado ninguna descripción.</span>}
                </div>
            ): (
                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <p className={styles.helpText}>
                            Escribe acerca de tu tienda para que los clientes sepan más sobre ella.
                        </p>
                        <Textarea
                            id="about-content"
                            value={content}
                            onChange={handleContentChange}
                            className={styles.textarea}
                            rows={8}
                        />
                    </div>
                    <div className={styles.saveButtonContainer}>
                        <Button className={styles.saveButton} onClick={handleSubmit} disabled={updateDisabled}>
                            Guardar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}


