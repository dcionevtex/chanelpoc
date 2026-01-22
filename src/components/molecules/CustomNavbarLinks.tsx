import React, { useState } from "react";
import {
    NavbarLinksList,
    NavbarLinksListItem,
    Link,
    NavbarLinks,
} from "@faststore/ui";
import { HeaderMenuProps } from "../sections/HeaderMenuLinks";
import LinkBanner from "../atoms/LinkBanner";
import LinkBrands from "../atoms/LinkBrands";

type PageLink = HeaderMenuProps["pageLinks"][number];

export function CustomNavbarLinks({ pageLinks }: HeaderMenuProps) {
    const [activeLink, setActiveLink] = useState<PageLink | null>(null);

    return (
        <NavbarLinks
            data-fs-customnavbar-links
            onMouseLeave={() => setActiveLink(null)}
        >
            <NavbarLinksList data-fs-customnavbar-linklist>
                {pageLinks.map((link, linkIndex) => (
                    <NavbarLinksListItem
                        key={`${link.text}-${linkIndex}`}
                        data-fs-customnavbar-linklist-item
                        onMouseEnter={() => setActiveLink(link)}
                    >
                        <Link
                            data-fs-link
                            variant="display"
                            href={link.url}
                        >
                            {link.text}
                        </Link>
                    </NavbarLinksListItem>
                ))}
            </NavbarLinksList>

            {activeLink &&
                activeLink.subitems &&
                activeLink.subitems.length > 0 && (
                    <div
                        key={activeLink.text} // força remontagem do submenu
                        data-fs-customnavbar-linklist-submenu
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "100px",
                                    marginRight: 16,
                                    marginLeft: 16,
                                }}
                            >
                                {activeLink.subitems.map(
                                    (child, childIndex) => (
                                        <div
                                            key={`${child.groupTitle}-${childIndex}`}
                                            style={{
                                                fontSize: 14,
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "fit-content",
                                                gap: "8px",
                                            }}
                                        >
                                            <b>{child.groupTitle}</b>

                                            {child.links.map(
                                                (subLink, subIndex) => (
                                                    <div
                                                        key={`${subLink.text}-${subIndex}`}
                                                    >
                                                        <Link
                                                            href={subLink.url}
                                                            style={{
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            {subLink.text}
                                                        </Link>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                                )}
                            </div>

                            <div
                                style={{
                                    marginRight: 16,
                                    marginLeft: 16,
                                }}
                            >
                                {activeLink.brands &&
                                    activeLink.brands.length > 0 && (
                                        <LinkBrands
                                            brands={activeLink.brands}
                                        />
                                    )}
                            </div>
                        </div>

                        {activeLink.banner && (
                            <LinkBanner
                                image={activeLink.banner.image ?? ""}
                                url={activeLink.banner.url ?? "#"}
                            />
                        )}
                    </div>
                )}
        </NavbarLinks>
    );
}
