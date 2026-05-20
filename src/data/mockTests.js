import { grammarLessons } from './grammar';

const QUESTIONS_PER_GRAMMAR_TEST = 10;

function chunkItems(items, size) {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size)
  );
}

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

function placeCorrectOption(correct, distractors, seed) {
  const answer = seed % 4;
  const options = [...distractors];
  options.splice(answer, 0, correct);

  return { options, answer };
}

function createGrammarQuestion(lesson, index) {
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

const grammarTests = chunkItems(grammarLessons, QUESTIONS_PER_GRAMMAR_TEST).map((lessons, index) => {
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
          createGrammarQuestion(lesson, index * QUESTIONS_PER_GRAMMAR_TEST + lessonIndex)
        )
      }
    ]
  };
});

const vocabularyTests = [
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

export const mockTests = [...grammarTests, ...vocabularyTests];
