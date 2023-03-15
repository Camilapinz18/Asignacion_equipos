import { defineStore } from "pinia";
import { ref } from "vue";


export const useAppStore =  defineStore('appSotres', () =>{
    //variables
    let showModal = ref(false)

    //funciones
    const openModal = () =>{
        showModal.value = !showModal.value
    }

    //return

    return{
        showModal,

        openModal
    }
})