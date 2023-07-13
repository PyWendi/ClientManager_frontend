<template>
    <div class="q-pa-md mid">

      <UpdateDialog v-if="updateDialog" 
        :propsUpdate="dataToUpdate"
        @dataUpdated="reFetch"
        @closeUpdate="closeUpdate" />

      <AddDialog v-if="addDialog" 
        @dataAdded="reFetch"
        @closeAdded="closeUpdate" />

        <div class="shadow-3 rounded">
          <table>
            <tr>
              <th class="text-blue-8">Numéro de compte</th>
              <th class="text-blue-8">Nom du client</th>
              <th class="text-blue-8">Solde </th>
              <th class="text-blue-8">Observation</th>
              <th class="text-blue-8">Modification</th>
              <th class="text-blue-8">Suppression</th>
            </tr>
            <tr v-for="(row, index) in rows" :key="index">
              <td>{{row.numCompte}}</td>
              <td>{{row.nom}}</td>
              <td>{{row.solde}}</td>
              <td>{{row.observation}}</td>
              <td>
                <q-btn textColor="blue-10"  icon="mode_edit" @click="updateRow(row.nom, row.solde, row.id)"></q-btn>
              </td>
              <td>
                <q-btn textColor="red-10" icon="delete" @click="Delete(row.id)"></q-btn>
              </td>
            </tr>
          </table>
          <div class="last_request">
            <div class="request">
              <p><span class="text-green border-right">Minimum:</span> {{min}}</p>
              <p><span class="text-green border-right">Maximum:</span> {{max}}</p>
              <p><span class="text-green border-right">Totale:</span> {{total}}</p>
            </div>
            <div class="addbtn">
              <q-btn
                class="mg-all"
                color="blue-10"
                outline
                style="width:100%;"
                @click="openAddDialog"
                v-ripple
                >
                <q-icon name="add"></q-icon>
                <span class="q-ml-sm">Ajouter un client</span>
            </q-btn>
            </div>
          </div>
        </div>



    </div>
  </template>


  
  <script>
  import axios from 'axios';
  import { onBeforeMount, ref } from 'vue';
  import UpdateDialog from "components/UpdateDialog.vue"
  import AddDialog from "components/AddDialog.vue"
  import { useQuasar } from 'quasar';
  
  export default {
    components: {
      UpdateDialog,
      AddDialog
    },
    setup() {
      // Reactive vars
      const updateDialog = ref(false)
      const addDialog = ref(false)
      const dataToUpdate = ref([])

      const min = ref(null)
      const max = ref(null)
      const total = ref(null)

      const $q = useQuasar()

      const rows = ref(null)

      onBeforeMount(async () => {
        fetchinData();
        fetchingRes();
      })

      // Simple function
      function openAddDialog() {
        addDialog.value = true
      }


      // Function interacting as controller
      async function fetchinData() {
        let response = await axios({
          method: "GET",
          url: "http://127.0.0.1:8000/api/clients"
        })

        rows.value = response.data
        console.log(rows.value)
      }

      async function fetchingRes() {
        let response = await axios({
          method: "GET",
          url: "http://127.0.0.1:8000/api/minmax"
        })

        min.value = response.data[0].min
        max.value = response.data[0].max
        total.value = response.data[0].total
        console.log(response.data)
      }

      function updateRow(nom, solde, id) {
        console.log(nom + " " +solde)
        dataToUpdate.value.push(nom)
        dataToUpdate.value.push(solde)
        dataToUpdate.value.push(id)
        updateDialog.value = true
      }

      function reFetch() {
        fetchinData()
        fetchingRes()
        updateDialog.value = false
        addDialog.value = false
        dataToUpdate.value = []
      }

      function closeUpdate() {
        updateDialog.value = false
        addDialog.value = false
        dataToUpdate.value = []
      }

      async function Delete(id) {
        let response = await axios({
          method: "DELETE",
          url: "http://127.0.0.1:8000/api/clients/"+id
        })

        if (response.data.deleted) {
            $q.notify({
                color: 'white',
                textColor: 'black',
                icon: 'cloud_done',
                iconColor: 'indigo-9',
                message: "Élément supprimer avec succès !",
                position:'bottom',
            })
          }
          fetchinData()
          fetchingRes()
        }

      return {
        updateDialog,
        addDialog,
        rows,
        dataToUpdate,
        min,max,total,

        // FUnction
        openAddDialog,
        reFetch,
        closeUpdate,
        updateRow,
        Delete
      }
    }
    
  };
  </script>
  

<style>
.last_request {
  display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
}

.request {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
}
.request p {
  margin: 0;
}
.addbtn{
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
}

.border-right{
  padding-right: 15px;
}

  .mid {
    width: 95%;
    margin: auto;
    
  }

  table {
    width: 100%;
    height: 500px;
    overflow: hidden;

  }

  table,th, td {
    padding: 10px;
    border-collapse: collapse;
    text-align: center;
  }

  td {
    border-bottom: 1px solid rgb(222, 222, 222);
    padding-left: 30px;
    padding-right: 30px;
  }

  .rounded {
    border-radius: 10px;
    overflow: hidden;
  }

  .mg-top {
    margin-top: 50px;
  }

  .mg-all{
    margin: 10px;
  }
</style>