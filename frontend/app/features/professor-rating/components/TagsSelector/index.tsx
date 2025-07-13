import { Label } from "~/components/ui/label";
import styles from "./styles.module.scss";
import { cn } from "~/lib/utils";

type TagsSelectorProps = {
    selected: Array<string>;
    setSelected: (val: Array<string>) => void;
    tags: Object;
}

export default function TagsSelector({ selected, setSelected, tags }: TagsSelectorProps) {
    const setTag = (tag: string) => {
        if(selected.includes(tag)) {
            let arr = [...selected];
            let index = arr.findIndex((item) => item === tag);

            arr.splice(index, 1);
            setSelected(arr);
            return;
        }  
        
        if(selected.length < 3) {
            setSelected([...selected, tag]);
        }
    }

    return (
        <div>
            <Label>Elige hasta 3 etiquetas</Label>
            <div className={styles.tagsSelector}>
                {Object.entries(tags).map((tag) => {
                    return (
                        <button 
                            className={cn(styles.tag, selected.includes(tag[0]) ? styles.selected : "")}
                            onClick={() => setTag(tag[0])}
                        >
                            {tag[1]}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}