type Profile = {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture_url: string;
    information: {
        major: string;
        semester: number;
        instagram: string;
        bio: string;
    }
}