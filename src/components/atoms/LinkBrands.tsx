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
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        <Image
                            src={brand.image}
                            alt={brand.name}
                            width={100}
                            height={100}
                            style={{
                                objectFit: "contain",
                                border: "1px solid #000",
                                aspectRatio: "4/3",
                                width: "50px",
                                height: "auto",
                            }}
                        />
                        <p style={{ fontSize: 12 }}>{brand.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
