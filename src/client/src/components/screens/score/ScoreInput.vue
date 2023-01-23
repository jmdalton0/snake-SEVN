<template>
    <input
        ref="input"
        type="text"
        :onblur="focus"
        v-model="content"
        autocomplete="off"
        spellcheck="false"
        maxlength="20"
    />
</template>

<script>
export default {
    name: 'ScoreInputComponent',
    data() {
        return {
            content: '',
        }
    },
    watch: {
        content(v) {
            this.$emit('input', v);
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
    },
    mounted() {
        this.focus();
    }
}
</script>

<style>
input {
    font-size: 2.5rem;
    color: var(--secondary);
    background-color: var(--black);
    border: 0;
    outline: none;
}
</style>