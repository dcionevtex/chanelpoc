import { BASE_URL } from "../../../../constants";

const SpecificationsResolver = {
    getSpecifications: async (_: unknown, { productId }: { productId: string }) => {
        if (!productId) return null;

        const url = `${BASE_URL}/api/catalog_system/pvt/products/${productId}/specification`;

        try {
            const response = await fetch(url);

            if (!response.ok) return null;

            const data = await response.json();

            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    },
};

export default SpecificationsResolver;
