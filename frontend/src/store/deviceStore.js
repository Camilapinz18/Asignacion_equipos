import { defineStore } from "pinia";
import { ref } from "vue";


export const useDeviceStore =  defineStore('deviceStore', () =>{
    //variables
    let Devices = ref([
        {id: 0, nombre:"Galaxy S20", serial:"1233", marca: "Samsung", referencia:"celular"},
        {id: 1, nombre:"Samrt Q30", serial:"2344", marca: "LG", referencia:"televisor"},
        {id: 2, nombre:"Iphone 14", serial:"3455", marca: "Apple", referencia:"celular"}
        ])

    //funciones
    const getDevices = () =>{
         

    }

    const addDevice = ( nombre) =>{
         
        getDevices()
    }

    const updateDevice = (id, nombre) =>{

        getDevices()
    }

    const deleteDevice = (id) =>{

        getDevices()
    }

    //return

    return{
        Devices,
        getDevices,
        addDevice,
        updateDevice,
        deleteDevice
    }
})