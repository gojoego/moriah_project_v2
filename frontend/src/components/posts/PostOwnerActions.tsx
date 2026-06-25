import Link from "next/link";
import { Button } from "../ui/button";

interface PostOwnerActionsProps {
    postId: string;
    onDeletePost?: (postId: string) => void;
}

export function PostOwnerActions({
    postId,
    onDeletePost,
}: PostOwnerActionsProps) {
    return (
        <div>
            <Link
                href={`/posts/${postId}/edit`}
                className="px-3 py-1 rounded border"
            >
                Edit
            </Link>

            <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onDeletePost?.(postId)}
            >
                Delete
            </Button>
        </div>
    );
}

