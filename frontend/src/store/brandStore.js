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
        axios.post(baseUrl,{ name}, {headers})
            .then(res=> {
                    console.log(res)
                    getBrands()
                }
            )
            .catch(e => console.log(e)) 
    }

    const updateBrand = (id, newName) =>{
         axios.patch(baseUrl, {id, newName}, {headers})
            .then(res=>{
                console.log(res)
                getBrands()
            })
            .catch(e => console.log(e)) 
    }

    const deleteBrand = (id) =>{
        console.log('id:',id)
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };
        axios.delete(baseUrl, {data:{'id':id}})
            .then(res => {
                console.log(res)
                getBrands()
            })
            .catch(e => console.log("error:",e), {headers}) 
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