import { defineStore } from "pinia";
import { ref } from "vue";


export const useEmployeStore =  defineStore('mployeStore', () =>{
    //variables
    let Users = ref([
        {id: 0, nombres: "ander steven", apellidos:"cord riv", email:"ande@gmail.com", telefono:"3101010", direccion:"calle 1#2-3"},
        {id: 1, nombres: "Cami asd", apellidos:"Pinzó dsf", email:"cami@gmail.com", telefono:"3101111", direccion:"calle 2#3-4"},
        {id: 2, nombres: "julanito jj", apellidos:"peres hh", email:"julanito@gmail.com", telefono:"3111010", direccion:"calle 3#4-5"}
        ])

    //funciones
    const getUsers = () =>{
         

    }

    const addUser = ( nombres, apellidos, email, telefono, direccion) =>{
         
        getUsers()
    }

    const updateUser = (id, nombres, apellidos, email, telefono, direccion) =>{

        getUsers()
    }

    const deleteUser = (id) =>{

        getUsers()
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