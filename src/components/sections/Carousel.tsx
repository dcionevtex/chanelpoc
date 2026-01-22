import { CustomCarousel } from "../CustomCarousel";
import { Configuration, Slide } from "../CustomCarousel/CustomCarousel";

interface CarouselProps {
  slides?: Slide[];
  sideBanner?: string;
  configuration: Configuration;
  className?: string;
}

export default function Carousel({
  slides,
  sideBanner,
  configuration,
}: CarouselProps) {
  return (
    <CustomCarousel
      configuration={configuration}
      slides={slides}
      sideBanner={sideBanner}
    />
  );
}
