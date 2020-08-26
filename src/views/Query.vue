<template>
  <v-container>
    <QueryDataList />
    <v-textarea class="mt-5" rows="3" label="備註" auto-grow></v-textarea>
  </v-container>
</template>

<script>
// @ is an alias to /src
import QueryDataList from '@/components/QueryDataList'

export default {
  name: 'Query',
  components: {
    QueryDataList,
  },
}
</script>
