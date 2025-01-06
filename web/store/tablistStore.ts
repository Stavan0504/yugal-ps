import { create } from "zustand";

interface Store {
  breadcrumbItems: string;
  setBreadcrumbItems: (newList: string) => void;
  currentIndex: number;
  setCurrentIndex: (newList: number) => void;
}

export const useTablistStore = create<Store>(
  (set: (partial: Partial<Store>) => void) => ({
    breadcrumbItems: "Contact Form",
    setBreadcrumbItems: (newList: string) => set({ breadcrumbItems: newList }),
    currentIndex: 0,
    setCurrentIndex: (newList: number) => set({ currentIndex: newList }),
  })
);
