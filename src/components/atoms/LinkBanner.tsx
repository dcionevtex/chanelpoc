import { Link } from "@faststore/ui";
import Image from "next/image";
import { Banner } from "../sections/HeaderMenuLinks";

export default function LinkBanner({ image, url }: Banner) {
    return (
        <Link variant="display" href={url} data-fs-customnavbar-banner-link>
            <Image
                src={image}
                alt="Link Banner"
                width={400}
                height={400}
                data-fs-customnavbar-banner-image
            />
        </Link>
    );
}
