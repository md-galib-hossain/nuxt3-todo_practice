<template lang="">
    <div>
        {{slug}}
    </div>
</template>
<script setup>
const slug = ref("")
const route = useRoute()
slug.value = route.params.post
</script>
