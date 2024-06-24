<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center text-center fill-height">

            <h1 class="text-h2 font-weight-bold">Bienvenido!</h1>

            {{ sessionData.userData.name }}
            {{ sessionData.userData.email }}

            <div class="py-14" />

            <v-row class="d-flex align-center justify-center">

                <v-col cols="4">
                    <v-card>
                        <v-card-text>  
                            <v-btn
                                :loading="sessionData.loadingOut"
                                block
                                color="success"
                                type="submit"
                                @click="goOut"
                            >
                                Salir
                            </v-btn>  
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-responsive>
    </v-container>
</template>

<script setup>

import { useSessionData } from '@/store/SessionData';

const sessionData = useSessionData();

const goOut = () => {
    sessionData.doLogout()
};
    
</script>