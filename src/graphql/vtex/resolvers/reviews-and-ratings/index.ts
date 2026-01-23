import { BASE_URL } from "../../../../constants";

const ReviewAndRatingsResolver = {
    getReviewAndRatings: async () => {
        const url = `${BASE_URL}/reviews-and-ratings/api/reviews`;

        try {
            const response = await fetch(url);

            if (!response.ok) return null;

            return response.json();
        } catch (err) {
            console.log(err);
        }
    },
};

export default ReviewAndRatingsResolver;
