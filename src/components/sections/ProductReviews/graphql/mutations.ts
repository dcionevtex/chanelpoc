import { gql } from "@faststore/core/api";

// TODO: make request get the variables (for no reason 'input' can't reach gql)

// @ts-ignore
export const POST_REVIEW = gql(`
  mutation PostReview($input: PostReviewInput!) {
    postReview(input: $input) {
      productId
      rating
      reviewerName
    }
  }
`);
