export default function getProfessorEmoji(rating: number): React.ReactNode {
    if(rating <= 4)
        return <>&#128533;</>;
    else if(rating <= 7)
        return <>&#128528;</>;
    else
        return <>&#128515;</>;
}