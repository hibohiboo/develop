<template>
    <div>
        <h1>To-do CRUD</h1>
        <h3>Add</h3>
        <form action="javascript:void(0);" method="POST" onsubmit="addItem()">
            <input type="text" id="add-name" placeholder="New to-do">
            <input type="submit" value="Add">
        </form>
  
        <div id="spoiler">
            <h3>Edit</h3>
            <form class="my-form">
                <input type="hidden" id="edit-id">
                <input type="checkbox" id="edit-isComplete">
                <input type="text" id="edit-name">
                <input type="submit" value="Save">
                <a onclick="closeInput()" aria-label="Close">&#10006;</a>
            </form>
        </div>

        <p id="counter">{{counter}}</p>

        <table>
            <tr>
                <th>Is Complete</th>
                <th>Name</th>
                <th></th>
                <th></th>
            </tr>
            <tbody id="todos">
              <tr  v-for="item in data" :key="item.id">
                <td>
                  <input type="checkbox" disabled="disabled" checked="item.isComplete" />
                </td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const uri = "api/todo";

@Component
export default class Todo extends Vue {
  data = []
  $axios: any

  beforeMount(){
    this.getData()
  }
  get counter() {
    if (this.data.length === 1) {
      return "to-do"
    }
    else if(this.data.length > 1) {
      return `${this.data.length} to-dos`
    }
    return "No to-do"
  }
  getData(){
    this.$axios({
      type: "GET",
      url: uri,
      cache: false,
      success: function(data: any) {
        this.data=data
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input[type='submit'], button, [aria-label] {
        cursor: pointer;
    }

    #spoiler {
        display: none;
    }

    table {
        font-family: Arial, sans-serif;
        border: 1px solid;
        border-collapse: collapse;
    }

    th {
        background-color: #0066CC;
        color: white;
    }

    td {
        border: 1px solid;
        padding: 5px;
    }
</style>
