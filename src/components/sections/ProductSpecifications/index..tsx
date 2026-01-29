import { usePDP } from "@faststore/core";
import { useProductSpecifications } from "../../../hooks/useSpecifications";

export interface ProductSpecificationsProps {
    text: string;
}

interface ProductData {
    id: string;
    additionalProperty: {
        propertyID: string;
        name: string;
        value: any;
        valueReference: any;
    }[];
}

export interface Specification {
    Id: number;
    Value: string[];
    Name: string;
}

export default function ProductSpecifications({ text }: ProductSpecificationsProps) {
    const context = usePDP();
    const product: ProductData | undefined = context?.data?.product;

    if (!product) return null;

    const { data, error, isLoading } = useProductSpecifications(product?.id);
    const productSpecs: Specification[] = data?.length ? data : [];

    if (isLoading) return <p>loading</p>;
    if (error) return <p>{error}</p>;

    const prodProps = [
        ...product.additionalProperty,
        ...productSpecs?.map((item) => {
            return {
                propertyID: item.Id,
                name: item.Name,
                value: item.Value[0] || item.Value,
                valueReference: 0,
            };
        }),
    ];

    const middleProps = Math.ceil(prodProps.length / 2);
    const upperHalf = prodProps.slice(0, middleProps);
    const lowerHalf = prodProps.slice(middleProps);

    return (
        <section data-fs-product-specifications className="section">
            <h2
                className="text__title-section layout__content"
                data-fs-product-specifications-title
            >
                {text}
            </h2>

            <div data-fs-product-specifications-content>
                <div data-fs-product-specifications-column>
                    {upperHalf.map((prop, index) => (
                        <div
                            key={prop.propertyID}
                            data-fs-product-specifications-row
                            data-even={index % 2 === 0}
                        >
                            <p data-fs-product-specifications-label>{prop.name}</p>
                            <p data-fs-product-specifications-value>{prop.value}</p>
                        </div>
                    ))}
                </div>

                <div data-fs-product-specifications-column>
                    {lowerHalf.map((prop, index) => (
                        <div
                            key={prop.propertyID}
                            data-fs-product-specifications-row
                            data-even={index % 2 === 0}
                        >
                            <p data-fs-product-specifications-label>{prop.name}</p>
                            <p data-fs-product-specifications-value>{prop.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
