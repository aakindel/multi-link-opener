"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";
import { LinkSetType } from "@/types";

type LinkStore = {
  activeTab: string;
  setActiveTab: (linkSetID: string) => void;
  addedLinkSets: LinkSetType[];
  addLinkSet: (linkSet: LinkSetType) => void;
  editLinkSet: (linkSet: LinkSetType) => void;
  deleteLinkSet: (linkSet: LinkSetType) => void;
  setAddedLinkSets: (linkSet: LinkSetType[]) => void;
};

export const useLinkStore = create<LinkStore>()(
  persist(
    (set) => ({
      activeTab: "",
      setActiveTab: (linkSetID: string) =>
        set(() => {
          return {
            activeTab: linkSetID,
          };
        }),
      addedLinkSets: [],
      addLinkSet: (linkSet: LinkSetType) =>
        set((state) => ({ addedLinkSets: [...state.addedLinkSets, linkSet] })),
      editLinkSet: (linkSet: LinkSetType) =>
        set((state) => {
          const newAddedLinkSets = [...state.addedLinkSets];
          newAddedLinkSets.splice(
            state.addedLinkSets.findIndex(
              (addedLinkSet) => addedLinkSet.id === linkSet.id
            ),
            1,
            { ...linkSet }
          );
          return { addedLinkSets: newAddedLinkSets };
        }),
      deleteLinkSet: (linkSet: LinkSetType) =>
        set((state) => {
          const newAddedLinkSets = [...state.addedLinkSets];
          newAddedLinkSets.splice(
            state.addedLinkSets.findIndex(
              (addedLinkSet) => addedLinkSet.id === linkSet.id
            ),
            1
          );
          return { addedLinkSets: newAddedLinkSets };
        }),
      setAddedLinkSets: (linkSet: LinkSetType[]) =>
        set({ addedLinkSets: [...linkSet] }),
    }),
    {
      name: "multi-link-opener-store",
    }
  )
);

// from https://docs.pmnd.rs/zustand/integrations/persisting-store-data
export const useLinkStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = useLinkStore.persist.onHydrate(() =>
      setHydrated(false)
    );

    const unsubFinishHydration = useLinkStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useLinkStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
