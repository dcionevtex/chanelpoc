import { Icon } from "@faststore/ui";

const reviews = [
  {
    id: 1,
    user: "Lorem ipsum",
    date: "12 Jan 2026",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    user: "Ut enim ad minim",
    date: "08 Jan 2026",
    rating: 4,
    comment:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

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

export function Reviews() {
  return (
    <div data-fs-reviews>
      <p data-fs-reviews-title>Reviews</p>

      <div data-fs-reviews-list>
        {reviews.map((review) => (
          <div key={review.id} data-fs-review-item>
            <div data-fs-review-header>
              <div data-fs-review-avatar>{review.user.charAt(0)}</div>

              <div data-fs-review-userinfo>
                <span data-fs-review-username>{review.user}</span>
                <span data-fs-review-date>{review.date}</span>
              </div>
            </div>

            <Stars value={review.rating} />

            <p data-fs-review-comment>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
