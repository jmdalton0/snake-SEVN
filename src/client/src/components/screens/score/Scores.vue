<template>
    <div class="scores">
        <h3>High Scores</h3>

        <h4
            v-for="(score, ind) in scores"
            :key="ind"
            :class="rank === ind ? 'rank' : ''"
        >
            <span>{{ ind + 1 }}&nbsp;</span>

            <span v-if="rank === ind">
                <ScoreInput v-model="newName"/>
            </span>
            <span v-else>
                {{ score.name }}
            </span>

            <span class="fill"></span>

            <span v-if="rank === ind">
                {{ newScore }}
            </span>
            <span v-else>
                {{ score.score }}
            </span>
        </h4>

        <Spinner
            :message="message"
            :spin="spin"
        />
  </div>
</template>

<script>
import Spinner from './Spinner.vue';
import ScoreInput from './ScoreInput.vue';
import Proxy from '../../../api/Proxy.js';

export default {
    name: 'ScoresComponent',
    components: {
        Spinner,
        ScoreInput,
    },
    data() {
        return {
            scores: [],
            rank: 0,
            newName: '',
            message: '',
            spin: false,
        }
    },
    watch: {
        newName(v) {
            this.scores[this.rank].name = v;
        }
    },
    methods: {
        async getScores() {
            this.message = 'Loading';
            this.spin = true;
            this.scores = await Proxy.getScores();
            if (this.scores) {
                this.message = '';
                this.spin = false;
                this.placeScore();
            } else {
                this.message = 'unable to load';
                this.spin = false;
            }
        },
        async addScore() {
            this.message = 'Saving';
            this.spin = true;
            const res = await Proxy.addScore(this.scores[this.rank]);
            if (res) {
                this.message = '';
                this.spin = false;
            } else {
                this.message = 'unable to save';
                this.spin = false;
            }
        },
        placeScore() {
            this.rank = 0;
            this.scores.forEach(score => {
                if (this.newScore < score.score) {
                    this.rank++;
                }
            });
            this.scores.splice(this.rank, 0, {
                id: this.rank,
                name: '',
                score: this.newScore,
            });
            this.scores.pop();
        },
        handleKeydown(key) {
            if (key.key === 'Enter') {
                if (this.newName.length > 0) {
                    this.addScore();
                }
                document.removeEventListener('keydown', this.handleKeydown);
                this.rank = -1;
            }
        },
    },
    props: {
        newScore: Number,
    },
    async mounted() {
        this.getScores();
        document.addEventListener('keydown', this.handleKeydown);
    }
}
</script>

<style scoped>
h3 {
    color: var(--secondary);
}

h4 {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.scores {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0; 
    padding: 2rem;
    border: 4px solid var(--secondary);
    border-radius: 20px;
}

.rank {
    color: var(--secondary);
}

.fill {
    flex: 1;
}
</style>