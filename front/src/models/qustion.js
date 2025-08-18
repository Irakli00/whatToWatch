class QuestionOption {
  constructor(text, value, followUps = []) {
    this.text = text;
    this.value = value;
    this.followUps = followUps;
  }

  addOption(text, value, followUps = []) {
    const option = new QuestionOption(text, value, followUps);
    this.options.push(option);
    return this;
  }
}

class Question {
  constructor(questionText, options = []) {
    this.questionText = questionText;
    this.options = options;
  }

  addOption(text, value, followUps = []) {
    const option = new QuestionOption(text, value, followUps);
    this.options.push(option);
    return this;
  }
}

export class MediaQuestion {
  constructor(id, key, questionText) {
    this.id = id;
    this.key = key;
    this.questions = new Question(questionText);
  }

  addOption(text, value, followUps = []) {
    this.questions.addOption(text, value, followUps);
    return this;
  }
}
