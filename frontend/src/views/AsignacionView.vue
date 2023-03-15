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
                               <button class="btn btn-success"  @click="showAsig(item._id, item.name, item.brand_id, item.reference_id, item.serial, item.description)">Asignar</button>
                           </td> 
                       </tr> 
                   </tbody>
               </table>

           </div>

           <!-- -->
           <div v-if="showModal ">
            
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
                           <button   class="btn-block btn-primary" @click=" assignar(employee_id, searchEmployer, device_id,  name, serial, description, brand_id, reference_id  ),showForm()">
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
    import {ref, computed, onMounted} from 'vue' 
    import {useDeviceStore} from '@/store/deviceStore.js'
    import {storeToRefs} from 'pinia'
    import {useAppStore} from '@/store/appStore.js' 
    import { useEmployeStore } from '@/store/employeStore';
 
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
   const {assignar, getDevices} = useDevice 
   let {Devices} = storeToRefs(useDevice)

    
   let device_name = ref(undefined)
   let device_id = ref(undefined)
   let searchEmployer = ref(undefined)
   let employee_id = ref(undefined)
   let empSelected = ref(false)
   let searchElement = ref(undefined)
   
   onMounted(() => {
       getDevices() 
   })
 

   const selectEmpl = (item)=>{
       searchEmployer.value = item.name 
       employee_id.value = item._id
       empSelected.value = true
   }

   const showForm = ()=>{ 
       searchEmployer.value = undefined
       device_id.value = undefined
       description.value = undefined
       empSelected.value = false
       openModal()

   }
 
   const showAsig = (id_equipo,name_equipo, id_employee, name_employee) =>{  
       
       
       
       openModal()
   }

 

   let buscar = computed(() => { 
          //console.log(searchElement.value)
          if (searchElement.value === '' || searchElement.value === undefined) {
           //console.log("devices",Devices.value)
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

   

   let BEmpl = computed(() => { 
       //console.log(searchEmployer.value)
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