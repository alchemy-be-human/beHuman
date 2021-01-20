function convertTime(num) {
    const hours = num / 60;
    const roundHours = Math.floor(hours);
    const minutes = (hours - roundHours) * 60;
    const roundMinutes = Math.round(minutes);

    if (num < 60) {
        return `${roundMinutes} minutes`
    } else if (num === 60) {
        return `${hours} hour`;
    } else if (num > 60) {
        return `${roundHours} hours and ${roundMinutes} minutes`
    }

  }

  module.exports = convertTime;
