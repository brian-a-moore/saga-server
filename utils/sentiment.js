const Sentiment = require('sentiment');
const sentiment = new Sentiment();

module.exports = text => {
    let { comparitive } = sentiment.analize(text);
    return comparitive;
};