const readFile = (file) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  if (file.name.match(/.json/)) {
    fileReader.readAsText(file);
  } else {
    reject();
  }
  fileReader.onload = () => resolve(fileReader.result);
});

export default {
  readFile,
};
