import { MetaFunction, useParams } from "@remix-run/react"
import LoadingScreen from "~/components/loading-screen";
import { useProfessor, useSearchCourse } from "~/features/professor-rating/api"
import styles from "./styles.module.scss";
import RatingInput from "~/features/professor-rating/components/RatingInput";
import { useReducer, useState } from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import TagsSelector from "~/features/professor-rating/components/TagsSelector";
import { GRADES, TAGS } from "~/features/professor-rating/constants";
import { NewRating, NewRatingAction } from "~/features/professor-rating/types/rater";
import TextArea from "~/components/text-area";
import LabeledSelect from "~/components/labeled-select";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/components/ui/command";

export const meta: MetaFunction = () => [
    { title: "Atlana: Califica a tus maestros" }
]

const initialState: NewRating = {
    course: {
        course_name: "",
        create: false
    },
    quality: 0,
    difficulty: 0,
    recommended: null,
    assistanceMandatory: null,
    tags: [],
    grade: ""
}

const reducer = (state: NewRating, action: NewRatingAction): NewRating => {
    switch (action.type) {
        case "set_quality":
            return { ...state, quality: action.payload };
        case "set_difficulty":
            return { ...state, difficulty: action.payload };
        case "set_assistance":
            return { ...state, assistanceMandatory: action.payload };
        case "set_recommended":
            return { ...state, recommended: action.payload };
        case "set_tags":
            return { ...state, tags: action.payload };
        case "set_grade":
            return { ...state, grade: action.payload };
        case "create_course":
            return { ...state, course: { create: true, course_name: action.payload } };
        case "select_course":
            return { ...state, course: { create: false, id: action.payload.id, course_name: action.payload.name } };
        default:
            return state;
    }
};

export default function Page() {
    const params = useParams();

    const { professor, isLoading } = useProfessor(Number.parseInt(params.id!));
    const { search, isPending } = useSearchCourse();

    const [state, dispatch] = useReducer(reducer, initialState);


    const [popoverOpen, setPopoverOpen] = useState<boolean>(false); 
    const [tentativeValue, setTentativeValue] = useState<string>("");

    if (isLoading)
        return <LoadingScreen />

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Califica a {professor?.name}
            </h1>
            <div>
                Departamento: {professor?.department}
            </div>
            <span className="text-gray-500 text-sm">
                Tu calificación es <b>completamente anónima</b>.
                Cualquier comentario inofensivo o inapropiado será eliminado.
            </span>
            <div className={styles.form}>
                <div className={styles.inputField}>
                    <Label>Curso</Label>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger className="mt-1" asChild>
                            <Button className={styles.selectCourseButton}>
                                {state.course.course_name}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput onValueChange={(v) => setTentativeValue(v)} placeholder="Escribe el nombre del curso" />
                                <CommandEmpty>
                                    <Button onClick={() => {
                                        dispatch({ type: "create_course", payload: tentativeValue });
                                        setPopoverOpen(false);
                                    }}>
                                        Añadir +
                                    </Button>
                                </CommandEmpty>
                                <CommandGroup>
                                    <CommandItem>
                                        Cálculo diferencial
                                    </CommandItem>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <hr className="my-8" />
                <div className="h-[80px]">
                    <RatingInput
                        label="Calidad"
                        value={state.quality}
                        setValue={(val) => dispatch({ type: "set_quality", payload: val })}
                        meanings={[
                            { value: 1, meaning: "Muy malo" },
                            { value: 2, meaning: "Malo" },
                            { value: 3, meaning: "Normal" },
                            { value: 4, meaning: "Bueno" },
                            { value: 5, meaning: "Excelente" }
                        ]}
                    />
                </div>
                <hr className="my-8" />
                <div className="h-[80px]">
                    <RatingInput
                        label="Dificultad"
                        value={state.difficulty}
                        setValue={(val) => dispatch({ type: "set_difficulty", payload: val })}
                        meanings={[
                            { value: 1, meaning: "Muy fácil" },
                            { value: 2, meaning: "Fácil" },
                            { value: 3, meaning: "Normal" },
                            { value: 4, meaning: "Difícil" },
                            { value: 5, meaning: "Muy difícil" }
                        ]}
                    />
                </div>
                <hr className="my-8" />
                <div className="h-[80px]">
                    <Label>Lo recomiendas?</Label>
                    <RadioGroup className="pt-1" onValueChange={(val) => dispatch({ type: "set_recommended", payload: val === "yes" })}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="option-one" />
                            <Label htmlFor="option-one">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="option-two" />
                            <Label htmlFor="option-two">No</Label>
                        </div>
                    </RadioGroup>
                </div>
                <hr className="my-8" />
                <div className="h-[80px]">
                    <Label>Asistencia a la clase</Label>
                    <RadioGroup className="pt-1" onValueChange={(val) => dispatch({ type: "set_assistance", payload: val === "yes" })}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="option-one" />
                            <Label htmlFor="option-one">Obligatoria</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="option-two" />
                            <Label htmlFor="option-two">No obligatoria</Label>
                        </div>
                    </RadioGroup>
                </div>
                <hr className="my-8" />
                <div>
                    <TagsSelector
                        tags={TAGS}
                        selected={state.tags}
                        setSelected={(val) => dispatch({ type: "set_tags", payload: val })}
                    />
                </div>
                <hr className="my-8" />
                <div>
                    <TextArea 
                        label="Comentarios"
                        className="resize-none h-[140px]"
                    />
                </div>
                <hr className="my-8" />
                <div>
                    <LabeledSelect 
                        label="Calificación obtenida"
                        options={GRADES}
                        name="grade"
                        placeholder="Calificación"
                        value={state.grade}
                        onChange={(val) => dispatch({ type: "set_grade", payload: val })}
                    />
                </div>
                <hr className="my-8" />
                <div>
                    <Button className="primaryButton">
                        Agregar
                    </Button>
                </div>
            </div>
        </div>
    )
}