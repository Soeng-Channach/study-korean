import { grammarLessons } from './grammar.js';
import { vocabulary } from './vocabulary.js';

const QUESTIONS_PER_GRAMMAR_TEST = 10;
const QUESTIONS_PER_VOCAB_TEST = 10;

function chunkItems(items, size) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size)
  );
}

function placeCorrectOption(correct, distractors, seed) {
  const answer = seed % 4;
  const options = [...distractors];
  options.splice(answer, 0, correct);

  return { options, answer };
}

// -----------------------------------------------------------------------------
// Grammar tests
// -----------------------------------------------------------------------------

function getMeaningDistractors(currentLesson, currentIndex) {
  const offsets = [7, 19, 31, 43, 59, 71, 89, 103];
  const distractors = [];

  for (const offset of offsets) {
    const lesson = grammarLessons[(currentIndex + offset) % grammarLessons.length];
    if (lesson.id !== currentLesson.id && !distractors.includes(lesson.coreMeaning)) {
      distractors.push(lesson.coreMeaning);
    }
    if (distractors.length === 3) break;
  }

  return distractors;
}

function getPatternDistractors(currentLesson, currentIndex) {
  const offsets = [13, 29, 41, 57, 73, 91, 109, 127];
  const distractors = [];

  for (const offset of offsets) {
    const lesson = grammarLessons[(currentIndex + offset) % grammarLessons.length];
    if (lesson.id !== currentLesson.id && !distractors.includes(lesson.pattern)) {
      distractors.push(lesson.pattern);
    }
    if (distractors.length === 3) break;
  }

  return distractors;
}

function createGrammarMeaningQuestion(lesson, index) {
  const { options, answer } = placeCorrectOption(
    lesson.coreMeaning,
    getMeaningDistractors(lesson, index),
    index
  );

  return {
    id: `grammar-coverage-q-${String(index + 1).padStart(3, '0')}`,
    prompt: `What is the core meaning of ${lesson.pattern}?`,
    options,
    answer
  };
}

function createGrammarPatternQuestion(lesson, index) {
  const { options, answer } = placeCorrectOption(
    lesson.pattern,
    getPatternDistractors(lesson, index),
    index + 1
  );

  return {
    id: `grammar-pattern-q-${String(index + 1).padStart(3, '0')}`,
    prompt: `Which pattern expresses "${lesson.coreMeaning}"?`,
    options,
    answer
  };
}

const grammarCoverageTests = chunkItems(grammarLessons, QUESTIONS_PER_GRAMMAR_TEST).map((lessons, index) => {
  const start = index * QUESTIONS_PER_GRAMMAR_TEST + 1;
  const end = start + lessons.length - 1;

  return {
    id: `grammar-coverage-${String(index + 1).padStart(3, '0')}`,
    type: 'grammar',
    title: `Grammar Coverage Test ${index + 1}`,
    description: `Core meaning practice for grammar ${start}-${end}.`,
    durationMinutes: Math.max(8, lessons.length * 2),
    sections: [
      {
        type: 'grammar',
        questions: lessons.map((lesson, lessonIndex) =>
          createGrammarMeaningQuestion(lesson, index * QUESTIONS_PER_GRAMMAR_TEST + lessonIndex)
        )
      }
    ]
  };
});

const grammarPatternTests = chunkItems(grammarLessons, QUESTIONS_PER_GRAMMAR_TEST).map((lessons, index) => {
  const start = index * QUESTIONS_PER_GRAMMAR_TEST + 1;
  const end = start + lessons.length - 1;

  return {
    id: `grammar-pattern-${String(index + 1).padStart(3, '0')}`,
    type: 'grammar',
    title: `Grammar Pattern Match Test ${index + 1}`,
    description: `Pick the pattern that matches each meaning for grammar ${start}-${end}.`,
    durationMinutes: Math.max(8, lessons.length * 2),
    sections: [
      {
        type: 'grammar',
        questions: lessons.map((lesson, lessonIndex) =>
          createGrammarPatternQuestion(lesson, index * QUESTIONS_PER_GRAMMAR_TEST + lessonIndex)
        )
      }
    ]
  };
});

// -----------------------------------------------------------------------------
// Vocabulary tests
// -----------------------------------------------------------------------------

function getVocabMeaningDistractors(currentWord, currentIndex) {
  const offsets = [11, 23, 37, 53, 67, 79, 97, 113];
  const distractors = [];

  for (const offset of offsets) {
    const word = vocabulary[(currentIndex + offset) % vocabulary.length];
    if (word.id !== currentWord.id && !distractors.includes(word.meaning)) {
      distractors.push(word.meaning);
    }
    if (distractors.length === 3) break;
  }

  return distractors;
}

function getVocabWordDistractors(currentWord, currentIndex) {
  const offsets = [17, 29, 43, 61, 73, 89, 101, 127];
  const distractors = [];

  for (const offset of offsets) {
    const word = vocabulary[(currentIndex + offset) % vocabulary.length];
    if (word.id !== currentWord.id && !distractors.includes(word.word)) {
      distractors.push(word.word);
    }
    if (distractors.length === 3) break;
  }

  return distractors;
}

function createVocabMeaningQuestion(word, index) {
  const { options, answer } = placeCorrectOption(
    word.meaning,
    getVocabMeaningDistractors(word, index),
    index
  );

  return {
    id: `vocab-coverage-q-${String(index + 1).padStart(3, '0')}`,
    prompt: `What does ${word.word} mean?`,
    options,
    answer
  };
}

function createVocabWordQuestion(word, index) {
  const { options, answer } = placeCorrectOption(
    word.word,
    getVocabWordDistractors(word, index),
    index + 1
  );

  return {
    id: `vocab-recall-q-${String(index + 1).padStart(3, '0')}`,
    prompt: `Which Korean word means "${word.meaning}"?`,
    options,
    answer
  };
}

const vocabularyCoverageTests = chunkItems(vocabulary, QUESTIONS_PER_VOCAB_TEST).map((words, index) => {
  const start = index * QUESTIONS_PER_VOCAB_TEST + 1;
  const end = start + words.length - 1;

  return {
    id: `vocab-coverage-${String(index + 1).padStart(3, '0')}`,
    type: 'vocabulary',
    title: `Vocabulary Coverage Test ${index + 1}`,
    description: `Word meaning practice for vocabulary ${start}-${end}.`,
    durationMinutes: Math.max(8, words.length * 2),
    sections: [
      {
        type: 'vocabulary',
        questions: words.map((word, wordIndex) =>
          createVocabMeaningQuestion(word, index * QUESTIONS_PER_VOCAB_TEST + wordIndex)
        )
      }
    ]
  };
});

const vocabularyRecallTests = chunkItems(vocabulary, QUESTIONS_PER_VOCAB_TEST).map((words, index) => {
  const start = index * QUESTIONS_PER_VOCAB_TEST + 1;
  const end = start + words.length - 1;

  return {
    id: `vocab-recall-${String(index + 1).padStart(3, '0')}`,
    type: 'vocabulary',
    title: `Vocabulary Recall Test ${index + 1}`,
    description: `Pick the matching Korean word for vocabulary ${start}-${end}.`,
    durationMinutes: Math.max(8, words.length * 2),
    sections: [
      {
        type: 'vocabulary',
        questions: words.map((word, wordIndex) =>
          createVocabWordQuestion(word, index * QUESTIONS_PER_VOCAB_TEST + wordIndex)
        )
      }
    ]
  };
});

// -----------------------------------------------------------------------------
// Hand-written vocabulary mini tests (kept for variety / sample questions)
// -----------------------------------------------------------------------------

const vocabularyMiniTests = [
  {
    id: 'vocab-mini-001',
    type: 'vocabulary',
    title: 'Vocabulary Mini Test 1',
    description: 'Review common TOPIK II words from the vocabulary deck.',
    durationMinutes: 8,
    sections: [
      {
        type: 'vocabulary',
        questions: [
          {
            id: 'vocab-mini-001-q1',
            prompt: '환경 means:',
            options: ['attitude', 'environment', 'solution', 'increase'],
            answer: 1
          },
          {
            id: 'vocab-mini-001-q2',
            prompt: '증가하다 means:',
            options: ['to decrease', 'to increase', 'to solve', 'to protect'],
            answer: 1
          },
          {
            id: 'vocab-mini-001-q3',
            prompt: 'Which Korean word means “attitude”?',
            options: ['환경', '태도', '해결하다', '증가하다'],
            answer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'vocab-mini-002',
    type: 'vocabulary',
    title: 'Vocabulary Mini Test 2',
    description: 'Practice word meaning through short TOPIK-style prompts.',
    durationMinutes: 8,
    sections: [
      {
        type: 'vocabulary',
        questions: [
          {
            id: 'vocab-mini-002-q1',
            prompt: '문제를 해결하기 위해 토론했습니다. What does 해결하다 mean?',
            options: ['to solve', 'to travel', 'to compare', 'to attend'],
            answer: 0
          },
          {
            id: 'vocab-mini-002-q2',
            prompt: '긍정적인 태도가 중요합니다. What does 긍정적인 mean?',
            options: ['negative', 'positive', 'formal', 'traditional'],
            answer: 1
          },
          {
            id: 'vocab-mini-002-q3',
            prompt: 'Which word best fits: 온라인 수업을 듣는 학생이 ___ 있습니다.',
            options: ['증가하고', '해결하고', '보호하고', '취소하고'],
            answer: 0
          }
        ]
      }
    ]
  }
];

export const mockTests = [
  ...grammarCoverageTests,
  ...grammarPatternTests,
  ...vocabularyMiniTests,
  ...vocabularyCoverageTests,
  ...vocabularyRecallTests
];
