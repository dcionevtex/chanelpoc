import { Link } from "@faststore/ui";
import { Brand } from "../sections/HeaderMenuLinks";
import Image from "next/image";

export default function LinkBrands({ brands }: { brands: Brand[] }) {
    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "32px" }}>
            {brands.map((brand) => (
                <div key={brand.name}>
                    <Link
                        variant="display"
                        href={brand.url}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <Image src={brand.image} alt={brand.name} width={100} height={100} />
                        {brand.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}
