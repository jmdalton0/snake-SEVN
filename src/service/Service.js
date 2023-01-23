import ScoreController from "../controller/ScoreController.js";
import Score from "../model/Score.js";

export default class ScoresService {
    static async getScores(res) {
        const controller = new ScoreController();
        const scores = await controller.getScores();
        if (scores) {
            res.json({scores: scores});
        } else {
            res.sendStatus(500);
        }
    }

    static async addScore(res, body) {
        const controller = new ScoreController();
        let score;
        try {
            body = JSON.parse(body).score;
            score = Score.parse(body);
            success = await controller.addScore(score);
            if (success) {
                res.json({score: score});
            } else {
                res.sendStatus(500);
            }
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
}