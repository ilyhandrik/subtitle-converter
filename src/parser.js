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
      rawText,
    ] = dialog.replace('Dialogue:', '').split(',');

    const name = nameString.split(' / ');
    /* eslint-disable */
    const text = rawText.replaceAll(/\\N/g,'\n');

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
      uniqueCharacters[name] = name;
    })
  });
  return Object.keys(uniqueCharacters);
};

export default {
  getDialogs,
  getCharacters,
};
