import { Button } from "~/components/ui/button";
import styles from "./styles.module.scss";
import { Archive, Trash } from "lucide-react";
import { cn } from "~/lib/utils";
import { useArchiveListing, useDeleteListing } from "../../api";
import { toast } from "sonner";
import { useNavigate } from "@remix-run/react";

type ListingCreatorActionsProps = {
    listing_id: number;
}

export default function ListingCreatorActions({ listing_id }: ListingCreatorActionsProps) {
    const navigate = useNavigate();

    const { deleteListing, isPending, deleteListingDisabled } = useDeleteListing(listing_id);
    const { archiveListing, isPending: isArchiving, archiveListingDisabled } = useArchiveListing(listing_id);

    const handleDelete = async () => {
        if (deleteListingDisabled) return;

        try {
            await deleteListing();
            navigate('/marketplace');
        } catch (error) {
            toast.error("Error al eliminar el anuncio");
        }
    };

    const handleArchive = async () => {
        if (archiveListingDisabled) return;

        try {
            await archiveListing();
            toast.success("Anuncio archivado correctamente");
            navigate('/marketplace');
        } catch (error) {
            toast.error("Error al archivar el anuncio");
        }
    };

    return (
        <div className={styles.actionsContainer}>
            <Button 
                className={cn("h-8", styles.actionButton, styles.deleteButton)} 
                size="default2"
                onClick={handleDelete}
                disabled={deleteListingDisabled}
                isFetching={isPending}
            >
                <Trash />
                Eliminar
            </Button>
            <Button 
                className={cn("h-8", styles.actionButton)} 
                size="default2"
                onClick={handleArchive}
                disabled={archiveListingDisabled}
                isFetching={isArchiving}
            >
                <Archive />
                Archivar
            </Button>
        </div>
    )
}