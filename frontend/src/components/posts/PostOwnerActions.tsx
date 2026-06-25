import Link from "next/link";

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

            <button
                type="button"
                onClick={() => onDeletePost?.(postId)}
                className="px-3 py-1 rounded border test-red-600"
            >
                Delete
            </button>
        </div>
    );
}

