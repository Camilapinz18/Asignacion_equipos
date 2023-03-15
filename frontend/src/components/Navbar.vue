<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid"> 
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav "> 
                    <router-link to="/" class="nav-link">Empleados</router-link > 
                    <router-link to="/marcas"  class="nav-link" >Marcas</router-link >
                    <router-link to="/ref" class="nav-link">Referencias</router-link > 
                    <router-link to="/equipos" class="nav-link">Equipos</router-link >   
                </div>
            </div>
        </div>
    </nav>
</template>