import { 
    getAllPosts, 
    getPostsByAuthorId, 
    getPostsById,
    insertPost,
    updatePost,
    deletePost
} from "../db/queries/posts";

import { CreatePostInput, UpdatePostInput } from "../schemas/posts"

export async function getAllPostsService(options?: {
    limit?: number;
    offset?: number;
}) {
    return getAllPosts(options);
}

export async function getMyPostsService(userId: string) {
    return getPostsByAuthorId(userId);
} 

export async function getPostsByIdService(id: string) {
    return getPostsById(id);
}

export async function createPostService(
    userId: string, 
    input: CreatePostInput
) {
    return insertPost(userId, input);
}

export async function updatePostService(
    id: string, 
    userId: string,
    updates: UpdatePostInput
) {
    const existingPost = await getPostsById(id);
    
    if (!existingPost) {
        return {
            status: "not_found" as const, 
        };
    }

    if (existingPost.author_id !== userId) {
        return {
            status: "forbidden" as const,
        };
    }

    const updatedPost = await updatePost(id, updates);

    if (!updatedPost) {
        return {
            status: "not_found" as const,
        };
    }
    
    return {
        status: "success" as const,
        post: updatedPost,
    };
}

export async function deletePostService(
    id: string, 
    userId: string
) {
    const existingPost = await getPostsById(id);

    if (!existingPost) {
        return {
            status: "not_found" as const,
        };
    }

    if (existingPost.author_id !== userId) {
        return {
            status: "forbidden" as const,
        };
    }

    await deletePost(id);

    return {
        status: "success" as const, 
    }
}