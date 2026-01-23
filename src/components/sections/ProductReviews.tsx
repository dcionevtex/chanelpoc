import { Reviews } from "../organisms/Reviews";
import Ratings from "../organisms/Ratings";

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
    return (
        <section data-fs-product-reviews className="section">
            <h2 data-fs-product-reviews-title className="text__title-section layout__content">
                {text}
            </h2>

            <div data-fs-product-reviews-content>
                <div data-fs-ratings-wrapper>
                    <Ratings ratings={PROPS.ratings} />
                </div>

                <div data-fs-reviews-wrapper>
                    <Reviews />
                </div>
            </div>
        </section>
    );
}
