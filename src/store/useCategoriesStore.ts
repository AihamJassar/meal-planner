import { createStore } from "./createStore";

type State = {
  selectedCategoryId: number | null;
  categoryDialogOpen: boolean;
};

type Actions = {
  updateSelectedCategoryId: (id: State["selectedCategoryId"]) => void;
  updateCategoryDialogOpen: (id: State["categoryDialogOpen"]) => void;
};

type Store = State & Actions;

export const useCategoriesStore = createStore<Store>(
  (set) => ({
    selectedCategoryId: null,
    updateSelectedCategoryId: (id) =>
      set((state) => {
        state.selectedCategoryId = id;
      }),
    categoryDialogOpen: false,
    updateCategoryDialogOpen: (is) =>
      set((state) => {
        state.categoryDialogOpen = is;
      }),
  }),
  {
    name: "categories-store",
  },
);
