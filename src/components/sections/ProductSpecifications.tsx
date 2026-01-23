import { usePDP } from "@faststore/core";

export interface ProductSpecificationsProps {
    text: string;
}

interface ProductData {
    additionalProperty: {
        propertyID: string;
        name: string;
        value: any;
        valueReference: any;
    }[];
}

export default function ProductSpecifications({ text }: ProductSpecificationsProps) {
    const context = usePDP();
    const product: ProductData | undefined = context?.data?.product;

    if (!product) return null;

    const prodProps = product.additionalProperty;

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
