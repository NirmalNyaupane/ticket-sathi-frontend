import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type storeItems = {
  id: string;
  name: string;
  url: string;
};

type field = "name" | "url";

type store = {
  socialLinks: storeItems[];
  // addLinks: (id: string) => void;
  // removeLinks: (id: string) => void;
  // updateLinks: (index: number, field: field, value: string) => void;
};

const useSocialStore = create<store>((set) => ({
  socialLinks: [{name:"", url:"", id:"r34234f343"}],

  // addLinks(id: string) {
  //   set((state) => {
  //     const newSocialLinks = state.socialLinks || [];
  //     console.log(newSocialLinks);
  //     newSocialLinks.push({ name: "", url: "", id: id });
  //     return {
  //       socialLinks: {
  //         ...newSocialLinks,
  //       },
  //     };
  //   });
  // },

  // updateLinks: (index: number, field: field, value: string) =>
  //   set((state) => {
  //     const newSocialLinks = state.socialLinks;
  //     newSocialLinks[index][field] = value;
  //     return {
  //       socialLinks: {
  //         ...newSocialLinks,
  //       },
  //     };
  //   }),

  // removeLinks: (id: string) =>
  //   set((state) => {
  //     return {
  //       socialLinks: state.socialLinks.filter(
  //         (singleSocial) => singleSocial.id !== id
  //       ),
  //     };
  //   }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("mystore", useSocialStore);
}

export const addLinks = (id: string) =>
  useSocialStore.setState((state) => ({
    socialLinks: [...state.socialLinks, { name: "", url: "", id: id }],
  }));

export const updateLinks = (index: number, field: field, value: string) =>
  useSocialStore.setState((state) => {
    const newSocialLinks = state.socialLinks;
    newSocialLinks[index][field] = value;

    return { socialLinks: newSocialLinks };
  });

export const removeLinks = (id: string) =>
  useSocialStore.setState((state) => {
    if (state.socialLinks.length === 1) return state;
    const newSociallinks = state.socialLinks.filter(
      (social) => social.id !== id
    );
    return { socialLinks: newSociallinks };
  });

export default useSocialStore;
