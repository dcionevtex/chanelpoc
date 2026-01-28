import { useCallback } from "react";
import { useLazyQuery_unstable as useLazyQuery } from "@faststore/core/experimental";
import { POST_REVIEW } from "../components/sections/ProductReviews/graphql/mutations";

interface PostReviewInput {
    productId: string;
    rating: number;
    title: string;
    text: string;
    reviewerName: string;
}

export function usePostReview({ productId, rating, title, text, reviewerName }: PostReviewInput) {
    const [postReview, { data }] = useLazyQuery(POST_REVIEW, {
        variables: {
            input: {
                productId,
                rating,
                title,
                text,
                reviewerName,
            },
        },
    });

    const submitReview = useCallback(
        async (input: PostReviewInput) => {
            if (!productId) {
                throw new Error("productId is required to post a review");
            }

            return postReview({
                variables: {
                    input: {
                        productId,
                        rating: input.rating,
                        title: input.title,
                        text: input.text,
                        reviewerName: input.reviewerName,
                    },
                },
            });
        },
        [postReview, productId],
    );

    return {
        submitReview,
        data,
    };
}
