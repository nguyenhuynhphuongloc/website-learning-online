export interface ModalProps {
    invisible: boolean;
    closeModal: () => void;
    userAnswers: Record<number, string>; // 👈 thêm dòng này
}
