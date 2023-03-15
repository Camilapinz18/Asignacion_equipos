import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import Swal from 'sweetalert2'


export const useRefStore =  defineStore('refStore', () =>{
    //variables
     const baseUrl = 'https://shy-tan-dolphin-robe.cyclic.app/api/v1/references'
    const headers = { "Authorization": "Bearer "}; 
    let Refs = ref([])

    //funciones
    const getRefs = () =>{
         axios.get(baseUrl)
        .then(res =>{
                Refs.value = res.data       
                //console.log(res.data)     
            }
        )
        .catch(e => console.log(e))

    }

    const addRefs = ( name) =>{
        Swal.fire({
            title: '¿Agregar Referencia?',
            text: "¿Desea registrar una nueva Referencia?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //        
                axios.post(baseUrl,{ name}, {headers})
                .then(res=> {       
                        Swal.fire(
                            'Referencia agregada',
                            '',
                            'success'
                        )
                        //console.log(res) 
                        getRefs()
                    }
                )
                .catch(e => { 
                        Swal.fire(
                            'Error de proceso',
                            'Verifica los campos',
                            'danger'
                            )
                            
                        }
                    )
                //  
            }
        })

    }

    const updateRefs = (id, newName) =>{
        Swal.fire({
            title: 'Actualizar Referencia?',
            text: "¿Desea Actualizar la Referencia?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //        
                axios.patch(baseUrl, {id,newName})
                    .then(res=>{     
                        Swal.fire(
                            'Referencia Actualizada',
                            '',
                            'success'
                        )
                        //console.log(res) 
                        getRefs()
                }) 
                .catch(e => { 
                        Swal.fire(
                            'Error de proceso',
                            'Verifica los campos',
                            'danger'
                            )
                            
                        }
                    )
                //  
            }
        })
    }

    const deleteRefs = (id) =>{
        //console.log('id:',id)

        Swal.fire({
            title: 'Eliminar Referencia?',
            text: "¿Desea Eliminar la Referencia?",
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
                                    'Referencia Eliminada',
                                    '',
                                    'success'
                                )
                        //console.log(res)
                        getRefs() 
                    })
                    .catch(e => { 
                        Swal.fire(
                            'Error de proceso',
                            'intentalo de nuevo',
                            'danger'
                            )
                            
                        }
                    )
                //  
            }
        }) 
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