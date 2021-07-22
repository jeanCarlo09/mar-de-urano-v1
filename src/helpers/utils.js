var accentMap = {
  á: "a",
  é: "e",
  è: "e",
  í: "i",
  ó: "o",
  ú: "u",
  Á: "a",
  É: "e",
  È: "e",
  Í: "i",
  Ó: "o",
  Ú: "u",
};

export const accentFold = (text) => {
  if (!text) {
    return "";
  }
  let textResult = "";
  for (var i = 0; i < text.length; i++) {
    textResult += accentMap[text.charAt(i)] || text.charAt(i);
  }
  return textResult;
};
