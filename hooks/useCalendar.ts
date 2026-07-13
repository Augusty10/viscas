import { create } from "zustand";

export type CalendarView = "day" | "week" | "month";

type CalendarState = {
  isNewEventOpen: boolean;
  setNewEventOpen: (isOpen: boolean) => void;
  refreshTrigger: number;
  triggerRefresh: () => void;
  currentView: CalendarView;
  setCurrentView: (view: CalendarView) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date | ((prev: Date) => Date)) => void;
  isEditEventOpen: boolean;
  setEditEventOpen: (isOpen: boolean) => void;
  editingEvent: any | null;
  setEditingEvent: (event: any | null) => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  isNewEventOpen: false,
  setNewEventOpen: (isOpen) => set({ isNewEventOpen: isOpen }),
  refreshTrigger: 0,
  triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
  currentView: "month",
  setCurrentView: (view) => set({ currentView: view }),
  selectedDate: new Date(),
  setSelectedDate: (date) =>
    set((state) => ({
      selectedDate: typeof date === "function" ? date(state.selectedDate) : date,
    })),
  isEditEventOpen: false,
  setEditEventOpen: (isOpen) => set({ isEditEventOpen: isOpen }),
  editingEvent: null,
  setEditingEvent: (event) => set({ editingEvent: event }),
}));
