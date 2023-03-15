import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import Swal from 'sweetalert2'


export const useDeviceStore =  defineStore('deviceStore', () =>{
    //variables
    const baseUrl = 'https://shy-tan-dolphin-robe.cyclic.app/api/v1/equipments'
    const headers = { "Authorization": "Bearer "}; 
    let Devices = ref([])

    //funciones
    const getDevices = () =>{
        axios.get(baseUrl)
        .then(res =>{
                Devices.value = res.data       
                console.log(res.data)     
            }
        )
        .catch(e => console.log(e))

    }

    const addDevice = ( name, serial, description, brand_id, reference_id,isNewEquipment) =>{
        axios.post(baseUrl,{ name, serial, description, isNewEquipment, brand_id, reference_id, isNewEquipment}, {headers})
        .then(res=> {
                console.log(res)
                getDevices()
            }
        )
        .catch(e => console.log(e))  
    }

    const updateDevice = (id, name, serial, description, brand_id, reference_id) =>{
        let isNewEquipment = true
        console.log(id, name, serial, description, isNewEquipment, brand_id, reference_id)
        axios.patch(baseUrl,{id, name, serial, description, isNewEquipment, brand_id, reference_id}, {headers})
        .then(res=> {
                console.log(res)
                getDevices()
            }
        )
        .catch(e => console.log(e))  
    }

    const deleteDevice = (id) =>{
        console.log('id:',id)
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };
        axios.delete(baseUrl, {data:{'id':id}})
            .then(res => {
                console.log(res)
                getDevices()
            })
            .catch(e => console.log("error:",e))  
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