import ScoreDAO from "../db/ScoreDAO.js";
import Score from "../model/Score.js";

export default class ScoreController {
    #MAX = 8;

    constructor() {
        this.dao = new ScoreDAO();
    }

    async getScores() {
        await this.#preserveNumScores();
        return await this.dao.readScores();
    }

    async addScore(score) {
        await this.#preserveNumScores();
        let success = false;
        for (let i = 0; i < this.#MAX; i++) {
            const cur = await this.dao.readScore(i);

            if (score.score >= cur.score) {
                score.setId(i);
                success = await this.dao.createScore(score);
                score = cur;
            }
        }
        await this.#preserveNumScores();
        return success;
    }

    async #preserveNumScores() {
        const scores = await this.dao.readScores();
        if (scores.length < this.#MAX) {
            await this.#padScores(scores);
        }
        if (scores.length > this.#MAX) {
            await this.#pareScores(scores);
        }
    }

    async #padScores(scores) {
        for (let i = scores.length; i < this.#MAX; i++) {
            await this.dao.createScore(new Score(i, '', 0));
        }
    }

    async #pareScores(scores) {
        for (let i = this.#MAX; i < scores.length; i++) {
            await this.dao.deleteScore(scores[i].getId());
        }
    }
}