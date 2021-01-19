function convertTime(num) {
    const number = num;
    const hours = num / 60;
    const roundHours = Math.floor(hours);
    const minutes = (hours - roundHours) * 60;
    const roundMinutes = Math.round(minutes);

    if (number < 60) {
        return `${roundMinutes} minutes`
    } else if (number === 60) {
        return `${hours} hour`;
    } else if (number > 60) {
        return `${roundHours} hours and ${roundMinutes} minutes`
    }

  }

  module.exports = convertTime;