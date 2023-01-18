<template>
    <Screen
        name="score"
        label="replay"
    >
        <div class="score">
            <h2>Game Over</h2>
            <h3>Your Score:</h3>
            <h3 class="score-total">{{ score }}</h3>
        </div>
    </Screen>
</template>

<script>
import Screen from './Screen.vue';
export default {
    name: 'ScoreComponent',
    components: {
        Screen,
    },
    props: {
        score: Number,
    }
}
</script>

<style>
.score {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;
}

.score-total {
    color: var(--secondary);
    text-shadow: 0 0 24px var(--secondary);
}
</style>