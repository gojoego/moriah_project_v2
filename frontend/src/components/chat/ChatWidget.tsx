"use client";

import { 
    useState,
    useRef,
    useEffect
} from "react";
import type { Resource } from "@/types/resource";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";
import ChatInput from "./ChatInput";

type ChatResourceResponse = {
    crisisDetected: boolean;
    resources: Resource[];
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resources, setResources] = useState<Resource[]>([]);
    const [submittedMessage, setSubmittedMessage] = useState("");
    const [crisisDetected, setCrisisDetected] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const launcherRef = useRef<HTMLButtonElement | null>(null);
    const hasOpenedRef = useRef(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [
        submittedMessage,
        resources,
        loading,
        crisisDetected,
    ]);

    useEffect(() => {
        if (isOpen) {
            hasOpenedRef.current = true;
            inputRef.current?.focus();
        } else if (hasOpenedRef.current) {
            launcherRef.current?.focus();
        }
    }, [isOpen]);

    async function handleSend(messageToSend = message) {
        if (loading) return;
        if (!messageToSend.trim()) return;

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiBaseUrl) {
            throw new Error(
                "NEXT_PUBLIC_API_BASE_URL is not configured"
            );
        }

        try {
            setLoading(true);
            setError(null);
            setResources([]);
            setCrisisDetected(false);
            setSubmittedMessage(messageToSend);

            const response = await fetch(
                `${apiBaseUrl}/api/chat/resources`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        message: messageToSend,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to find resources");
            }

            const data: ChatResourceResponse =
                await response.json();

            setCrisisDetected(data.crisisDetected);

            setResources(data.resources);

            setMessage("");
        } catch (error) {
            console.error(error);
            setError("Something went wrong while finding resources.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {isOpen && (
                <div
                    className="
                        fixed
                        bottom-24
                        right-6
                        z-50

                        h-[520px]
                        w-[380px]

                        flex
                        flex-col 
                        overflow-hidden

                        rounded-2xl

                        bg-background
                        text-foreground

                        border
                        border-border

                        shadow-xl
                        max-sm:left-4
                        max-sm:right-4
                        max-sm:w-auto
                        max-sm:h-[70vh]
                    "
                >
                    <ChatWindow
                        loading={loading}
                        error={error}
                        resources={resources}
                        submittedMessage={submittedMessage}
                        crisisDetected={crisisDetected}
                        onClose={() => setIsOpen(false)}
                        onQuickAction={handleSend}
                        bottomRef={bottomRef}
                    />

                    <ChatInput
                        ref={inputRef}
                        message={message}
                        loading={loading}
                        onMessageChange={setMessage}
                        onSend={() => handleSend()}
                    />     
                </div>
            )}

            <ChatButton
                ref={launcherRef}
                isOpen={isOpen}
                onClick={() => setIsOpen((open) => !open)}
            />

        </div>
    );
}