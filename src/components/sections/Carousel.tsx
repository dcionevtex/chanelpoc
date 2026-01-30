import CustomCarousel from "../organisms/CustomCarousel";
import { Configuration, SideBanner, Slide } from "../organisms/CustomCarousel";

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
    <section className="section">
      <CustomCarousel
        configuration={configuration}
        slides={slides}
        sideBanner={banner}
      />
    </section>
  );
}
