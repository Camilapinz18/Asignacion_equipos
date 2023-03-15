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
                            <td>{{ item.name }}</td>
                            <td>{{ item.brand_id.name }}</td>
                            <td>{{ item.reference_id.name }}</td>
                            <td>{{ item.serial }}</td>
                            <td>
                                <button class="btn btn-primary" @click="showEdit(item._id, item.name, item.brand_id, item.reference_id, item.serial, item.description)"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="btn btn-danger " @click="deleteDevice(item._id)"><i class="fa-solid fa-trash"></i></button>
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
                                <input type="text" v-model="name" > 
                            </div>
                            <div class="form-group col-6 flex-column d-flex">
                                <label class="form-control-label px-3">Serial:</label> 
                                <input type="text"  v-model="serial"> 
                            </div>
                        </div>
                        <div class="row justify-content-between text-start">
                            <div class="form-group col-6 flex-column d-flex"> 
                                <label class="form-control-label px-3 tex">Marca: </label> 
                                <input type="text" v-model="searchMarca" @click="marcaSelected=false">
                                <div v-if="BMarcas.length" class="col-2" style="position: absolute; width: 40%; margin-top: 5rem;">
                                    <ul v-if="!marcaSelected" class="list-group "> 
                                        <li  class="list-group-item list-group-item-action" v-for="item in BMarcas" :key="item"  @click="selectMarca(item)">
                                            {{ item.name }}
                                        </li>
                                    </ul>
    
                                </div> 
                            </div>
                            <div class="form-group col-6 flex-column d-flex">
                                <label class="form-control-label px-3">Referencia:</label> 
                                <input type="text" v-model="searchRef" @click="refSelected=false"> 
                                <div v-if="BRefs.length" class="col-2" style="position: absolute; width: 40%; margin-top: 5rem;">
                                    <ul v-if="!refSelected" class="list-group "> 
                                        <li  class="list-group-item list-group-item-action" v-for="item in BRefs" :key="item"  @click="selectRef(item)">
                                            {{ item.name}}
                                        </li>
                                    </ul>
    
                                </div> 
                            </div>  
                        </div>
                        <div class="row justify-content-between text-start">
                            <div class="form-group col-12 flex-column d-flex"> 
                                <label class="form-control-label px-3 tex">Descripción: </label> 
                                <input type="text" v-model="description" > 
                            </div> 
                        </div>
                        
                        <div class="row justify-content-end">
                            <div class="form-group col-sm-3"> 
                                <button v-if="!editar" class="btn-block btn-primary" @click="createDevice(name, serial, description, brand_id, reference_id), showForm()">
                                    Guardar
                                </button> 
                                <button v-else class="btn-block btn-success" @click="updateDevice(device_id, name, serial, description, brand_id, reference_id), showForm()">
                                    Editar
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
                                <input type="text" v-model="searchEmployer" @click="empSelected=false"> 
                                <div v-if="BEmpl.length" class="col-2" style="position: absolute; width: 80%; margin-top: 5rem;">
                                    <ul v-if="!empSelected" class="list-group "> 
                                        <li  class="list-group-item list-group-item-action" v-for="item in BEmpl" :key="item"  @click="selectEmpl(item)">
                                            {{ item.name}}
                                        </li>
                                    </ul>
    
                                </div> 
                            </div> 
                        </div> 
                        
                        <div class="row justify-content-end">
                            <div class="form-group col-sm-3"> 
                                <button   class="btn-block btn-primary" @click=" showForm()">
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
    import {ref, computed, onMounted} from 'vue' 
    import {useDeviceStore} from '@/store/deviceStore.js'
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js'
    import {useBrandStore} from '@/store/brandStore.js'
    import {useRefStore} from '@/store/refStore.js'
    import { useEmployeStore } from '@/store/employeStore';

    //refs
    const useRef = useRefStore()
    let {Refs} = storeToRefs(useRef) 
    const {getRefs} =useRef

    //marcas
    const useBrand = useBrandStore()
    const {getBrands} =useBrand
    let {Marcas} = storeToRefs(useBrand)

    //empleados
    const useEmploye = useEmployeStore()
    const {getUsers} = useEmploye
    let {Users} = storeToRefs(useEmploye)

    //app
    const useApp = useAppStore() 
    const {openModal} = useApp 
    let {showModal} = storeToRefs(useApp)

    //device
    const useDevice = useDeviceStore() 
    const {getDevices,addDevice, updateDevice, deleteDevice} = useDevice 
    let {Devices} = storeToRefs(useDevice)

   
    let registro = ref(false)
    let asignar = ref(false)
    let editar = ref(false)
    let searchElement = ref("")
     
    let searchMarca = ref(undefined)
    let searchRef = ref(undefined)
    let brand_id = ref(undefined)
    let reference_id = ref(undefined)
    let searchEmployer = ref(undefined)
    let name = ref(undefined)
    let serial = ref(undefined)
    let description = ref(undefined)
    let device_id = ref(undefined)
    let marcaSelected = ref(false)
    let refSelected = ref(false)
    let empSelected = ref(false)
    
    onMounted(() => {
        getDevices()
        getBrands()
        getUsers()
        getRefs() 
    })
 
    const createDevice = (name, serial, description, brand_id, reference_id) => {
        console.log(name, serial, description, brand_id, reference_id)
        addDevice(name, serial, description, brand_id, reference_id, true)
    }

    const selectMarca = (item)=>{ 
        searchMarca.value = item.name
        brand_id.value = item._id
        marcaSelected.value = true
    }

    const selectRef = (item)=>{
        searchRef.value = item.name
        reference_id.value = item._id
        refSelected.value = true
    }

    const selectEmpl = (item)=>{
        searchEmployer.value = item.name 
        empSelected.value = true
    }

    const showForm = ()=>{ 
        searchEmployer.value = undefined
        searchRef.value = undefined
        searchMarca.value = undefined
        name.value = undefined
        serial.value = undefined 
        device_id.value = undefined
        description.value = undefined
        editar.value =  false 
        marcaSelected.value = false
        refSelected.value = false
        empSelected.value = false
        registro.value =  !registro.value
        asignar.value =  !registro.value
        editar.value =  false
        openModal()

    }

    const showRegis = () =>{  
        registro.value =  false
        asignar.value =  true  
        editar.value = false
        showForm()
    }

    const showAsig = () =>{  
        registro.value =  true
        editar.value =  true
        asignar.value =  false 
        empSelected.value = true
        showForm()
    }

    const showEdit = (id, nombre, marca, referencia, serie, descripcion) =>{  
        console.log(nombre, serie, marca, referencia)
        searchRef.value = referencia.name
        reference_id.value = referencia._id
        searchMarca.value = marca.name
        brand_id.value = marca._id
        name.value = nombre
        serial.value = serie 
        device_id.value = id
        description.value = descripcion
        editar.value =  true  
        asignar.value =  false 
        registro.value =  true  
        marcaSelected.value = true
        refSelected.value = true
        openModal()
    }

    let buscar = computed(() => { 
           console.log(searchElement.value)
           
          

           if (searchElement.value === '' || searchElement.value === undefined) {
            console.log("devices",Devices.value)
               return Devices.value
           }
           let matches = 0
           if(searchElement.value.length>0){
              
                return Devices.value.filter(item => {  
                    if (
                        (
                            item.name.toLowerCase().includes(searchElement.value.toLowerCase()) ||
                            item.serial.toLowerCase().includes(searchElement.value.toLowerCase()) ||
                            item.brand_id.name.toLowerCase().includes(searchElement.value.toLowerCase()) ||
                            item.reference_id.name.toLowerCase().includes(searchElement.value.toLowerCase()) 
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
           if (searchMarca.value === '' || searchMarca.value === undefined ) { 
               return []
           }
           let matches = 0
           if(searchMarca.value.length>0 ){
                return Marcas.value.filter(item => {  
                    if (item.name.toLowerCase().includes(searchMarca.value.toLowerCase()) 
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
                    if (item.name.toLowerCase().includes(searchRef.value.toLowerCase()) 
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
                    if (
                        (item.name.toLowerCase().includes(searchEmployer.value.toLowerCase())||
                        item.surname.toLowerCase().includes(searchEmployer.value.toLowerCase())||
                        item.email.toLowerCase().includes(searchEmployer.value.toLowerCase())||
                        item.phone.toLowerCase().includes(searchEmployer.value.toLowerCase())||
                        item.identification.toLowerCase().includes(searchEmployer.value.toLowerCase())
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