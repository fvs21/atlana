import { Button } from "~/components/ui/button";
import styles from "./styles.module.scss";
import { Archive, Trash } from "lucide-react";
import { cn } from "~/lib/utils";

type ListingCreatorActionsProps = {
    listing_id: number;
}

export default function ListingCreatorActions({ listing_id }: ListingCreatorActionsProps) {
    return (
        <div className={styles.actionsContainer}>
            <Button className={cn("h-8", styles.actionButton, styles.deleteButton)} size="default2">
                <Trash />
                Eliminar
            </Button>
            <Button className={cn("h-8", styles.actionButton)} size="default2">
                <Archive />
                Archivar
            </Button>
        </div>
    )
}