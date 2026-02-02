import { Modal } from "@/types/modal";

interface ModalProps {
    modal: Modal;
}

export function DisclaimerModal({ modal }: ModalProps){
    if (!modal.isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div
                className="absolute inset-0 bg-black/40"
                onClick={modal.onClose}
            /> 

            <div className="relative z-10 w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                { modal.title && (
                    <h2 className="mb-3 text-lg font-medium">
                        {modal.title}
                    </h2>
                )}

                {modal.children}

                <button
                    onClick={modal.onClose}
                    className="mt-4 text-sm text-muted-foreground hover:underline"
                >
                    Close
                </button>
            </div>
        </div>
    )
}