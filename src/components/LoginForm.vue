<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center text-center fill-height">

            <h1 class="text-h2 font-weight-bold">Portal DCAI</h1>

            <div class="py-14" />

            <v-row class="d-flex align-center justify-center">

                <v-col cols="4">
                    <v-card>
                        <v-card-text>
                            <v-form
                                v-model="sessionData.form"
                                @submit.prevent="goIn"
                            >

                                <v-text-field
                                    v-model="sessionData.data.email"
                                    :readonly="sessionData.loadingIn"
                                    label="Email"
                                    :rules="[v => !!v || 'Campo obligatorio']"
                                    :error-messages="sessionData.errors.email"
                                    @keyup="deleteErrors('email')"
                                >
                                </v-text-field>

                                <v-text-field
                                    v-model="sessionData.data.password"
                                    :append-inner-icon="sessionData.show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :readonly="sessionData.loadingIn"
                                    :type="sessionData.show ? 'text' : 'password'"
                                    :error-messages="sessionData.errors.password"
                                    label="Contraseña"
                                    :rules="[v => !!v || 'Campo obligatorio']"
                                    @keyup="deleteErrors('password')"
                                    @click:append-inner="sessionData.show = !sessionData.show"
                                >
                                </v-text-field>

                                <br>

                                <v-btn                                 
                                    :loading="sessionData.loadingIn"
                                    block
                                    color="success"
                                    type="submit"
                                >
                                    Acceder
                                </v-btn>

                                <br>

                                <v-checkbox
                                    v-model="sessionData.data.remember"
                                    label="Mantener mi sesión activa"
                                >    
                                </v-checkbox>

                            </v-form>    
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

const goIn = () => {
    sessionData.doLogin()
};

function deleteErrors(data) {
    sessionData.limpiarErrores(data)
}
    
</script>
