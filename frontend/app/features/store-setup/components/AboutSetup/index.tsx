"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "~/components/ui/textarea"
import { Label } from "~/components/ui/label"
import { Card, CardContent } from "~/components/ui/card"
import styles from "./styles.module.scss"


export default function AboutSetup() {
    const [content, setContent] = useState<string>("njdksa");

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    return (
        <div className={styles.aboutSetup}>
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <Label htmlFor="about-content" className={styles.label}>
                        About Content
                    </Label>
                    <Textarea
                        id="about-content"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Tell customers about your store..."
                        className={styles.textarea}
                        rows={8}
                    />
                    <p className={styles.helpText}>Describe your store, your mission, and what makes your products special.</p>
                </div>
            </div>

            <Card className={styles.previewCard}>
                <CardContent className={styles.previewContent}>
                    <div className={styles.aboutPreview}>
                        <h3>About Us</h3>
                        {content ? <p>{content}</p> : <p className={styles.placeholderText}>Your about text will appear here...</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


