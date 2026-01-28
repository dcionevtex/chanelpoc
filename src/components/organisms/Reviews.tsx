import { Alert, Button, Icon, Loader, Rating } from "@faststore/ui";
import { Dispatch, SetStateAction, useState } from "react";
import { usePostReview } from "../../hooks/usePostReview";

interface ReviewProps {
    reviews: Array<any>;
    reviewing: boolean;
    setReviewing: Dispatch<SetStateAction<boolean>>;
    productId?: string;
}

export function Reviews({ reviews = [], reviewing, setReviewing, productId }: ReviewProps) {
    const [form, setForm] = useState({
        rating: 5,
        title: "",
        text: "",
    });

    const { submitReview } = usePostReview({
        productId: productId || "",
        rating: form.rating,
        title: form.title,
        text: form.text,
        reviewerName: "Fab",
    });

    const handleChange =
        (field: "title" | "text") =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((prev) => ({
                ...prev,
                [field]: event.target.value,
            }));
        };

    const handleRatingChange = (value: number) => {
        setForm((prev) => ({
            ...prev,
            rating: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const res = await submitReview({
                productId: productId || "",
                rating: form.rating,
                title: form.title,
                text: form.text,
                reviewerName: "Fab",
            });

            console.log("fab", res);
            setReviewing(false);
        } catch (err) {
            console.error("fab", err);
        }
    };

    return (
        <div data-fs-reviews>
            <p data-fs-reviews-title>Reviews</p>

            <div data-fs-reviews-list>
                {reviews?.slice(0, reviewing ? 0 : 1).map((review) => (
                    <div key={review.id} data-fs-review-item>
                        <div data-fs-review-header>
                            <div data-fs-review-avatar>{review.user.charAt(0)}</div>

                            <div data-fs-review-userinfo>
                                <span data-fs-review-username>{review.user}</span>
                                <span data-fs-review-date>{review.date}</span>
                            </div>
                        </div>

                        <Stars value={review.rating} />
                        {/* <p>{review.title}</p> */}
                        <p data-fs-review-comment>{review.comment}</p>
                    </div>
                ))}
                {!reviews.length && <p>No comments yet</p>}
            </div>

            {reviewing && (
                <div data-fs-review-form>
                    <div data-fs-review-form-first>
                        <div data-fs-review-form-title>
                            <label>Title</label>
                            <input
                                value={form.title}
                                onChange={handleChange("title")}
                                placeholder="Review title"
                                data-fs-review-input
                            />
                        </div>
                        <div data-fs-review-form-rating>
                            <label>Rating</label>
                            <div>
                                <Rating
                                    value={form.rating}
                                    onChange={handleRatingChange}
                                    icon={<Icon name="Star" />}
                                    data-fs-ratings-stars
                                />
                                {form.rating}
                            </div>
                        </div>
                    </div>

                    <div data-fs-review-form-second>
                        <label>Comment</label>
                        <textarea
                            value={form.text}
                            onChange={handleChange("text")}
                            placeholder="Write your review"
                            maxLength={500}
                            rows={8}
                            data-fs-review-textarea
                        />
                    </div>

                    <div data-fs-review-btns>
                        <Button data-fs-review-add onClick={handleSubmit} disabled={false}>
                            {false ? <Loader /> : "Send"}
                        </Button>
                        <Button data-fs-review-cancel onClick={() => setReviewing(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* <Alert dismissible>Dismissible Alert message</Alert> */}
        </div>
    );
}

function Stars({ value }: { value: number }) {
    return (
        <div data-fs-review-stars>
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>
                    {index < value ? (
                        <Icon name="Star" data-fs-review-star-filled />
                    ) : (
                        <Icon name="Star" data-fs-review-star-outline />
                    )}
                </span>
            ))}
        </div>
    );
}
