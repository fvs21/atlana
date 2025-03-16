import type React from "react"

import { useState } from "react"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Upload } from "lucide-react"
import styles from "./styles.module.scss"
import { useStore } from "../../api"


export default function BannerSetup({ edit, save }: { edit: boolean, save: () => void }) {
    const { data } = useStore();    

    const mockUrl = "https://static.vecteezy.com/system/resources/previews/003/566/561/non_2x/abstract-banner-design-web-templates-horizontal-header-web-banner-modern-abstract-cover-header-background-for-website-design-social-media-cover-advertising-banner-flyer-invitation-card-free-vector.jpg"
    const [imageUrl, setImageUrl] = useState<string>(data?.banner || mockUrl);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you would upload this file to your server or a storage service
            // For now, we'll just create a local URL
            const url = URL.createObjectURL(file)
            setImageUrl(url)
        }
    }

    return (
        <div className={styles.bannerSetup}>
            <Card className={styles.previewCard}>
                <img className={styles.bannerPreview} src={imageUrl} />
            </Card>
            {edit && (
                <div className={styles.form}>
                    <div className={styles.formGroup}>
                        <Label htmlFor="banner-image" className={styles.label}>
                            Cambiar banner
                        </Label>
                        <div className={styles.fileUpload}>
                            <input
                                id="banner-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className={styles.fileInput}
                            />
                            <Button variant="outline" className={styles.uploadButton}>
                                <Upload className="mr-2 h-4 w-4" />
                                Elegir imagen
                            </Button>
                        </div>
                        <p className={styles.helpText}>Recommended size: 1200×300 pixels</p>
                    </div>
                </div>
            )}
        </div>
    )
}

