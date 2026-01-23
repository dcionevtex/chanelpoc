import {gql} from "@faststore/core/api"

// @ts-ignore
export const GET_REVIEWS_AND_RATINGS = gql(`
        query getReviewAndRatings {
            getReviewAndRatings {
                rating
                reviewDateTime
                reviewerName
            }
        }
    `)