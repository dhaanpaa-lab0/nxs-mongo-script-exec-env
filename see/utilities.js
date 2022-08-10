const zeroPad = (num, places) =>
  String(num)
      .padStart(places, '0')
      .substring(0, places);

const isEmptyObject = (obj) => Object.keys(obj).length === 0;


export {
  zeroPad,
  isEmptyObject,
};
