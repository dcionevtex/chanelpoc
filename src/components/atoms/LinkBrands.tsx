import { Link } from "@faststore/ui";
import { Brand } from "../sections/HeaderMenuLinks";
import Image from "next/image";

export default function LinkBrands({ brands }: { brands: Brand[] }) {
    return (
        <div data-fs-customnavbar-brands data-fs-customnavbar-brands-container>
            {brands.map((brand) => (
                <div key={brand.name} data-fs-customnavbar-brand-item>
                    <Link variant="display" href={brand.url} data-fs-customnavbar-brand-link>
                        <Image
                            src={brand.image}
                            alt={brand.name}
                            width={100}
                            height={100}
                            data-fs-customnavbar-brand-image
                        />
                        <p data-fs-customnavbar-brand-name>{brand.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
