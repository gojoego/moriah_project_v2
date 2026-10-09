"use client";

import { useState } from "react";

import { updateDisplayName } from "@/lib/api/users";
import { CurrentUser } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DisplayNameEditorProps = {
    user: CurrentUser;
    onUserUpdated: (user: CurrentUser) => void;
};

export function DisplayNameEditor({
    user,
    onUserUpdated,
}: DisplayNameEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [displayNameDraft, setDisplayNameDraft] = useState(
        user.displayName ?? ""
    );
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEdit = () => {
        setDisplayNameDraft(user.displayName ?? "");
        setError(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDisplayNameDraft(user.displayName ?? "");
        setError(null);
        setIsEditing(false);
    };

    const handleSave = async () => {
        const trimmedName = displayNameDraft.trim();

        if (!trimmedName) {
            setError("Display name is required.");
            return;
        }

        try {
            setIsSaving(true);
            setError(null);

            const updatedUser = await updateDisplayName(trimmedName);

            onUserUpdated(updatedUser);
            setDisplayNameDraft(updatedUser.displayName ?? "");
            setIsEditing(false);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Failed to update display name.");
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!isEditing) {
        return (
            <>
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">
                        {user.displayName}
                    </h2>

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    {user.email}
                </p>
            </>
        );
    }

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                <label
                    htmlFor="displayName"
                    className="text-sm font-medium"
                >
                    Display name
                </label>

                <Input
                    id="displayName"
                    type="text"
                    value={displayNameDraft}
                    onChange={(event) =>
                        setDisplayNameDraft(event.target.value)
                    }
                    maxLength={50}
                    disabled={isSaving}
                />
            </div>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}

            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}