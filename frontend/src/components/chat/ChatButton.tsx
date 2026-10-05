"use client";

type ChatButtonProps = {
    isOpen: boolean;
    onClick: () => void;
};

export default function ChatButton({
    onClick
}: ChatButtonProps) {
    return (
        <button type="button" onClick={onClick}>
            Chat
        </button>
    )
}