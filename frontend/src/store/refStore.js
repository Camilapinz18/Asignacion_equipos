import { defineStore } from "pinia";
import { ref } from "vue";


export const useRefStore =  defineStore('refStore', () =>{
    //variables
    let Refs = ref([
        {id: 0, nombre: "Celular"},
        {id: 1, nombre: "Televisor"},
        {id: 2, nombre: "Tablet"}
        ])

    //funciones
    const getRefs = () =>{
         

    }

    const addRefs = ( nombre) =>{
         
        getRefs()
    }

    const updateRefs = (id, nombre) =>{

        getRefs()
    }

    const deleteRefs = (id) =>{

        getRefs()
    }

    //return

    return{
        Refs,
        getRefs,
        addRefs,
        updateRefs,
        deleteRefs
    }
})