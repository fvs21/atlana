import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ColorImageInput from "./ColorImageInput";
import { useState } from "react";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";
import ColorPalette from "./ColorPalette";

export default function AddColorModal({ open, close }: { open: boolean, close: () => void }) {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState<string>("");

    return (
        <Dialog modal open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Agregar opción de color
                    </DialogTitle>
                    <DialogDescription>
                        Sube una imagen o escoge un color para tu publicación
                    </DialogDescription>
                </DialogHeader>
                <div className={styles.addColorModal}>
                    <Tabs defaultValue="image">
                        <TabsList>
                            <TabsTrigger value="image">Subir imagen</TabsTrigger>
                            <TabsTrigger value="color">Colores</TabsTrigger>
                        </TabsList>
                        <TabsContent value="image">
                            <div className="mt-4">
                                <ColorImageInput image={image} setImage={setImage} />
                            </div>
                        </TabsContent>
                        <TabsContent value="color">
                            <div className="mt-4">
                                <ColorPalette />
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="pt-4">
                        <ValidatedInput
                            value={name}
                            onChange={setName}
                            label="Nombre"
                            placeholder="Ej. Rojo"
                            type="string"
                        />
                    </div>
                    <div className={styles.addColorButtonContainer}>
                        <Button onClick={close} className="primaryButton">
                            Crear
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}