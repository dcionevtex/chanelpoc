import { useMemo } from "react";
import { useQuery_unstable as useQuery } from "@faststore/core/experimental";
import { GET_SPECIFICATIONS } from "../components/sections/ProductSpecifications/graphql/queries";
import { Specification } from "@faststore/core/api";

export const useProductSpecifications = (productId?: string) => {
    const variables = useMemo(() => {
        if (!productId) return null;

        return {
            productId,
        };
    }, [productId]);

    return useQuery<Specification[], { productId: string }>(GET_SPECIFICATIONS, variables, {
        doNotRun: !variables,
        revalidateOnMount: true,
    });
};
