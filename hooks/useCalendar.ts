import { create } from "zustand";

type CalendarState = {
  isNewEventOpen: boolean;
  setNewEventOpen: (isOpen: boolean) => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  isNewEventOpen: false,
  setNewEventOpen: (isOpen) => set({ isNewEventOpen: isOpen }),
  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
