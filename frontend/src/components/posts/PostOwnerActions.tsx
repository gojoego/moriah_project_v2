import Link from "next/link";
import { Button } from "@/components/ui/button";

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

