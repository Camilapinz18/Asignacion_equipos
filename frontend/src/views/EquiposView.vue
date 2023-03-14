<template>
    <div class="row d-flex justify-content-center vh-100 bg-light">
        <div class=" col-10 text-center bg-white"> 
            <div class="input-group my-3"> 
                <button class="btn btn-primary"  @click="showRegis()">Agregar Equipo</button>
            </div>
            <div class="input-group my-3">
                <input type="text" class="form-control" placeholder="Buscar equipo..." v-model="searchElement">
                <button class="btn btn-outline-secondary" ><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="border rounded my-2">
                <table class="table  ">
                    <thead>
                        <tr>
                            <th scope="col">Nombre del Equipo</th> 
                            <th scope="col"> Marca</th>  
                            <th scope="col"> Referencia</th>  
                            <th scope="col"> Serial</th>  
                            <th scope="col">Opción</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in buscar" :key="item">
                        <tr> 
                            <td>{{ item.nombre }}</td>
                            <td>{{ item.marca }}</td>
                            <td>{{ item.referencia }}</td>
                            <td>{{ item.serial }}</td>
                            <td>
                                <button class="btn btn-primary "><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-danger "><i class="fa-solid fa-trash"></i></button>
                                <button class="btn btn-success"  @click="showAsig()">Asignar</button>
                            </td> 
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
                                <input type="text" v-model="searchMarca">
                                <div v-if="BMarcas.length" class="col-2" style="position: absolute; width: 40%; margin-top: 5rem;">
                                    <ul class="list-group "> 
                                        <li  class="list-group-item list-group-item-action" v-for="item in BMarcas" :key="item"  @click="selectMarca(item)">
                                            {{ item.nombre }}
                                        </li>
                                    </ul>
    
                                </div> 
                            </div>
                            <div class="form-group col-6 flex-column d-flex">
                                <label class="form-control-label px-3">Referencia:</label> 
                                <input type="text" v-model="searchRef" > 
                                <div v-if="BRefs.length" class="col-2" style="position: absolute; width: 40%; margin-top: 5rem;">
                                    <ul class="list-group "> 
                                        <li  class="list-group-item list-group-item-action" v-for="item in BRefs" :key="item"  @click="selectRef(item)">
                                            {{ item.nombre}}
                                        </li>
                                    </ul>
    
                                </div> 
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
                                <input type="text" v-model="searchEmployer"> 
                                <div v-if="BEmpl.length" class="col-2" style="position: absolute; width: 80%; margin-top: 5rem;">
                                    <ul class="list-group "> 
                                        <li  class="list-group-item list-group-item-action" v-for="item in BEmpl" :key="item"  @click="selectEmpl(item)">
                                            {{ item.nombres}}
                                        </li>
                                    </ul>
    
                                </div> 
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
    import {ref, computed} from 'vue' 
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js'
    import {useDeviceStore} from '@/store/deviceStore.js'
    import {useBrandStore} from '@/store/brandStore.js'
    import {useRefStore} from '@/store/refStore.js'
    import { useEmployeStore } from '@/store/employeStore';

    //refs
    const useRef = useRefStore()
    let {Refs} = storeToRefs(useRef)
    //marcas
    const useBrand = useBrandStore()
    let {Marcas} = storeToRefs(useBrand)
    //empleados
    const useEmploye = useEmployeStore()
    let {Users} = storeToRefs(useEmploye)


    const useApp = useAppStore()
    //funciones
    const {openModal} = useApp
    //variables
    let {showModal} = storeToRefs(useApp)

    const useDevice = useDeviceStore()
    //funciones
    const {getDevices} = useDevice
    //variables
    let {Devices} = storeToRefs(useDevice)

    

    let registro = ref(false)
    let asignar = ref(false)
    let searchElement = ref("")
     
    let searchMarca = ref(undefined)
    let searchRef = ref(undefined)
    let searchEmployer = ref(undefined)
    
    const selectMarca = (item)=>{
        searchMarca.value = item.nombre
        BMarcas=[]
    }

    const selectRef = (item)=>{
        searchRef.value = item.nombre
        BRefs=[]
    }

    const selectEmpl = (item)=>{
        searchEmployer.value = item.nombres 
        BEmpl=[]
    }

    const showRegis = () =>{
        asignar.value = false
        registro.value = false
        registro.value = !registro.value
        openModal()
    }

    const showAsig = () =>{
        registro.value = false
        asignar.value = false
        asignar.value = !asignar.value
        openModal()
    }

    let buscar = computed(() => { 
           console.log(searchElement.value)
           if (searchElement.value === '' || searchElement.value === undefined) {
               return Devices.value
           }
           let matches = 0
           if(searchElement.value.length>0){
              
                return Devices.value.filter(item => {  
                    if (
                        (
                            item.nombre.toLowerCase().includes(searchElement.value.toLowerCase()) ||
                            item.serial.toLowerCase().includes(searchElement.value.toLowerCase()) ||
                            item.marca.toLowerCase().includes(searchElement.value.toLowerCase()) ||
                            item.referencia.toLowerCase().includes(searchElement.value.toLowerCase()) 
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
    
    let BMarcas = computed(() => { 
           console.log(searchMarca.value)
           if (searchMarca.value === '' || searchMarca.value === undefined) {
               return []
           }
           let matches = 0
           if(searchMarca.value.length>0){
              
                return Marcas.value.filter(item => {  
                    if (item.nombre.toLowerCase().includes(searchMarca.value.toLowerCase()) 
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

    let BRefs = computed(() => { 
           console.log(searchRef.value)
           if (searchRef.value === '' || searchRef.value === undefined) {
               return []
           }
           let matches = 0
           if(searchRef.value.length>0){
              
                return Refs.value.filter(item => {  
                    if (item.nombre.toLowerCase().includes(searchRef.value.toLowerCase()) 
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

    let BEmpl = computed(() => { 
           console.log(searchEmployer.value)
           if (searchEmployer.value === '' || searchEmployer.value === undefined) {
               return []
           }
           let matches = 0
           if(searchEmployer.value.length>0){
              
                return Users.value.filter(item => {  
                    if (item.nombres.toLowerCase().includes(searchEmployer.value.toLowerCase()) 
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