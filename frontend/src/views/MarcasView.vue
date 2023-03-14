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
                <table class="table  ">
                    <thead>
                        <tr>
                        <th scope="col">Nombre de Marca</th> 
                        <th scope="col">Opción</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in buscar" :key="item">
                        <tr> 
                            <td>{{ item.nombre }}</td>
                            <td>
                                <button class="btn btn-primary "><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-danger "><i class="fa-solid fa-trash"></i></button>
                            </td> 
                        </tr> 
                    </tbody>
                </table>

            </div>
        </div>
         
        <!-- -->
        <div v-if="showModal ">
            <Modal tittle="Registro de marcas">
                <div class="row justify-content-between text-start">
                    <div class="form-group col-12 flex-column d-flex"> 
                        <label class="form-control-label px-3 tex">Nombre de la Nueva marca: </label> 
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
        <!-- -->
            
     </div>
 </template>
 
 <script setup>
    import Modal from '@/components/Modal.vue';
    import {ref, computed} from 'vue'
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js'
    import {useBrandStore} from '@/store/brandStore.js'
 
    let searchElement = ref("")

    const useApp = useAppStore()
    //funciones
    const {openModal} = useApp
    //variables
    let {showModal} = storeToRefs(useApp)

    const useBrand = useBrandStore()
    //funciones
    const {getBrands} = useBrand
    //variables
    let {Marcas} = storeToRefs(useBrand)

    const showForm = () =>{
        openModal()
    }
    

    let buscar = computed(() => { 
           console.log(searchElement.value)
           if (searchElement.value === '' || searchElement.value === undefined) {
               return Marcas.value
           }
           let matches = 0
           if(searchElement.value.length>0){
              
                return Marcas.value.filter(item => {  
                    if (
                        (item.nombre.toLowerCase().includes(searchElement.value.toLowerCase()) 
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