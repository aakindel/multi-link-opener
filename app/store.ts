"use client";

import { create } from "zustand";
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

export const useLinkStore = create<LinkStore>((set) => ({
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
}));
