"use client";

import { 
    useState,
    useRef,
    useEffect
} from "react";
import type { Resource } from "@/types/resource";
import ResourceCard from "./ResourceCard";
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
                    <div
                        className="
                            flex
                            items-center
                            justify-between

                            bg-primary
                            text-primary-foreground

                            px-4
                            py-3
                        "
                    >
                        <div>
                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                "
                            >
                                Moriah Support
                            </h2>
                            <p
                                className="
                                    text-sm
                                    opacity-90
                                "
                            >
                                Find resources. Get help. Get support.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="
                                rounded-md
                                px-2
                                py-1 
                                text-sm
                                transition
                                hover:bg-primary-foreground/10
                                focus:outline-none
                                focus:ring-2
                                focus:ring-primary-foreground/50
                            "
                        >
                            Close
                        </button>
                    </div>

                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            p-4
                        "
                    >
                        <p
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Hi there. I can help you find trusted resources and support.
                        </p>

                        <p
                            className="
                                mt-3
                                text-sm
                                text-muted-foreground
                            "
                        >
                            What would you like help with today? 
                        </p>
                            <div
                                className="
                                    mt-4
                                    flex
                                    flex-wrap
                                    gap-2
                                "
                            >
                                <button 
                                    type="button"
                                    onClick={() => handleSend("grief support")}
                                    disabled={loading}
                                    className="
                                        rounded-full
                                        border
                                        border-border
                                        px-3
                                        py-1.5
                                        text-sm
                                        transition
                                        hover:bg-muted
                                    "    
                                >
                                    Grief support
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => handleSend("support groups")}
                                    disabled={loading}
                                    className="
                                        rounded-full
                                        border
                                        border-border
                                        px-3
                                        py-1.5
                                        text-sm
                                        transition
                                        hover:bg-muted
                                    "    
                                >
                                    Support groups
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => handleSend("crisis resources")}
                                    disabled={loading}
                                    className="
                                        rounded-full
                                        border
                                        border-border
                                        px-3
                                        py-1.5
                                        text-sm
                                        transition
                                        hover:bg-muted
                                    "    
                                >
                                    Crisis resources
                                </button>

                                <button 
                                    type="button"
                                    onClick={() => handleSend("general resources")}
                                    disabled={loading}
                                    className="
                                        rounded-full
                                        border
                                        border-border
                                        px-3
                                        py-1.5
                                        text-sm
                                        transition
                                        hover:bg-muted
                                    "    
                                >
                                    General resources
                                </button>
                            </div>

                            {loading && (
                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    Finding resources...
                                </p>
                            )}

                            {error && (
                                <p>{error}</p>
                            )}             

                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-col
                                    gap-4
                                "
                            >
                                {submittedMessage && (
                                    <div
                                        className="
                                            ml-auto
                                            max-w-[80%]
                                            rounded-xl
                                            bg-primary
                                            px-3
                                            py-2
                                            text-sm
                                            text-primary-foreground
                                        "                  
                                    >
                                        {submittedMessage}
                                    </div>
                                )}

                                {resources.length > 0 && !crisisDetected && (
                                    <p
                                        className="
                                            text-sm
                                            text-muted-foreground
                                        "
                                    >
                                        Here are some resources that may help:
                                    </p>
                                )}

                                {crisisDetected && (
                                    <div
                                        className="
                                            rounded-xl
                                            border
                                            border-border
                                            bg-muted
                                            p-4
                                        "
                                    >
                                        <h3
                                            className="
                                                font-semibold
                                                text-primary
                                            "
                                        >
                                            Immediate support resources
                                        </h3>

                                        {resources.length > 0 ? (
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                Here are resources that can provide immediate support.
                                            </p>
                                        ) : (
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                If you&apos;re in the U.S., call or text 988 for immediate support.
                                            </p>
                                        )}
                                    </div>
                                )}

                                {!loading &&
                                    !error &&
                                    submittedMessage &&
                                    resources.length === 0 &&
                                    !crisisDetected && (
                                        <p
                                            className="
                                                text-sm
                                                text-muted-foreground
                                            "
                                        >
                                            I couldn&apos;t find a matching resource.
                                            Try describing what kind of support you&apos;re looking for.
                                        </p>
                                    )}

                                {resources.map((resource) => (
                                    <ResourceCard
                                        key={resource.id}
                                        resource={resource}
                                    />
                                ))}

                                <div ref={bottomRef} />
                                
                            </div>
                    </div>

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