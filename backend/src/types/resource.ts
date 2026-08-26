import {
    RESOURCE_CATEGORIES,
    RESOURCE_TYPES,
    RESOURCE_AUDIENCES,
    RESOURCE_FORMATS,
} from "../constants/resources";

export type ResourceCategory =
    typeof RESOURCE_CATEGORIES[number];

export type ResourceKind =
    typeof RESOURCE_TYPES[number];

export type ResourceAudience =
    typeof RESOURCE_AUDIENCES[number];

export type ResourceFormat =
    typeof RESOURCE_FORMATS[number];

export interface Resource {
    id: string;

    name: string;
    description: string;
    url: string;

    category: ResourceCategory;
    resourceType: ResourceKind;

    audience: ResourceAudience[];
    format: ResourceFormat[];

    locationScope: string | null;
    tags: string[];

    isActive: boolean;

    createdAt: string;
    updatedAt: string;
}