import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from 'sweetalert2' 
import axios from "axios";

export const useEmployeStore =  defineStore('mployeStore', () =>{
    //variables
     const baseUrl = 'https://shy-tan-dolphin-robe.cyclic.app/api/v1/employees'
    const headers = { "Authorization": "Bearer "}; 
    let Users = ref([])

    //funciones
    const getUsers = () =>{
         axios.get(baseUrl)
        .then(res =>{
                Users.value = res.data       
                console.log(res.data)     
            }
        )
        .catch(e => console.log(e))

    } 
    const addUser = ( identification, name, surname, email, phone, address) =>{
        console.log(identification, name, surname, email, phone, address)
        Swal.fire({
            title: '¿Agregar Empleado?',
            text: "¿Desea registrar un nuevo Empleado?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
                axios.post(baseUrl,{identification, name, surname, address, phone, email}, {headers})
                    .then(res=> {
                            Swal.fire(
                                'Empleado agregado',
                                '',
                                'success'
                            )
                            console.log(res)
                            getUsers()
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

    const updateUser = (identification, newName, newSurname, newEmail, newPhone, newAddress) =>{

         Swal.fire({
            title: 'Actualizar Empleado?',
            text: "¿Desea actualizar el Empleado?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
                axios.patch(baseUrl, {newName,newSurname,newAddress,newEmail,newPhone,identification}, {headers})
                    .then(res=>{
                        Swal.fire(
                                'Empleado Actualizado',
                                '',
                                'success'
                            )
                        console.log(res)
                        getUsers()
                    })
                    .catch(e => {
                             
                        Swal.fire(
                            'Error de Proceso',
                            'Verifica los campos',
                            'danger'
                            )
                            
                        }
                    )
        
                
            }
        })
    }

    const deleteUser = (identification, name, surname, email, phone, address) =>{
        console.log(identification, name, surname, email, phone, address)
         Swal.fire({
            title: 'Eliminar Empleado?',
            text: "¿Desea eliminar este Empleado?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
                axios.delete(baseUrl, {data:{identification}}, {headers})
                    .then(res => {
                        Swal.fire(
                                'Empleado eliminado',
                                '',
                                'success'
                            )
                        console.log(res)
                        getUsers()
                    })
                    .catch(e => {
                             
                        Swal.fire(
                            'Error de proceso',
                            'intentalo de nuevo',
                            'danger'
                            )
                            
                        }
                    )
 
            }
        })
    }

    //return

    return{
        Users,
        getUsers,
        addUser,
        updateUser,
        deleteUser
    }
})