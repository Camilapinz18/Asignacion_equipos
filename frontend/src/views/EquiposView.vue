<template>
    <div class="row d-flex justify-content-center vh-100 bg-light">
        <div class=" col-10 text-center bg-white"> 
            <div class="input-group my-3"> 
                <button class="btn btn-primary"  @click="showRegis()">Agregar Equipo</button>
            </div>
            <div class="input-group my-3">
                <input type="text" class="form-control" placeholder="Buscar equipo...">
                <button class="btn btn-outline-secondary" ><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="border rounded my-2">
                <table class="table  ">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                                <button class="btn btn-ligth" disabled>Asignado</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td><button class="btn btn-success"  @click="showAsig()">Asignar</button></td>
                        </tr> 
                    </tbody>
                </table>

            </div>
 
            <!-- -->
            <div v-if="showModal ">
                <div v-if="registro">
                    <Modal tittle="Registro de equipo">
                        <div class="row justify-content-between text-start">
                            <div class="form-group col-6 flex-column d-flex"> 
                                <label class="form-control-label px-3 tex">Nombre: </label> 
                                <input type="text" > 
                            </div>
                            <div class="form-group col-6 flex-column d-flex">
                                <label class="form-control-label px-3">Serial:</label> 
                                <input type="text"  > 
                            </div>
                        </div>
                        <div class="row justify-content-between text-start">
                            <div class="form-group col-6 flex-column d-flex"> 
                                <label class="form-control-label px-3 tex">Marca: </label> 
                                <input type="text" > 
                            </div>
                            <div class="form-group col-6 flex-column d-flex">
                                <label class="form-control-label px-3">Referencia:</label> 
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

                <div v-if="asignar">
                    <Modal tittle="Asignar  equipo">
                        <div class="row justify-content-between text-start">
                            <div class="form-group col-12 flex-column d-flex"> 
                                <label class="form-control-label px-3 tex">Empleado: </label> 
                                <input type="text" > 
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
            </div>
            <!-- -->

        </div>
     </div>
 </template>
 
 <script setup>
    import Modal from '@/components/Modal.vue';
    import { ref } from 'vue';
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js'

    const useApp = useAppStore()
    //funciones
    const {openModal} = useApp
    //variables
    let {showModal} = storeToRefs(useApp)


    let registro = ref(false)
    let asignar = ref(false)

     

    const showRegis = () =>{
        asignar.value = false
        registro.value = !registro.value
        openModal()
    }

    const showAsig = () =>{
        registro.value = false
        asignar.value = !asignar.value
        openModal()
    }

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