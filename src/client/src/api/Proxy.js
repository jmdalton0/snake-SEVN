import axios from 'axios';

export default class Proxy {

    static async getScores() {
        try {
            let res = await axios.get(
                import.meta.env.VITE_BASE_URL + '/scores'
            );
            return res.data.scores;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async addScore(score) {
        try {
            let res = await axios.post(
                import.meta.env.VITE_BASE_URL + '/score',
                {
                    score: score
                }
            );
            return res.data.score;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}