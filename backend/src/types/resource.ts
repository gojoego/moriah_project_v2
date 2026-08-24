export interface Resource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    resourceType: string;
    audience: string[] | null;
    format: string[] | null;
    locationScope: string | null;
    tags: string[] | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string; 
}