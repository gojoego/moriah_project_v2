export type Resource = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    resourceType: string;
    audience: string[];
    format: string[];
    locationScope: string | null;
    tags: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};