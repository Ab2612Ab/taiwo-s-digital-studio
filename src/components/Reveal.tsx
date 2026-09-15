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

  useEffect(() => {
    if (typeof window === "undefined" || window.location.pathname !== "/") return;
    const addInsightsLink = () => {
      document.querySelectorAll("header nav").forEach((nav) => {
        if (nav.querySelector('[data-insights-nav="true"]')) return;
        const link = document.createElement("a");
        link.href = "/insights";
        link.textContent = "Insights";
        link.dataset["insightsNav"] = "true";
        link.className = nav.classList.contains("md:hidden")
          ? "py-2 text-sm text-muted-foreground"
          : "text-sm text-muted-foreground hover:text-foreground";
        link.addEventListener("click", () => {
          const toggle = document.querySelector('button[aria-label="Toggle menu"]') as HTMLButtonElement | null;
          if (toggle && nav.classList.contains("md:hidden")) toggle.click();
        });
        const hireMe = Array.from(nav.children).find((child) => child instanceof HTMLAnchorElement && child.textContent?.trim() === "Hire me");
        nav.insertBefore(link, hireMe ?? null);
      });
    };
    addInsightsLink();
    const observer = new MutationObserver(addInsightsLink);
    observer.observe(document.body, { childList: true, subtree: true });
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
      <div className="mt-8 w-full max-w-sm">
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
