<template>
    <div
        :id="id"
        class="row"
    >
        <Col
            v-for="(col, ind) in cols"
            :key="ind"
            :col="ind"
            :color="col"
        />
    </div>
</template>

<script>
import Col from './Col.vue'

export default {
    name: 'RowComponent',
    components: {
        Col
    },
    computed: {
        id() {
            return 'row-' + this.row;
        }
    },
    props: {
        row: Number,
        cols: Array
    }
}
</script>

<style>
.row {
    display: flex;
    width: 100%;
    height: calc(100% / 16);
}
</style>