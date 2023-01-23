<template>
    <section :id="name">
        <slot></slot>
        <button
            :id="name + '-btn'"
            class="btn screen-btn"
            @click="this.$emit('next')"
        >
            {{ label }}
        </button>
    </section>
</template>

<script>
export default {
    name: 'ScreenComponent',
    props: {
        name: String,
        label: String,
    }
}
</script>

<style>
section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 8rem 4rem;
}
</style>