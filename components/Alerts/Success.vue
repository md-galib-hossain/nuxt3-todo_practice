<template lang="">
    <div>
      {{message.myMessage}}   
    </div>
</template>
<script setup>
    defineProps({
        message: Object
    })

</script>
