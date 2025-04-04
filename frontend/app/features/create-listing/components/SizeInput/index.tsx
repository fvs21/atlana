import { useAtom } from "jotai";
import { listingCustomOptionsAtom } from "../../store";
import styles from "./styles.module.scss";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddSizeModal from "../AddSizeModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { sizeSpecs } from "../../utils/variables";
import { SizeSpecs } from "../../types";

export default function SizeInput() {
    const [options] = useAtom(listingCustomOptionsAtom);
    const [addSizeModal, setAddSizeModal] = useState<boolean>(false);

    return (
        <>
            {options.size && (
                <div className={styles.sizeInputContainer}>
                    <button className={styles.sizeInputButton} onClick={() => setAddSizeModal(true)}>
                        <Plus size={15} />
                    </button>
                    {options.size.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Medida</TableHead>
                                    {Object.values(sizeSpecs).map((spec) => (
                                        <TableHead key={spec}>{spec}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {options.size.map((size) => (
                                    <TableRow key={size.size}>
                                        <TableCell>{size.size}</TableCell>
                                        {!!size.specifications && (
                                            Object.keys(sizeSpecs).map((spec, index) => {
                                                if (!size.specifications?.[spec as keyof SizeSpecs])
                                                    return <TableCell className="text-center">-</TableCell>;
    
                                                return <TableCell key={index} className="text-right">
                                                    {size.specifications[spec as keyof SizeSpecs]}cm
                                                </TableCell>
                                            })
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            )}
            <AddSizeModal open={addSizeModal} close={() => setAddSizeModal(false)} />
        </>
    )
}