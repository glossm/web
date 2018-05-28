class Language {
  constructor({
    id,
    code,
    name,
    numSpeakers,
    learning,
  }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.numSpeakers = numSpeakers;
    this.learning = learning;
  }
}

export default Language;
