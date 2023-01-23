<template>
    <div class="spinner">
        <p>{{ output }}</p>
    </div>
</template>

<script>
export default {
    name: 'SpinnerComponent',
    data() {
        return {
            output: '',
            interval: null,
        }
    },
    watch: {
        message(v) {
            this.output = v;
        },
        spin(v) {
            if (v) {
                this.interval = setInterval(() => {
                    if (this.output.length === this.message.length + 4) {
                        this.output = this.message;
                    } else {
                        this.output += '.';
                    }
                }, 100);
            } else {
                clearInterval(this.interval);
            }
        }
    },
    props: {
        message: String,
        spin: Boolean,
    },
}
</script>

<style>
.spinner {
    width: 100%;
    height: 1rem;
    text-align: start;
}
</style>