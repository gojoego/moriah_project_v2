import type { Resource } from "@/types/resource";

type ResourceCardProps = {
    resource: Resource;
}

function formatLabel(value: string) {
    return value
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ResourceCard({
    resource,
}: ResourceCardProps) {
    return (
        <div
            className="
                rounded-xl
                border
                border-border
                bg-muted/30
                p-3
            "
        >
            <h3
                className="
                    font-semibold

                "
            >
                {resource.name}
            </h3>

            <p
                className="
                    mt-1
                    text-sm
                    text-foreground/80
                "
            >
                {resource.description}
            </p>

            <div
                className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                "
            >
                <span
                    className="
                        rounded-full
                        bg-muted
                        px-2
                        py-1
                        text-xs
                        text-muted-foreground
                    "   
                >
                    {formatLabel(resource.resourceType)}
                </span>

                {resource.format.map((format) => (
                    <span
                        key={format}
                        className="
                            rounded-full
                            bg-muted
                            px-2
                            py-1
                            text-xs
                            text-muted-foreground
                        "
                    >
                        {format}
                    </span>
                ))}
            </div>
            <a 
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1
                    text-sm
                    font-medium
                    text-primary
                    transition
                    hover:underline
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    rounded-sm
                "
            >
                Visit resource
                <span aria-hidden="true">
                    →
                </span>
            </a>
        </div>
    );
}