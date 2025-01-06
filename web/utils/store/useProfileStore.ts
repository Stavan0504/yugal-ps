import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileStore {
  starredProfiles: Set<string>;
  addToFavorites: (profileId: string) => void;
  removeFromFavorites: (profileId: string) => void;
  getFavorites: () => string[];
}

const useProfileStore = create(
  persist<ProfileStore>(
    (set, get) => ({
      starredProfiles: new Set(),
      addToFavorites: (profileId: string) =>
        set((state) => {
          const newStarredProfiles = new Set(state.starredProfiles);
          newStarredProfiles.add(profileId);
          return { starredProfiles: newStarredProfiles };
        }),
      removeFromFavorites: (profileId: string) =>
        set((state) => {
          const newStarredProfiles = new Set(state.starredProfiles);
          newStarredProfiles.delete(profileId);
          return { starredProfiles: newStarredProfiles };
        }),
      getFavorites: () => Array.from(get().starredProfiles),
    }),
    {
      name: "profile-store",
      partialize: (state) => ({
        starredProfiles: new Set(state.starredProfiles),
        addToFavorites: state.addToFavorites,
        removeFromFavorites: state.removeFromFavorites,
        getFavorites: state.getFavorites,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        starredProfiles: new Set((persistedState as ProfileStore).starredProfiles),
      }),
    }
  )
);

export default useProfileStore;
