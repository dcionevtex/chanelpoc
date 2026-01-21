import React, { useState } from "react";
import { NavbarLinksList, NavbarLinksListItem, Link, NavbarLinks } from "@faststore/ui";
import { HeaderMenuProps } from "../sections/HeaderMenuLinks";
import LinkBanner from "../atoms/LinkBanner";
import LinkBrands from "../atoms/LinkBrands";

type PageLink = HeaderMenuProps["pageLinks"][number];

export function CustomNavbarLinks({ pageLinks }: HeaderMenuProps) {
    const [activeLink, setActiveLink] = useState<PageLink | null>(null);

    return (
        <NavbarLinks data-fs-customnavbar-links onMouseLeave={() => setActiveLink(null)}>
            <NavbarLinksList data-fs-customnavbar-linklist>
                {pageLinks.map((link) => (
                    <NavbarLinksListItem
                        key={link.text}
                        data-fs-customnavbar-linklist-item
                        onMouseEnter={() => setActiveLink(link)}
                    >
                        <Link data-fs-link variant="display" href={link.url}>
                            {link.text}
                        </Link>
                    </NavbarLinksListItem>
                ))}
            </NavbarLinksList>

            {activeLink && activeLink.subitems && activeLink.subitems.length > 0 && (
                <div
                    data-fs-customnavbar-linklist-submenu
                    onMouseEnter={() => console.log("fab", activeLink)}
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            flexDirection: "column",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <ul>
                            {activeLink.subitems.map((child) => (
                                <li key={child.text} style={{fontSize: 14}}>
                                    <Link href={child.url}>{child.text}</Link>
                                </li>
                            ))}
                        </ul>
                        <div style={{marginRight: 16, marginLeft: 16}}>
                            {activeLink.brands && activeLink.brands.length > 0 && (
                                <LinkBrands brands={activeLink.brands} />
                            )}
                        </div>
                    </div>
                    {activeLink.banner && (
                        <LinkBanner
                            image={activeLink.banner?.image ?? ""}
                            url={activeLink.banner?.url ?? "#"}
                        />
                    )}
                </div>
            )}
        </NavbarLinks>
    );
}
