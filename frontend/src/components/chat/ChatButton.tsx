"use client";

import { forwardRef } from "react";
import { MessageCircle } from "lucide-react";
type ChatButtonProps = {
    isOpen: boolean;
    onClick: () => void;
};

const ChatButton = forwardRef<
    HTMLButtonElement,
    ChatButtonProps
>(function ChatButton(
    {
        isOpen,
        onClick
    },
    ref
) {
    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            aria-label={
                isOpen
                ? "Close support chat"
                : "Open support chat"
            }
            className="
                fixed 
                bottom-6 
                right-6 
                z-50

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-full

                bg-primary
                text-primary-foreground

                shadow-lg

                transition
                hover:scale-105

                focus:outline-none
                focus:ring-2
                focus:ring-ring
                focus:ring-offset-2
            "
        >
            <MessageCircle
                size={24}
                aria-hidden="true"
            />
        </button>
    );
});

export default ChatButton;