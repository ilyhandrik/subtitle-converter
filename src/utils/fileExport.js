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

const csvExport = (data) => {
  fileSave('csv', 'time', data);
};
export default {
  csvExport,
};
