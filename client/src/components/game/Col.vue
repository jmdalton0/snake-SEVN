<template>
    <div
        :id="id"
        class="col"
        :class="color"
    ></div>
</template>

<script>
export default {
    name: 'ColComponent',
    data() {
        return {
            id: "col-" + this.col,
        }
    },
    props: {
        col: Number,
        color: String
    }
}
</script>

<style>
.col {
    display: flex;
    width: calc(100% / 16);
    background-color: var(--black);
    transition: box-shadow 1s ease;
}

.primary {
    background-color: var(--primary);
}

.primary-dark {
    background-color: var(--primary-dark);
}

.secondary {
    background-color: var(--secondary);
}

.food {
    background-color: var(--food);
}
</style>