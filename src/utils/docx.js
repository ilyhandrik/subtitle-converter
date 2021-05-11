import * as docx from 'docx';
import fileExport from '@/utils/fileExport';

// Назначение цвета актерам
const getColors = (actorToCharacters) => {
  const palette = [
    '#FFEB3B',
    '#0288D1',
    '#4CAF50',
    '#E040FB',
    '#F57C00',
    '#B2EBF2',
    '#FF5722',
  ];
};

// Стили и отступы
const margins = {
  top: docx.convertMillimetersToTwip(3),
  bottom: docx.convertMillimetersToTwip(3),
  left: docx.convertMillimetersToTwip(3),
  right: docx.convertMillimetersToTwip(3),
};

// Список актеров
const createActorsList = (actorToCharacters) => {
  console.log('f');
  return actorToCharacters.map((row) => (new docx.Paragraph({
    size: 12,
    children: [
      new docx.TextRun(`${row.actor} - `),
      new docx.TextRun({
        text: row.characters.join(','),
        highlight: 'yellow',
      }),
    ],
  })
  ));
};

// Ячейки таблицы
const createTimeCell = (time) => {
  console.log(time);
  return new docx.TableCell({
    children: [new docx.Paragraph(time)],
    margins,
  });
};
const createCharactersCell = (characters) => {
  console.log(characters);
  return new docx.TableCell({
    children: [new docx.Paragraph(characters)],
    margins,
  });
};
const createDialogCell = (dialog) => {
  console.log(dialog);
  return new docx.TableCell({
    children: [new docx.Paragraph(dialog)],
    margins,
  });
};

// Строки таблицы
const createRow = (time, chars, text) => {
  console.log(time);
  return new docx.TableRow({
    children: [time, chars, text],
  });
};

// Создание таблицы
const createTable = (dialogs) => {
  const rows = dialogs.map((row) => {
    const time = createTimeCell(row.start);
    const char = createCharactersCell(row.name.join('|'));
    const text = createDialogCell(row.text);
    return createRow(time, char, text);
  });
  return new docx.Table({ rows });
};

// Создание документа
const createSheet = (dialogs, actorToCharacters) => {
  const doc = new docx.Document({
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
        ...createActorsList(actorToCharacters),
        createTable(dialogs),
      ],
    }],
  });

  docx.Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    fileExport.docxExport(blob);
    console.log('Document created successfully');
  });
};

export default {
  createSheet,
};
