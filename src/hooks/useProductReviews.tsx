import { useMemo } from 'react'
import { GET_REVIEWS_AND_RATINGS } from '../components/sections/ProductReviews/graphql/queries'
import { useQuery_unstable as useQuery } from "@faststore/core/experimental";

type Review = {
  rating: number
  reviewDateTime: string
  reviewerName: string
}

export const useProductReviews = (
  productId?: string
) => {
  const variables = useMemo(() => {
    if (!productId) return null

    return {
      productId,
    }
  }, [productId])

  return useQuery<Review[], { productId: string }>(
    GET_REVIEWS_AND_RATINGS,
    variables,
    {
      doNotRun: !variables,
      revalidateOnMount: true,
    }
  )
}
