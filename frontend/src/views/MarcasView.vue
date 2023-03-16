<template>
    <div class="row d-flex justify-content-center vh-100 bg-light">
        <div class=" col-10 text-center bg-white"> 
            <div class="input-group my-3"> 
                <button class="btn btn-primary"  @click="showForm()">Agregar Marca</button>
            </div>
            <div class="input-group my-3">
                <input type="text" class="form-control" placeholder="Buscar marca..." v-model="searchElement">
                <button class="btn btn-outline-secondary" ><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="border rounded my-2">
                <table class="table  " v-if="buscar.length>0">
                    <thead>
                        <tr>
                            <th scope="col">Nombre de Marca</th> 
                            <th scope="col">Opción</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in buscar" :key="item">
                        <tr> 
                            <td>{{ item.name }}</td>
                            <td>
                                <button class="btn btn-primary "
                                @click="editB(item)"
                                ><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-danger " 
                                @click="deleteBrand(item._id)"
                                ><i class="fa-solid fa-trash"></i></button>
                            </td> 
                        </tr> 
                    </tbody>
                </table>
                <div v-else>
                    <h1>No se encontraron registros</h1>
                </div>

            </div>
        </div>
         
        <!-- -->
        <div v-if="showModal ">
            <Modal tittle="Registro de marcas">
                <div class="row justify-content-between text-start">
                    <div class="form-group col-12 flex-column d-flex"> 
                        <label class="form-control-label px-3 tex">Nombre de la Nueva marca: </label> 
                        <input type="text" v-model="name"> 
                    </div> 
                </div> 

                <div v-if="!edit" class="row justify-content-end">
                    <div class="form-group col-sm-3"> 
                        <button  class="btn-block btn-primary"
                        @click="addMarca(name)">
                            Guardar
                        </button> 
                    </div>
                </div>
                
                <div v-else class="row justify-content-end">
                    <div class="form-group col-sm-3"> 
                        <button  class="btn-block btn-success"
                        @click="editMarca(id, name)">
                            Editar
                        </button> 
                    </div>
                </div>

                 
            </Modal> 
        </div>
        <!-- -->
            
     </div>
 </template>
 
 <script setup>
    import Modal from '@/components/Modal.vue'; 
    import Swal from 'sweetalert2'  
    import {ref, computed, onMounted} from 'vue'
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js'
    import {useBrandStore} from '@/store/brandStore.js'
    //useapp
    const useApp = useAppStore() 
    const {openModal} = useApp 
    let {showModal} = storeToRefs(useApp)
    //useBrand
    const useBrand = useBrandStore() 
    const {getBrands, addBrand, updateBrand, deleteBrand} = useBrand 
    let {Marcas} = storeToRefs(useBrand)

    //varModle
    let searchElement = ref("")
    let name = ref(undefined)
    let id = ref(undefined)
    let edit = ref(false)

    
    //abrir / cerar form + reset inputs
    const showForm = () =>{
        edit.value = false
        name.value  = undefined
        id.value = undefined
        openModal()
    }

    onMounted(() => {
        getBrands()
    })
    
    const editB = (item) =>{
        name.value = item.name
        id.value = item._id
        edit.value = true
        //console.log(name.value, id.value)
        openModal()
    }

    const addMarca = () =>{
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
            addBrand( name.value)
            showForm()
        }
    }

    const editMarca = () =>{
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
            updateBrand(id.value, name.value)
            showForm()
        }
    }

    let buscar = computed(() => { 
           //console.log(searchElement.value)
           if (searchElement.value === '' || searchElement.value === undefined) {
               return Marcas.value
           }
           let matches = 0
           if(searchElement.value.length>0){
              
                return Marcas.value.filter(item => {  
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