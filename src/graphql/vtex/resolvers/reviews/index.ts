import { BASE_URL } from "../../../../constants";

export interface PostReviewPayload {
    productId: string;
    rating: number;
    title: string;
    text: string;
    reviewerName: string;
}

const ReviewsResolver = {
    postReview: async (_: unknown, data: { input: PostReviewPayload }) => {
        if (!data.input) return null;

        const url = `${BASE_URL}/reviews-and-ratings/api/review`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...data.input,
                reviewerName: data.input.reviewerName || "Anonymous",
                approved: true,
            }),
        });

        if (!response.ok) return null;

        return response.json();
    },
};

export default ReviewsResolver;
