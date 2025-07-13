export type NewRating = {
    course: {
        course_name: string;
        create: boolean;
        id?: number;
    };

    quality: number;
    difficulty: number;
    recommended: boolean | null;
    assistanceMandatory: boolean | null;
    tags: string[];
    grade: string;
}

export type NewRatingAction = 
    | { type: "set_quality"; payload: number } 
    | { type: "set_difficulty"; payload: number }
    | { type: "set_recommended"; payload: boolean }
    | { type: "set_assistance"; payload: boolean }
    | { type: "set_tags"; payload: string[] }
    | { type: "set_grade"; payload: string }
    | { type: "create_course"; payload: string }
    | { type: "select_course"; payload: {id: number, name: string} }

export type CourseQueryResult = {
    name: string;
    id: number;
}