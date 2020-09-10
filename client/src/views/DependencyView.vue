<template>
  <div class="col-12 tree-view">
    <TreeView v-if="showTree" :data="tree" :marginY="30" :marginX="30" class="tree"></TreeView>
    <h1 v-else>{{ loadingText }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import { tree as TreeView } from "vued3tree";
import VueRouter from "vue-router";
//import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "DependencyView",
  data() {
    return {
      showTree: false,
      loadingText: 'Loading Dependencies',
      tree: {}
    };
  },
  methods: {
    async getPackageDependencies() {
      const { packageScope, packageName, version } = this.$route.params;

      try {
        let result: AxiosResponse;
        if ( packageScope ) {
          result = await axios.get(`/api/package/${packageScope}/${packageName}/${version}`)
        } else {
          result = await axios.get(`/api/package/${packageName}/${version}`)
        }
        

        this.tree = result.data;
        this.showTree = true;

      } catch (error) {
        this.loadingText = error.response.data;
      }
    }
  },
  mounted() {
    this.getPackageDependencies();
  },
  components: {
    TreeView
  }
});
</script>
<style>
.tree {
  height: 800px;
}
</style>