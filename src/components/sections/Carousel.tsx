import { CustomCarousel } from "../CustomCarousel";
import {
  Configuration,
  SideBanner,
  Slide,
} from "../CustomCarousel/CustomCarousel";

interface CarouselProps {
  slides?: Slide[];
  banner?: SideBanner;
  configuration: Configuration;
  className?: string;
}

export default function Carousel({
  slides,
  banner,
  configuration,
}: CarouselProps) {
  return (
    <CustomCarousel
      configuration={configuration}
      slides={slides}
      sideBanner={banner}
    />
  );
}
