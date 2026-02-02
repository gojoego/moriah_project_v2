export interface Modal {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};