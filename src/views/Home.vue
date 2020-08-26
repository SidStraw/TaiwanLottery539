<template>
  <v-container>
    <AllDataList />
  </v-container>
</template>

<script>
// @ is an alias to /src
import AllDataList from '@/components/AllDataList'

export default {
  name: 'Home',
  components: {
    AllDataList,
  },
}
</script>
