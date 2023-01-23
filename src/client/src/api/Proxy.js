import axios from 'axios';

export default class Proxy {

    static async getScores() {
        try {
            let res = await axios.get('/scores');
            return res.data.scores;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async addScore(score) {
        try {
            let res = await axios.post('/score', {
                score: score
            });
            return res.data.score;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}