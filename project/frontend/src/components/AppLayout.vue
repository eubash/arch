<template>
  <div>
    <base-header />
    <router-view />
  </div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader";

export default {
  name: "AppLayout",
  components: {
    BaseHeader
  }
};
</script>

<style lang="scss">

</style>