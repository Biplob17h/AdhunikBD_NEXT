function genId() {
  return [...Array(16)]
    .map(() =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");
}

export default genId;
