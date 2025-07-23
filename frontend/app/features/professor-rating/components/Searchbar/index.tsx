import { Plus, SearchIcon } from "lucide-react";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Link } from "@remix-run/react";
import { useSearch } from "../../store";

export default function Searchbar() {
    const [, setSearch] = useSearch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const searchQuery = formData.get('professor-name')?.toString() || "";

        if(!searchQuery)
            return;

        setSearch(searchQuery);
    }

    return (
        <div className={styles.searchbarContainer}>
            <form className={styles.searchbar} onSubmit={handleSubmit}>
                <SearchIcon color="gray" />
                <input name="professor-name" className={styles.searchbarInput} placeholder="Busca a un profesor..." />
            </form>
            <Link to={"/rating/new"}>
                <Button className={cn(styles.rateProfessorBtn, "primaryButton")}>
                    <Plus />
                </Button>
            </Link>
        </div>
    )
}