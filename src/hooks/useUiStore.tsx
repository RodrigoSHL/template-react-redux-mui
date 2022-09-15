import { useAppDispatch, useAppSelector } from "../app/hooks";
import { onCloseDateModal, onOpenDateModal } from "../features/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useAppDispatch();
  const { isDateModalOpen } = useAppSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  };
  const closeDateModal = () => {
    dispatch(onCloseDateModal())
  };
  return {
    //* Properties
    isDateModalOpen,

    //* Methods
    openDateModal,
    closeDateModal
  };
};
