<template>
    <div class="game">
        <h3 class="score-count"
            v-if="showScore"
        >
            {{ score }}
        </h3>

        <Row
            v-for="(row, ind) in grid"
            :key="ind"
            :row="ind"
            :cols="row"
        />

        <Inputs
            @input="input"
        />
    </div>
</template>

<script>
import Row from './Row.vue';
import Inputs from './Inputs.vue';

export default {
    name: 'GameComponent',
    components: {
        Row,
        Inputs,
    },
    data() {
        return {
            state: '',
            direction: '',
            inputs: [],
            grid: [[]],
            snake: [],
            food: [],
            ate: false,
            count: 0,
            ticker: 0,
            finalLength: 0,
            score: 0,
            showScore: false,
        }
    },
    methods: {
        input(input) {
            if (this.state === 'play') {
                this.inputs.push(input);
            }
        },

        addHead() {
            const nextDirection = this.inputs.shift();
            if (nextDirection) {
                if (
                    (nextDirection === 'n' && this.direction !== 's') ||
                    (nextDirection === 's' && this.direction !== 'n') ||
                    (nextDirection === 'e' && this.direction !== 'w') ||
                    (nextDirection === 'w' && this.direction !== 'e')
                ) {
                    this.direction = nextDirection;
                }
            }

            // apply new direction
            const curHead = this.snake.at(0);
            if (this.direction === 'n') {
                this.snake.unshift([(curHead[0] + 15) % 16, curHead[1]]);
            } else if (this.direction === 's') {
                this.snake.unshift([(curHead[0] + 1) % 16, curHead[1]]);
            } else if (this.direction === 'e') {
                this.snake.unshift([curHead[0], (curHead[1] + 1) % 16]);
            } else if (this.direction === 'w') {
                this.snake.unshift([curHead[0], (curHead[1] + 15) % 16]);
            } else {
                return;
            }
        },

        addTail(segment) {
            this.snake.push(segment);
        },

        removeTail() {
            this.snake.pop();
        },

        eat() {
            for (let i = 1; i < this.snake.length; i++) {
                if (
                    this.snake[i][0] === this.snake[0][0] &&
                    this.snake[i][1] === this.snake[0][1]
                ) {
                    this.state = 'end';
                    this.food = [];
                    this.count = 0;
                    this.score = 0;
                    this.finalLength = this.snake.length;
                    return true;
                }
            }

            if (
                this.food[0] === this.snake[0][0] &&
                this.food[1] === this.snake[0][1]
            ) {
                this.spawnFood();
                return true;
            }
            return false;
        },

        spawnFood() {
            const newFood = [];
            newFood[0] = Math.floor(Math.random() * 16);
            newFood[1] = Math.floor(Math.random() * 16);
            let newFoodOnSnake = false;
            for (let i = 0; i < this.snake.length; i++) {
                if (
                    this.snake[i][0] === newFood[0] &&
                    this.snake[i][1] === newFood[1]
                ) {
                    newFoodOnSnake = true;
                }
            }

            if (newFoodOnSnake) {
                this.spawnFood();
            } else {
                this.food = newFood;
            }
        },

        start() {
            const PAUSE = 12;
            switch(this.count) {
                case PAUSE:
                    this.addTail([7, 6]);
                    break;
                case PAUSE + 1:
                    this.addTail([7, 5]);
                    break;
                case PAUSE + 2:
                    this.addTail([7, 4]);
                    break;
                case PAUSE + 3:
                    this.addTail([7, 3]);
                    break;
                case (PAUSE * 2) + 4:
                    this.food = [7, 11];
                    break;
                case (PAUSE * 3) + 4:
                    this.state = 'play';
                    break;
                default:
                    break;
            }
            this.count++;
        },

        play() {
            this.ate = false;
            this.addHead();
            if (this.eat()) {
                this.ate = true;
                this.$emit('strobe');
            } else {
                this.removeTail();
            }
        },

        end() {
            const PAUSE = 8;
            if (this.count > PAUSE && this.snake.length > 0) {
                this.removeTail();
                this.showScore = true;
                this.score += 256;
                this.$emit('strobe');
            }
            if (this.count === (this.finalLength + (PAUSE * 3))) {
                this.state = 'done';
            }
            this.count++;
        },

        done() {
            this.$emit('scored', this.score);
            this.$emit('next');
        },

        draw() {
            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid.length; j++) {
                    this.grid[i][j] = '';
                }
            }
            for (let i = 0; i < this.snake.length; i++) {
                const segment = this.snake[i];
                if (i % 2 === 0) {
                    this.grid[segment[0]][segment[1]] = 'primary';
                } else {
                    this.grid[segment[0]][segment[1]] = 'primary-dark';
                }
            }
            if (this.ate && this.snake.length > 0) {
                const segment = this.snake[0];
                this.grid[segment[0]][segment[1]] = 'secondary';
            }
            if (this.food.length == 2) {
                this.grid[this.food[0]][this.food[1]] = 'food';
            }
        },

        tick() {
            if (this.state === 'start') {
                this.start();
            } else if (this.state === 'play') {
                this.play();
            } else if (this.state === 'end') {
                this.end();
            } else {
                this.done();
            }
            this.draw();
        },
    },
    mounted() {
        this.state = 'start';
        this.direction = 'e';
        this.grid = [...Array(16)].map(() => {
            return [...Array(16)]
        });
        this.ticker = setInterval(() => {
            this.tick();
        }, 140);
    },
}
</script>

<style>
.game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: none;
}

.score-count {
    position: absolute;
    text-align: center;
    padding: 1rem 3rem;
    color: var(--secondary);
    text-shadow: 0 0 24px var(--secondary);
    background-color: var(--black-light);
    border: 7px solid var(--grey-light);
    border-radius: 10px;
    z-index: 1;
}
</style>
