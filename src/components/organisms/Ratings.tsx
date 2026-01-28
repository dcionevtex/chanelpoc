import { Dispatch, SetStateAction, useState } from "react";
import { Button, Icon, Rating } from "@faststore/ui";

export interface RatingsProps {
    ratings: Record<number, number>;
    reviewing: boolean;
    setReviewing: Dispatch<SetStateAction<boolean>>;
}

export default function Ratings({ ratings, reviewing, setReviewing }: RatingsProps) {
    const { total, average } = Object.entries(ratings).reduce(
        (acc, [rating, count]) => {
            const value = Number(rating);
            acc.total += count;
            acc.sum += value * count;
            acc.average = acc.sum / acc.total;
            return acc;
        },
        { total: 0, sum: 0, average: 0 },
    );

    const rating = Math.round(average);

    return (
        <div data-fs-ratings>
            <p data-fs-ratings-average>{average.toFixed(1)}</p>

            <Rating value={rating} icon={<Icon name="Star" />} data-fs-ratings-stars />

            <p data-fs-ratings-total>Reviewed by {total} user(s)</p>

            <div data-fs-ratings-breakdown>
                {Object.entries(ratings)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([grade, value]) => {
                        const percentage = (value / total) * 100;

                        return (
                            <div key={grade} data-fs-ratings-row>
                                <p data-fs-ratings-grade>{grade}</p>

                                <Icon name="Star" data-fs-ratings-star-icon />

                                <div data-fs-ratings-bar>
                                    <div
                                        data-fs-ratings-bar-fill
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>

                                <p data-fs-ratings-percentage>{percentage.toFixed(0)}%</p>
                            </div>
                        );
                    })}
            </div>

            {!reviewing && <Button data-fs-ratings-add onClick={() => setReviewing(true)}>
                Add Review
            </Button>}
        </div>
    );
}
