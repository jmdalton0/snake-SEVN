<template>
    <main :class="strobe ? 'strobe' : ''">
        <div class="console">
            <Start
                v-if="screen === 'start'"
                @next="next"
            />
            <Controls
                v-if="screen === 'controls'"
                @next="next"
            />
            <Game
                v-if="screen === 'play'"
                @strobe="toggleStrobe"
                @scored="updateScore"
                @next="next"
            />
            <Score
                v-if="screen === 'score'"
                :score="score"
                @next="next"
            />
        </div>
    </main>
</template>

<script>
import Start from './screens/Start.vue';
import Controls from './screens/Controls.vue';
import Game from './game/Game.vue';
import Score from './screens/score/Score.vue';

export default {
    name: 'ConsoleComponent',
    components: {
        Start,
        Controls,
        Game,
        Score,
    },
    data() {
        return {
            screen: 'start',
            score: 0,
            strobe: false,
        }
    },
    methods: {
        next() {
            if (this.screen === 'start') {
                this.screen = 'controls';
            } else if (this.screen === 'controls') {
                this.screen = 'play';
            } else if (this.screen === 'play') {
                this.screen = 'score';
            } else if (this.screen === 'score') {
                this.screen = 'play'
            } else {
                this.screen = 'start';
            }
        },
        updateScore(score) {
            this.score = score;
        },
        toggleStrobe() {
            this.strobe = true;
            setTimeout(() => {
                this.strobe = false;
            }, 200);
        }
    }
}
</script>

<style>
main {
    width: var(--dim);
    height: var(--dim);
    margin: 1rem auto;
    padding: 4rem;
    background-color: var(--grey);
    border: 7px solid var(--grey-light);
    border-radius: 40px;
    transition: box-shadow 1s ease;
}

.console {
    width: 100%;
    height: 100%;
    background-color: var(--black);
    border: 7px solid var(--grey-light);
    border-radius: 20px;
    overflow: hidden;
}

.strobe {
    box-shadow: 0 0 24px 4px var(--secondary);
    transition: none;
}

@media (max-width: 1024px) {
    main {
        margin-top: 4rem;
        padding: 10px;
    }

    .console {
        border-radius: 25px;
    }
}
</style>