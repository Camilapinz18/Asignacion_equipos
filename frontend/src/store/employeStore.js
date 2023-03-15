import { defineStore } from "pinia";
import { ref } from "vue";

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
        axios.post(baseUrl,{identification, name, surname, address, phone, email}, {headers})
            .then(res=> {
                    console.log(res)
                    getUsers()
                }
            )
            .catch(e => console.log(e))
    }

    const updateUser = (identification, newName, newSurname, newEmail, newPhone, newAddress) =>{
        axios.patch(baseUrl, {newName,newSurname,newAddress,newEmail,newPhone,identification}, {headers})
            .then(res=>{
                console.log(res)
                getUsers()
            })
            .catch(e => console.log(e))
    }

    const deleteUser = (identification, name, surname, email, phone, address) =>{
        console.log(identification, name, surname, email, phone, address)
        axios.delete(baseUrl, {data:{identification}}, {headers})
            .then(res => {
                console.log(res)
                getUsers()
            })
            .catch(e => console.log(identification,"error:",e))
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