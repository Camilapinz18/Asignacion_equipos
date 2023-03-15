<template>
    <div class="row d-flex justify-content-center vh-100 bg-light">
        <div class=" col-10 text-center bg-white"> 
            <div class="input-group my-3"> 
                <button class="btn btn-primary"  @click="showForm()">Agregar</button>
            </div>
            <div class="input-group my-3">
                <input type="text" class="form-control" placeholder="Buscar..." v-model="searchElement">
                <button class="btn btn-outline-secondary"  ><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="border rounded my-2">
                <table class="table  ">
                    <thead>
                        <tr>
                            <th scope="col">Nombre de Referencia</th> 
                            <th scope="col">Opción</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in buscar" :key="item">
                        <tr> 
                            <td>{{ item.name }}</td>
                            <td>
                                <button class="btn btn-primary "
                                @click="editR(item._id, item.name)"
                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-danger "
                                @click="deleteR(item._id)"
                                ><i class="fa-solid fa-trash"></i></button>
                            </td> 
                        </tr> 
                    </tbody>
                </table>

            </div>

            <!-- -->
            <div v-if="showModal ">
                <Modal tittle="Registro de Ref">
                    <div class="row justify-content-between text-start">
                        <div class="form-group col-12 flex-column d-flex"> 
                            <label class="form-control-label px-3 tex">Nombre de la nueva Referencia: </label> 
                            <input type="text" placeholder="telefono, tablet, celular..." v-model="name"> 
                        </div> 
                    </div> 
                    
                    <div v-if="!edit" class="row justify-content-end">
                        <div class="form-group col-sm-3"> 
                            <button  class="btn-block btn-primary"
                            @click="addRef(name)">
                                Guardar
                            </button> 
                        </div>
                    </div>
                
                    <div v-else class="row justify-content-end">
                        <div class="form-group col-sm-3"> 
                            <button  class="btn-block btn-success"
                            @click="editRef(id, name)">
                                Editar
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
    import Swal from 'sweetalert2'  
    import {ref, computed, onMounted} from 'vue'
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js'
    import {useRefStore} from '@/store/refStore.js'


    const useApp = useAppStore()
    const {openModal} = useApp
    let {showModal} = storeToRefs(useApp)

    const useRef = useRefStore()
    const {getRefs, addRefs, updateRefs, deleteRefs} = useRef
    let {Refs} = storeToRefs(useRef)


    //varModle
    let searchElement = ref("")
    let name = ref(undefined)
    let id = ref(undefined)
    let edit = ref(false)

    const showForm = () =>{
        edit.value = false
        name.value  = undefined
        id.value = undefined
        openModal()
    }

    onMounted(() => {
        getRefs()
    })

    const editR = (idI, nameI) =>{
        name.value = nameI
        id.value = idI
        edit.value = true
        //console.log(name.value, id.value, edit.value )
        openModal()
    }

    const deleteR = (id) =>{
        deleteRefs(id)
    }

    const addRef = () =>{
        if(name.value  === undefined ){
            openModal()
            Swal.fire(
                'Campos incompletos',
                '',
                'warning'
            ).then(
                (result) => {
                    if (result.isConfirmed){
                        openModal()
                        
                    }
                }
            )
        }else{
            addRefs( name.value)
            showForm()
        }
    }

    const editRef = () =>{
        if(name.value  === "" ){
            openModal()
            Swal.fire(
                'Campos incompletos',
                '',
                'warning'
            ).then(
                (result) => {
                    if (result.isConfirmed){
                        openModal()
                        
                    }
                }
            )
        }else{
            updateRefs(id.value, name.value)
            showForm()
        }
    }

    let buscar = computed(() => { 
           //.log(searchElement.value)
           if (searchElement.value === '' || searchElement.value === undefined) {
               return Refs.value
           }
           let matches = 0
           if(searchElement.value.length>0){
              
                return Refs.value.filter(item => {  
                    if (
                        (item.name.toLowerCase().includes(searchElement.value.toLowerCase()) 
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