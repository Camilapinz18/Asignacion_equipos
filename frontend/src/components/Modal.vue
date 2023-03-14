<template>
    <div >
          <transition name="modal ">
              <div class="modal-mask ">
                  <div class="modal-wrapper  "> 
                      <div class="modal-dialog" role="document">
                          <div class="modal-content  "  >
                              <!-- body -->
                              <div class="modal-body rounded-4 " > 
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end"> 
                                        <button type="button" class="btn-danger  text-end py-0 px-2 rounded-circle" 
                                        @click="showForm()">X</button>
                                    </div>
    
                                    <div  class="col text-dark">
                                        <h2 style="text-align: center;">{{tittle}}</h2>
                                    </div>   

                                    <div class="row"> 
                                           <div class="row d-flex justify-content-center">
                                                <div class="col-12 text-center px-4"> 
                                                    <div class="form-card">  
                                                        <slot></slot>
                                                    </div>
                                                </div>
                                            </div>   
                                    </div>
  
                                      
                              </div>
                          </div>
                      </div> 
                  </div>
              </div>
          </transition>
      </div>  
  </template>
  
  <script setup> 
    import {useAppStore} from '@/store/appStore.js'

   //props
    const props = defineProps(['tittle'])
   
    const useApp = useAppStore()
    //funciones
    const {openModal} = useApp 
    
    
    
    const showForm = () =>{
        openModal()
    }
    
     
  </script>
  
  <style scoped>
  
  .modal-content{
    width: 100%;
  }
  .modal-container{  
      margin: 2px;
      padding: 2px;  
  }
  
  .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .3);
      display: table;
      transition: opacity .3s ease;
       
  }
    
  .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
       
   
  } 

  /** */
  body{
    color: #000;
    overflow-x: hidden;
    height: 100%; 
    background-repeat: no-repeat; 
} 

.blue-text{
    color: #00BCD4
}

.form-control-label{
    margin-bottom: 0
}

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