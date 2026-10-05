"use client";

type ChatButtonProps = {
    isOpen: boolean;
    onClick: () => void;
};

export default function ChatButton({
}: ChatButtonProps) {
    return (
        <button>
            Chat
        </button>
    )
}