import { defineStore } from "pinia";
import { ref } from "vue";


export const useBrandStore =  defineStore('brandStore', () =>{
    //variables
    let Marcas = ref([
        {id: 0, nombre: "Samsung"},
        {id: 1, nombre: "LG"},
        {id: 2, nombre: "Apple"}
        ])

    //funciones
    const getBrands = () =>{
         

    }

    const addBrand = ( nombre) =>{
         
        getBrands()
    }

    const updateBrand = (id, nombre) =>{

        getBrands()
    }

    const deleteBrand = (id) =>{

        getBrands()
    }

    //return

    return{
        Marcas,
        getBrands,
        addBrand,
        updateBrand,
        deleteBrand
    }
})