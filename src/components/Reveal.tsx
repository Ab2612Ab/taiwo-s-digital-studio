import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DeveloperPortrait } from "@/components/DeveloperPortrait";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },

      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const childList = Children.toArray(children);
  const firstChild = childList[0];
  const isAboutHeading =
    isValidElement<{ children?: ReactNode }>(firstChild) &&
    firstChild.type === "h2" &&
    firstChild.props.children === "About me";

  const renderedChildren = isAboutHeading ? (
    <>
      {firstChild}
      <div className="mt-8 w-full max-w-4xl">
        <DeveloperPortrait />
      </div>
      {childList.slice(1)}
    </>
  ) : (
    children
  );

  return (
    <Tag
      ref={ref as never}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {renderedChildren}
    </Tag>
  );
}
