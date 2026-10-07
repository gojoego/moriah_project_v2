"use client";

import type { RefObject } from "react";

import type { Resource } from "@/types/resource";

import ResourceCard from "./ResourceCard";

type ChatWindowProps = {
    loading: boolean;
    error: string | null;
    resources: Resource[];
    submittedMessage: string;
    crisisDetected: boolean;
    onClose: () => void;
    onQuickAction: (message: string) => void;
    bottomRef: RefObject<HTMLDivElement | null>;
};

export default function ChatWindow({
    loading,
    error,
    resources,
    submittedMessage,
    crisisDetected,
    onClose,
    onQuickAction,
    bottomRef,
}: ChatWindowProps) {
    return (
        <>
            {/* Header */}
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
                    onClick={onClose}
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

            {/* Scrollable chat content */}
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

                {/* Quick actions */}
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
                        onClick={() => onQuickAction("grief support")}
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

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Grief support
                    </button>

                    <button
                        type="button"
                        onClick={() => onQuickAction("support groups")}
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

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Support groups
                    </button>

                    <button
                        type="button"
                        onClick={() => onQuickAction("crisis resources")}
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

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        Crisis resources
                    </button>

                    <button
                        type="button"
                        onClick={() => onQuickAction("general resources")}
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

                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        General resources
                    </button>
                </div>

                {/* Loading state */}
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

                {/* Error state */}
                {error && (
                    <p
                        className="
                            mt-4
                            text-sm
                            text-destructive
                        "
                    >
                        {error}
                    </p>
                )}

                {/* Conversation/results */}
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
                                text-primary-foreground

                                px-3
                                py-2

                                text-sm
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
                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    Here are resources that can provide immediate support.
                                </p>
                            ) : (
                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
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
        </>
    );
}