import { BASE_URL } from "../../../../constants";

const ReviewAndRatingsResolver = {
    getReviewAndRatings: async (_: unknown, { productId }: { productId: string }) => {
        console.log("fab productId", productId);

        if (!productId) return null;

        const url = `${BASE_URL}/reviews-and-ratings/api/reviews?product_id=${productId}`;

        try {
            const response = await fetch(url);
            if (!response.ok) return null;

            const data = await response.json();
            console.log(data)
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
};

export default ReviewAndRatingsResolver;
