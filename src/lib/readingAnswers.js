// Reading questions come in two answer shapes, so scoring and rendering share
// these helpers rather than each testing for `question.answer` themselves.
//
//  - multiple choice: the stored answer is the index of the chosen option.
//  - clause ordering: the stored answer is an array of clause labels in the
//    order the learner placed them, e.g. ['다', '나', '라', '가'].
//
// The 배열 questions in reading-047/052/060/064 are multiple choice because their
// official option text survived extraction; the ones in 035/036/037/041 lost it,
// so they carry `clauses` + `correctOrder` and are answered by ordering instead.

export function isOrderingQuestion(question) {
  return Array.isArray(question?.clauses);
}

export function isAnswered(question, value) {
  if (isOrderingQuestion(question)) {
    return Array.isArray(value) && value.length === question.clauses.length;
  }
  return value !== undefined;
}

export function isAnswerCorrect(question, value) {
  if (isOrderingQuestion(question)) {
    const expected = question.correctOrder || [];
    return (
      Array.isArray(value) &&
      value.length === expected.length &&
      expected.every((label, index) => value[index] === label)
    );
  }
  return value === question.answer;
}
