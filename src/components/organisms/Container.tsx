import type { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  children: ReactNode;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export default function Container<T extends ElementType = "div">({
  children,
  as,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component data-fs-container {...props}>
      {children}
    </Component>
  );
}
