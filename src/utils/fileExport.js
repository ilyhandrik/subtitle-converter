const fileSave = (extension, fileName, data) => {
  const BOM = '\uFEFF';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([BOM + data], {
    type: `text/${extension}`,
  }));
  a.setAttribute('download', `${fileName}.${extension}`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const csvExport = (data, fileName) => {
  fileSave('csv', fileName, data);
};

const jsonExport = (data, fileName) => {
  fileSave('json', fileName, data);
};

const docxExport = (blob, fileName) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.setAttribute('download', `${fileName}.docx`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default {
  csvExport,
  jsonExport,
  docxExport,
};
