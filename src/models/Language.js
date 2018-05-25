class Language {
  constructor({
    id,
    code,
    name,
    numSpeakers,
    description,
  }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.numSpeakers = numSpeakers;
    this.description = description;
  }
}

export default Language;
