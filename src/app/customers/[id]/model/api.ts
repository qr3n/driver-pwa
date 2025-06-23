interface DriverProfileResponse {
    profile: {
        patronymic: string;
        name: string;
        phone: string;
        user_id: string;
        surname: string;
    };
    feedbacks?: Array<{
        id: string;
        stars: number;
        comment: string;
    }>;
}

export const fetchDriverProfile = async (id: string): Promise<DriverData> => {
    const res = await fetch(`https://primibox.com/api/profile/${id}`);
    if (!res.ok) throw new Error('Failed to fetch driver profile');

    const data: DriverProfileResponse = await res.json();

    return {
        firstName: data.profile.surname || 'Инкогнито',
        lastName: data.profile.name || '',
        userId: data.profile.user_id || '',
        phone: data.profile.phone || 'Еще не задан',
        reviews: (data.feedbacks || []).map(feedback => ({
            id: feedback.id,
            userName: "Аноним",
            rating: feedback.stars,
            comment: feedback.comment,
            date: "Недавно"
        }))
    };
};

function calculateAverageRating(feedbacks?: Array<{stars: number}>): number {
    if (!feedbacks || feedbacks.length === 0) return 4.8;
    const sum = feedbacks.reduce((acc, curr) => acc + curr.stars, 0);
    return parseFloat((sum / feedbacks.length).toFixed(1));
}

interface DriverData {
    firstName: string;
    lastName: string;
    userId: string;
    phone: string;
    reviews: Review[];
}


interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}