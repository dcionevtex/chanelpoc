import ReviewsResolver from "./reviews";
import ReviewAndRatingsResolver from "./reviews-and-ratings";

const resolvers = {
    Query: { ...ReviewAndRatingsResolver },
    Mutation: { ...ReviewsResolver },
};

export default resolvers;
