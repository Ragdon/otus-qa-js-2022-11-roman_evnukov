
export const Score = function getScore(scores) {

    let sum = 0;

    for (let score of Object.values(scores)) {
        sum += score;
    }

    return sum;
}
