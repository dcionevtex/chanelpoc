import { useEffect, useState } from "react";
import { CustomNavbarLinks } from "../molecules/CustomNavbarLinks";

export interface HeaderMenuProps {
    pageLinks: PageLink[];
}

export interface PageLink {
    text: string;
    url: string;
    banner?: Banner;
    brands?: Brand[];
    subitems?: SubItem[];
}

export interface Banner {
    image: string;
    url: string;
}

export interface Brand {
    name: string;
    url: string;
    image: string;
}

export interface SubItem {
    groupTitle: string;
    links: LinkItem[];
}

export interface LinkItem {
    text: string;
    url: string;
}

const HEADER_SCROLL_THRESHOLD = 64;

export default function HeaderMenu({ ...props }: HeaderMenuProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY < HEADER_SCROLL_THRESHOLD);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <section className="section">
            <CustomNavbarLinks pageLinks={props.pageLinks} />
        </section>
    );
}
