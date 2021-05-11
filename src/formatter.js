const hundredthToMinutes = (hundredths) => (hundredths / 100 / 60).toLocaleString('ru-RU', {
  maximumFractionDigits: 2,
});

export default {
  hundredthToMinutes,
};
