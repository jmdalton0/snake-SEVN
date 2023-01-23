<template>
    <Screen
        name="start"
        label="start"
    />
</template>

<script>
import Screen from './Screen.vue';
export default {
    name: 'StartComponent',
    components: {
        Screen,
    }
}
</script>

<style>
#start {
    justify-content: flex-end;
    background-image: url('../../assets/snake-retro.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
</style>
