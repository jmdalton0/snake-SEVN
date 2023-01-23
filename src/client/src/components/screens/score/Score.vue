<template>
    <Screen
        name="score"
        label="replay"
    >
        <div class="score">
            <h2>Game Over</h2>
            <h3>
                <span>Your Score: </span>
                <span class="score-total">{{ score }}</span>
            </h3>

            <Scores
                :newScore="score"
            />
       </div>
    </Screen>
</template>

<script>
import Screen from '../Screen.vue';
import Scores from './Scores.vue';

export default {
    name: 'ScoreComponent',
    components: {
        Screen,
        Scores,
    },
    props: {
        score: Number,
    },
}
</script>

<style scoped>
.score {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
}

.score-total {
    color: var(--secondary);
    text-shadow: 0 0 4px var(--secondary);
}
</style>