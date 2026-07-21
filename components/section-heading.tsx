import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "animate-fade-up space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center"
      )}
    >
      {eyebrow ? <Badge variant="calm">{eyebrow}</Badge> : null}
      <div className="space-y-3">
        <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
