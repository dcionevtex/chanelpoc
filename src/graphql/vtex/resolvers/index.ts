import ReviewAndRatingsResolver from "./reviews-and-ratings";

const resolvers = {
    Query: { ...ReviewAndRatingsResolver },
    Mutation: {},
};

export default resolvers;
