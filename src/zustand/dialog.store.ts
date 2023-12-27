import {create} from 'zustand';

type store={
    isOpen:boolean;
    setIsOpen:()=>void;
}
const useGlobalDialog = create<store>()((set)=>({
    isOpen:false,
    setIsOpen:()=>set((state)=>({isOpen:!state.isOpen}))
}))

export {useGlobalDialog};