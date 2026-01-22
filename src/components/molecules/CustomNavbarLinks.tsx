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
                {pageLinks.map((link, linkIndex) => (
                    <NavbarLinksListItem
                        key={`${link.text}-${linkIndex}`}
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
                    key={activeLink.text}
                    data-fs-customnavbar-linklist-submenu
                    data-fs-customnavbar-submenu-wrapper
                >
                    <div data-fs-customnavbar-submenu-content>
                        <div data-fs-customnavbar-submenu-groups>
                            {activeLink.subitems.map((child, childIndex) => (
                                <div
                                    key={`${child.groupTitle}-${childIndex}`}
                                    data-fs-customnavbar-submenu-group
                                >
                                    <b data-fs-customnavbar-group-title>{child.groupTitle}</b>

                                    <div data-fs-customnavbar-group-links>
                                        {child.links.map((subLink, subIndex) => (
                                            <div
                                                key={`${subLink.text}-${subIndex}`}
                                                data-fs-customnavbar-group-link
                                            >
                                                <Link data-fs-submenu-link href={subLink.url}>
                                                    {subLink.text}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div data-fs-customnavbar-submenu-brands>
                            {activeLink.brands && activeLink.brands.length > 0 && (
                                <LinkBrands brands={activeLink.brands} />
                            )}
                        </div>
                    </div>

                    {activeLink.banner && (
                        <div data-fs-customnavbar-submenu-banner>
                            <LinkBanner
                                image={activeLink.banner.image ?? ""}
                                url={activeLink.banner.url ?? "#"}
                            />
                        </div>
                    )}
                </div>
            )}
        </NavbarLinks>
    );
}
