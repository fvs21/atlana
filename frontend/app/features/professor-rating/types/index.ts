export type Professor = {
    id: number;
    name: string;
    average_rating: number;
    recommendation_rate: number;
    department: string;
    difficulty_level: number;
    tags: string[];
}

export type BasicProfessorInfo = {
    name: string;
    department: string;
}

export type Rating = {
    id: number;
    comment: string;
    course: string;
    mandatory_assistance: boolean;
    recommended: boolean;
    quality: number;
    difficulty: number;
    tags: string[];
    grade_achieved: string;
    created_at: Date;
}