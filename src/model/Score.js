export default class Score {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setScore(score) {
        this.score = score;
    }

    toString() {
        return 'Score #' + this.id + ': ' + this.name + ', ' + this.score;
    }

    static parse(json) {
        return new Score(json.id, json.name, json.score);
    }
}