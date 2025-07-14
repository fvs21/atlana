import { MetaFunction, useNavigate, useParams } from "@remix-run/react"
import LoadingScreen from "~/components/loading-screen";
import { useCreateRating, useProfessor, useProfessorName, useSearchCourse } from "~/features/professor-rating/api"
import styles from "./styles.module.scss";
import RatingInput from "~/features/professor-rating/components/RatingInput";
import { useEffect, useReducer, useState } from "react";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import TagsSelector from "~/features/professor-rating/components/TagsSelector";
import { GRADES, TAGS } from "~/features/professor-rating/constants";
import { CourseQueryResult, NewRating, NewRatingAction, NewRatingValidation } from "~/features/professor-rating/types/rater";
import TextArea from "~/components/text-area";
import LabeledSelect from "~/components/labeled-select";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { validateRating } from "~/features/professor-rating/utils/validators";
import { cn } from "~/lib/utils";

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
    grade: "",
    comment: ""
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
        case "set_comment":
            return { ...state, comment: action.payload };
        default:
            return state;
    }
};

export default function Page() {
    const params = useParams();
    
    const id = Number.parseInt(params.id!);
    const navigate = useNavigate();

    const { professor, isLoading, isError } = useProfessorName(id);
    const { search } = useSearchCourse();
    const { create, isPending, createDisabled } = useCreateRating();
    const [errors, setErrors] = useState<NewRatingValidation>({});

    const [state, dispatch] = useReducer(reducer, initialState);

    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
    const [tentativeValue, setTentativeValue] = useState<string>("");
    const [courses, setCourses] = useState<CourseQueryResult[]>([]);

    useEffect(() => {
        const fetchCourses = setTimeout(async () => {
            if(!tentativeValue)
                return;
            
            const res = await search(tentativeValue);
            setCourses(res || []);
        }, 500);

        return () => clearTimeout(fetchCourses);
    }, [tentativeValue]);

    const handleSubmit = async () => {
        if(createDisabled)
            return;

        const errors = validateRating(state);

        if(Object.entries(errors).length) {
            setErrors(errors);
            return;
        }

        try {
            await create({ data: state, professorId: id });
            navigate("/rating/professor/" + id);
        } catch(error) {

        }
     }

    if (isLoading)
        return <LoadingScreen />

    if(isError) {
        return (
            <div>
                Error
            </div>
        )
    }

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
                    <Popover open={popoverOpen} onOpenChange={(val) => {
                        setPopoverOpen(val);

                        if (!val)
                            setTentativeValue("");
                    }}>
                        <PopoverTrigger className={cn("mt-1", errors.course ? "errorBorder" : "")} asChild>
                            <Button className={styles.selectCourseButton}>
                                {state.course.course_name}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command shouldFilter={false}>
                                <CommandInput onValueChange={(v) => setTentativeValue(v)} placeholder="Escribe el nombre del curso" />
                                {tentativeValue && (
                                    <CommandEmpty>
                                        <Button onClick={() => {
                                            dispatch({ type: "create_course", payload: tentativeValue });
                                            setPopoverOpen(false);
                                        }}>
                                            Añadir +
                                        </Button>
                                    </CommandEmpty>
                                )}
                                <CommandGroup>
                                    {courses.map((course) => {
                                        return (
                                            <CommandItem
                                                key={course.id}
                                                value={course.name}
                                                onSelect={() => {
                                                    dispatch({ type: "select_course", payload: { id: course.id, name: course.name } });
                                                    setPopoverOpen(false);
                                                }}
                                            >
                                                {course.name}
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {errors.course && <div className="errorMessage">{errors.course}</div>}
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
                    {errors.quality && <div className="errorMessage">{errors.quality}</div>}
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
                    {errors.difficulty && <div className="errorMessage">{errors.difficulty}</div>}
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
                    {errors.recommended && <div className="errorMessage">{errors.recommended}</div>}
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
                    {errors.assistanceMandatory && <div className="errorMessage">{errors.assistanceMandatory}</div>}
                </div>
                <hr className="my-8" />
                <div>
                    <TagsSelector
                        tags={TAGS}
                        selected={state.tags}
                        setSelected={(val) => dispatch({ type: "set_tags", payload: val })}
                    />
                    {errors.tags && <div className="errorMessage">{errors.tags}</div>}
                </div>
                <hr className="my-8" />
                <div>
                    <TextArea
                        label="Comentarios"
                        className="resize-none h-[140px]"
                        error={errors.comment}
                        value={state.comment}
                        onChange={(val) => dispatch({ type: "set_comment", payload: val })}
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
                    {errors.grade && <div className="errorMessage">{errors.grade}</div>}
                </div>
                <hr className="my-8" />
                <div>
                    <Button className="primaryButton" onClick={(handleSubmit)}>
                        Agregar
                    </Button>
                </div>
            </div>
        </div>
    )
}