import { defineStore } from 'pinia'

import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router'
import { RouterLink } from 'vue-router'

export const useSessionData = defineStore('SessionData',{

    state: () => {

        return {
            
            userData: {},
            loadingIn: false,
            loadingOut: false,
            form: false,
            show: false,
            data: {
                email: null,
                password: null,
                remember: false
            },
            errors: {},
            token: null
            
        }

    },
    
    actions: {

        doLogin(){

            if(this.form){

                this.loadingIn = true

                axios
                .get('http://172.23.25.80/api/public/sanctum/csrf-cookie')
                .then(response => {
                })

                axios
                .post('http://172.23.25.80/api/public/api/login',this.data)
                .then(response => {

                    this.loadingIn = false
                    localStorage.setItem('token',response.data.token)
                    this.userData = response.data.user
                    this.token = response.data.token
                    router.push('/main')
                    
                })

                .catch(error => {

                    this.loadingIn = false

                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }

                    if (error.response.status === 401){

                        Swal
                        .fire({
                            title: error.response.data.title,
                            text: error.response.data.message,
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })

                    } else if (error.response.status === 422) {



                    } else {

                        Swal
                        .fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })

                    }

                })

            }
            
        },
        doLogout(){

            this.loadingOut = true

            axios
            .post('http://172.23.25.80/api/public/api/logout')
            .then(response => {

                this.loadingOut = false
                localStorage.removeItem('token')
                this.token = null

                Swal
                .fire({
                    title: 'Listo!',
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })

                router.push('/')

            })
            .catch(error => {

                this.loadingOut = false
                localStorage.removeItem('token')
                this.token = null

                if (error.response.status === 401){

                    Swal
                    .fire({
                        title: 'Listo!',
                        text: 'Cerró sesión con éxito!',
                        icon: 'info',
                        confirmButtonText: 'Ok'
                    })

                } else {

                    Swal
                    .fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    }) 

                }

                router.push('/')

            })

        },
        checkConection(){

            axios
            .post('http://172.23.25.80/api/public/api/check-auth')
            .then(response => {

                this.userData = response.data.user
                this.token = localStorage.getItem('token')
                
            })
            .catch(error => {

                this.token = null
                localStorage.removeItem('token')

                if (error.response.status === 401){

                    Swal
                    .fire({
                        title: error.response.data.title,
                        text: error.response.data.message,
                        icon: 'info',
                        confirmButtonText: 'Ok'
                    })

                } else {

                    Swal
                    .fire({
                        title: 'Error!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    }) 

                }

                router.push('/')

            })
            
        },
        limpiarErrores(data){
            if(this.errors[data]){
                delete this.errors[data]
            }
        }
    }

})