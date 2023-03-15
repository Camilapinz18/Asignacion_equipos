import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import Swal from 'sweetalert2'

export const useBrandStore =  defineStore('brandStore', () =>{
    //variables
    const baseUrl = 'https://shy-tan-dolphin-robe.cyclic.app/api/v1/brands'
    const headers = { "Authorization": "Bearer "}; 
    let Marcas = ref([])

    //funciones
    const getBrands = () =>{
      
        axios.get(baseUrl)
            .then(res =>{
                    Marcas.value = res.data       
                    console.log(res.data)     
                }
            )
            .catch(e => console.log(e))

    }

    const addBrand = ( name) =>{
        
        console.log(name)
            
        Swal.fire({
            title: '¿Agregar Marca?',
            text: "¿Desea registrar esta nueva Marca?",
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
                                'Marca agregada',
                                '',
                                'success'
                            )
                            console.log(res)
                            getBrands()
                        }
                    )
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

    const updateBrand = (id, newName) =>{
        Swal.fire({
            title: 'Actualizar Marca?',
            text: "¿Desea actualizar esta  Marca?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) {   
                //
                axios.patch(baseUrl, {id, newName}, {headers})
                    .then(res=>{
                        Swal.fire(
                            'Marca Actualizada',
                            '',
                            'success'
                        )
                        console.log(res)
                        getBrands()
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


    const deleteBrand = (id) =>{
        console.log('id:',id)
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };

        Swal.fire({
            title: 'Eliminar Marca?',
            text: "¿Desea Eliminar esta  Marca?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro'
            }).then((result) => {
            if (result.isConfirmed) { 
                axios.delete(baseUrl, {data:{'id':id}})
                    .then(res => {
                        Swal.fire(
                            'Marca Eliminada',
                            '',
                            'success'
                        )

                        console.log(res)
                        getBrands()
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
        Marcas,
        getBrands,
        addBrand,
        updateBrand,
        deleteBrand
    }
})