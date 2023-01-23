import axios from 'axios';

export default class Proxy {

    static async getScores() {
        let res = await axios.get(
            import.meta.env.VITE_BASE_URL + '/scores'
        );
        return res.data.scores;
    }

    static async addScore(score) {
        let res = await axios.post(
            import.meta.env.VITE_BASE_URL + '/score',
            {
                score: score
            }
        );
        return res.data.score;
    }
}