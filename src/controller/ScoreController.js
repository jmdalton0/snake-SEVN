import ScoreDAO from "../db/ScoreDAO.js";
import Score from "../model/Score.js";

export default class ScoreController {
    #MAX = 8;

    constructor() {
        this.dao = new ScoreDAO();
    }

    async getScores() {
        try {
            await this.#preserveNumScores();
            return await this.dao.readScores();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async addScore(score) {
        try {
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
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async #preserveNumScores() {
        const scores = await this.dao.readScores();
        const greaterLength = Math.max(this.#MAX, scores.length);
        for (let i = 0; i < greaterLength; i++) {
            if (!scores[i]) {
                await this.dao.createScore(new Score(i, '', 0));
            }
            else if (scores[i].getId() !== i) {
                await this.dao.deleteScore(scores[i].getId());
                await this.dao.createScore(new Score(i, '', 0));
            }
            else if (i > this.#MAX - 1) {
                await this.dao.deleteScore(scores[i].getId());
            }
        }
    }
}