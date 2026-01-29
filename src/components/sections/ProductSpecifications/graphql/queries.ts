import { gql } from '@faststore/core/api'

// @ts-ignore
export const GET_SPECIFICATIONS = gql`
  query GetSpecifications($productId: String!) {
    getSpecifications(productId: $productId) {
      Id
      Value
      Name
    }
  }
`
