export const GRAMMAR_GROUPS = [
  {
    id: 'foundations',
    label: 'Foundations',
    description: 'particles, sentence style, topics, and basic noun links',
    categories: ['Particles', 'Plain Style', 'Topic', 'Basis']
  },
  {
    id: 'cause-purpose-condition',
    label: 'Cause, Purpose & Condition',
    description: 'why something happens, goals, requirements, and conditions',
    categories: [
      'Cause and Effect',
      'Reason',
      'Reason and Plan',
      'Positive Cause',
      'Negative Cause',
      'Cause and Agent',
      'Purpose',
      'Dual Purpose',
      'Purpose and Degree',
      'Condition',
      'Sufficient Condition',
      'Condition Through Experience',
      'Requirement',
      'Necessity',
      'Hypothesis'
    ]
  },
  {
    id: 'contrast-comparison',
    label: 'Contrast & Comparison',
    description: 'contrast, concession, comparison, similarity, and alternatives',
    categories: [
      'Contrast',
      'Concession',
      'Reported Contrast',
      'Addition and Contrast',
      'Comparison',
      'Similarity',
      'Alternative',
      'Choice',
      'Substitution',
      'Role and Qualification'
    ]
  },
  {
    id: 'time-sequence-state',
    label: 'Time, Sequence & State',
    description: 'order, timing, duration, state, completion, and change',
    categories: [
      'State',
      'Background',
      'During',
      'Timing',
      'Sequence',
      'Immediate Sequence',
      'Completion',
      'Progress',
      'Gradual Change',
      'Change',
      'Interruption',
      'Interrupted Intention',
      'Connection',
      'Opportunity'
    ]
  },
  {
    id: 'inference-judgment',
    label: 'Inference & Judgment',
    description: 'guessing, judging, discovering, evaluating, and realizing',
    categories: [
      'Inference',
      'Assumption',
      'Discovery',
      'Realization',
      'Appearance',
      'Evaluation',
      'Expectation',
      'Surprise',
      'General Truth',
      'Natural Tendency',
      'Tendency',
      'Possibility',
      'Negative Possibility',
      'Difficulty',
      'Impossibility',
      'Inevitability',
      'Worth',
      'Near Miss'
    ]
  },
  {
    id: 'reported-speech',
    label: 'Quoted & Reported Speech',
    description: 'direct quotation, reported speech, questions, and commands',
    categories: [
      'Quotation',
      'Quoted Speech',
      'Reported Speech',
      'Reported Background',
      'Question',
      'Informal Question',
      'Command',
      'Agreement',
      'Shared Knowledge',
      'Confirmation',
      'As Known',
      'According To'
    ]
  },
  {
    id: 'attitude-emphasis',
    label: 'Attitude & Emphasis',
    description: 'emphasis, regret, hesitation, negation, and free choice',
    categories: [
      'Soft Response',
      'Futility',
      'Uncertainty',
      'No Exception',
      'Strong Negation',
      'Negation',
      'Emphasis',
      'Free Choice',
      'Extreme Situation',
      'Regret',
      'Hesitation',
      'Pretense',
      'Wish',
      'Resolution',
      'Habit',
      'Addition',
      'Inclusion',
      'Listing Possibilities',
      'Degree',
      'Means',
      'Causative',
      'Recollection',
      'Recollection and Contrast',
      'Recollection Modifier',
      'Recollection Question',
      'Recollection Background',
      'Exclamation'
    ]
  }
];

const CATEGORY_TO_GROUP = new Map(
  GRAMMAR_GROUPS.flatMap((group) => group.categories.map((category) => [category, group]))
);

export const ALL_GRAMMAR_GROUP = {
  id: 'all',
  label: 'All',
  description: 'all grammar patterns'
};

export function grammarGroupOf(lesson) {
  return CATEGORY_TO_GROUP.get(lesson.category) ?? GRAMMAR_GROUPS[GRAMMAR_GROUPS.length - 1];
}

export function grammarGroupsForLessons(lessons) {
  const present = new Set(lessons.map((lesson) => grammarGroupOf(lesson).id));
  return GRAMMAR_GROUPS.filter((group) => present.has(group.id));
}

export function findGrammarGroup(groupId) {
  return GRAMMAR_GROUPS.find((group) => group.id === groupId);
}
