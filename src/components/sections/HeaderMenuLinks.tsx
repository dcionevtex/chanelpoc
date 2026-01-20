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
    text: string;
    url: string;
}

export default function HeaderMenu({ ...props }: HeaderMenuProps) {
    return (
        <section className="section">
            <CustomNavbarLinks pageLinks={props.pageLinks} />
        </section>
    );
}
