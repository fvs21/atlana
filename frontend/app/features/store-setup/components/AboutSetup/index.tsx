"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "~/components/ui/textarea"
import styles from "./styles.module.scss"


export default function AboutSetup({ edit }: { edit: boolean }) {
    const [content, setContent] = useState<string>("njdksa");

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    return (
        <div className={styles.aboutSetup}>
            {!edit ? (
                <div className={styles.aboutPreview}>
                    {content ? content : <span className={styles.noAbout}>No has agregado ninguna descripción.</span>}
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
                </div>
            )}
        </div>
    )
}


