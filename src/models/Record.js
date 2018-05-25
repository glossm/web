class Record {
  constructor({
    id,
    meaning,
    audio,
    video,
    learned,
  }) {
    this.id = id;
    this.meaning = meaning;
    this.audio = audio;
    this.video = video;
    this.learned = learned;
  }
}

export default Record;
