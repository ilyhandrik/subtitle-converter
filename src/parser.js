/*
Формат диалогов:
Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
*/

const getDialogs = (file) => {
  const regexp = new RegExp('Dialogue.*', 'g');
  const dialogs = file.match(regexp).map((dialog) => {
    const [
      layer,
      start,
      end,
      style,
      nameString,
      marginL,
      marginR,
      marginV,
      effect,
      ...rawText
    ] = dialog.replace('Dialogue:', '').split(',');

    const name = nameString.split(' / ');
    /* eslint-disable */
    const text = rawText.join(', ');

    return {
      layer,
      start,
      end,
      style,
      name,
      marginL,
      marginR,
      marginV,
      effect,
      text,
    };
  });
  return dialogs;
};

const getCharacters = (dialogs) => {
  const uniqueCharacters = {};
  dialogs.forEach((dialog) => {
    dialog.name.forEach((name) => {
      if (name) {
        uniqueCharacters[name] = name;
      }
    })
  });
  return Object.keys(uniqueCharacters).sort();
};

const getTime = (str) => {
  const [ hours, minutes, seconds ] = str.split(':');
  const [ intSeconds, hundredths ] = seconds.split('.');
  return (parseInt(hours, 10) * 60 * 60 * 100) + (parseInt(minutes, 10) * 60 * 100) + (parseInt(intSeconds, 10) * 100) + parseInt(hundredths, 10);
};

export default {
  getDialogs,
  getCharacters,
  getTime,
};
