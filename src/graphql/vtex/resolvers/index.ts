import ReviewsResolver from "./reviews";
import ReviewAndRatingsResolver from "./reviews-and-ratings";
import SpecificationsResolver from "./specifications";

const resolvers = {
    Query: {
        ...ReviewAndRatingsResolver,
        ...SpecificationsResolver,
    },
    Mutation: { ...ReviewsResolver },
};

export default resolvers;
