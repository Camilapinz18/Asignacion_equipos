<template>
    <div class="row d-flex justify-content-center vh-100 bg-light">
        <div class=" col-10 text-center bg-white"> 
            <div class="input-group my-3"> 
                <button class="btn btn-primary" @click="showForm()" >Registrar Empleado</button>
                 
            </div>
            <div class="input-group my-3">
                <input type="text" class="form-control" placeholder="Buscar empleado..." v-model="searchElement">
                <button class="btn btn-outline-secondary"  ><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="border rounded my-2">
                <table class="table  ">
                    <thead>
                        <tr> 
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Email</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Opción</th>
                        </tr>
                    </thead>
                    <tbody v-for="(user, index) in buscar" :key="index">
                        <tr> 
                            <td>{{ user.nombres}}</td>
                            <td>{{ user.apellidos}}</td>
                            <td>{{ user.email}}</td>
                            <td>{{ user.telefono}}</td>
                            <td>{{ user.direccion}}</td> 
                            <td>
                                <button class="btn btn-primary "><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-danger "><i class="fa-solid fa-trash"></i></button>
                            </td> 
                        </tr>
                         
                    </tbody>
                </table>

            </div>
            <!-- -->
            <div v-if="showModal ">
                <Modal tittle="Registro de usuario">
                    <div class="row justify-content-between text-start">
                        <div class="form-group col-12 flex-column d-flex"> 
                            <label class="form-control-label px-3 tex">Nombres: </label> 
                            <input type="text" v-model="nombre" > 
                        </div>
                    </div>
                    <div class="row justify-content-between text-start">
                        <div class="form-group col-12 flex-column d-flex">
                            <label class="form-control-label px-3">Apellidos:</label> 
                            <input type="text"  > 
                        </div>
                    </div>
                    <div class="row justify-content-between text-start">
                        <div class="form-group col-12 flex-column d-flex"> 
                            <label class="form-control-label px-3 tex">Email: </label> 
                            <input type="text" > 
                        </div> 
                    </div>
                    <div class="row justify-content-between text-start">
                        <div class="form-group col-12 flex-column d-flex"> 
                            <label class="form-control-label px-3 tex">Teléfono: </label> 
                            <input type="text" > 
                        </div> 
                    </div>
                    <div class="row justify-content-between text-start">
                        <div class="form-group col-12 flex-column d-flex">
                            <label class="form-control-label px-3">Dirección:</label> 
                            <input type="text"  > 
                        </div>  
                    </div>
                    
                    <div class="row justify-content-end">
                        <div class="form-group col-sm-3"> 
                            <button  class="btn-block btn-primary">
                                Guardar
                            </button> 
                        </div>
                    </div>
                </Modal> 
            </div>
            <!-- -->
        </div>
     </div>
 </template>
 
 <script setup>
    import Modal from '@/components/Modal.vue';  
    import {ref, computed} from 'vue'
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js'
    import { useEmployeStore } from '@/store/employeStore';

    
    //appStore
    const useApp = useAppStore()
    //funciones
    const {openModal} = useApp
    //variables
    let {showModal} = storeToRefs(useApp)
    
    //employeStore
    const useEmploye = useEmployeStore()
    const {getUsers, addUser, updateUser, deleteUser} = useEmploye
    let {Users} = storeToRefs(useEmploye)

    const showForm = () =>{
        openModal()
    }


    let searchElement = ref("")

    let buscar = computed(() => { 
           console.log(searchElement.value)
           if (searchElement.value === '' || searchElement.value === undefined) {
               return Users.value
           }
           let matches = 0
           if(searchElement.value.length>0){
              
                return Users.value.filter(item => {  
                    if (
                        (item.nombres.toLowerCase().includes(searchElement.value.toLowerCase())||
                        item.apellidos.toLowerCase().includes(searchElement.value.toLowerCase())||
                        item.email.toLowerCase().includes(searchElement.value.toLowerCase())||
                        item.telefono.toLowerCase().includes(searchElement.value.toLowerCase())
                        )
                        && matches < 10
                    ) { 
                        matches++ 
                        return item
                    }
                     
                })
                         
           }else{
               return []
           }    

       
    })

 </script>
 
 <style scoped>
    
    input, textarea, button{
        padding: 8px 15px;
        border-radius: 5px !important;
        margin: 5px 0px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        font-size: 18px !important;
        font-weight: 300
    }

    input:focus, textarea:focus{
        -moz-box-shadow: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        border: 1px solid #00BCD4;
        outline-width: 0;
        font-weight: 400
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    } 
 </style>