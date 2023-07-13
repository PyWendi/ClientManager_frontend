<template>
    <div>
        <div class="layout">
            <div class="dialog">
                <!-- <div class="q-mt-lg"> -->
                    <center><h5 class="text-blue-10">--Ajout de client--</h5></center>
                    <q-form class="form"
                    @submit.prevent="validate"
                    @reset="reset"
                    >
                        <q-input
                        v-model="nom"
                        label="Entré le nom"
                        type="text"
                        :dense="true"
                        :rules="[ val => val && val.length > 0 || 'Veuiller Entrer un nom correcte']"
                        lazy-rules
                        />
                        
                        <q-input
                        v-model="solde"
                        label="Entré le solde"
                        :type="number"
                        :dense="true"
                        :rules="[ val => val && !(val.length > 8) || 'Veuiller ne siasir que des chiffres ']"
                        lazy-rules/>
                        
                        <div class="flex justify-around">
                            <q-btn style="width:100%;" label="Confirmer l'ajout" type="submit" color="indigo-9 q-mb-md"/>
                            <q-btn outline style="width:100%;" label="Annuler"  type="reset" color="indigo-9" />
                        </div>
                        
                        <!-- <br>
                        <hr class="text-indigo-1" style="width:100%;  border:dashed;">
                        <br> -->
                        
                    </q-form>
        
                <!-- </div> -->

            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, defineEmits, ref } from 'vue';
import axios from "axios"
import { useQuasar } from 'quasar';

export default defineComponent({
    setup(_,{emit}) {

        // Reactive vars and third party's function
        const $q = useQuasar()
        const emits = defineEmits(["dataAdded", "closeAdded"])

        const nom = ref("")
        const solde = ref(null)

        // hooks and notify
        function sendPositive(text) {
            $q.notify({
                color: 'white',
                textColor: 'black',
                icon: 'cloud_done',
                iconColor: 'indigo-9',
                message: text,
                position:'bottom',
            })
        }

        function sendWarning(text) {
            $q.notify({
                color: 'orange-4',
                textColor: 'white',
                icon: 'warning',
                message: text
            })
        }

        async function addClient (data) {
            let response = await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/clients',
                data: data,
            })

            console.log(response.data)

            if (response.data.res) {
                return true;
            } else {
                return false
            }
            
        }

        async function validate () {
            const updateData = {nom:nom.value, solde:solde.value}

            if (await addClient(updateData)) {
                sendPositive("Client added successfully, this modal will close after a fiew seconds")
                setTimeout(() => {
                   emit("dataAdded")
                }, 3000);
            } else {
                sendWarning("Veuiller refaire l'ajout !")
                reset()
            }
            
        }

        function reset() {
            nom.value = null;
            solde.value = null;
            emit("closeAdded")
        }

        return {
            nom, solde,

            validate, reset
        }
    }
})
</script>

<style>
.dialog{
    position: absolute;
    background-color: white;
    box-shadow: 3px 0 10px rgb(94, 94, 94);

    width: 40%;
    padding: 20px;
    margin: auto;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;

    border-radius: 10px;
}

.layout {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.365);
}

.form{
    background-color: white;
    z-index: 1000;
}
</style>