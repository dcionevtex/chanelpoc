import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Container from "./Container";
import styles from "./styles.module.scss";
import classNames from "classnames";

export interface Slide {
  image: string;
  title: string;
}

export interface SideBanner {
  image: string;
}

interface PaginationItem {
  clickable: boolean;
  renderBullet: (index: number, className: string) => React.ReactNode;
}

export interface Configuration {
  itemPerView: number;
  delay: number;
  autoplay?: boolean;
}

interface CustomCarouselProps {
  slides?: Slide[];
  sideBanner?: SideBanner;
  configuration: Configuration;
}

export default function CustomCarousel({
  slides,
  sideBanner,
  configuration,
}: CustomCarouselProps) {
  const pagination: PaginationItem = {
    clickable: true,
    renderBullet: (_, className) => '<span class="' + className + '"></span>',
  };

  return (
    <Container
      data-fs-custom-carousel
      data-fs-custom-carousel-has-side-banner={!!sideBanner?.image}
      as="section"
    >
      {sideBanner?.image && (
        <div data-fs-custom-carousel-side-banner>
          <img src={sideBanner.image} alt="Banner lateral" loading="lazy" />
        </div>
      )}

      <Swiper
        modules={[Pagination, Navigation, Scrollbar, Autoplay]}
        pagination={pagination}
        loop
        spaceBetween={16}
        autoplay={{ delay: configuration.delay }}
        slidesPerView={configuration.itemPerView}
        navigation
        style={{ width: "100%", height: "100%" }}
      >
        {slides?.map((s, i) => (
          <SwiperSlide
            key={i}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
