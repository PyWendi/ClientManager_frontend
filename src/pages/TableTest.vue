<template>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      class="q-table--grid"
    >
      <template v-slot:body-cell(update)="props">
        <q-btn
          flat
          dense
          icon="update"
          @click="updateRow(props.row)"
        />
      </template>
      <template v-slot:body-cell(delete)="props">
        <q-btn
          flat
          dense
          icon="delete"
          @click="deleteRow(props.row)"
        />
      </template>
    </q-table>
  </template>
  
  <script>
  import { QTable, QBtn } from 'quasar';
  
  export default {
    components: {
      QTable,
      QBtn
    },
    data() {
      return {
        rows: [],
        columns: [
          {
            name: 'Name',
            required: true,
            label: 'Name',
            align: 'left',
            field: 'name',
            sortable: true
          },
          {
            name: 'Email',
            required: true,
            label: 'Email',
            align: 'left',
            field: 'email',
            sortable: true
          }
        ]
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        // Simulated data for demonstration purposes
        this.rows = [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          // ... Add more rows as needed
        ];
      },
      updateRow(row) {
        console.log('Updating row:', row);
        // Perform Axios request to update row data
      },
      deleteRow(row) {
        console.log('Deleting row:', row);
        // Perform Axios request to delete row
      }
    }
  };
  </script>
  
  <style>
  /* Add any necessary styles */
  </style>
  