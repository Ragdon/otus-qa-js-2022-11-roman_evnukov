import { Score } from '../src/app.js'
let scores = {
    "Anna": 10,
    "Olga": 1,
    "Ivan": 5
}
test('Test sum of scores', () => {
    expect(Score(scores)).toBe(16);
});