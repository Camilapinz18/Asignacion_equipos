import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from 'sweetalert2' 
import axios from "axios";


export const useDeviceStore =  defineStore('deviceStore', () =>{
    //variables
    const baseUrl = 'https://shy-tan-dolphin-robe.cyclic.app/api/v1/equipments'
    const asignUrl = 'https://shy-tan-dolphin-robe.cyclic.app/api/v1/assign'
    const headers = { "Authorization": "Bearer "}; 
    let Devices = ref([])
    let isNewEquipment = true
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
        Swal.fire({
            title: '¿Agregar Dispositivo?',
            text: "¿Desea registrar un nuevo Dispositivo?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
                axios.post(baseUrl,{ name, serial, description, isNewEquipment, brand_id, reference_id, isNewEquipment}, {headers})
                .then(res=> {
                        Swal.fire(
                                'Dispositivo agregado',
                                '',
                                'success'
                            )
                        console.log(res)
                        getDevices()
                }
            )
            .catch(e => { 
                        Swal.fire(
                            'Error de registro',
                            'Verifica los campos',
                            'danger'
                            ) 
                        }
                    )
                //  
            }
        })
    }

    const updateDevice = (id, name, serial, description, brand_id, reference_id) =>{
        
        console.log(id, name, serial, description, isNewEquipment, brand_id, reference_id)

        Swal.fire({
            title: 'Actualizar Dispositivo?',
            text: "¿Desea Actualizar el Dispositivo?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
                axios.patch(baseUrl,{id, name, serial, description, isNewEquipment, brand_id, reference_id}, {headers})
                .then(res=> {
                        Swal.fire(
                                'Dispositivo Actualizado',
                                '',
                                'success'
                            )
                console.log(res)
                getDevices()
            }
        )
        .catch(e => {
                             
                        Swal.fire(
                            'Error de Proceso',
                            'Verifica los campos',
                            'danger'
                            ) 
                        }
                    )
                //  
            }
        })  
    }

    const deleteDevice = (id) =>{
        console.log('id:',id)
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };

        Swal.fire({
            title: 'Eliminar Dispositivo?',
            text: "¿Desea Eliminar el Dispositivo?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
            axios.delete(baseUrl, {data:{'id':id}})
                .then(res => {
                        Swal.fire(
                                'Dispositivo Eliminado',
                                '',
                                'success'
                            )
                console.log(res)
                getDevices()
            })
            .catch(e => { 
                        Swal.fire(
                            'Error de proceso',
                            'Intentalo de nuevo',
                            'danger'
                            ) 
                        }
                    )
                //  
            }
        })
    }

    
    const asignDevice = (id, name, serial, description, brand_id, reference_id) =>{
        
        console.log(id, name, serial, description, isNewEquipment, brand_id, reference_id)
        /*
            axios.patch(baseUrl,{id, name, serial, description, isNewEquipment, brand_id, reference_id}, {headers})
                .then(res=> { 
                    console.log(res)
                    getDevices()
                    }
                )
                .catch(e => console.log(e))  
                */
    }


    const assignar = (employee_id, employee_name,equipment_id, equipment_name,   serial, description, brand_id, reference_id) =>{
        let notes = "asd"
        console.log(employee_id, employee_name, equipment_id, equipment_name,  serial, description, brand_id, reference_id)
        
        Swal.fire({
            title: 'Asignar Dispositivo?',
            text: "¿Desea Asignar el Dispositivo?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
                axios.post(asignUrl,{ employee_id, equipment_id, notes}, {headers})
                .then(res=> {
                        Swal.fire(
                                'Dispositivo '+equipment_name +" Asignado",
                                employee_name+ " es resoponseble del equipo",
                                'success'
                            )
                        console.log(res)
                         getDevices()
                }
            )
            .catch(e => { 
                        console.log(e)
                        Swal.fire(
                            'Error de registro',
                            'Verifica los campos',
                            'danger'
                            ) 
                        }
                    )
                //  
            }
        })

    }

    return{
        Devices,
        getDevices,
        addDevice,
        updateDevice,
        deleteDevice,
        assignar
    }
})