import { useState } from "react";
import { usePDP } from "@faststore/core";

import Ratings from "../../organisms/Ratings";
import { Reviews } from "../../organisms/Reviews";
import { useProductReviews } from "../../../hooks/useProductReviews";

export interface ProductReviewsProps {
    text: string;
}

const PROPS = {
    ratings: {
        5: 71,
        4: 14,
        3: 2,
        2: 6,
        1: 9,
    },
};

export default function ProductReviews({ text }: ProductReviewsProps) {
    const { data } = usePDP();
    const productId = data?.product?.id;

    const [reviewing, setReviewing] = useState(false);

    const { data: reviews, isValidating } = useProductReviews(productId);

    return (
        <section data-fs-product-reviews className="section">
            <h2 data-fs-product-reviews-title className="text__title-section layout__content">
                {text}
            </h2>

            <div data-fs-product-reviews-content>
                <div data-fs-ratings-wrapper>
                    <Ratings
                        reviewing={reviewing}
                        ratings={PROPS.ratings}
                        setReviewing={setReviewing}
                    />
                </div>

                <div data-fs-reviews-wrapper>
                    <Reviews
                        reviews={reviews ?? []}
                        reviewing={reviewing}
                        // loading={isValidating}
                        setReviewing={setReviewing}
                        productId={productId}
                    />
                </div>
            </div>
        </section>
    );
}
