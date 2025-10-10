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
    this.qText = questionText;
    this.options = options;
  }

  addOption(text, value, followUps = []) {
    const option = new QuestionOption(text, value, followUps);
    this.options.push(option);
    return this;
  }
}

function createQuestion(key, qText, options) {
  const q = new MediaQuestion("id", key, qText);

  options.forEach((el) => {
    q.addOption(el.qText, el.value, el.followUps);
  });

  return q;
}

export { createQuestion };

export class MediaQuestion {
  constructor(key, questionText) {
    this.key = key;
    this.questions = new Question(questionText);
  }

  addOption(text, value, followUps = []) {
    this.questions.addOption(text, value, followUps);
    return this;
  }
}
