"use client";

import {
    forwardRef,
} from "react";

type ChatInputProps = {
    message: string;
    loading: boolean;
    onMessageChange: (value: string) => void;
    onSend: () => void;
};

const ChatInput = forwardRef<
    HTMLInputElement,
    ChatInputProps
>(function ChatInput(
    {
        message,
        loading,
        onMessageChange,
        onSend,
    },
    ref
) {
    return (
        <div
            className="
                flex
                items-center
                gap-2

                border-t
                border-border

                p-3
            "
        >
            <input
                ref={ref}
                type="text"
                placeholder="Ask about resources..."
                value={message}
                onChange={(event) =>
                    onMessageChange(event.target.value)
                }
                onKeyDown={(event) => {
                    if (event.key === "Enter" && !loading) {
                        onSend();
                    }
                }}
                disabled={loading}
                className="
                    flex-1

                    rounded-md
                    border
                    border-border

                    bg-background

                    px-3
                    py-2

                    text-sm

                    outline-none

                    focus-visible:ring-2
                    focus-visible:ring-ring
                "
            />

            <button
                type="button"
                onClick={onSend}
                disabled={loading}
                className="
                    rounded-md

                    bg-primary
                    text-primary-foreground

                    px-3
                    py-2

                    text-sm
                    font-medium

                    transition
                    hover:opacity-90

                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                "
            >
                {loading ? "Sending..." : "Send"}
            </button>
        </div>
    );
});

export default ChatInput;