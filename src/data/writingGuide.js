// Guide for the TOPIK II writing test: how each question is scored, a simple
// structure to follow, and useful expressions with English and Khmer meanings.

export const writingOverview = {
  minutes: 50,
  total: 100,
  rows: [
    { number: '51', kind: 'Fill two blanks (notice, message, email)', points: 10, time: '3–4 min' },
    { number: '52', kind: 'Fill two blanks (short explanation)', points: 10, time: '3–4 min' },
    { number: '53', kind: 'Describe a chart in 200–300 characters', points: 30, time: '10–12 min' },
    { number: '54', kind: 'Give your opinion in 600–700 characters', points: 50, time: '28–30 min' }
  ]
};

export const writingRules = [
  {
    en: 'Write Q53 and Q54 in the plain written style: end sentences with -다 (한다, 있다, 이다). Do not use -요 or -습니다.',
    km: 'សរសេរសំណួរ ៥៣ និង ៥៤ ជាទម្រង់សរសេរធម្មតា៖ បញ្ចប់ប្រយោគដោយ -다 (한다, 있다, 이다)។ កុំប្រើ -요 ឬ -습니다។'
  },
  {
    en: 'In Q51, copy the style of the text: a notice or message usually ends with -습니다 / -ㅂ니다.',
    km: 'ក្នុងសំណួរ ៥១ សូមធ្វើតាមទម្រង់នៃអត្ថបទ៖ សេចក្តីជូនដំណឹង ឬសារ ជាធម្មតាបញ្ចប់ដោយ -습니다 / -ㅂ니다។'
  },
  {
    en: 'Avoid spoken words: write 그런데 (not 근데), 매우/아주 (not 되게/엄청), 하지만 (not 근데), 이것은 (not 이건).',
    km: 'ជៀសវាងពាក្យនិយាយ៖ សរសេរ 그런데 (មិនមែន 근데), 매우/아주 (មិនមែន 되게/엄청), 이것은 (មិនមែន 이건)។'
  },
  {
    en: 'Every character, space and punctuation mark takes one square. Too short loses points; do not go over the limit.',
    km: 'អក្សរ ចន្លោះ និងសញ្ញាវណ្ណយុត្តិនីមួយៗប្រើមួយប្រអប់។ ខ្លីពេកនឹងខាតពិន្ទុ ហើយកុំសរសេរលើសកំណត់។'
  },
  {
    en: 'Do not write a title, and do not copy the question sentences into your answer.',
    km: 'កុំសរសេរចំណងជើង ហើយកុំចម្លងប្រយោគសំណួរដាក់ក្នុងចម្លើយ។'
  },
  {
    en: 'If time is short, do Q53 and Q54 first. They are worth 80 of the 100 points.',
    km: 'បើពេលវេលាតិច សូមធ្វើសំណួរ ៥៣ និង ៥៤ ជាមុន។ វាមាន ៨០ ពិន្ទុក្នុងចំណោម ១០០។'
  }
];

export const writingSections = [
  {
    id: 'q51-52',
    title: 'Questions 51–52 · Fill the blanks',
    summary: {
      en: 'Each blank is one clause or sentence. Read the sentence before and after the blank: the answer must connect to both.',
      km: 'ចន្លោះនីមួយៗជាឃ្លា ឬប្រយោគមួយ។ អានប្រយោគមុន និងក្រោយចន្លោះ៖ ចម្លើយត្រូវភ្ជាប់ជាមួយទាំងពីរ។'
    },
    steps: [
      { en: 'Find the kind of text (notice, email, explanation) and copy its sentence ending.', km: 'រកប្រភេទអត្ថបទ (សេចក្តីជូនដំណឹង អ៊ីមែល ការពន្យល់) ហើយប្រើចុងប្រយោគដូចគ្នា។' },
      { en: 'Look for a signal word next to the blank: 왜냐하면, 만약, 별로, 항상, 그래서.', km: 'រកពាក្យសញ្ញានៅជិតចន្លោះ៖ 왜냐하면, 만약, 별로, 항상, 그래서។' },
      { en: 'Reuse words from the passage. Do not add new ideas.', km: 'យកពាក្យពីអត្ថបទមកប្រើឡើងវិញ។ កុំបន្ថែមគំនិតថ្មី។' },
      { en: 'Check that the grammar fits what comes right after the blank.', km: 'ពិនិត្យថាវេយ្យាករណ៍ត្រូវនឹងអ្វីដែលនៅខាងក្រោយចន្លោះ។' }
    ],
    expressions: [
      { ko: '왜냐하면 … -기 때문이다', en: 'because … (the reason sentence must end this way)', km: 'ពីព្រោះ … (ប្រយោគមូលហេតុត្រូវបញ្ចប់បែបនេះ)' },
      { ko: '항상/무조건 … -는 것은 아니다', en: 'it is not always the case that …', km: 'មិនមែនជានិច្ចទេដែល …' },
      { ko: '-(으)려면 … -아/어야 하다', en: 'in order to …, you must …', km: 'ដើម្បី … ត្រូវតែ …' },
      { ko: '만약 … -(으)면', en: 'if …', km: 'ប្រសិនបើ …' },
      { ko: '-(으)ㄴ 적이 있다/없다', en: 'have / have never done', km: 'ធ្លាប់ / មិនធ្លាប់ធ្វើ' },
      { ko: '-았/었으면 좋겠습니다', en: 'I hope / I wish …', km: 'ខ្ញុំសង្ឃឹមថា …' },
      { ko: '-다고 합니다 / (이)라고 합니다', en: 'they say that … (reported speech)', km: 'គេនិយាយថា … (ការនិយាយប្រយោល)' },
      { ko: '-지 않도록 주의하다', en: 'be careful not to …', km: 'ប្រុងប្រយ័ត្នកុំឱ្យ …' },
      { ko: '-게 하다 / -도록 하다', en: 'make / let someone do', km: 'ធ្វើឱ្យ / អនុញ្ញាតឱ្យនរណាម្នាក់ធ្វើ' },
      { ko: '어떻게 -아/어야 합니까?', en: 'how should I …?', km: 'តើខ្ញុំគួរ … យ៉ាងដូចម្តេច?' }
    ]
  },
  {
    id: 'q53',
    title: 'Question 53 · Describe the chart (200–300)',
    summary: {
      en: 'Report every number and fact in the chart in order. Do not give your own opinion. Four parts are enough.',
      km: 'រាយការណ៍គ្រប់លេខ និងព័ត៌មានក្នុងតារាងតាមលំដាប់។ កុំបញ្ចេញមតិផ្ទាល់ខ្លួន។ បួនផ្នែកគឺគ្រប់គ្រាន់។'
    },
    steps: [
      { en: '1. Who surveyed what: one sentence.', km: '១. នរណាស្ទង់មតិអំពីអ្វី៖ មួយប្រយោគ។' },
      { en: '2. The main change, with years and numbers.', km: '២. ការផ្លាស់ប្តូរសំខាន់ ជាមួយឆ្នាំ និងលេខ។' },
      { en: '3. The second chart or comparison.', km: '៣. តារាងទីពីរ ឬការប្រៀបធៀប។' },
      { en: '4. Causes, then the forecast if one is given.', km: '៤. មូលហេតុ បន្ទាប់មកការព្យាករណ៍ បើមាន។' }
    ],
    expressions: [
      { ko: '…에서 …에 대해 조사하였다', en: '… surveyed …', km: '… បានស្ទង់មតិអំពី …' },
      { ko: '조사 결과에 따르면 / 그 결과', en: 'according to the results / as a result', km: 'យោងតាមលទ្ធផល / ជាលទ្ធផល' },
      { ko: 'A년 …에서 B년 …(으)로 증가하였다/감소하였다', en: 'rose / fell from … in year A to … in year B', km: 'កើនឡើង / ថយចុះពី … ក្នុងឆ្នាំ A ដល់ … ក្នុងឆ្នាំ B' },
      { ko: '약 2배 증가하였다 / 절반으로 줄었다', en: 'about doubled / fell by half', km: 'កើនប្រហែលពីរដង / ថយចុះពាក់កណ្តាល' },
      { ko: '소폭 / 크게 / 급격하게 / 꾸준히', en: 'slightly / greatly / sharply / steadily', km: 'បន្តិចបន្តួច / យ៉ាងខ្លាំង / យ៉ាងលឿន / ជាបន្តបន្ទាប់' },
      { ko: '…은/는 …인 반면(에) …은/는 …이다', en: '… is …, whereas … is …', km: '… គឺ … ផ្ទុយទៅវិញ … គឺ …' },
      { ko: '…이/가 …%로 가장 높았고 …이/가 그 뒤를 이었다', en: '… was highest at …%, followed by …', km: '… ខ្ពស់បំផុតគឺ …% បន្ទាប់មកគឺ …' },
      { ko: '이러한 변화의 원인은 …기 때문이다', en: 'the cause of this change is that …', km: 'មូលហេតុនៃការផ្លាស់ប្តូរនេះគឺដោយសារ …' },
      { ko: '…(으)ㄴ 것으로 나타났다 / 보인다', en: 'it was found that … / it seems that …', km: 'គេរកឃើញថា … / ហាក់ដូចជា …' },
      { ko: '앞으로 …(으)ㄹ 것으로 전망된다 / 예상된다', en: '… is expected in the future', km: 'គេរំពឹងថានៅពេលអនាគត …' }
    ]
  },
  {
    id: 'q54',
    title: 'Question 54 · Opinion essay (600–700)',
    summary: {
      en: 'Answer all the guiding questions, usually three, in order. One paragraph for each question is a safe plan.',
      km: 'ឆ្លើយគ្រប់សំណួរណែនាំ ជាធម្មតាមានបី តាមលំដាប់។ មួយកថាខណ្ឌសម្រាប់សំណួរនីមួយៗជាផែនការដែលមានសុវត្ថិភាព។'
    },
    steps: [
      { en: 'Paragraph 1 (about 200): introduce the topic in one sentence, then answer question 1.', km: 'កថាខណ្ឌ ១ (ប្រហែល ២០០)៖ ណែនាំប្រធានបទក្នុងមួយប្រយោគ បន្ទាប់មកឆ្លើយសំណួរ ១។' },
      { en: 'Paragraph 2 (about 200): answer question 2 with two reasons or examples.', km: 'កថាខណ្ឌ ២ (ប្រហែល ២០០)៖ ឆ្លើយសំណួរ ២ ជាមួយហេតុផល ឬឧទាហរណ៍ពីរ។' },
      { en: 'Paragraph 3 (about 250): answer question 3, then finish with one closing sentence.', km: 'កថាខណ្ឌ ៣ (ប្រហែល ២៥០)៖ ឆ្លើយសំណួរ ៣ រួចបញ្ចប់ដោយប្រយោគសន្និដ្ឋានមួយ។' },
      { en: 'Spend 3 minutes on a plan first: write two key words for each question.', km: 'ចំណាយ ៣ នាទីធ្វើផែនការជាមុន៖ សរសេរពាក្យគន្លឹះពីរសម្រាប់សំណួរនីមួយៗ។' }
    ],
    expressions: [
      { ko: '최근 …이/가 사회적으로 큰 문제가 되고 있다', en: 'recently … has become a big social problem', km: 'ថ្មីៗនេះ … បានក្លាយជាបញ្ហាសង្គមធំ' },
      { ko: '…이/가 중요한 이유는 …기 때문이다', en: 'the reason … is important is that …', km: 'មូលហេតុដែល … សំខាន់គឺដោយសារ …' },
      { ko: '우선 / 먼저 … 또한 / 그리고 … 마지막으로', en: 'first … also … finally', km: 'ដំបូង … ម្យ៉ាងទៀត … ចុងក្រោយ' },
      { ko: '첫째, … 둘째, … 셋째, …', en: 'first, … second, … third, …', km: 'ទីមួយ … ទីពីរ … ទីបី …' },
      { ko: '예를 들어 / 예를 들면', en: 'for example', km: 'ឧទាហរណ៍' },
      { ko: '그러나 / 반면에 / 한편', en: 'however / on the other hand / meanwhile', km: 'ប៉ុន្តែ / ផ្ទុយទៅវិញ / ម្យ៉ាងវិញទៀត' },
      { ko: '게다가 / 나아가 / 아울러', en: 'moreover / furthermore / in addition', km: 'លើសពីនេះ / បន្ថែមលើនេះ' },
      { ko: '그 결과 / 이로 인해', en: 'as a result / because of this', km: 'ជាលទ្ធផល / ដោយសារហេតុនេះ' },
      { ko: '…(으)ㄹ 수 있다 / …기 쉽다', en: 'can … / is likely to …', km: 'អាច … / ងាយនឹង …' },
      { ko: '…는 경향이 있다', en: 'tend to …', km: 'មាននិន្នាការ …' },
      { ko: '이러한 문제를 해결하기 위해서는 …아/어야 한다', en: 'to solve this problem, we must …', km: 'ដើម្បីដោះស្រាយបញ្ហានេះ យើងត្រូវ …' },
      { ko: '…(으)ㄹ 필요가 있다', en: 'it is necessary to …', km: 'ចាំបាច់ត្រូវ …' },
      { ko: '나는 …에 찬성한다 / 반대한다', en: 'I agree / disagree with …', km: 'ខ្ញុំយល់ស្រប / មិនយល់ស្របនឹង …' },
      { ko: '따라서 / 그러므로', en: 'therefore', km: 'ដូច្នេះ' },
      { ko: '…(으)ㄹ 때 비로소 …(으)ㄹ 수 있을 것이다', en: 'only when … will we be able to …', km: 'លុះត្រាតែ … ទើបយើងអាច …' }
    ]
  }
];

// Sentence-by-sentence form for question 53. `when` says which chart data must
// exist for the step to be shown; `frame` is the sentence with gaps to fill.
export const q53Form = [
  {
    id: 'intro',
    label: '도입',
    en: 'Introduction: who surveyed what. Take the topic from the question line.',
    km: 'សេចក្តីផ្តើម៖ អ្នកណាស្ទង់មតិអំពីអ្វី។ យកប្រធានបទពីបន្ទាត់សំណួរ។',
    frame: '___에서 ___에 대해 조사하였다.',
    frameNoSource: '최근 ___에 큰 변화가 나타났다.'
  },
  {
    id: 'total',
    label: '전체 변화',
    en: 'Overall change: both years, both numbers, and how many times it grew or fell.',
    km: 'ការផ្លាស់ប្តូររួម៖ ឆ្នាំទាំងពីរ លេខទាំងពីរ និងកើនឬថយប៉ុន្មានដង។',
    frame: '조사 결과에 따르면 ___은/는 ___년 ___에서 ___년 ___(으)로 약 ___배 증가하였다/감소하였다.'
  },
  {
    id: 'detail',
    when: 'detail',
    label: '세부 비교',
    en: 'Details: compare the groups in the second chart and say which changed most.',
    km: 'លម្អិត៖ ប្រៀបធៀបក្រុមក្នុងក្រាហ្វទីពីរ ហើយប្រាប់ថាក្រុមណាប្រែប្រួលខ្លាំងជាងគេ។',
    frame: '___별로 살펴보면 ___은/는 ___ 데 비해 ___은/는 ___ 가장 큰 변화를 보였다.'
  },
  {
    id: 'cause',
    when: 'causes',
    label: '원인',
    en: 'Causes: turn each cause note into a full sentence ending in -기 때문이다.',
    km: 'មូលហេតុ៖ ប្តូរចំណាំមូលហេតុនីមួយៗទៅជាប្រយោគពេញដែលបញ្ចប់ដោយ -기 때문이다។',
    frame: '이러한 변화의 원인은 ___기 때문이다. 또한 ___ 것도 원인으로 보인다.'
  },
  {
    id: 'outlook',
    when: 'outlook',
    label: '전망 · 해결',
    en: 'Outlook or solution: finish with the forecast, plan or solution from the chart. No opinion of your own.',
    km: 'ទស្សនវិស័យ ឬដំណោះស្រាយ៖ បញ្ចប់ដោយការព្យាករណ៍ ផែនការ ឬដំណោះស្រាយពីក្រាហ្វ។ កុំសរសេរមតិផ្ទាល់ខ្លួន។',
    frame: '앞으로 ___(으)ㄹ 것으로 전망된다. / 이러한 문제를 해결하기 위해서는 ___아/어야 한다.'
  }
];
