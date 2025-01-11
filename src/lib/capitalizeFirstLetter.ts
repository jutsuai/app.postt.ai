function capitalizeFirstLetter(str: string) {
  return (str || "")
    .replace(/\b([a-z])/g, function (match, letter) {
      return letter.toUpperCase();
    })
    .replace(/'S\b/g, "'s");
}

export default capitalizeFirstLetter;
