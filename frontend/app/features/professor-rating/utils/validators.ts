import { NewRating, NewRatingValidation } from "../types/rater";

export function validateRating(rating: NewRating) {
    const errors: NewRatingValidation = {};

    if(rating.quality < 1)
        errors.quality = "Campo obligatorio.";

    if(rating.difficulty < 1)
        errors.difficulty = "Campo obligatorio.";

    if(!rating.grade)
        errors.grade = "Campo obligatorio.";

    if(rating.assistanceMandatory === null)
        errors.assistanceMandatory = "Campo obligatorio.";

    if(rating.recommended === null)
        errors.recommended = "Campo obligatorio.";

    if(rating.course.create) {
        if(!rating.course.course_name)
            errors.course = "Campo obligatorio.";
    } else {
        if(!rating.course.id)
            errors.course = "Campo obligatorio.";
    }

    return errors;
}