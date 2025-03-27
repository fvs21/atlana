import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ColorImageInput from "./ColorImageInput";
import { useState } from "react";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";
import ColorPalette from "./ColorPalette";
import { Label } from "~/components/ui/label";
import { ColorOption } from "../../types";
import { useAtom } from "jotai";
import { listingCustomOptionsAtom } from "../../store";

export default function AddColorModal({ open, close }: { open: boolean, close: () => void }) {
    const [listingOptions, setListingOptions] = useAtom(listingCustomOptionsAtom);

    const [color, setColor] = useState<ColorOption>({
        name: "",
    });

    const changeImage = (image: File) => {
        const newColor = { ...color };
        delete newColor.color_code;

        setColor({
            ...newColor,
            file: image,
        });
    }

    const changeColor = (color_code: string) => {
        const newColor = { ...color };
        delete newColor.file;

        setColor({
            ...newColor,
            color_code,
        });
    }

    const changeName = (name: string) => {
        setColor({
            ...color,
            name
        });
    }

    const save = () => {
        if(!color.color_code && !color.file || !color.name) {
            return;
        }

        setListingOptions({
            ...listingOptions,
            color: [
                ...(listingOptions.color || []),
                color
            ]
        });

        setColor({
            name: ""
        });

        close();
    }

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
                                <ColorImageInput
                                    image={color.file}
                                    setImage={changeImage}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="color">
                            <div className="mt-4">
                                <ColorPalette
                                    color={color.color_code}
                                    setColor={changeColor}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="pt-4">
                        {(color.color_code || color.file) && (
                            <div className="pb-4 flex flex-col gap-2">
                                <Label>
                                    Vista Previa
                                </Label>
                                <div className={styles.previewContainer}>
                                    {color.color_code && (
                                        <div style={{ backgroundColor: color.color_code }} className={styles.colorPreview} />
                                    )}
                                    {color.file && (
                                        <img src={URL.createObjectURL(color.file)} alt="Color preview" className={styles.colorPreview} />
                                    )}
                                </div>
                            </div>
                        )}
                        <ValidatedInput
                            value={color.name}
                            onChange={changeName}
                            label="Nombre"
                            placeholder="Ej. Rojo"
                            type="string"
                        />
                    </div>
                    <div className={styles.addColorButtonContainer}>
                        <Button onClick={save} className="primaryButton">
                            Crear
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}