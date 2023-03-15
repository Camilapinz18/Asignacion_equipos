import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";


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
                console.log(res.data)     
            }
        )
        .catch(e => console.log(e))

    }

    const addRefs = ( name) =>{
        axios.post(baseUrl,{ name}, {headers})
        .then(res=> {
                console.log(res) 
                getRefs()
            }
        )
        .catch(e => console.log(e)) 
    }

    const updateRefs = (id, newName) =>{
        axios.patch(baseUrl, {id,newName})
        .then(res=>{
            console.log(res) 
            getRefs()
        })
        .catch(e => console.log(e)) 
    }

    const deleteRefs = (id) =>{
        console.log('id:',id)
        axios.delete(baseUrl, {data:{'id':id}})
            .then(res => {
                console.log(res)
                getRefs() 
            })
            .catch(e => console.log("error:",e)) 
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