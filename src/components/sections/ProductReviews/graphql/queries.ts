import { gql } from "@faststore/core/api";

// TODO: make request get the variables (for no reason 'productId' can't reach gql)

// @ts-ignore
export const GET_REVIEWS_AND_RATINGS = gql(`
  query GetReviewAndRatings($productId: String!) {
    getReviewAndRatings(productId: $productId) {
      rating
      reviewDateTime
      reviewerName
    }
  }
`);
