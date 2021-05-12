import * as docx from 'docx';
import fileExport from '@/utils/fileExport';
import { TextRun } from 'docx';

let colorsActors;
let colorsCharacters;

/*
Назначение цвета актерам
*/
const setColors = (actorToCharacters) => {
  const palette = [
    '#FFEB3B',
    '#B2EBF2',
    '#4CAF50',
    '#00BCD4',
    '#E1BEE7',
    '#cddc39',
    '#bdbdbd',
    '#536DFE',
    '#FF9800',
    '#8d6e63',
    '#9c27b0',
    '#c62828',
    '#E64A19',
  ];
  colorsActors = {};
  colorsCharacters = {};
  actorToCharacters.forEach((el, index) => {
    colorsActors[el.actor] = palette[index];
    if (el.characters) {
      el.characters.forEach((char) => {
        colorsCharacters[char] = palette[index];
      });
    }
  });
};

// Стили и отступы
const margins = {
  top: docx.convertMillimetersToTwip(3),
  bottom: docx.convertMillimetersToTwip(3),
  left: docx.convertMillimetersToTwip(3),
  right: docx.convertMillimetersToTwip(3),
};

// Список актеров
const createActorsList = (dialogs, actorToCharacters) => actorToCharacters.map((row) => {
  let actorCount = 0;
  dialogs.forEach((dialog) => {
    if (dialog.name.some((name) => row.characters.some((char) => (char === name)))) {
      actorCount += 1;
    }
  });
  return new docx.Paragraph({
    size: 12,
    children: [
      new docx.TextRun(`${row.actor} - `),
      new docx.TextRun({
        text: row.characters.join(', '),
        shading: {
          type: docx.ShadingType.CLEAR,
          color: '000000',
          fill: colorsActors[row.actor],
        },
      }),
      new docx.TextRun({
        text: ` (${actorCount})\n`,
      }),
    ],
    style: 'wellSpaced',
  });
});

// Ячейки таблицы
const format = (str) => str.split(':').map((el) => (parseFloat(el).toLocaleString('ru-RU', {
  maximumFractionDigits: 0,
  minimumIntegerDigits: 2,
}))).join(':');

const createTimeCell = (time) => new docx.TableCell({
  children: [
    new docx.Paragraph({
      text: format(time),
      style: 'wellSpaced',
    }),
  ],
  margins,
});
const createCharactersCell = (characters) => new docx.TableCell({
  children: [new docx.Paragraph({
    children: characters.map((character, index) => (new TextRun({
      text: `${character}${(characters.length > 1) && (index !== (characters.length - 1)) ? '\n' : ''}`,
      shading: {
        type: docx.ShadingType.CLEAR,
        color: '000000',
        fill: colorsCharacters[character],
      },
    }))),
    style: 'wellSpaced',
  })],
  margins,
});
const createDialogCell = (dialog) => new docx.TableCell({
  children: [new docx.Paragraph({
    children: dialog.split('\\N')
      .map((el, index) => (new docx.TextRun({
        text: el,
        break: (index > 0 ? 1 : 0),
      }))),
    style: 'wellSpaced',
  })],
  margins,
});

// Строки таблицы
const createRow = (time, chars, text) => new docx.TableRow({
  children: [time, chars, text],
});

// Создание таблицы
const createTable = (dialogs) => {
  const rows = dialogs.map((row) => {
    const time = createTimeCell(row.start);
    const char = createCharactersCell(row.name);
    const text = createDialogCell(row.text);
    return createRow(time, char, text);
  });
  return new docx.Table({ rows });
};

// eslint-disable-next-line no-unused-vars,max-len
const getFilteredDialogs = (dialogs, actorToCharacters) => dialogs.filter((dialog) => actorToCharacters.some((element) => element.characters.some((character) => dialog.name.includes(character))));

// Создание документа
const createSheet = (dialogs, actorToChars) => {
  const actorToCharacters = actorToChars.filter((el) => (el.characters && el.characters.length));
  setColors(actorToCharacters);
  const doc = new docx.Document({
    styles: {
      paragraphStyles: [
        {
          id: 'wellSpaced',
          name: 'Well Spaced',
          quickFormat: true,
          run: {
            font: 'Arial',
          },
          paragraph: {
            spacing: { line: 276, before: 20 * 72 * 0.025, after: 20 * 72 * 0.025 },
          },
        },
      ],
    },
    sections: [{
      properties: {
        page: {
          pageNumbers: {
            start: 1,
            formatType: docx.PageNumberFormat.DECIMAL,
          },
        },
      },
      headers: {
        default: new docx.Header({
          children: [
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  children: ['Страница ', docx.PageNumber.CURRENT],
                }),
                new docx.TextRun({
                  children: [' из ', docx.PageNumber.TOTAL_PAGES],
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        ...createActorsList(dialogs, actorToCharacters),
        createTable(getFilteredDialogs(dialogs, actorToCharacters)),
      ],
    }],
  });

  console.log(doc);
  docx.Packer.toBlob(doc).then((blob) => {
    fileExport.docxExport(blob);
  });
};

export default {
  createSheet,
};
