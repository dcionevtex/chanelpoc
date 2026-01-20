import { Link } from "@faststore/ui";
import Image from "next/image";
import { Banner } from "../sections/HeaderMenuLinks";

export default function LinkBanner({ image, url }: Banner) {
    return (
        <Link variant="display" href={url}>
            <Image
                src={image}
                alt=""
                width={400}
                height={400}
                style={{
                    height: "500",
                    width: "auto",
                    objectFit: "cover",
                    aspectRatio: "4/5",
                    borderRadius: "8px",
                }}
            />
        </Link>
    );
}
