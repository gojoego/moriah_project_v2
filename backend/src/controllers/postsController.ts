import { 
    Response, 
    Request, 
    NextFunction
} from "express";

import { 
    createPostService,
    deletePostService,
    getAllPostsService,
    getMyPostsService, 
    getPostsByIdService, 
    updatePostService
} from "../services/postsService";

import { paginationSchema } from "../schemas/pagination";

import { 
    postIdParamsSchema, 
    createPostSchema, 
    updatePostSchema 
} from "../schemas/posts"

import { AuthRequest } from "../types/auth";

import { getZodErrorMessage } from "../utils/zod";

export async function getAllPostsController(
    req: Request, 
    res: Response,
    next: NextFunction
) {
    const parsed = paginationSchema.safeParse(req.query);

    if (!parsed.success) {
        return res.status(400).json({
            error: "Invalid pagination parameters",
        });
    }

    const { 
        limit, 
        offset } = parsed.data;

    try {
        const posts = await getAllPostsService({ 
            limit, 
            offset 
        });
        
        return res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
}

export async function getMyPostsController(
    req: AuthRequest,
    res: Response, 
    next: NextFunction
){
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ 
                error: "Unauthorized" 
            });
        }

        const posts = await getMyPostsService(userId);

        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export async function getPostsByIdController(
    req: Request,
    res: Response,
    next: NextFunction    
) {
    try {
        const parsed = postIdParamsSchema.safeParse(req.params);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid post id",
            });
        }

        const { id } = parsed.data;

        const post = await getPostsByIdService(id);

        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export async function createPostController(
    req: AuthRequest, 
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ 
                error: "Unauthorized"
            });
        }

        const parsed = createPostSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsed.error),
            });
        }

        const newPost = await createPostService(
            userId,
            parsed.data
        );

        if (!newPost) {
            return res.status(500).json({ error: "Failed to create post" });
        }

        return res.status(201).json(newPost);
    } catch(error) {
        next(error);
    }
}

export async function updatePostController(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const parsedParams = postIdParamsSchema.safeParse(req.params);

        if (!parsedParams.success) {
            return res.status(400).json({
                error: "Invalid post id"
            })
        }

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const parsedBody = updatePostSchema.safeParse(req.body);

        if (!parsedBody.success) {
            return res.status(400).json({
                error: getZodErrorMessage(parsedBody.error),
            });
        }

        const { id } = parsedParams.data;

        const result = await updatePostService(
            id,
            userId,
            parsedBody.data
        );

        if (result.status === "not_found") {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        if (result.status === "forbidden") {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        return res.status(200).json(result.post);
    } catch(error) {
        next(error);
    }
}

export async function deletePostController(
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
){
    try {
        const parsedParams = postIdParamsSchema.safeParse(req.params);

        if (!parsedParams.success) {
            return res.status(400).json({
                error: "Invalid post id"
            })
        }

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const { id } = parsedParams.data;

        const result = await deletePostService(id, userId);

        if (result.status === "not_found") {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        if (result.status === "forbidden") {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}