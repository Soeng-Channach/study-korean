const grammarLessonData = [
  {
    id: 'grammar-001',
    level: 'TOPIK II',
    category: 'Cause and Effect',
    pattern: '-느라고',
    meaning: 'because of doing something',
    explanation:
      'Used when an action takes time or effort and causes a negative or unintended result. The subject of both clauses is usually the same.',
    examples: [
      {
        korean: '공부하느라고 전화를 못 받았어요.',
        english: 'I could not answer the phone because I was studying.'
      },
      {
        korean: '일하느라고 점심을 못 먹었어요.',
        english: 'I could not eat lunch because I was working.'
      }
    ],
    similarPatterns: ['-아서/어서', '-기 때문에'],
    tags: ['intermediate', 'cause', 'negative-result']
  },
  {
    id: 'grammar-002',
    level: 'TOPIK II',
    category: 'Contrast',
    pattern: '-기는 하지만',
    meaning: 'although it is true that',
    explanation:
      'Used to acknowledge one fact before presenting a contrasting or more important idea.',
    examples: [
      {
        korean: '이 책이 어렵기는 하지만 도움이 많이 돼요.',
        english: 'This book is difficult, but it helps a lot.'
      }
    ],
    similarPatterns: ['-지만', '-더라도'],
    tags: ['contrast', 'concession']
  },
  {
    id: 'grammar-003',
    level: 'TOPIK II',
    category: 'Intention',
    pattern: '-고자',
    meaning: 'in order to',
    explanation:
      'Formal expression used to state intention or purpose, often in presentations, essays, and announcements.',
    examples: [
      {
        korean: '한국 문화를 배우고자 한국어를 공부합니다.',
        english: 'I study Korean in order to learn Korean culture.'
      }
    ],
    similarPatterns: ['-기 위해서', '-려고'],
    tags: ['formal', 'purpose']
  },
  {
    id: 'grammar-004',
    level: 'TOPIK II',
    category: 'Assumption',
    pattern: '-(으)ㄴ/는/(으)ㄹ 셈이다',
    meaning: 'to be practically the case; to intend to',
    explanation:
      'Used to interpret a situation as almost equivalent to another result, or to express an intention depending on tense and context.',
    examples: [
      {
        korean: '매일 두 시간씩 공부했으니 많이 연습한 셈이에요.',
        english: 'Since I studied two hours every day, I practically practiced a lot.'
      },
      {
        korean: '이번 주말에는 집에서 쉴 셈이에요.',
        english: 'I intend to rest at home this weekend.'
      }
    ],
    similarPatterns: ['-와/과 같다', '-다고 볼 수 있다', '-려고 하다'],
    tags: ['interpretation', 'intention', 'essay']
  },
  {
    id: 'grammar-005',
    level: 'TOPIK II',
    category: 'State',
    pattern: '-(으)ㄴ 채(로)',
    meaning: 'while remaining in a certain state',
    explanation:
      'Used when an action happens while the previous state continues unchanged.',
    examples: [
      {
        korean: '창문을 열어 놓은 채로 잠이 들었어요.',
        english: 'I fell asleep with the window left open.'
      }
    ],
    similarPatterns: ['-아/어 놓고', '-는 상태로'],
    tags: ['state', 'continuation']
  },
  {
    id: 'grammar-006',
    level: 'TOPIK II',
    category: 'Inference',
    pattern: '-(으)ㄴ/는 걸 보니(까)',
    meaning: 'seeing that; judging from',
    explanation:
      'Used to make a guess or judgment based on visible evidence.',
    examples: [
      {
        korean: '사람들이 우산을 쓰는 걸 보니까 비가 오나 봐요.',
        english: 'Seeing people using umbrellas, it looks like it is raining.'
      }
    ],
    similarPatterns: ['-(으)ㄴ/는 것을 보니', '-나 보다'],
    tags: ['inference', 'evidence']
  },
  {
    id: 'grammar-007',
    level: 'TOPIK II',
    category: 'Opportunity',
    pattern: '-(으)ㄴ/는 김에',
    meaning: 'while one is already doing something',
    explanation:
      'Used when taking advantage of an occasion to do an additional related action.',
    examples: [
      {
        korean: '시장에 가는 김에 과일도 좀 사 올게요.',
        english: 'Since I am going to the market, I will buy some fruit too.'
      }
    ],
    similarPatterns: ['-는 길에', '-는 동안에'],
    tags: ['opportunity', 'sequence']
  },
  {
    id: 'grammar-008',
    level: 'TOPIK II',
    category: 'Degree',
    pattern: '-(으)ㄴ/는 만큼',
    meaning: 'as much as; to the extent that',
    explanation:
      'Used to show that the result corresponds to the degree, amount, or fact in the first clause.',
    examples: [
      {
        korean: '열심히 공부한 만큼 좋은 결과가 있을 거예요.',
        english: 'You will get good results as much as you studied hard.'
      }
    ],
    similarPatterns: ['-는 정도로', '-기 때문에'],
    tags: ['degree', 'result']
  },
  {
    id: 'grammar-009',
    level: 'TOPIK II',
    category: 'Contrast',
    pattern: '-(으)ㄴ/는 반면(에)',
    meaning: 'whereas; on the other hand',
    explanation:
      'Used to contrast two different facts, characteristics, or situations.',
    examples: [
      {
        korean: '온라인 수업은 편리한 반면에 집중하기 어려울 수 있어요.',
        english: 'Online classes are convenient, whereas they can be hard to focus on.'
      }
    ],
    similarPatterns: ['-지만', '-는 대신에'],
    tags: ['contrast', 'comparison']
  },
  {
    id: 'grammar-010',
    level: 'TOPIK II',
    category: 'General Truth',
    pattern: '-(으)ㄴ/는 법이다',
    meaning: 'it is natural/expected that',
    explanation:
      'Used to state a general truth, common tendency, or natural result.',
    examples: [
      {
        korean: '처음에는 누구나 실수하는 법이에요.',
        english: 'Everyone naturally makes mistakes at first.'
      }
    ],
    similarPatterns: ['-기 마련이다', '-게 되어 있다'],
    tags: ['generalization', 'truth']
  },
  {
    id: 'grammar-011',
    level: 'TOPIK II',
    category: 'Cause and Effect',
    pattern: '-(으)ㄴ/는 탓에',
    meaning: 'because of; due to',
    explanation:
      'Used to give a negative cause or blame for an undesirable result.',
    examples: [
      {
        korean: '준비가 부족한 탓에 시험을 잘 못 봤어요.',
        english: 'I did poorly on the test because I was not prepared enough.'
      }
    ],
    similarPatterns: ['-기 때문에', '-는 바람에'],
    tags: ['cause', 'negative-result']
  },
  {
    id: 'grammar-012',
    level: 'TOPIK II',
    category: 'Inference',
    pattern: '-(으)ㄴ/는/(으)ㄹ 모양이다',
    meaning: 'it seems; it looks like',
    explanation:
      'Used to infer something based on signs, circumstances, or indirect evidence.',
    examples: [
      {
        korean: '불이 꺼진 걸 보니 아무도 없는 모양이에요.',
        english: 'Seeing the lights off, it seems nobody is there.'
      }
    ],
    similarPatterns: ['-나 보다', '-(으)ㄴ/는 것 같다'],
    tags: ['inference', 'evidence']
  },
  {
    id: 'grammar-013',
    level: 'TOPIK II',
    category: 'Discovery',
    pattern: '-(으)ㄴ/는/(으)ㄹ 줄 몰랐다',
    meaning: 'did not know that; did not know how to',
    explanation:
      'Used when the speaker did not know a fact, expectation, or ability.',
    examples: [
      {
        korean: '그 사람이 그렇게 유명한 줄 몰랐어요.',
        english: 'I did not know that person was so famous.'
      }
    ],
    similarPatterns: ['-는지 몰랐다', '-을 수 있는지 몰랐다'],
    tags: ['realization', 'knowledge']
  },
  {
    id: 'grammar-014',
    level: 'TOPIK II',
    category: 'Discovery',
    pattern: '-(으)ㄴ/는/(으)ㄹ 줄 알았다',
    meaning: 'thought that; knew how to',
    explanation:
      'Used when the speaker thought something was true, or knew how to do something depending on context.',
    examples: [
      {
        korean: '오늘 회의가 없는 줄 알았어요.',
        english: 'I thought there was no meeting today.'
      }
    ],
    similarPatterns: ['-다고 생각했다', '-을 수 있다'],
    tags: ['assumption', 'knowledge']
  },
  {
    id: 'grammar-015',
    level: 'TOPIK II',
    category: 'Uncertainty',
    pattern: '-(으)ㄴ/는/(으)ㄹ지',
    meaning: 'whether; if',
    explanation:
      'Used to express uncertainty or an embedded question inside a larger sentence.',
    examples: [
      {
        korean: '내일 비가 올지 모르겠어요.',
        english: 'I do not know whether it will rain tomorrow.'
      }
    ],
    similarPatterns: ['-는지', '-을지 모르다'],
    tags: ['uncertainty', 'embedded-question']
  },
  {
    id: 'grammar-016',
    level: 'TOPIK II',
    category: 'Soft Response',
    pattern: '-(으)ㄴ/는걸(요)',
    meaning: 'you know; actually',
    explanation:
      'Used in conversation to softly correct, explain, or give a reason the listener may not know.',
    examples: [
      {
        korean: '저는 이미 숙제를 다 했는걸요.',
        english: 'Actually, I already finished all the homework.'
      }
    ],
    similarPatterns: ['-(으)ㄴ/는데요', '-거든요'],
    tags: ['spoken', 'response']
  },
  {
    id: 'grammar-017',
    level: 'TOPIK II',
    category: 'Background',
    pattern: '-(으)ㄴ/는데(요)',
    meaning: 'background; contrast; soft ending',
    explanation:
      'Used to provide background information, introduce contrast, or soften a statement or question.',
    examples: [
      {
        korean: '시간이 없는데 내일 다시 이야기할까요?',
        english: 'I do not have time, so shall we talk again tomorrow?'
      }
    ],
    similarPatterns: ['-지만', '-거든요'],
    tags: ['background', 'spoken']
  },
  {
    id: 'grammar-018',
    level: 'TOPIK II',
    category: 'Concession',
    pattern: '-(으)ㄴ/는들',
    meaning: 'even if',
    explanation:
      'Used rhetorically to say that even if the first condition is true, it will not change the result.',
    examples: [
      {
        korean: '지금 후회한들 무슨 소용이 있겠어요?',
        english: 'Even if you regret it now, what use would it be?'
      }
    ],
    similarPatterns: ['-아/어도', '-더라도'],
    tags: ['concession', 'rhetorical']
  },
  {
    id: 'grammar-019',
    level: 'TOPIK II',
    category: 'Inference',
    pattern: '-(으)ㄴ가 보다',
    meaning: 'it seems; I guess',
    explanation:
      'Used to make a guess about adjectives or descriptive verbs based on evidence.',
    examples: [
      {
        korean: '표정이 밝은 걸 보니 기분이 좋은가 봐요.',
        english: 'Seeing the bright expression, I guess they are in a good mood.'
      }
    ],
    similarPatterns: ['-나 보다', '-(으)ㄴ 모양이다'],
    tags: ['inference', 'evidence']
  },
  {
    id: 'grammar-020',
    level: 'TOPIK II',
    category: 'Question',
    pattern: '-(으)ㄴ가(요)?',
    meaning: 'is it; are you wondering',
    explanation:
      'A polite question ending often used with adjectives or descriptive verbs.',
    examples: [
      {
        korean: '이 길이 학교까지 가까운가요?',
        english: 'Is this road close to the school?'
      }
    ],
    similarPatterns: ['-나요?', '-습니까?'],
    tags: ['question', 'polite']
  },
  {
    id: 'grammar-021',
    level: 'TOPIK II',
    category: 'Futility',
    pattern: '-(으)나 마나',
    meaning: 'whether one does it or not, it is the same',
    explanation:
      'Used when an action is pointless because the result is obvious or will not change.',
    examples: [
      {
        korean: '지금 출발하나 마나 약속 시간에 늦을 거예요.',
        english: 'Whether we leave now or not, we will be late for the appointment.'
      }
    ],
    similarPatterns: ['-아/어 봤자', '-더라도'],
    tags: ['futility', 'result']
  },
  {
    id: 'grammar-022',
    level: 'TOPIK II',
    category: 'Reason',
    pattern: '-(으)니까(요)',
    meaning: 'because; since',
    explanation:
      'Used to give a reason or answer in a conversational way, often with emphasis.',
    examples: [
      {
        korean: '오늘은 시간이 없으니까요.',
        english: 'Because I do not have time today.'
      }
    ],
    similarPatterns: ['-아서/어서', '-기 때문에'],
    tags: ['reason', 'spoken']
  },
  {
    id: 'grammar-023',
    level: 'TOPIK II',
    category: 'Reason',
    pattern: '-(으)니만큼',
    meaning: 'since; given that',
    explanation:
      'Used to say that because the first fact is true, the following result or expectation is natural.',
    examples: [
      {
        korean: '중요한 시험이니만큼 철저히 준비해야 해요.',
        english: 'Since it is an important exam, we must prepare thoroughly.'
      }
    ],
    similarPatterns: ['-(으)ㄴ/는 만큼', '-기 때문에'],
    tags: ['reason', 'expectation']
  },
  {
    id: 'grammar-024',
    level: 'TOPIK II',
    category: 'Dual Purpose',
    pattern: '-(으)ㄹ 겸 (해서)',
    meaning: 'while also; for the dual purpose of',
    explanation:
      'Used when one action has two purposes or when doing something while also accomplishing another goal.',
    examples: [
      {
        korean: '운동도 할 겸 해서 집까지 걸어갔어요.',
        english: 'I walked home to exercise as well.'
      }
    ],
    similarPatterns: ['-는 김에', '-기 위해서'],
    tags: ['purpose', 'combination']
  },
  {
    id: 'grammar-025',
    level: 'TOPIK II',
    category: 'Impossibility',
    pattern: '-(으)ㄹ 리가 없다',
    meaning: 'there is no way that',
    explanation:
      'Used to strongly deny the possibility of something based on reasoning.',
    examples: [
      {
        korean: '그렇게 성실한 사람이 약속을 잊을 리가 없어요.',
        english: 'There is no way such a diligent person would forget the appointment.'
      }
    ],
    similarPatterns: ['-을 수 없다', '-지 않을 것이다'],
    tags: ['impossibility', 'certainty']
  },
  {
    id: 'grammar-026',
    level: 'TOPIK II',
    category: 'Worth',
    pattern: '-(으)ㄹ 만하다',
    meaning: 'worth doing; bearable',
    explanation:
      'Used to say something is worth doing or is acceptable enough.',
    examples: [
      {
        korean: '이 영화는 한 번 볼 만해요.',
        english: 'This movie is worth watching once.'
      }
    ],
    similarPatterns: ['-을 가치가 있다', '-아/어도 괜찮다'],
    tags: ['evaluation', 'worth']
  },
  {
    id: 'grammar-027',
    level: 'TOPIK II',
    category: 'Near Miss',
    pattern: '-(으)ㄹ 뻔하다',
    meaning: 'almost did',
    explanation:
      'Used when something nearly happened but ultimately did not happen.',
    examples: [
      {
        korean: '버스를 놓칠 뻔했어요.',
        english: 'I almost missed the bus.'
      }
    ],
    similarPatterns: ['거의 -았다/었다', '-기 직전이었다'],
    tags: ['near-miss', 'past']
  },
  {
    id: 'grammar-028',
    level: 'TOPIK II',
    category: 'Addition',
    pattern: '-(으)ㄹ 뿐만 아니라',
    meaning: 'not only but also',
    explanation:
      'Used to add another fact to the first one, often in formal writing.',
    examples: [
      {
        korean: '그 사람은 친절할 뿐만 아니라 책임감도 강해요.',
        english: 'That person is not only kind but also responsible.'
      }
    ],
    similarPatterns: ['-고 또한', '-뿐 아니라'],
    tags: ['addition', 'formal']
  },
  {
    id: 'grammar-029',
    level: 'TOPIK II',
    category: 'Limitation',
    pattern: '-(으)ㄹ 뿐이다',
    meaning: 'only; merely',
    explanation:
      'Used to emphasize that there is nothing more than the stated fact or action.',
    examples: [
      {
        korean: '저는 제 의견을 말했을 뿐이에요.',
        english: 'I only stated my opinion.'
      }
    ],
    similarPatterns: ['-기만 하다', '-에 불과하다'],
    tags: ['limitation', 'emphasis']
  },
  {
    id: 'grammar-030',
    level: 'TOPIK II',
    category: 'Inevitability',
    pattern: '-(으)ㄹ 수밖에 (없다)',
    meaning: 'cannot help but',
    explanation:
      'Used when there is no other choice because of circumstances.',
    examples: [
      {
        korean: '비가 너무 많이 와서 약속을 취소할 수밖에 없었어요.',
        english: 'It rained so much that I had no choice but to cancel the appointment.'
      }
    ],
    similarPatterns: ['-지 않을 수 없다', '-아/어야 하다'],
    tags: ['inevitability', 'necessity']
  },
  {
    id: 'grammar-031',
    level: 'TOPIK II',
    category: 'Degree',
    pattern: '-(으)ㄹ 정도(로)',
    meaning: 'to the extent that',
    explanation:
      'Used to describe the degree or extent of a state or action.',
    examples: [
      {
        korean: '눈물이 날 정도로 감동적이었어요.',
        english: 'It was so moving that I almost cried.'
      }
    ],
    similarPatterns: ['-만큼', '-도록'],
    tags: ['degree', 'extent']
  },
  {
    id: 'grammar-032',
    level: 'TOPIK II',
    category: 'Extreme Situation',
    pattern: '-(으)ㄹ 지경이다',
    meaning: 'to the point of',
    explanation:
      'Used to show that a situation has reached an extreme or serious point.',
    examples: [
      {
        korean: '너무 바빠서 밥 먹을 시간도 없을 지경이에요.',
        english: 'I am so busy that I am at the point of not even having time to eat.'
      }
    ],
    similarPatterns: ['-을 정도이다', '-기 직전이다'],
    tags: ['degree', 'extreme']
  },
  {
    id: 'grammar-033',
    level: 'TOPIK II',
    category: 'Reason and Plan',
    pattern: '-(으)ㄹ 테니(까)',
    meaning: 'because I will; since it will probably',
    explanation:
      'Used to state the speaker’s intention or assumption as a reason for a following request, command, or suggestion.',
    examples: [
      {
        korean: '제가 자료를 준비할 테니까 발표를 맡아 주세요.',
        english: 'I will prepare the materials, so please handle the presentation.'
      }
    ],
    similarPatterns: ['-(으)니까', '-(으)ㄹ 거니까'],
    tags: ['intention', 'reason']
  },
  {
    id: 'grammar-034',
    level: 'TOPIK II',
    category: 'Expectation',
    pattern: '-(으)ㄹ 텐데',
    meaning: 'would; must be, but',
    explanation:
      'Used to express an expectation, assumption, or concern as background for the next idea.',
    examples: [
      {
        korean: '길이 막힐 텐데 일찍 출발합시다.',
        english: 'The roads will probably be crowded, so let us leave early.'
      }
    ],
    similarPatterns: ['-(으)ㄹ 것 같은데', '-(으)ㄹ 테니까'],
    tags: ['assumption', 'background']
  },
  {
    id: 'grammar-035',
    level: 'TOPIK II',
    category: 'Regret',
    pattern: '-(으)ㄹ걸 (그랬다)',
    meaning: 'should have',
    explanation:
      'Used to express regret about not doing something in the past.',
    examples: [
      {
        korean: '어제 미리 공부할걸 그랬어요.',
        english: 'I should have studied in advance yesterday.'
      }
    ],
    similarPatterns: ['-았/었어야 했다', '-지 말걸 그랬다'],
    tags: ['regret', 'past']
  },
  {
    id: 'grammar-036',
    level: 'TOPIK II',
    category: 'Hesitation',
    pattern: '-(으)ㄹ까 말까',
    meaning: 'whether to do or not',
    explanation:
      'Used when hesitating or debating whether to do an action.',
    examples: [
      {
        korean: '여행을 갈까 말까 고민하고 있어요.',
        english: 'I am debating whether to travel or not.'
      }
    ],
    similarPatterns: ['-을지 말지', '-을까 하다'],
    tags: ['hesitation', 'choice']
  },
  {
    id: 'grammar-037',
    level: 'TOPIK II',
    category: 'Gradual Change',
    pattern: '-(으)ㄹ수록',
    meaning: 'the more... the more...',
    explanation:
      'Used to show that one degree increases or changes together with another.',
    examples: [
      {
        korean: '한국어는 공부할수록 더 재미있어요.',
        english: 'The more I study Korean, the more interesting it becomes.'
      }
    ],
    similarPatterns: ['-면 -을수록', '-에 따라'],
    tags: ['degree', 'change']
  },
  {
    id: 'grammar-038',
    level: 'TOPIK II',
    category: 'Uncertainty',
    pattern: '-(으)ㄹ지(도) 모르다',
    meaning: 'might; may',
    explanation:
      'Used to express uncertainty about a possible future or present situation.',
    examples: [
      {
        korean: '내일은 눈이 올지도 몰라요.',
        english: 'It might snow tomorrow.'
      }
    ],
    similarPatterns: ['-(으)ㄹ 수도 있다', '-(으)ㄹ지 모르겠다'],
    tags: ['uncertainty', 'possibility']
  },
  {
    id: 'grammar-039',
    level: 'TOPIK II',
    category: 'Concession',
    pattern: '-(으)ㄹ지라도',
    meaning: 'even if',
    explanation:
      'Formal expression used to say that the result will remain the same even under a certain condition.',
    examples: [
      {
        korean: '힘들지라도 포기하지 않겠습니다.',
        english: 'Even if it is difficult, I will not give up.'
      }
    ],
    similarPatterns: ['-더라도', '-아/어도'],
    tags: ['concession', 'formal']
  },
  {
    id: 'grammar-040',
    level: 'TOPIK II',
    category: 'Quotation',
    pattern: '-(으)라고 하다',
    meaning: 'to tell someone to do',
    explanation:
      'Used to indirectly quote a command, request, or instruction.',
    examples: [
      {
        korean: '선생님께서 숙제를 내일까지 하라고 하셨어요.',
        english: 'The teacher told us to do the homework by tomorrow.'
      }
    ],
    similarPatterns: ['-다고 하다', '-자고 하다'],
    tags: ['quotation', 'command']
  },
  {
    id: 'grammar-041',
    level: 'TOPIK II',
    category: 'Interrupted Intention',
    pattern: '-(으)려다가',
    meaning: 'was going to, but',
    explanation:
      'Used when an intended action changes, stops, or leads to a different action.',
    examples: [
      {
        korean: '밖에 나가려다가 비가 와서 집에 있었어요.',
        english: 'I was going to go out, but it rained, so I stayed home.'
      }
    ],
    similarPatterns: ['-(으)려고 하다가', '-다가'],
    tags: ['intention', 'change']
  },
  {
    id: 'grammar-042',
    level: 'TOPIK II',
    category: 'Timing',
    pattern: '-(으)려던 참이다',
    meaning: 'was just about to',
    explanation:
      'Used when the speaker was just about to do something at that moment.',
    examples: [
      {
        korean: '마침 전화하려던 참이었어요.',
        english: 'I was just about to call you.'
      }
    ],
    similarPatterns: ['-(으)려고 하던 중이다', '-기 직전이다'],
    tags: ['timing', 'intention']
  },
  {
    id: 'grammar-043',
    level: 'TOPIK II',
    category: 'Condition',
    pattern: '-(으)려면',
    meaning: 'if you intend to',
    explanation:
      'Used to state a condition required for achieving an intended action or goal.',
    examples: [
      {
        korean: 'TOPIK II에 합격하려면 꾸준히 공부해야 해요.',
        english: 'If you want to pass TOPIK II, you need to study consistently.'
      }
    ],
    similarPatterns: ['-(으)면', '-기 위해서는'],
    tags: ['condition', 'goal']
  },
  {
    id: 'grammar-044',
    level: 'TOPIK II',
    category: 'Cause and Effect',
    pattern: '-(으)로 인해(서)',
    meaning: 'because of; due to',
    explanation:
      'Formal expression used to present the cause of a result, often in news, essays, and official writing.',
    examples: [
      {
        korean: '폭우로 인해 도로가 통제되었습니다.',
        english: 'The road was closed due to heavy rain.'
      }
    ],
    similarPatterns: ['-때문에', '-(으)로 말미암아'],
    tags: ['cause', 'formal', 'writing']
  },
  {
    id: 'grammar-045',
    level: 'TOPIK II',
    category: 'Role and Qualification',
    pattern: '-(으)로서',
    meaning: 'as; in the capacity of',
    explanation:
      'Used to express a role, status, position, or qualification from which an action or judgment is made.',
    examples: [
      {
        korean: '학생으로서 규칙을 지켜야 합니다.',
        english: 'As a student, you must follow the rules.'
      }
    ],
    similarPatterns: ['-(으)로써', '-의 입장에서'],
    tags: ['role', 'formal']
  },
  {
    id: 'grammar-046',
    level: 'TOPIK II',
    category: 'Connection',
    pattern: '-(으)며',
    meaning: 'and; while',
    explanation:
      'Formal connective ending used to list two facts or show two actions happening together.',
    examples: [
      {
        korean: '그 도시는 깨끗하며 교통도 편리합니다.',
        english: 'That city is clean and the transportation is convenient.'
      }
    ],
    similarPatterns: ['-고', '-면서'],
    tags: ['connection', 'formal']
  },
  {
    id: 'grammar-047',
    level: 'TOPIK II',
    category: 'Requirement',
    pattern: '-(으)면 되다',
    meaning: 'it is enough to; just need to',
    explanation:
      'Used to say that doing a certain action is sufficient to satisfy a condition or solve a problem.',
    examples: [
      {
        korean: '신청서를 작성해서 제출하면 됩니다.',
        english: 'You just need to fill out and submit the application form.'
      }
    ],
    similarPatterns: ['-기만 하면 되다', '-아/어도 괜찮다'],
    tags: ['requirement', 'instruction']
  },
  {
    id: 'grammar-048',
    level: 'TOPIK II',
    category: 'Reason',
    pattern: '-(으)므로',
    meaning: 'because; since',
    explanation:
      'Formal written expression used to present a reason or basis for the following statement.',
    examples: [
      {
        korean: '이 문제는 중요하므로 신중히 결정해야 합니다.',
        english: 'Since this issue is important, we must decide carefully.'
      }
    ],
    similarPatterns: ['-(으)니까', '-기 때문에'],
    tags: ['reason', 'formal', 'writing']
  },
  {
    id: 'grammar-049',
    level: 'TOPIK II',
    category: 'No Exception',
    pattern: '-(이)나 -(이)나 할 것 없이',
    meaning: 'regardless of whether; without distinction',
    explanation:
      'Used to say that something applies equally to all mentioned groups, people, or things.',
    examples: [
      {
        korean: '어른이나 아이나 할 것 없이 모두 그 공연을 즐겼어요.',
        english: 'Adults and children alike enjoyed the performance.'
      }
    ],
    similarPatterns: ['-에 관계없이', '-든지 -든지'],
    tags: ['inclusion', 'no-exception']
  },
  {
    id: 'grammar-050',
    level: 'TOPIK II',
    category: 'Condition',
    pattern: '-거든',
    meaning: 'if; when',
    explanation:
      'Conversational conditional ending often used before giving a request, suggestion, or instruction.',
    examples: [
      {
        korean: '시간이 있거든 저에게 연락해 주세요.',
        english: 'If you have time, please contact me.'
      }
    ],
    similarPatterns: ['-(으)면', '-거든요'],
    tags: ['condition', 'spoken']
  },
  {
    id: 'grammar-051',
    level: 'TOPIK II',
    category: 'Causative',
    pattern: '-게 하다',
    meaning: 'to make/let someone do',
    explanation:
      'Used when the subject causes, allows, or makes another person do an action or become a certain way.',
    examples: [
      {
        korean: '선생님은 학생들이 발표하게 했어요.',
        english: 'The teacher had the students give presentations.'
      }
    ],
    similarPatterns: ['-도록 하다', '사동 표현'],
    tags: ['causative', 'action']
  },
  {
    id: 'grammar-052',
    level: 'TOPIK II',
    category: 'Realization',
    pattern: '-고 나니(까)',
    meaning: 'after doing, I realized/found that',
    explanation:
      'Used when a new feeling, realization, or result appears after completing an action.',
    examples: [
      {
        korean: '직접 해 보고 나니까 생각보다 어렵지 않았어요.',
        english: 'After trying it myself, I found it was not as difficult as I thought.'
      }
    ],
    similarPatterns: ['-고 보니', '-고 나서'],
    tags: ['sequence', 'realization']
  },
  {
    id: 'grammar-053',
    level: 'TOPIK II',
    category: 'Sequence',
    pattern: '-고 나면',
    meaning: 'after doing; once done',
    explanation:
      'Used to describe what happens or should happen after an action is completed.',
    examples: [
      {
        korean: '숙제를 끝내고 나면 산책하러 갈 거예요.',
        english: 'After I finish my homework, I will go for a walk.'
      }
    ],
    similarPatterns: ['-고 나서', '-은 후에'],
    tags: ['sequence', 'condition']
  },
  {
    id: 'grammar-054',
    level: 'TOPIK II',
    category: 'Sequence',
    pattern: '-고 나서',
    meaning: 'after doing',
    explanation:
      'Used to show that the second action occurs after the first action is completed.',
    examples: [
      {
        korean: '수업이 끝나고 나서 도서관에 갔어요.',
        english: 'After class ended, I went to the library.'
      }
    ],
    similarPatterns: ['-은 후에', '-고 나면'],
    tags: ['sequence', 'time']
  },
  {
    id: 'grammar-055',
    level: 'TOPIK II',
    category: 'Agreement',
    pattern: '-고 말고(요)',
    meaning: 'of course; absolutely',
    explanation:
      'Spoken expression used to strongly agree with or confirm what the listener said.',
    examples: [
      {
        korean: '물론 도와드리고 말고요.',
        english: 'Of course I will help you.'
      }
    ],
    similarPatterns: ['물론이다', '-지요'],
    tags: ['spoken', 'agreement']
  },
  {
    id: 'grammar-056',
    level: 'TOPIK II',
    category: 'Completion',
    pattern: '-고 말다',
    meaning: 'to end up doing; finally do',
    explanation:
      'Used when an action eventually happens, often with regret, inevitability, or strong completion.',
    examples: [
      {
        korean: '참으려고 했지만 결국 울고 말았어요.',
        english: 'I tried to hold it in, but I ended up crying.'
      }
    ],
    similarPatterns: ['-아/어 버리다', '결국 -하다'],
    tags: ['completion', 'regret']
  },
  {
    id: 'grammar-057',
    level: 'TOPIK II',
    category: 'Realization',
    pattern: '-고 보면',
    meaning: 'when you do and see; once you consider',
    explanation:
      'Used to say that after experiencing or considering something, one realizes a certain fact.',
    examples: [
      {
        korean: '알고 보면 그 사람도 좋은 점이 많아요.',
        english: 'Once you get to know that person, they have many good qualities.'
      }
    ],
    similarPatterns: ['-고 보니', '-고 나니까'],
    tags: ['realization', 'perspective']
  },
  {
    id: 'grammar-058',
    level: 'TOPIK II',
    category: 'Habit',
    pattern: '-곤 하다',
    meaning: 'used to; often do',
    explanation:
      'Used to describe a repeated habit or action from the past or present.',
    examples: [
      {
        korean: '어릴 때 주말마다 할머니 댁에 가곤 했어요.',
        english: 'When I was young, I used to go to my grandmother’s house every weekend.'
      }
    ],
    similarPatterns: ['-고는 하다', '자주 -하다'],
    tags: ['habit', 'repetition']
  },
  {
    id: 'grammar-059',
    level: 'TOPIK II',
    category: 'Possibility',
    pattern: '-기 쉽다',
    meaning: 'easy to; likely to',
    explanation:
      'Used to say that something is easy to do or likely to happen.',
    examples: [
      {
        korean: '날씨가 건조하면 감기에 걸리기 쉬워요.',
        english: 'When the weather is dry, it is easy to catch a cold.'
      }
    ],
    similarPatterns: ['-을 가능성이 높다', '-기 어렵다'],
    tags: ['possibility', 'difficulty']
  },
  {
    id: 'grammar-060',
    level: 'TOPIK II',
    category: 'Negative Possibility',
    pattern: '-기 십상이다',
    meaning: 'be very likely to; be apt to',
    explanation:
      'Used to say that an undesirable result is very likely to occur.',
    examples: [
      {
        korean: '준비 없이 시작하면 실패하기 십상이에요.',
        english: 'If you start without preparation, you are very likely to fail.'
      }
    ],
    similarPatterns: ['-기 쉽다', '-을 가능성이 높다'],
    tags: ['possibility', 'negative-result']
  },
  {
    id: 'grammar-061',
    level: 'TOPIK II',
    category: 'Difficulty',
    pattern: '-기 어렵다',
    meaning: 'difficult to',
    explanation:
      'Used to say that an action is difficult to do or a situation is hard to achieve.',
    examples: [
      {
        korean: '이 내용은 혼자 이해하기 어려워요.',
        english: 'This content is difficult to understand alone.'
      }
    ],
    similarPatterns: ['-기 힘들다', '-기 쉽다'],
    tags: ['difficulty', 'evaluation']
  },
  {
    id: 'grammar-062',
    level: 'TOPIK II',
    category: 'Purpose',
    pattern: '-기 위해(서)',
    meaning: 'in order to; for the purpose of',
    explanation:
      'Used to express the purpose or goal of an action, common in both speech and writing.',
    examples: [
      {
        korean: '한국 회사에 취직하기 위해서 한국어를 열심히 공부하고 있어요.',
        english: 'I am studying Korean hard in order to get a job at a Korean company.'
      }
    ],
    similarPatterns: ['-(으)려고', '-고자'],
    tags: ['purpose', 'goal']
  },
  {
    id: 'grammar-063',
    level: 'TOPIK II',
    category: 'Natural Tendency',
    pattern: '-기/게 마련이다',
    meaning: 'be bound to; naturally happens',
    explanation:
      'Used to say that something naturally or inevitably happens as a general tendency.',
    examples: [
      {
        korean: '처음 배우는 것은 어렵기 마련이에요.',
        english: 'Things you learn for the first time are bound to be difficult.'
      }
    ],
    similarPatterns: ['-(으)ㄴ/는 법이다', '-게 되어 있다'],
    tags: ['generalization', 'tendency']
  },
  {
    id: 'grammar-064',
    level: 'TOPIK II',
    category: 'Soft Response',
    pattern: '-기는(요)',
    meaning: 'not really; you flatter me; as if',
    explanation:
      'Spoken response used to modestly deny, soften, or disagree with what the listener said.',
    examples: [
      {
        korean: '잘하기는요. 아직 많이 부족해요.',
        english: 'Not really. I still have a long way to go.'
      }
    ],
    similarPatterns: ['-기는 하지만', '-기는커녕'],
    tags: ['spoken', 'response']
  },
  {
    id: 'grammar-065',
    level: 'TOPIK II',
    category: 'Sufficient Condition',
    pattern: '-기만 하면 (되다)',
    meaning: 'as long as one does; only need to',
    explanation:
      'Used to say that one action alone is enough to satisfy a condition or solve a problem.',
    examples: [
      {
        korean: '신분증만 가져오기만 하면 됩니다.',
        english: 'You only need to bring your ID.'
      }
    ],
    similarPatterns: ['-(으)면 되다', '-기만 하다'],
    tags: ['condition', 'requirement']
  },
  {
    id: 'grammar-066',
    level: 'TOPIK II',
    category: 'Evaluation',
    pattern: '-기에(는)',
    meaning: 'for doing; to be suitable for',
    explanation:
      'Used to judge whether something is suitable, enough, easy, difficult, early, or late for a certain action.',
    examples: [
      {
        korean: '이 책은 초보자가 읽기에는 좀 어려워요.',
        english: 'This book is a little difficult for a beginner to read.'
      }
    ],
    similarPatterns: ['-기에는', '-기 어렵다'],
    tags: ['evaluation', 'suitability']
  },
  {
    id: 'grammar-067',
    level: 'TOPIK II',
    category: 'Reason',
    pattern: '-길래',
    meaning: 'because; since I noticed',
    explanation:
      'Used when the speaker gives a reason based on something they saw, heard, or experienced.',
    examples: [
      {
        korean: '밖이 너무 시끄럽길래 창문을 닫았어요.',
        english: 'It was so noisy outside, so I closed the window.'
      }
    ],
    similarPatterns: ['-기에', '-아서/어서'],
    tags: ['reason', 'spoken']
  },
  {
    id: 'grammar-068',
    level: 'TOPIK II',
    category: 'Pretense',
    pattern: '-ㄴ/는 척하다',
    meaning: 'pretend to',
    explanation:
      'Used when someone pretends to do something or pretends to be in a certain state.',
    examples: [
      {
        korean: '모르는 척하지 말고 사실대로 말하세요.',
        english: 'Do not pretend not to know; tell the truth.'
      }
    ],
    similarPatterns: ['-는 체하다', '-는 듯하다'],
    tags: ['pretense', 'behavior']
  },
  {
    id: 'grammar-069',
    level: 'TOPIK II',
    category: 'Plain Style',
    pattern: '-ㄴ/는다',
    meaning: 'plain declarative ending',
    explanation:
      'Plain written or narrative ending used in diaries, reports, books, and quoted statements.',
    examples: [
      {
        korean: '한국어를 매일 공부한다.',
        english: 'I study Korean every day.'
      }
    ],
    similarPatterns: ['-다', '-다고 하다'],
    tags: ['plain-style', 'writing']
  },
  {
    id: 'grammar-070',
    level: 'TOPIK II',
    category: 'Listing Possibilities',
    pattern: '-ㄴ/는다거나',
    meaning: 'or things like; such as saying/doing',
    explanation:
      'Used to list possible actions, statements, or examples without naming every possibility.',
    examples: [
      {
        korean: '친구를 만난다거나 영화를 보면서 쉬어요.',
        english: 'I rest by doing things like meeting friends or watching movies.'
      }
    ],
    similarPatterns: ['-거나', '-든지'],
    tags: ['listing', 'possibility']
  },
  {
    id: 'grammar-071',
    level: 'TOPIK II',
    category: 'Assumption',
    pattern: '-ㄴ/는다고 치다',
    meaning: 'suppose that; assume that',
    explanation:
      'Used to temporarily accept something as true for the sake of discussion or calculation.',
    examples: [
      {
        korean: '하루에 한 시간씩 공부한다고 쳐도 한 달이면 많이 늘 거예요.',
        english: 'Even assuming you study one hour a day, you will improve a lot in a month.'
      }
    ],
    similarPatterns: ['-다고 가정하다', '-는 셈 치다'],
    tags: ['assumption', 'hypothetical']
  },
  {
    id: 'grammar-072',
    level: 'TOPIK II',
    category: 'Quotation',
    pattern: '-ㄴ/는다고 하다',
    meaning: 'to say that',
    explanation:
      'Used to indirectly quote a declarative sentence with an action verb.',
    examples: [
      {
        korean: '민수 씨가 내일 회의에 참석한다고 했어요.',
        english: 'Minsu said he will attend the meeting tomorrow.'
      }
    ],
    similarPatterns: ['-다고 하다', '-(으)라고 하다'],
    tags: ['quotation', 'reported-speech']
  },
  {
    id: 'grammar-073',
    level: 'TOPIK II',
    category: 'Concession',
    pattern: '-ㄴ/는다고 해도',
    meaning: 'even if one says/does; even assuming',
    explanation:
      'Used to say that even if the first statement is true, the result or opinion does not change.',
    examples: [
      {
        korean: '지금 출발한다고 해도 제시간에 도착하기 어려워요.',
        english: 'Even if we leave now, it will be hard to arrive on time.'
      }
    ],
    similarPatterns: ['-더라도', '-아/어도'],
    tags: ['concession', 'hypothetical']
  },
  {
    id: 'grammar-074',
    level: 'TOPIK II',
    category: 'Confirmation',
    pattern: '-ㄴ/는다고(요)',
    meaning: 'did you say that; I said that',
    explanation:
      'Spoken ending used to repeat, confirm, or emphasize a reported statement.',
    examples: [
      {
        korean: '지금 출발한다고요? 너무 늦지 않아요?',
        english: 'You said you are leaving now? Is that not too late?'
      }
    ],
    similarPatterns: ['-다고요?', '-다니까요'],
    tags: ['spoken', 'confirmation']
  },
  {
    id: 'grammar-075',
    level: 'TOPIK II',
    category: 'Surprise',
    pattern: '-ㄴ/는다니',
    meaning: 'I cannot believe that; since you say that',
    explanation:
      'Used to show surprise, disbelief, or reaction to newly heard information.',
    examples: [
      {
        korean: '혼자 이 일을 다 한다니 정말 대단해요.',
        english: 'I cannot believe you are doing all this alone. That is amazing.'
      }
    ],
    similarPatterns: ['-다니', '-다고 하니'],
    tags: ['reaction', 'surprise']
  },
  {
    id: 'grammar-076',
    level: 'TOPIK II',
    category: 'Emphasis',
    pattern: '-ㄴ/는다니까',
    meaning: 'I am telling you that; because they say that',
    explanation:
      'Used to strongly repeat a statement or to use reported information as a reason.',
    examples: [
      {
        korean: '걱정하지 마세요. 제가 꼭 간다니까요.',
        english: 'Do not worry. I am telling you I will definitely go.'
      }
    ],
    similarPatterns: ['-다고요', '-다고 하니까'],
    tags: ['spoken', 'emphasis']
  },
  {
    id: 'grammar-077',
    level: 'TOPIK II',
    category: 'Reported Contrast',
    pattern: '-ㄴ/는다더니',
    meaning: 'they said that, but',
    explanation:
      'Used when something differs from what was previously heard or expected.',
    examples: [
      {
        korean: '일찍 온다더니 아직도 안 왔어요.',
        english: 'They said they would come early, but they still have not arrived.'
      }
    ],
    similarPatterns: ['-다고 하더니', '-더니'],
    tags: ['reported-speech', 'contrast']
  },
  {
    id: 'grammar-078',
    level: 'TOPIK II',
    category: 'Reported Speech',
    pattern: '-ㄴ/는다더라',
    meaning: 'I heard that',
    explanation:
      'Casual expression used to pass along something the speaker heard from someone else.',
    examples: [
      {
        korean: '지수 씨가 다음 달에 이사한다더라.',
        english: 'I heard Jisu is moving next month.'
      }
    ],
    similarPatterns: ['-다고 하더라', '-대요'],
    tags: ['reported-speech', 'casual']
  },
  {
    id: 'grammar-079',
    level: 'TOPIK II',
    category: 'Reported Background',
    pattern: '-ㄴ/는다던데',
    meaning: 'I heard that, and/but',
    explanation:
      'Used to mention heard information as background before asking, suggesting, or contrasting.',
    examples: [
      {
        korean: '오늘 비가 온다던데 우산 가져왔어요?',
        english: 'I heard it will rain today. Did you bring an umbrella?'
      }
    ],
    similarPatterns: ['-다고 하던데', '-다던데'],
    tags: ['reported-speech', 'background']
  },
  {
    id: 'grammar-080',
    level: 'TOPIK II',
    category: 'Condition',
    pattern: '-ㄴ/는다면',
    meaning: 'if; supposing that',
    explanation:
      'Used to present a hypothetical condition or assumption.',
    examples: [
      {
        korean: '시간이 충분히 있다면 다시 한번 확인해 보세요.',
        english: 'If you have enough time, please check it once more.'
      }
    ],
    similarPatterns: ['-(으)면', '-다고 하면'],
    tags: ['condition', 'hypothetical']
  },
  {
    id: 'grammar-081',
    level: 'TOPIK II',
    category: 'Confirmation',
    pattern: '-ㄴ/는다면서(요)?',
    meaning: 'I heard that; is it true that',
    explanation:
      'Used to confirm information the speaker heard from someone else.',
    examples: [
      {
        korean: '이번 주에 새 회사에 출근한다면서요?',
        english: 'I heard you are starting at a new company this week, right?'
      }
    ],
    similarPatterns: ['-다면서요?', '-다고 들었어요'],
    tags: ['reported-speech', 'confirmation']
  },
  {
    id: 'grammar-082',
    level: 'TOPIK II',
    category: 'Inference',
    pattern: '-나 보다',
    meaning: 'it seems; I guess',
    explanation:
      'Used to infer or guess something based on evidence, commonly with action verbs and 있다/없다.',
    examples: [
      {
        korean: '사람들이 밖으로 나가네요. 수업이 끝났나 봐요.',
        english: 'People are going outside. I guess class has ended.'
      }
    ],
    similarPatterns: ['-(으)ㄴ가 보다', '-(으)ㄴ/는 모양이다'],
    tags: ['inference', 'evidence']
  },
  {
    id: 'grammar-083',
    level: 'TOPIK II',
    category: 'Question',
    pattern: '-나(요)?',
    meaning: 'polite question ending',
    explanation:
      'A soft polite question ending often used with action verbs, existence verbs, and sometimes adjectives in spoken Korean.',
    examples: [
      {
        korean: '주말에는 보통 무엇을 하나요?',
        english: 'What do you usually do on weekends?'
      }
    ],
    similarPatterns: ['-(으)ㄴ가요?', '-습니까?'],
    tags: ['question', 'spoken', 'polite']
  },
  {
    id: 'grammar-084',
    level: 'TOPIK II',
    category: 'Quotation',
    pattern: '-냐고 하다',
    meaning: 'to ask whether; to ask what/why/etc.',
    explanation:
      'Used to indirectly quote a question. The exact form changes depending on whether the original predicate is a verb, adjective, or noun.',
    examples: [
      {
        korean: '친구가 지금 어디에 가냐고 물었어요.',
        english: 'My friend asked where I was going now.'
      }
    ],
    similarPatterns: ['-다고 하다', '-(으)라고 하다'],
    tags: ['quotation', 'question', 'reported-speech']
  },
  {
    id: 'grammar-085',
    level: 'TOPIK II',
    category: 'During',
    pattern: '-는 (도)중에',
    meaning: 'in the middle of doing',
    explanation:
      'Used when something happens while an action is in progress.',
    examples: [
      {
        korean: '회의하는 도중에 전화가 왔어요.',
        english: 'A phone call came while I was in the middle of a meeting.'
      }
    ],
    similarPatterns: ['-는 중이다', '-는 사이에'],
    tags: ['time', 'progress']
  },
  {
    id: 'grammar-086',
    level: 'TOPIK II',
    category: 'Opportunity',
    pattern: '-는 길에',
    meaning: 'on the way to/from doing',
    explanation:
      'Used when doing another action while going somewhere or on the way to do something.',
    examples: [
      {
        korean: '집에 가는 길에 빵을 샀어요.',
        english: 'I bought bread on the way home.'
      }
    ],
    similarPatterns: ['-는 김에', '-는 중에'],
    tags: ['time', 'opportunity']
  },
  {
    id: 'grammar-087',
    level: 'TOPIK II',
    category: 'Immediate Sequence',
    pattern: '-는 대로',
    meaning: 'as soon as; just as',
    explanation:
      'Used to say that the second action will happen immediately after the first action, or exactly according to something.',
    examples: [
      {
        korean: '도착하는 대로 연락드리겠습니다.',
        english: 'I will contact you as soon as I arrive.'
      }
    ],
    similarPatterns: ['-자마자', '-는 즉시'],
    tags: ['sequence', 'immediate']
  },
  {
    id: 'grammar-088',
    level: 'TOPIK II',
    category: 'Substitution',
    pattern: '-는 대신(에)',
    meaning: 'instead of; in exchange for',
    explanation:
      'Used to show replacement, compensation, or contrast between two choices.',
    examples: [
      {
        korean: '택시를 타는 대신에 버스를 탔어요.',
        english: 'Instead of taking a taxi, I took the bus.'
      }
    ],
    similarPatterns: ['-지 말고', '-는 반면에'],
    tags: ['substitution', 'contrast']
  },
  {
    id: 'grammar-089',
    level: 'TOPIK II',
    category: 'Positive Cause',
    pattern: '-는 덕분에',
    meaning: 'thanks to',
    explanation:
      'Used to show that a positive result happened because of someone or something.',
    examples: [
      {
        korean: '선생님이 도와주신 덕분에 시험에 합격했어요.',
        english: 'Thanks to the teacher helping me, I passed the exam.'
      }
    ],
    similarPatterns: ['-기 때문에', '-는 탓에'],
    tags: ['cause', 'positive-result']
  },
  {
    id: 'grammar-090',
    level: 'TOPIK II',
    category: 'Negative Cause',
    pattern: '-는 바람에',
    meaning: 'because of; as a result of',
    explanation:
      'Used when an unexpected event causes a negative or unwanted result.',
    examples: [
      {
        korean: '갑자기 비가 오는 바람에 소풍이 취소됐어요.',
        english: 'The picnic was canceled because it suddenly rained.'
      }
    ],
    similarPatterns: ['-는 탓에', '-느라고'],
    tags: ['cause', 'negative-result']
  },
  {
    id: 'grammar-091',
    level: 'TOPIK II',
    category: 'During',
    pattern: '-는 사이에',
    meaning: 'while; during the time that',
    explanation:
      'Used when something happens during the time another action or state continues.',
    examples: [
      {
        korean: '잠깐 쉬는 사이에 손님이 오셨어요.',
        english: 'A guest came while I was taking a short break.'
      }
    ],
    similarPatterns: ['-는 동안에', '-는 중에'],
    tags: ['time', 'simultaneous']
  },
  {
    id: 'grammar-092',
    level: 'TOPIK II',
    category: 'Assumption',
    pattern: '-는 셈 치다',
    meaning: 'to consider it as; to pretend/assume that',
    explanation:
      'Used to mentally treat something as a certain situation, often to accept a loss or simplify an assumption.',
    examples: [
      {
        korean: '이번에는 연습한 셈 치고 다시 도전해 봅시다.',
        english: 'Let us consider this as practice and try again.'
      }
    ],
    similarPatterns: ['-ㄴ/는다고 치다', '-는 셈이다'],
    tags: ['assumption', 'interpretation']
  },
  {
    id: 'grammar-093',
    level: 'TOPIK II',
    category: 'Possibility',
    pattern: '-는 수(가) 있다',
    meaning: 'there is a possibility of; may happen',
    explanation:
      'Used to warn that an undesirable or unexpected thing can happen.',
    examples: [
      {
        korean: '조심하지 않으면 다치는 수가 있어요.',
        english: 'If you are not careful, you may get hurt.'
      }
    ],
    similarPatterns: ['-(으)ㄹ 수 있다', '-(으)ㄹ지도 모르다'],
    tags: ['possibility', 'warning']
  },
  {
    id: 'grammar-094',
    level: 'TOPIK II',
    category: 'Inevitability',
    pattern: '-는 수밖에 (없다)',
    meaning: 'to have no choice but to',
    explanation:
      'Used when circumstances leave no option except the stated action or result.',
    examples: [
      {
        korean: '자료가 부족해서 계획을 바꾸는 수밖에 없었어요.',
        english: 'Because there was not enough data, we had no choice but to change the plan.'
      }
    ],
    similarPatterns: ['-(으)ㄹ 수밖에 없다', '-지 않을 수 없다'],
    tags: ['inevitability', 'necessity']
  },
  {
    id: 'grammar-095',
    level: 'TOPIK II',
    category: 'Progress',
    pattern: '-는 중이다',
    meaning: 'be in the middle of doing',
    explanation:
      'Used to express that an action is currently in progress.',
    examples: [
      {
        korean: '지금 회의하는 중이에요.',
        english: 'I am in a meeting now.'
      }
    ],
    similarPatterns: ['-고 있다', '-는 도중이다'],
    tags: ['progress', 'time']
  },
  {
    id: 'grammar-096',
    level: 'TOPIK II',
    category: 'Negative Cause',
    pattern: '-는 통에',
    meaning: 'because of; due to the chaos of',
    explanation:
      'Used when a disruptive situation causes an inconvenient or negative result.',
    examples: [
      {
        korean: '아이들이 떠드는 통에 집중할 수 없었어요.',
        english: 'Because the children were making noise, I could not concentrate.'
      }
    ],
    similarPatterns: ['-는 바람에', '-는 탓에'],
    tags: ['cause', 'negative-result']
  },
  {
    id: 'grammar-097',
    level: 'TOPIK II',
    category: 'Tendency',
    pattern: '-는 편이다',
    meaning: 'tend to be; rather',
    explanation:
      'Used to describe a general tendency or relatively moderate characteristic.',
    examples: [
      {
        korean: '저는 아침에 일찍 일어나는 편이에요.',
        english: 'I tend to wake up early in the morning.'
      }
    ],
    similarPatterns: ['-는 경향이 있다', '-곤 하다'],
    tags: ['tendency', 'description']
  },
  {
    id: 'grammar-098',
    level: 'TOPIK II',
    category: 'Condition',
    pattern: '-는 한',
    meaning: 'as long as; while',
    explanation:
      'Used to say that a result or condition continues as long as the first situation remains true.',
    examples: [
      {
        korean: '노력하는 한 기회는 있을 거예요.',
        english: 'As long as you keep trying, there will be opportunities.'
      }
    ],
    similarPatterns: ['-(으)면', '-는 동안'],
    tags: ['condition', 'continuation']
  },
  {
    id: 'grammar-099',
    level: 'TOPIK II',
    category: 'Addition and Contrast',
    pattern: '-는 한편',
    meaning: 'while also; on the other hand',
    explanation:
      'Used to add another simultaneous fact or present a contrasting aspect.',
    examples: [
      {
        korean: '그 정책은 경제를 돕는 한편 환경 문제를 일으킬 수 있어요.',
        english: 'That policy may help the economy while also causing environmental problems.'
      }
    ],
    similarPatterns: ['-(으)ㄴ/는 반면에', '-면서도'],
    tags: ['addition', 'contrast']
  },
  {
    id: 'grammar-100',
    level: 'TOPIK II',
    category: 'Strong Negation',
    pattern: '-는/은커녕',
    meaning: 'far from; let alone',
    explanation:
      'Used to strongly deny an expected thing and often introduce an even more basic or opposite fact.',
    examples: [
      {
        korean: '여행은커녕 집에서 쉴 시간도 없어요.',
        english: 'Far from traveling, I do not even have time to rest at home.'
      }
    ],
    similarPatterns: ['-기는커녕', '-은 물론'],
    tags: ['negation', 'emphasis']
  },
  {
    id: 'grammar-101',
    level: 'TOPIK II',
    category: 'Realization',
    pattern: '-는구나',
    meaning: 'I see that; so it is',
    explanation:
      'Used when the speaker newly realizes or notices something, often with a sense of discovery.',
    examples: [
      {
        korean: '한국어 문법이 생각보다 다양하구나.',
        english: 'I see that Korean grammar is more varied than I thought.'
      }
    ],
    similarPatterns: ['-군요', '-네요'],
    tags: ['realization', 'spoken']
  },
  {
    id: 'grammar-102',
    level: 'TOPIK II',
    category: 'Informal Question',
    pattern: '-니/냐?',
    meaning: 'informal question ending',
    explanation:
      'Casual question ending used with close friends, younger people, or in plain-style writing.',
    examples: [
      {
        korean: '너는 주말에 뭐 하니?',
        english: 'What are you doing on the weekend?'
      }
    ],
    similarPatterns: ['-나요?', '-습니까?'],
    tags: ['question', 'informal']
  },
  {
    id: 'grammar-103',
    level: 'TOPIK II',
    category: 'Realization',
    pattern: '-다(가) 보니(까)',
    meaning: 'while doing, I realized/found that',
    explanation:
      'Used when continuous or repeated action leads to a realization, discovery, or result.',
    examples: [
      {
        korean: '매일 듣다 보니까 한국어 발음이 익숙해졌어요.',
        english: 'After listening every day, Korean pronunciation became familiar.'
      }
    ],
    similarPatterns: ['-고 나니(까)', '-고 보니'],
    tags: ['realization', 'process']
  },
  {
    id: 'grammar-104',
    level: 'TOPIK II',
    category: 'Condition Through Experience',
    pattern: '-다(가) 보면',
    meaning: 'if/when one keeps doing',
    explanation:
      'Used to say that if an action continues or repeats, a certain result will naturally occur.',
    examples: [
      {
        korean: '꾸준히 연습하다 보면 실력이 늘 거예요.',
        english: 'If you keep practicing steadily, your skill will improve.'
      }
    ],
    similarPatterns: ['-(으)면', '-다 보니까'],
    tags: ['condition', 'process']
  },
  {
    id: 'grammar-105',
    level: 'TOPIK II',
    category: 'Interruption',
    pattern: '-다가',
    meaning: 'while doing; and then',
    explanation:
      'Used when an action changes to another action, is interrupted, or when something happens during an action.',
    examples: [
      {
        korean: '집에 가다가 친구를 만났어요.',
        english: 'I met a friend while going home.'
      }
    ],
    similarPatterns: ['-는 도중에', '-려다가'],
    tags: ['interruption', 'sequence']
  },
  {
    id: 'grammar-106',
    level: 'TOPIK II',
    category: 'As Known',
    pattern: '-다시피',
    meaning: 'as you know/see; practically',
    explanation:
      'Used to refer to something the listener already knows or can see, or to say something is almost the case.',
    examples: [
      {
        korean: '아시다시피 이번 시험은 매우 중요합니다.',
        english: 'As you know, this exam is very important.'
      }
    ],
    similarPatterns: ['-는 것처럼', '-는 바와 같이'],
    tags: ['reference', 'formal']
  },
  {
    id: 'grammar-107',
    level: 'TOPIK II',
    category: 'According To',
    pattern: '-대로',
    meaning: 'as; according to; just as',
    explanation:
      'Used to say something follows the same way, state, instruction, or content.',
    examples: [
      {
        korean: '선생님이 말씀하신 대로 복습했어요.',
        english: 'I reviewed as the teacher said.'
      }
    ],
    similarPatterns: ['-는 대로', '-처럼'],
    tags: ['manner', 'according-to']
  },
  {
    id: 'grammar-108',
    level: 'TOPIK II',
    category: 'Recollection',
    pattern: '-더군(요)',
    meaning: 'I found/observed that',
    explanation:
      'Used to share something the speaker directly experienced or observed in the past.',
    examples: [
      {
        korean: '그 식당 음식이 정말 맛있더군요.',
        english: 'I found that restaurant’s food really delicious.'
      }
    ],
    similarPatterns: ['-더라고요', '-더라'],
    tags: ['recollection', 'observation']
  },
  {
    id: 'grammar-109',
    level: 'TOPIK II',
    category: 'Recollection and Contrast',
    pattern: '-더니',
    meaning: 'I observed that, and then/but',
    explanation:
      'Used to connect a past observation with a following result, change, or contrast.',
    examples: [
      {
        korean: '아침에는 춥더니 오후에는 따뜻해졌어요.',
        english: 'It was cold in the morning, but it became warm in the afternoon.'
      }
    ],
    similarPatterns: ['-다가', '-았/었더니'],
    tags: ['recollection', 'contrast']
  },
  {
    id: 'grammar-110',
    level: 'TOPIK II',
    category: 'Recollection',
    pattern: '-더라',
    meaning: 'I noticed/remembered that',
    explanation:
      'Casual recollection ending used to tell what the speaker directly saw, felt, or experienced.',
    examples: [
      {
        korean: '어제 가 보니까 사람이 정말 많더라.',
        english: 'When I went yesterday, there were really many people.'
      }
    ],
    similarPatterns: ['-더라고요', '-더군요'],
    tags: ['recollection', 'casual']
  },
  {
    id: 'grammar-111',
    level: 'TOPIK II',
    category: 'Recollection',
    pattern: '-더라고(요)',
    meaning: 'I found/observed that',
    explanation:
      'Polite spoken ending used to report something the speaker personally experienced or noticed.',
    examples: [
      {
        korean: '직접 해 보니까 생각보다 어렵더라고요.',
        english: 'When I tried it myself, I found it harder than I expected.'
      }
    ],
    similarPatterns: ['-더군요', '-더라'],
    tags: ['recollection', 'spoken']
  },
  {
    id: 'grammar-112',
    level: 'TOPIK II',
    category: 'Concession',
    pattern: '-더라도',
    meaning: 'even if; even though',
    explanation:
      'Used to say that the result or decision will not change even if the first situation happens.',
    examples: [
      {
        korean: '시간이 걸리더라도 끝까지 해 보겠습니다.',
        english: 'Even if it takes time, I will try until the end.'
      }
    ],
    similarPatterns: ['-아/어도', '-(으)ㄹ지라도'],
    tags: ['concession', 'condition']
  },
  {
    id: 'grammar-113',
    level: 'TOPIK II',
    category: 'Recollection Modifier',
    pattern: '-던',
    meaning: 'that used to; that I remember',
    explanation:
      'Modifier form used to describe something remembered from the past, often incomplete, repeated, or ongoing then.',
    examples: [
      {
        korean: '어릴 때 자주 가던 공원이 없어졌어요.',
        english: 'The park I used to go to often when I was young disappeared.'
      }
    ],
    similarPatterns: ['-았/었던', '-는'],
    tags: ['recollection', 'modifier']
  },
  {
    id: 'grammar-114',
    level: 'TOPIK II',
    category: 'Recollection Question',
    pattern: '-던가(요)?',
    meaning: 'was it; did I recall correctly',
    explanation:
      'Used when asking based on memory or uncertain recollection.',
    examples: [
      {
        korean: '그 사람이 이름이 민수였던가요?',
        english: 'Was that person’s name Minsu, if I remember correctly?'
      }
    ],
    similarPatterns: ['-았/었나요?', '-던데요'],
    tags: ['question', 'recollection']
  },
  {
    id: 'grammar-115',
    level: 'TOPIK II',
    category: 'Recollection Background',
    pattern: '-던데',
    meaning: 'I noticed that, and/but',
    explanation:
      'Used to present something the speaker observed in the past as background for a question, suggestion, or contrast.',
    examples: [
      {
        korean: '그 영화가 재미있던데 같이 볼래요?',
        english: 'I heard/saw that movie was interesting. Do you want to watch it together?'
      }
    ],
    similarPatterns: ['-더라고요', '-던데요'],
    tags: ['recollection', 'background']
  },
  {
    id: 'grammar-116',
    level: 'TOPIK II',
    category: 'Purpose and Degree',
    pattern: '-도록',
    meaning: 'so that; to the extent that',
    explanation:
      'Used to express purpose, direction, or degree. It often appears with verbs such as 하다, 만들다, 도와주다.',
    examples: [
      {
        korean: '모두가 이해할 수 있도록 천천히 설명해 주세요.',
        english: 'Please explain slowly so that everyone can understand.'
      }
    ],
    similarPatterns: ['-게', '-기 위해서'],
    tags: ['purpose', 'degree']
  },
  {
    id: 'grammar-117',
    level: 'TOPIK II',
    category: 'Choice',
    pattern: '-든지',
    meaning: 'whether; any choice',
    explanation:
      'Used to show that any option is acceptable or that a choice can be made freely.',
    examples: [
      {
        korean: '차를 마시든지 커피를 마시든지 편한 대로 하세요.',
        english: 'Whether you drink tea or coffee, do as you like.'
      }
    ],
    similarPatterns: ['-거나', '-든지 -든지'],
    tags: ['choice', 'option']
  },
  {
    id: 'grammar-118',
    level: 'TOPIK II',
    category: 'Similarity',
    pattern: '-듯이',
    meaning: 'as if; just as',
    explanation:
      'Used to compare one action or state to another, or to show that something is done in a similar way.',
    examples: [
      {
        korean: '아까 말했듯이 오늘 회의는 중요합니다.',
        english: 'As I said earlier, today’s meeting is important.'
      }
    ],
    similarPatterns: ['-처럼', '-는 것처럼'],
    tags: ['comparison', 'manner']
  },
  {
    id: 'grammar-119',
    level: 'TOPIK II',
    category: 'Alternative',
    pattern: '(이)라도',
    meaning: 'even; at least; or something',
    explanation:
      'Used to suggest an imperfect but acceptable alternative, emphasize a minimum option, or make an example feel less specific.',
    examples: [
      {
        korean: '시간이 없으면 커피라도 한잔할까요?',
        english: 'If you do not have time, shall we at least have a cup of coffee?'
      }
    ],
    similarPatterns: ['(이)나', '만이라도'],
    tags: ['alternative', 'minimum']
  },
  {
    id: 'grammar-120',
    level: 'TOPIK II',
    category: 'Comparison',
    pattern: '-만 못하다',
    meaning: 'not as good as',
    explanation:
      'Used to compare two things and say that one is inferior to or not as good as another.',
    examples: [
      {
        korean: '새 식당 음식이 예전 식당만 못해요.',
        english: 'The food at the new restaurant is not as good as the old restaurant.'
      }
    ],
    similarPatterns: ['보다 못하다', '만큼 좋지 않다'],
    tags: ['comparison', 'evaluation']
  },
  {
    id: 'grammar-121',
    level: 'TOPIK II',
    category: 'Appearance',
    pattern: '-아/어 보이다',
    meaning: 'to look; to seem',
    explanation:
      'Used to describe how someone or something appears based on visual impression.',
    examples: [
      {
        korean: '오늘 기분이 좋아 보여요.',
        english: 'You look like you are in a good mood today.'
      }
    ],
    similarPatterns: ['-(으)ㄴ 것 같다', '-아/어 보이다'],
    tags: ['appearance', 'impression']
  },
  {
    id: 'grammar-122',
    level: 'TOPIK II',
    category: 'Inference',
    pattern: '-아/어서 그런지',
    meaning: 'perhaps because; maybe because',
    explanation:
      'Used when the speaker guesses that the first situation is the reason for the following result.',
    examples: [
      {
        korean: '어제 늦게 자서 그런지 오늘 너무 피곤해요.',
        english: 'Maybe because I slept late yesterday, I am very tired today.'
      },
      {
        korean: '비가 와서 그런지 길이 많이 막혀요.',
        english: 'Perhaps because it is raining, the roads are very congested.'
      }
    ],
    similarPatterns: ['-아서/어서', '-기 때문인지'],
    tags: ['inference', 'reason']
  },
  {
    id: 'grammar-123',
    level: 'TOPIK II',
    category: 'Concession',
    pattern: '-아/어도',
    meaning: 'even if; even though',
    explanation:
      'Used to show that the following result remains true regardless of the preceding condition.',
    examples: [
      {
        korean: '바빠도 아침은 꼭 먹어야 해요.',
        english: 'Even if you are busy, you must eat breakfast.'
      },
      {
        korean: '비가 와도 행사는 예정대로 진행됩니다.',
        english: 'Even if it rains, the event will proceed as scheduled.'
      }
    ],
    similarPatterns: ['-더라도', '-(으)ㄹ지라도'],
    tags: ['concession', 'condition']
  },
  {
    id: 'grammar-124',
    level: 'TOPIK II',
    category: 'Command',
    pattern: '-아/어라',
    meaning: 'do; imperative command',
    explanation:
      'A plain imperative ending used in writing, instructions, slogans, or by an older speaker to a younger listener.',
    examples: [
      {
        korean: '문제를 잘 읽고 답을 골라라.',
        english: 'Read the question carefully and choose the answer.'
      },
      {
        korean: '힘들어도 끝까지 포기하지 마라.',
        english: 'Even if it is hard, do not give up until the end.'
      }
    ],
    similarPatterns: ['-(으)세요', '-아/어 주세요'],
    tags: ['command', 'plain-style']
  },
  {
    id: 'grammar-125',
    level: 'TOPIK II',
    category: 'Necessity',
    pattern: '-아/어야',
    meaning: 'only if; must do in order to',
    explanation:
      'Used to state a necessary condition for the following result. It can also appear before 하다 to express obligation.',
    examples: [
      {
        korean: '열심히 공부해야 좋은 결과를 얻을 수 있어요.',
        english: 'Only if you study hard can you get good results.'
      },
      {
        korean: '직접 만나 봐야 그 사람을 이해할 수 있어요.',
        english: 'You can understand that person only if you meet them in person.'
      }
    ],
    similarPatterns: ['-(으)면', '-아/어야 하다'],
    tags: ['necessity', 'condition']
  },
  {
    id: 'grammar-126',
    level: 'TOPIK II',
    category: 'Resolution',
    pattern: '-아/어야지',
    meaning: 'should; I will make sure to',
    explanation:
      'Used to express a resolution, reminder, or mild advice that something should be done.',
    examples: [
      {
        korean: '내일부터는 일찍 일어나야지.',
        english: 'From tomorrow, I should wake up early.'
      },
      {
        korean: '건강을 위해 운동을 꾸준히 해야지요.',
        english: 'For my health, I should exercise regularly.'
      }
    ],
    similarPatterns: ['-아/어야 하다', '-도록 하다'],
    tags: ['resolution', 'advice']
  },
  {
    id: 'grammar-127',
    level: 'TOPIK II',
    category: 'Change',
    pattern: '-아/어지다',
    meaning: 'to become; to get',
    explanation:
      'Used with adjectives to show that a state changes over time.',
    examples: [
      {
        korean: '날씨가 점점 추워지고 있어요.',
        english: 'The weather is gradually getting colder.'
      },
      {
        korean: '한국어 실력이 많이 좋아졌어요.',
        english: 'My Korean ability has improved a lot.'
      }
    ],
    similarPatterns: ['-게 되다', '-아/어 보이다'],
    tags: ['change', 'state']
  },
  {
    id: 'grammar-128',
    level: 'TOPIK II',
    category: 'Hypothesis',
    pattern: '-았/었더라면',
    meaning: 'if only had; if had done',
    explanation:
      'Used to imagine a different past condition and result, often with regret.',
    examples: [
      {
        korean: '조금 더 일찍 출발했더라면 기차를 탔을 거예요.',
        english: 'If I had left a little earlier, I would have caught the train.'
      },
      {
        korean: '그때 포기하지 않았더라면 지금 달라졌을 거예요.',
        english: 'If I had not given up then, things would be different now.'
      }
    ],
    similarPatterns: ['-(으)ㄴ/는다면', '-았/었으면'],
    tags: ['hypothesis', 'regret']
  },
  {
    id: 'grammar-129',
    level: 'TOPIK II',
    category: 'Recollection',
    pattern: '-았/었던 것 같다',
    meaning: 'seems to have been; I think it was',
    explanation:
      'Used to softly recall or guess about a past completed state, event, or experience.',
    examples: [
      {
        korean: '그 영화는 작년에 봤던 것 같아요.',
        english: 'I think I saw that movie last year.'
      },
      {
        korean: '예전에 이 식당에 와 봤던 것 같아요.',
        english: 'I think I have been to this restaurant before.'
      }
    ],
    similarPatterns: ['-(으)ㄴ 것 같다', '-더라고요'],
    tags: ['recollection', 'guess']
  },
  {
    id: 'grammar-130',
    level: 'TOPIK II',
    category: 'Wish',
    pattern: '-았/었으면 하다',
    meaning: 'to hope; to wish',
    explanation:
      'Used to express a wish or hope that a certain situation happens.',
    examples: [
      {
        korean: '이번 시험에 꼭 합격했으면 해요.',
        english: 'I hope I pass this exam.'
      },
      {
        korean: '친구가 빨리 건강해졌으면 합니다.',
        english: 'I hope my friend gets well soon.'
      }
    ],
    similarPatterns: ['-기 바라다', '-았/었으면 좋겠다'],
    tags: ['wish', 'hope']
  },
  {
    id: 'grammar-131',
    level: 'TOPIK II',
    category: 'Emphasis',
    pattern: '(이)야말로',
    meaning: 'indeed; truly; exactly',
    explanation:
      'Used after a noun to strongly emphasize that it is the best or clearest example of something.',
    examples: [
      {
        korean: '노력이야말로 성공의 가장 중요한 조건입니다.',
        english: 'Effort is truly the most important condition for success.'
      },
      {
        korean: '한글이야말로 한국 문화의 소중한 유산입니다.',
        english: 'Hangeul is indeed a precious heritage of Korean culture.'
      }
    ],
    similarPatterns: ['바로', '-이/가 바로'],
    tags: ['emphasis', 'formal']
  },
  {
    id: 'grammar-132',
    level: 'TOPIK II',
    category: 'Topic',
    pattern: '-에 관해(서)',
    meaning: 'about; regarding',
    explanation:
      'Used after a noun to introduce the topic being discussed, researched, written, or asked about.',
    examples: [
      {
        korean: '환경 문제에 관해서 발표를 준비했습니다.',
        english: 'I prepared a presentation about environmental issues.'
      },
      {
        korean: '한국 역사에 관해 더 알고 싶어요.',
        english: 'I want to know more about Korean history.'
      }
    ],
    similarPatterns: ['-에 대해(서)', '-을/를 주제로'],
    tags: ['topic', 'formal']
  },
  {
    id: 'grammar-133',
    level: 'TOPIK II',
    category: 'Topic',
    pattern: '-에 대해(서)',
    meaning: 'about; concerning',
    explanation:
      'Used after a noun to show the subject of speech, thought, study, or opinion.',
    examples: [
      {
        korean: '그 문제에 대해서 어떻게 생각하세요?',
        english: 'What do you think about that problem?'
      },
      {
        korean: '저는 한국 음식에 대해 관심이 많습니다.',
        english: 'I am very interested in Korean food.'
      }
    ],
    similarPatterns: ['-에 관해(서)', '-을/를 두고'],
    tags: ['topic', 'communication']
  },
  {
    id: 'grammar-134',
    level: 'TOPIK II',
    category: 'Basis',
    pattern: '-에 따라(서)',
    meaning: 'according to; depending on',
    explanation:
      'Used to show that something changes or is decided based on a standard, rule, situation, or condition.',
    examples: [
      {
        korean: '계절에 따라 사람들의 옷차림이 달라집니다.',
        english: 'People\'s clothing changes depending on the season.'
      },
      {
        korean: '규칙에 따라서 순서대로 입장해 주세요.',
        english: 'Please enter in order according to the rules.'
      }
    ],
    similarPatterns: ['-에 의하면', '-마다'],
    tags: ['basis', 'condition']
  },
  {
    id: 'grammar-135',
    level: 'TOPIK II',
    category: 'Cause and Agent',
    pattern: '-에 의해(서)',
    meaning: 'by; due to',
    explanation:
      'Used to show the agent, cause, or method behind a result, often in formal or written language.',
    examples: [
      {
        korean: '이 건물은 유명한 건축가에 의해 설계되었습니다.',
        english: 'This building was designed by a famous architect.'
      },
      {
        korean: '기후 변화에 의해 생태계가 영향을 받고 있습니다.',
        english: 'The ecosystem is being affected by climate change.'
      }
    ],
    similarPatterns: ['-으로 인해(서)', '-때문에'],
    tags: ['formal', 'cause']
  },
  {
    id: 'grammar-136',
    level: 'TOPIK II',
    category: 'Addition',
    pattern: '-에다(가)',
    meaning: 'on top of; in addition to',
    explanation:
      'Used to add one thing to another place, amount, or situation.',
    examples: [
      {
        korean: '커피에다가 설탕을 조금 넣었어요.',
        english: 'I added a little sugar to the coffee.'
      },
      {
        korean: '비에다가 바람까지 불어서 날씨가 더 추워졌어요.',
        english: 'On top of the rain, the wind blew too, so the weather became colder.'
      }
    ],
    similarPatterns: ['-에', '-뿐만 아니라'],
    tags: ['addition', 'spoken']
  },
  {
    id: 'grammar-137',
    level: 'TOPIK II',
    category: 'Inclusion',
    pattern: '-을/를 비롯한',
    meaning: 'including; starting with',
    explanation:
      'Used before a noun to include the preceding item as a representative example among a group.',
    examples: [
      {
        korean: '한국을 비롯한 여러 나라가 회의에 참석했습니다.',
        english: 'Several countries, including Korea, attended the meeting.'
      },
      {
        korean: '학생들을 비롯한 많은 시민들이 봉사 활동에 참여했습니다.',
        english: 'Many citizens, including students, participated in volunteer work.'
      }
    ],
    similarPatterns: ['-을/를 포함한', '-뿐만 아니라'],
    tags: ['inclusion', 'formal']
  },
  {
    id: 'grammar-138',
    level: 'TOPIK II',
    category: 'Means',
    pattern: '-을/를 통해(서)',
    meaning: 'through; by means of',
    explanation:
      'Used to show the method, channel, or experience through which something happens or is learned.',
    examples: [
      {
        korean: '뉴스를 통해서 그 소식을 알게 되었습니다.',
        english: 'I came to know the news through the news broadcast.'
      },
      {
        korean: '여행을 통해 다양한 문화를 배웠습니다.',
        english: 'I learned about various cultures through travel.'
      }
    ],
    similarPatterns: ['-(으)로', '-에 의해(서)'],
    tags: ['means', 'experience']
  },
  {
    id: 'grammar-139',
    level: 'TOPIK II',
    category: 'Sequence',
    pattern: '-자',
    meaning: 'as soon as',
    explanation:
      'Used to show that the second action happens immediately after the first action.',
    examples: [
      {
        korean: '집에 도착하자 바로 잠이 들었습니다.',
        english: 'As soon as I arrived home, I fell asleep.'
      },
      {
        korean: '수업이 끝나자 학생들이 교실을 나갔습니다.',
        english: 'As soon as class ended, the students left the classroom.'
      }
    ],
    similarPatterns: ['-자마자', '-는 대로'],
    tags: ['sequence', 'time']
  },
  {
    id: 'grammar-140',
    level: 'TOPIK II',
    category: 'Quoted Speech',
    pattern: '-자고 하다',
    meaning: 'to suggest that; to say let us',
    explanation:
      'Used to report a suggestion, proposal, or invitation that someone made.',
    examples: [
      {
        korean: '친구가 주말에 같이 영화를 보자고 했어요.',
        english: 'My friend suggested that we watch a movie together on the weekend.'
      },
      {
        korean: '선생님께서 수업 후에 다시 이야기하자고 하셨습니다.',
        english: 'The teacher suggested talking again after class.'
      }
    ],
    similarPatterns: ['-자', '-(으)라고 하다'],
    tags: ['quotation', 'suggestion']
  },
  {
    id: 'grammar-141',
    level: 'TOPIK II',
    category: 'Sequence',
    pattern: '-자마자',
    meaning: 'as soon as',
    explanation:
      'Used to show that the second action happens immediately after the first action.',
    examples: [
      {
        korean: '집에 도착하자마자 샤워를 했어요.',
        english: 'As soon as I arrived home, I took a shower.'
      },
      {
        korean: '시험이 끝나자마자 친구에게 전화했습니다.',
        english: 'As soon as the exam ended, I called my friend.'
      }
    ],
    similarPatterns: ['-자', '-는 대로'],
    tags: ['sequence', 'time']
  },
  {
    id: 'grammar-142',
    level: 'TOPIK II',
    category: 'Shared Knowledge',
    pattern: '-잖아(요)',
    meaning: 'you know; as you know',
    explanation:
      'Used to remind the listener of something they already know or to give an obvious reason.',
    examples: [
      {
        korean: '오늘은 일요일이잖아요. 은행이 문을 닫았을 거예요.',
        english: 'You know today is Sunday. The bank is probably closed.'
      },
      {
        korean: '제가 어제 말했잖아요.',
        english: 'I told you yesterday, you know.'
      }
    ],
    similarPatterns: ['-거든요', '-니까'],
    tags: ['spoken', 'reason']
  },
  {
    id: 'grammar-143',
    level: 'TOPIK II',
    category: 'Addition',
    pattern: '마저',
    meaning: 'even; even the last remaining thing',
    explanation:
      'Used to emphasize that even something unexpected or the last remaining item is included, often with a negative feeling.',
    examples: [
      {
        korean: '믿었던 친구마저 나를 도와주지 않았어요.',
        english: 'Even the friend I trusted did not help me.'
      },
      {
        korean: '비가 오는데 바람마저 강하게 불었어요.',
        english: 'It was raining, and even the wind blew strongly.'
      }
    ],
    similarPatterns: ['조차', '까지'],
    tags: ['addition', 'emphasis']
  },
  {
    id: 'grammar-144',
    level: 'TOPIK II',
    category: 'Degree',
    pattern: '만큼',
    meaning: 'as much as; to the extent of',
    explanation:
      'Used after nouns or modifier forms to compare degree, amount, or extent.',
    examples: [
      {
        korean: '노력한 만큼 좋은 결과가 있을 거예요.',
        english: 'There will be good results as much as you have worked hard.'
      },
      {
        korean: '동생도 형만큼 키가 컸어요.',
        english: 'The younger sibling became as tall as the older brother.'
      }
    ],
    similarPatterns: ['-듯이', '-정도로'],
    tags: ['degree', 'comparison']
  },
  {
    id: 'grammar-145',
    level: 'TOPIK II',
    category: 'Free Choice',
    pattern: '아무 -(이)나',
    meaning: 'any; anything; anyone',
    explanation:
      'Used to say that any choice is acceptable or that the specific item does not matter.',
    examples: [
      {
        korean: '시간이 없으니까 아무거나 빨리 먹읍시다.',
        english: 'Since we do not have time, let us quickly eat anything.'
      },
      {
        korean: '이 일은 아무나 할 수 있는 일이 아닙니다.',
        english: 'This is not work that just anyone can do.'
      }
    ],
    similarPatterns: ['-든지', '무엇이든'],
    tags: ['choice', 'indefinite']
  },
  {
    id: 'grammar-146',
    level: 'TOPIK II',
    category: 'Negation',
    pattern: '아무 -도',
    meaning: 'no; not any',
    explanation:
      'Used with a negative expression to mean nobody, nothing, nowhere, or not any.',
    examples: [
      {
        korean: '교실에는 아무도 없었어요.',
        english: 'There was nobody in the classroom.'
      },
      {
        korean: '너무 바빠서 아무것도 먹지 못했습니다.',
        english: 'I was so busy that I could not eat anything.'
      }
    ],
    similarPatterns: ['하나도', '전혀'],
    tags: ['negation', 'indefinite']
  },
  {
    id: 'grammar-147',
    level: 'TOPIK II',
    category: 'Exclamation',
    pattern: '얼마나 -(으)ㄴ/는지',
    meaning: 'how; so much that',
    explanation:
      'Used to emphasize the degree of a state or action, often with surprise or strong feeling.',
    examples: [
      {
        korean: '날씨가 얼마나 추운지 손이 다 얼었어요.',
        english: 'It was so cold that my hands froze.'
      },
      {
        korean: '그 이야기가 얼마나 재미있는지 시간 가는 줄 몰랐어요.',
        english: 'The story was so interesting that I lost track of time.'
      }
    ],
    similarPatterns: ['어찌나 -(으)ㄴ/는지', '-(으)ㄹ 정도로'],
    tags: ['degree', 'emotion']
  },
  {
    id: 'grammar-148',
    level: 'TOPIK II',
    category: 'Addition',
    pattern: '조차',
    meaning: 'even',
    explanation:
      'Used to emphasize that even the most basic, expected, or surprising thing is included, often in negative contexts.',
    examples: [
      {
        korean: '너무 피곤해서 말할 힘조차 없었어요.',
        english: 'I was so tired that I did not even have the strength to speak.'
      },
      {
        korean: '가족조차 그의 결정을 이해하지 못했습니다.',
        english: 'Even his family could not understand his decision.'
      }
    ],
    similarPatterns: ['마저', '까지'],
    tags: ['addition', 'emphasis']
  },
  {
    id: 'grammar-149',
    level: 'TOPIK II',
    category: 'Evaluation',
    pattern: '치고(는)',
    meaning: 'for; considering that',
    explanation:
      'Used after a noun to evaluate something as unusual or noteworthy compared with what is normally expected of that group.',
    examples: [
      {
        korean: '초보자치고는 한국어를 아주 잘해요.',
        english: 'For a beginner, they speak Korean very well.'
      },
      {
        korean: '겨울 날씨치고는 꽤 따뜻합니다.',
        english: 'For winter weather, it is quite warm.'
      }
    ],
    similarPatterns: ['-에 비해(서)', '-답게'],
    tags: ['evaluation', 'comparison']
  },
  {
    "id": "topik-i-grammar-001",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "이/가",
    "meaning": "subject marker",
    "explanation": "Shows the subject of the sentence.",
    "examples": [
      {
        "korean": "날씨가 좋아요.",
        "english": "The weather is good."
      },
      {
        "korean": "책이 재미있어요.",
        "english": "The book is interesting."
      }
    ],
    "similarPatterns": [
      "은/는",
      "께서",
      "이/가 아니다"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-002",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "은/는",
    "meaning": "topic marker",
    "explanation": "Shows the topic you are talking about.",
    "examples": [
      {
        "korean": "선생님은 지금 안 계세요.",
        "english": "The teacher is not here now."
      },
      {
        "korean": "저는 학생이에요.",
        "english": "I am a student."
      }
    ],
    "similarPatterns": [
      "이/가",
      "도"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-003",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "을/를",
    "meaning": "object marker",
    "explanation": "Shows the object of an action.",
    "examples": [
      {
        "korean": "책을 읽어요.",
        "english": "I am reading a book."
      },
      {
        "korean": "영화를 봐요.",
        "english": "I watch a movie."
      }
    ],
    "similarPatterns": [
      "이/가",
      "은/는"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-004",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "와/과",
    "meaning": "and",
    "explanation": "Connects nouns. Use 와 after a vowel and 과 after a consonant.",
    "examples": [
      {
        "korean": "소설책과 교과서를 가져왔어요.",
        "english": "I brought a novel and a textbook."
      },
      {
        "korean": "엄마와 아빠가 오셨어요.",
        "english": "My mom and dad came."
      }
    ],
    "similarPatterns": [
      "(이)랑",
      "하고"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-005",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "(이)랑",
    "meaning": "and",
    "explanation": "Connects nouns in casual speech.",
    "examples": [
      {
        "korean": "설렁탕이랑 김밥 주세요.",
        "english": "Please give me seolleongtang and kimbap."
      },
      {
        "korean": "사과랑 바나나를 샀어요.",
        "english": "I bought apples and bananas."
      }
    ],
    "similarPatterns": [
      "하고",
      "와/과"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-006",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "(이)랑",
    "meaning": "with",
    "explanation": "Means together with someone or something.",
    "examples": [
      {
        "korean": "친구랑 같이 왔어요.",
        "english": "I came with a friend."
      },
      {
        "korean": "동생이랑 영화를 봤어요.",
        "english": "I watched a movie with my younger sibling."
      }
    ],
    "similarPatterns": [
      "하고",
      "와/과"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-007",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "하고",
    "meaning": "and",
    "explanation": "Connects nouns in speech.",
    "examples": [
      {
        "korean": "양념 치킨하고 맥주 주세요.",
        "english": "Please give me yangnyeom chicken and beer."
      },
      {
        "korean": "빵하고 우유를 먹어요.",
        "english": "I eat bread and milk."
      }
    ],
    "similarPatterns": [
      "와/과",
      "(이)랑"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-008",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "도",
    "meaning": "also",
    "explanation": "Adds the meaning also or too.",
    "examples": [
      {
        "korean": "내일도 오늘도 비가 와요.",
        "english": "It is raining today and tomorrow too."
      },
      {
        "korean": "저도 가고 싶어요.",
        "english": "I want to go too."
      }
    ],
    "similarPatterns": [
      "은/는",
      "만"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-009",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "에",
    "meaning": "to",
    "explanation": "Shows a destination, place, or time.",
    "examples": [
      {
        "korean": "남대문 시장에 가고 싶어요.",
        "english": "I want to go to Namdaemun market."
      },
      {
        "korean": "학교에 가요.",
        "english": "I go to school."
      }
    ],
    "similarPatterns": [
      "에서",
      "(으)로"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-010",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "에서",
    "meaning": "from; at",
    "explanation": "Shows where an action happens or starts.",
    "examples": [
      {
        "korean": "공항에서 지하철 타고 왔어요.",
        "english": "I came by subway from the airport."
      },
      {
        "korean": "집에서 쉬어요.",
        "english": "I rest at home."
      }
    ],
    "similarPatterns": [
      "에",
      "부터"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-011",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "까지",
    "meaning": "until; to",
    "explanation": "Shows the end point.",
    "examples": [
      {
        "korean": "강남까지 가고 싶어요.",
        "english": "I want to go to Gangnam."
      },
      {
        "korean": "저녁까지 일했어요.",
        "english": "I worked until evening."
      }
    ],
    "similarPatterns": [
      "부터",
      "에"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-012",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "부터",
    "meaning": "from",
    "explanation": "Shows the start point.",
    "examples": [
      {
        "korean": "지하철은 아침 5시부터 운영해요.",
        "english": "The subway runs from 5 a.m."
      },
      {
        "korean": "오늘부터 운동할 거예요.",
        "english": "I will exercise from today."
      }
    ],
    "similarPatterns": [
      "까지",
      "에서"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-013",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "(으)로",
    "meaning": "to; by; with",
    "explanation": "Shows direction, tool, or method.",
    "examples": [
      {
        "korean": "저는 부산으로 가요.",
        "english": "I am going to Busan."
      },
      {
        "korean": "젓가락으로 먹어요.",
        "english": "I eat with chopsticks."
      }
    ],
    "similarPatterns": [
      "에",
      "에서"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-014",
    "level": "TOPIK I",
    "category": "Honorifics",
    "pattern": "께",
    "meaning": "to (polite)",
    "explanation": "Polite form of 에게.",
    "examples": [
      {
        "korean": "부모님께 드리고 싶어요.",
        "english": "I want to give it to my parents."
      },
      {
        "korean": "선생님께 질문했어요.",
        "english": "I asked the teacher a question."
      }
    ],
    "similarPatterns": [
      "에게",
      "한테"
    ],
    "tags": [
      "topik-i",
      "honorifics"
    ]
  },
  {
    "id": "topik-i-grammar-015",
    "level": "TOPIK I",
    "category": "Honorifics",
    "pattern": "께서",
    "meaning": "subject marker (honorific)",
    "explanation": "Polite subject marker for respected people.",
    "examples": [
      {
        "korean": "할머니께서 부탁하셨어요.",
        "english": "My grandmother asked me."
      },
      {
        "korean": "아버지께서 신문을 읽으세요.",
        "english": "My father reads the newspaper."
      }
    ],
    "similarPatterns": [
      "이/가",
      "께"
    ],
    "tags": [
      "topik-i",
      "honorifics"
    ]
  },
  {
    "id": "topik-i-grammar-016",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "에게",
    "meaning": "to",
    "explanation": "Shows the person receiving something.",
    "examples": [
      {
        "korean": "우리 엄마에게 주고 싶어요.",
        "english": "I want to give it to my mother."
      },
      {
        "korean": "친구에게 편지를 썼어요.",
        "english": "I wrote a letter to my friend."
      }
    ],
    "similarPatterns": [
      "한테",
      "께"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-017",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "에게서",
    "meaning": "from",
    "explanation": "Shows the person something comes from.",
    "examples": [
      {
        "korean": "호텔 직원에게서 받았어요.",
        "english": "I got it from the hotel staff."
      },
      {
        "korean": "친구에게서 연락이 왔어요.",
        "english": "I got a call from my friend."
      }
    ],
    "similarPatterns": [
      "한테서",
      "에게"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-018",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "한테",
    "meaning": "to",
    "explanation": "Casual spoken form of 에게.",
    "examples": [
      {
        "korean": "백화점 안내원한테 물어보세요.",
        "english": "Please ask the department store receptionist."
      },
      {
        "korean": "동생한테 선물을 줬어요.",
        "english": "I gave a present to my younger sibling."
      }
    ],
    "similarPatterns": [
      "에게",
      "께"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-019",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "한테서",
    "meaning": "from",
    "explanation": "Casual spoken form of 에게서.",
    "examples": [
      {
        "korean": "이거는 친구한테서 선물로 받은 거예요.",
        "english": "I got this as a present from my friend."
      },
      {
        "korean": "엄마한테서 용돈을 받았어요.",
        "english": "I got allowance from my mom."
      }
    ],
    "similarPatterns": [
      "에게서",
      "한테"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-020",
    "level": "TOPIK I",
    "category": "Choice",
    "pattern": "(이)나",
    "meaning": "or",
    "explanation": "Shows a choice between nouns.",
    "examples": [
      {
        "korean": "버스나 지하철 타고 갈게요.",
        "english": "I will take a bus or subway."
      },
      {
        "korean": "커피나 차를 마셔요.",
        "english": "I drink coffee or tea."
      }
    ],
    "similarPatterns": [
      "거나",
      "(이)랑"
    ],
    "tags": [
      "topik-i",
      "choice"
    ]
  },
  {
    "id": "topik-i-grammar-021",
    "level": "TOPIK I",
    "category": "Choice",
    "pattern": "(이)나",
    "meaning": "rather",
    "explanation": "Shows a casual choice when something is not special.",
    "examples": [
      {
        "korean": "밥이나 먹으러 가고 싶어요.",
        "english": "I just want to go eat."
      },
      {
        "korean": "심심한데 영화나 볼까요?",
        "english": "I'm bored, shall we just watch a movie?"
      }
    ],
    "similarPatterns": [
      "거나",
      "(으)ㄹ래요"
    ],
    "tags": [
      "topik-i",
      "choice"
    ]
  },
  {
    "id": "topik-i-grammar-022",
    "level": "TOPIK I",
    "category": "Emphasis",
    "pattern": "(이)나",
    "meaning": "even",
    "explanation": "Shows the amount is more than expected.",
    "examples": [
      {
        "korean": "쇼핑하는데 열 시간이나 걸렸어요.",
        "english": "It took even ten hours to shop."
      },
      {
        "korean": "사람이 백 명이나 왔어요.",
        "english": "As many as a hundred people came."
      }
    ],
    "similarPatterns": [
      "밖에",
      "만"
    ],
    "tags": [
      "topik-i",
      "emphasis"
    ]
  },
  {
    "id": "topik-i-grammar-023",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "만",
    "meaning": "only",
    "explanation": "Shows only this and nothing else.",
    "examples": [
      {
        "korean": "지금 5000원만 있어요.",
        "english": "I only have 5000 won now."
      },
      {
        "korean": "물만 마셨어요.",
        "english": "I drank only water."
      }
    ],
    "similarPatterns": [
      "밖에",
      "도"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-024",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "의",
    "meaning": "of; possessive",
    "explanation": "Shows possession or relation.",
    "examples": [
      {
        "korean": "내 친구의 그림은 아주 멋져요.",
        "english": "My friend’s drawing is very nice."
      },
      {
        "korean": "한국의 음식은 맛있어요.",
        "english": "Korean food is delicious."
      }
    ],
    "similarPatterns": [
      "이/가",
      "은/는"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-025",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "마다",
    "meaning": "every; whenever",
    "explanation": "Means every time or each.",
    "examples": [
      {
        "korean": "한국에 올 때마다 이 가게를 찾아요.",
        "english": "I visit this shop whenever I come to Korea."
      },
      {
        "korean": "주말마다 등산해요.",
        "english": "I go hiking every weekend."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ 때",
      "기 전에"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-026",
    "level": "TOPIK I",
    "category": "Particles",
    "pattern": "밖에",
    "meaning": "only",
    "explanation": "Used with negative words to mean only.",
    "examples": [
      {
        "korean": "시간이 한 시간밖에 없어요.",
        "english": "There is only one hour."
      },
      {
        "korean": "천 원밖에 없어요.",
        "english": "I have only a thousand won."
      }
    ],
    "similarPatterns": [
      "만",
      "도"
    ],
    "tags": [
      "topik-i",
      "particles"
    ]
  },
  {
    "id": "topik-i-grammar-027",
    "level": "TOPIK I",
    "category": "Comparison",
    "pattern": "보다",
    "meaning": "than",
    "explanation": "Compares two things.",
    "examples": [
      {
        "korean": "이것보다 이게 더 어울려요.",
        "english": "This looks better than this one."
      },
      {
        "korean": "오늘이 어제보다 더워요.",
        "english": "Today is hotter than yesterday."
      }
    ],
    "similarPatterns": [
      "처럼"
    ],
    "tags": [
      "topik-i",
      "comparison"
    ]
  },
  {
    "id": "topik-i-grammar-028",
    "level": "TOPIK I",
    "category": "Comparison",
    "pattern": "처럼",
    "meaning": "like",
    "explanation": "Means similar to or like.",
    "examples": [
      {
        "korean": "배우처럼 생기셨네요.",
        "english": "You look like an actor."
      },
      {
        "korean": "눈처럼 하얘요.",
        "english": "It is as white as snow."
      }
    ],
    "similarPatterns": [
      "보다",
      "(으)ㄴ 것 같다"
    ],
    "tags": [
      "topik-i",
      "comparison"
    ]
  },
  {
    "id": "topik-i-grammar-029",
    "level": "TOPIK I",
    "category": "Guess",
    "pattern": "(으)ㄴ 것 같다",
    "meaning": "I think",
    "explanation": "Use for a guess about a present or past state.",
    "examples": [
      {
        "korean": "택시 비용이 좀 비싼 것 같아요.",
        "english": "I think the taxi fare is a little expensive."
      },
      {
        "korean": "비가 온 것 같아요.",
        "english": "I think it rained."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ 것 같다",
      "(으)ㄹ 것이다"
    ],
    "tags": [
      "topik-i",
      "guess"
    ]
  },
  {
    "id": "topik-i-grammar-030",
    "level": "TOPIK I",
    "category": "Guess",
    "pattern": "(으)ㄹ 것 같다",
    "meaning": "I guess",
    "explanation": "Use for a guess about the future.",
    "examples": [
      {
        "korean": "이 화장품은 인기가 많을 것 같아요.",
        "english": "I guess this cosmetic will be popular."
      },
      {
        "korean": "내일 비가 올 것 같아요.",
        "english": "I guess it will rain tomorrow."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ 것 같다",
      "(으)ㄹ 것이다"
    ],
    "tags": [
      "topik-i",
      "guess"
    ]
  },
  {
    "id": "topik-i-grammar-031",
    "level": "TOPIK I",
    "category": "Experience",
    "pattern": "(으)ㄴ 적이 있다",
    "meaning": "have done",
    "explanation": "Says you have had an experience.",
    "examples": [
      {
        "korean": "이 가게에 와 본 적이 있어요.",
        "english": "I have been to this store."
      },
      {
        "korean": "제주도에 가 본 적이 있어요.",
        "english": "I have been to Jeju Island."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ 적이 없다",
      "아/어/여 보다"
    ],
    "tags": [
      "topik-i",
      "experience"
    ]
  },
  {
    "id": "topik-i-grammar-032",
    "level": "TOPIK I",
    "category": "Experience",
    "pattern": "(으)ㄴ 적이 없다",
    "meaning": "have not done",
    "explanation": "Says you have not had an experience.",
    "examples": [
      {
        "korean": "저는 한국에 가 본 적이 없어요.",
        "english": "I have not been to Korea."
      },
      {
        "korean": "그 영화를 본 적이 없어요.",
        "english": "I have never seen that movie."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ 적이 있다",
      "지 않다"
    ],
    "tags": [
      "topik-i",
      "experience"
    ]
  },
  {
    "id": "topik-i-grammar-033",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "(으)ㄴ 지",
    "meaning": "how long since",
    "explanation": "Asks how much time has passed since something happened.",
    "examples": [
      {
        "korean": "이 가게가 생긴 지 얼마나 됐어요?",
        "english": "How long has it been since this store opened?"
      },
      {
        "korean": "한국어를 배운 지 얼마나 됐어요?",
        "english": "How long has it been since you started learning Korean?"
      }
    ],
    "similarPatterns": [
      "(으)ㄴ 후에",
      "기 전에"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-034",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "(으)ㄴ 지",
    "meaning": "since",
    "explanation": "Says time has passed since something happened.",
    "examples": [
      {
        "korean": "한국에 온 지 3일이 지났습니다.",
        "english": "Three days have passed since I came to Korea."
      },
      {
        "korean": "결혼한 지 5년이 됐어요.",
        "english": "It has been five years since I got married."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ 후에",
      "기 전에"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-035",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "(으)ㄴ 후에",
    "meaning": "after",
    "explanation": "Means after doing something.",
    "examples": [
      {
        "korean": "쇼핑한 후에 밥 먹었습니다.",
        "english": "I ate after shopping."
      },
      {
        "korean": "운동한 후에 샤워해요.",
        "english": "I shower after exercising."
      }
    ],
    "similarPatterns": [
      "기 전에",
      "(으)ㄴ 지"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-036",
    "level": "TOPIK I",
    "category": "Contrast",
    "pattern": "는데요 / (으)ㄴ데요",
    "meaning": "although",
    "explanation": "Gives background or a soft contrast.",
    "examples": [
      {
        "korean": "역에서 좀 먼데요.",
        "english": "It is a little far from the station."
      },
      {
        "korean": "지금 좀 바쁜데요.",
        "english": "I'm a bit busy right now."
      }
    ],
    "similarPatterns": [
      "지만",
      "는데"
    ],
    "tags": [
      "topik-i",
      "contrast"
    ]
  },
  {
    "id": "topik-i-grammar-037",
    "level": "TOPIK I",
    "category": "Softener",
    "pattern": "는데요 / (으)ㄴ데요",
    "meaning": "but",
    "explanation": "Softly starts a request or question.",
    "examples": [
      {
        "korean": "죄송한데요, 길 좀 알려 줄 수 있어요?",
        "english": "Excuse me, but can you tell me the way?"
      },
      {
        "korean": "여보세요, 김 선생님 찾는데요.",
        "english": "Hello, I'm looking for Mr. Kim."
      }
    ],
    "similarPatterns": [
      "는데",
      "지만"
    ],
    "tags": [
      "topik-i",
      "softener"
    ]
  },
  {
    "id": "topik-i-grammar-038",
    "level": "TOPIK I",
    "category": "Reason",
    "pattern": "(으)니까",
    "meaning": "because; since",
    "explanation": "Gives a reason.",
    "examples": [
      {
        "korean": "달러밖에 없으니까 환전해야 돼요.",
        "english": "I need to exchange money because I only have dollars."
      },
      {
        "korean": "비가 오니까 우산을 가져가세요.",
        "english": "Take an umbrella because it's raining."
      }
    ],
    "similarPatterns": [
      "기 때문에",
      "(으)ㄹ까 봐"
    ],
    "tags": [
      "topik-i",
      "reason"
    ]
  },
  {
    "id": "topik-i-grammar-039",
    "level": "TOPIK I",
    "category": "Future",
    "pattern": "(으)ㄹ 것이다",
    "meaning": "will",
    "explanation": "Talks about the future or a guess.",
    "examples": [
      {
        "korean": "여기 식당은 맛있을 거예요.",
        "english": "The restaurant here will be delicious."
      },
      {
        "korean": "내년에 한국에 갈 거예요.",
        "english": "I will go to Korea next year."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ 것 같다",
      "(으)려고"
    ],
    "tags": [
      "topik-i",
      "future"
    ]
  },
  {
    "id": "topik-i-grammar-040",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "(으)ㄹ 때",
    "meaning": "when",
    "explanation": "Means when something happens.",
    "examples": [
      {
        "korean": "내가 버스 타고 있었을 때 잃어버렸어요.",
        "english": "I lost it when I was on the bus."
      },
      {
        "korean": "밥을 먹을 때 텔레비전을 봐요.",
        "english": "I watch TV when I eat."
      }
    ],
    "similarPatterns": [
      "(으)면",
      "(으)면서"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-041",
    "level": "TOPIK I",
    "category": "Ability",
    "pattern": "(으)ㄹ 수 있다",
    "meaning": "can",
    "explanation": "Shows ability or possibility.",
    "examples": [
      {
        "korean": "저는 한국말 조금 할 수 있어요.",
        "english": "I can speak Korean a little."
      },
      {
        "korean": "저는 수영할 수 있어요.",
        "english": "I can swim."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ 수 없다",
      "지 못하다"
    ],
    "tags": [
      "topik-i",
      "ability"
    ]
  },
  {
    "id": "topik-i-grammar-042",
    "level": "TOPIK I",
    "category": "Ability",
    "pattern": "(으)ㄹ 수 없다",
    "meaning": "cannot",
    "explanation": "Shows no ability or no possibility.",
    "examples": [
      {
        "korean": "여기서는 사진을 찍을 수 없어요.",
        "english": "You cannot take photos here."
      },
      {
        "korean": "저는 매운 음식을 먹을 수 없어요.",
        "english": "I cannot eat spicy food."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ 수 있다",
      "지 못하다"
    ],
    "tags": [
      "topik-i",
      "ability"
    ]
  },
  {
    "id": "topik-i-grammar-043",
    "level": "TOPIK I",
    "category": "Promise",
    "pattern": "(으)ㄹ게요",
    "meaning": "I will",
    "explanation": "Shows the speaker’s promise or decision.",
    "examples": [
      {
        "korean": "제가 할게요.",
        "english": "I will do it."
      },
      {
        "korean": "내일 다시 전화할게요.",
        "english": "I'll call again tomorrow."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ래요",
      "(으)ㄹ 것이다"
    ],
    "tags": [
      "topik-i",
      "promise"
    ]
  },
  {
    "id": "topik-i-grammar-044",
    "level": "TOPIK I",
    "category": "Plan",
    "pattern": "(으)ㄹ까 하다",
    "meaning": "thinking of",
    "explanation": "Shows a plan you are thinking about.",
    "examples": [
      {
        "korean": "명동에 갈까 해요.",
        "english": "I am thinking of going to Myeongdong."
      },
      {
        "korean": "주말에 여행을 갈까 해요.",
        "english": "I'm thinking of traveling this weekend."
      }
    ],
    "similarPatterns": [
      "(으)려고",
      "(으)ㄹ래요"
    ],
    "tags": [
      "topik-i",
      "plan"
    ]
  },
  {
    "id": "topik-i-grammar-045",
    "level": "TOPIK I",
    "category": "Worry",
    "pattern": "(으)ㄹ까 봐",
    "meaning": "worried that",
    "explanation": "Shows worry about something.",
    "examples": [
      {
        "korean": "현금이 모자랄까 봐 걱정했어요.",
        "english": "I was worried that I would not have enough cash."
      },
      {
        "korean": "늦을까 봐 택시를 탔어요.",
        "english": "I took a taxi because I was worried I'd be late."
      }
    ],
    "similarPatterns": [
      "기 때문에",
      "(으)니까"
    ],
    "tags": [
      "topik-i",
      "worry"
    ]
  },
  {
    "id": "topik-i-grammar-046",
    "level": "TOPIK I",
    "category": "Suggestion",
    "pattern": "(으)ㄹ까요?",
    "meaning": "should we?",
    "explanation": "Asks for suggestion or opinion.",
    "examples": [
      {
        "korean": "여기서 걸어갈까요?",
        "english": "Should we walk from here?"
      },
      {
        "korean": "같이 점심 먹을까요?",
        "english": "Shall we have lunch together?"
      }
    ],
    "similarPatterns": [
      "(으)ㅂ시다",
      "(으)ㄹ래요?"
    ],
    "tags": [
      "topik-i",
      "suggestion"
    ]
  },
  {
    "id": "topik-i-grammar-047",
    "level": "TOPIK I",
    "category": "Choice",
    "pattern": "(으)ㄹ래요",
    "meaning": "I will; I want",
    "explanation": "Shows the speaker’s choice or wish.",
    "examples": [
      {
        "korean": "저는 이걸로 할래요.",
        "english": "I will choose this one."
      },
      {
        "korean": "저는 집에 갈래요.",
        "english": "I want to go home."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ게요",
      "(으)ㄹ까 하다"
    ],
    "tags": [
      "topik-i",
      "choice"
    ]
  },
  {
    "id": "topik-i-grammar-048",
    "level": "TOPIK I",
    "category": "Question",
    "pattern": "(으)ㄹ래요?",
    "meaning": "would you like?",
    "explanation": "Asks another person’s choice.",
    "examples": [
      {
        "korean": "이걸로 계산하실래요?",
        "english": "Would you like to pay with this?"
      },
      {
        "korean": "커피 마실래요?",
        "english": "Would you like to drink coffee?"
      }
    ],
    "similarPatterns": [
      "(으)ㄹ까요?",
      "(으)세요"
    ],
    "tags": [
      "topik-i",
      "question"
    ]
  },
  {
    "id": "topik-i-grammar-049",
    "level": "TOPIK I",
    "category": "Purpose",
    "pattern": "(으)러 가다",
    "meaning": "go to do",
    "explanation": "Means go somewhere in order to do something.",
    "examples": [
      {
        "korean": "한국에 관광하러 갈 거예요.",
        "english": "I will go to Korea to travel."
      },
      {
        "korean": "도서관에 공부하러 가요.",
        "english": "I go to the library to study."
      }
    ],
    "similarPatterns": [
      "(으)러 오다",
      "(으)려고"
    ],
    "tags": [
      "topik-i",
      "purpose"
    ]
  },
  {
    "id": "topik-i-grammar-050",
    "level": "TOPIK I",
    "category": "Purpose",
    "pattern": "(으)러 오다",
    "meaning": "come to do",
    "explanation": "Means come somewhere in order to do something.",
    "examples": [
      {
        "korean": "여기에 예약하러 왔어요.",
        "english": "I came here to make a reservation."
      },
      {
        "korean": "친구가 놀러 왔어요.",
        "english": "My friend came over to hang out."
      }
    ],
    "similarPatterns": [
      "(으)러 가다",
      "(으)려고"
    ],
    "tags": [
      "topik-i",
      "purpose"
    ]
  },
  {
    "id": "topik-i-grammar-051",
    "level": "TOPIK I",
    "category": "Plan",
    "pattern": "(으)려고",
    "meaning": "going to",
    "explanation": "Shows intention or plan.",
    "examples": [
      {
        "korean": "한국말을 공부하려고 해요.",
        "english": "I am going to study Korean."
      },
      {
        "korean": "살을 빼려고 운동해요.",
        "english": "I exercise to lose weight."
      }
    ],
    "similarPatterns": [
      "(으)려고요",
      "(으)러 가다"
    ],
    "tags": [
      "topik-i",
      "plan"
    ]
  },
  {
    "id": "topik-i-grammar-052",
    "level": "TOPIK I",
    "category": "Plan",
    "pattern": "(으)려고요",
    "meaning": "planning to",
    "explanation": "Softly says a plan.",
    "examples": [
      {
        "korean": "아이돌 콘서트에 가려고요.",
        "english": "I am going to go to an idol concert."
      },
      {
        "korean": "내일 일찍 일어나려고요.",
        "english": "I'm planning to get up early tomorrow."
      }
    ],
    "similarPatterns": [
      "(으)려고",
      "(으)ㄹ까 하다"
    ],
    "tags": [
      "topik-i",
      "plan"
    ]
  },
  {
    "id": "topik-i-grammar-053",
    "level": "TOPIK I",
    "category": "Condition",
    "pattern": "(으)면",
    "meaning": "if",
    "explanation": "Shows a condition.",
    "examples": [
      {
        "korean": "부산에 가면 뭘 볼 수 있을까요?",
        "english": "What can I see if I go to Busan?"
      },
      {
        "korean": "시간이 있으면 만나요.",
        "english": "Let's meet if you have time."
      }
    ],
    "similarPatterns": [
      "(으)면서",
      "(으)니까"
    ],
    "tags": [
      "topik-i",
      "condition"
    ]
  },
  {
    "id": "topik-i-grammar-054",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "(으)면서",
    "meaning": "while",
    "explanation": "Shows two actions happen together.",
    "examples": [
      {
        "korean": "핸드폰을 보면서 걷지 마세요.",
        "english": "Do not walk while looking at your phone."
      },
      {
        "korean": "음악을 들으면서 공부해요.",
        "english": "I study while listening to music."
      }
    ],
    "similarPatterns": [
      "고",
      "(으)ㄹ 때"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-055",
    "level": "TOPIK I",
    "category": "Suggestion",
    "pattern": "(으)ㅂ시다",
    "meaning": "let’s",
    "explanation": "Makes a polite suggestion.",
    "examples": [
      {
        "korean": "순두부를 주문해 봅시다.",
        "english": "Let’s order sundubu."
      },
      {
        "korean": "이제 출발합시다.",
        "english": "Let’s leave now."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ까요?",
      "(으)세요"
    ],
    "tags": [
      "topik-i",
      "suggestion"
    ]
  },
  {
    "id": "topik-i-grammar-056",
    "level": "TOPIK I",
    "category": "Request",
    "pattern": "(으)세요",
    "meaning": "please do",
    "explanation": "Polite request or command.",
    "examples": [
      {
        "korean": "삼겹살 2인분 주세요.",
        "english": "Please give us two servings of samgyeopsal."
      },
      {
        "korean": "여기 앉으세요.",
        "english": "Please sit here."
      }
    ],
    "similarPatterns": [
      "(으)십시오",
      "(으)ㅂ시다"
    ],
    "tags": [
      "topik-i",
      "request"
    ]
  },
  {
    "id": "topik-i-grammar-057",
    "level": "TOPIK I",
    "category": "Request",
    "pattern": "(으)십시오",
    "meaning": "please do",
    "explanation": "Formal polite request or command.",
    "examples": [
      {
        "korean": "또 놀러 오십시오.",
        "english": "Please visit us again."
      },
      {
        "korean": "안녕히 가십시오.",
        "english": "Please go safely (goodbye)."
      }
    ],
    "similarPatterns": [
      "(으)세요",
      "ㅂ/습니다"
    ],
    "tags": [
      "topik-i",
      "request"
    ]
  },
  {
    "id": "topik-i-grammar-058",
    "level": "TOPIK I",
    "category": "Confirmation",
    "pattern": "(이)지요?",
    "meaning": "right?",
    "explanation": "Checks if something is true.",
    "examples": [
      {
        "korean": "카드로 계산 되지요?",
        "english": "I can pay by card, right?"
      },
      {
        "korean": "한국 사람이지요?",
        "english": "You're Korean, right?"
      }
    ],
    "similarPatterns": [
      "네요",
      "(으)ㄴ데요"
    ],
    "tags": [
      "topik-i",
      "confirmation"
    ]
  },
  {
    "id": "topik-i-grammar-059",
    "level": "TOPIK I",
    "category": "Choice",
    "pattern": "거나",
    "meaning": "or",
    "explanation": "Connects actions as choices.",
    "examples": [
      {
        "korean": "시장에 가거나 카페에 가고 싶어요.",
        "english": "I want to go to a market or a cafe."
      },
      {
        "korean": "주말에는 자거나 쉬어요.",
        "english": "On weekends I sleep or rest."
      }
    ],
    "similarPatterns": [
      "(이)나",
      "지만"
    ],
    "tags": [
      "topik-i",
      "choice"
    ]
  },
  {
    "id": "topik-i-grammar-060",
    "level": "TOPIK I",
    "category": "Adverb",
    "pattern": "게",
    "meaning": "in a way",
    "explanation": "Changes an adjective into an adverb.",
    "examples": [
      {
        "korean": "싸게 해 주세요.",
        "english": "Please make it cheap."
      },
      {
        "korean": "방을 깨끗하게 청소했어요.",
        "english": "I cleaned the room until it was spotless."
      }
    ],
    "similarPatterns": [
      "게 되다"
    ],
    "tags": [
      "topik-i",
      "adverb"
    ]
  },
  {
    "id": "topik-i-grammar-061",
    "level": "TOPIK I",
    "category": "Change",
    "pattern": "게 되다",
    "meaning": "happen to",
    "explanation": "Shows a change or result.",
    "examples": [
      {
        "korean": "한국에 오게 됐어요.",
        "english": "I happened to come to Korea."
      },
      {
        "korean": "한국 음식을 좋아하게 됐어요.",
        "english": "I came to like Korean food."
      }
    ],
    "similarPatterns": [
      "게"
    ],
    "tags": [
      "topik-i",
      "change"
    ]
  },
  {
    "id": "topik-i-grammar-062",
    "level": "TOPIK I",
    "category": "Connection",
    "pattern": "고",
    "meaning": "and then",
    "explanation": "Connects actions or states.",
    "examples": [
      {
        "korean": "밥 먹고 자요.",
        "english": "I will eat and sleep."
      },
      {
        "korean": "손을 씻고 밥을 먹어요.",
        "english": "I wash my hands and then eat."
      }
    ],
    "similarPatterns": [
      "(으)면서",
      "고 있다"
    ],
    "tags": [
      "topik-i",
      "connection"
    ]
  },
  {
    "id": "topik-i-grammar-063",
    "level": "TOPIK I",
    "category": "Wish",
    "pattern": "고 싶다",
    "meaning": "want to",
    "explanation": "Shows desire.",
    "examples": [
      {
        "korean": "약국에 가고 싶어요.",
        "english": "I want to go to the pharmacy."
      },
      {
        "korean": "물을 마시고 싶어요.",
        "english": "I want to drink water."
      }
    ],
    "similarPatterns": [
      "았/었/였으면 좋겠다",
      "(으)ㄹ래요"
    ],
    "tags": [
      "topik-i",
      "wish"
    ]
  },
  {
    "id": "topik-i-grammar-064",
    "level": "TOPIK I",
    "category": "Progress",
    "pattern": "고 있다",
    "meaning": "be doing",
    "explanation": "Shows an action is happening now.",
    "examples": [
      {
        "korean": "지금 무슨 말 할까 생각하고 있어요.",
        "english": "I am thinking about what to say now."
      },
      {
        "korean": "지금 밥을 먹고 있어요.",
        "english": "I'm eating now."
      }
    ],
    "similarPatterns": [
      "고",
      "(으)면서"
    ],
    "tags": [
      "topik-i",
      "progress"
    ]
  },
  {
    "id": "topik-i-grammar-065",
    "level": "TOPIK I",
    "category": "Realization",
    "pattern": "군요",
    "meaning": "I see",
    "explanation": "Shows you newly realize something.",
    "examples": [
      {
        "korean": "여기 쭉 가면 되는군요.",
        "english": "I see, I can go straight this way."
      },
      {
        "korean": "여기가 유명한 곳이군요.",
        "english": "So this is the famous place."
      }
    ],
    "similarPatterns": [
      "네요",
      "(으)ㄴ데요"
    ],
    "tags": [
      "topik-i",
      "realization"
    ]
  },
  {
    "id": "topik-i-grammar-066",
    "level": "TOPIK I",
    "category": "Reason",
    "pattern": "기 때문에",
    "meaning": "because",
    "explanation": "Gives a reason.",
    "examples": [
      {
        "korean": "너무 많이 걸었기 때문에 다리가 아파요.",
        "english": "My legs hurt because I walked too much."
      },
      {
        "korean": "아프기 때문에 학교에 못 가요.",
        "english": "I can't go to school because I'm sick."
      }
    ],
    "similarPatterns": [
      "(으)니까",
      "(으)ㄹ까 봐"
    ],
    "tags": [
      "topik-i",
      "reason"
    ]
  },
  {
    "id": "topik-i-grammar-067",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "기 전에",
    "meaning": "before",
    "explanation": "Means before doing something.",
    "examples": [
      {
        "korean": "결제하기 전에 확인하고 싶은 게 있는데요.",
        "english": "I want to check something before paying."
      },
      {
        "korean": "자기 전에 이를 닦아요.",
        "english": "I brush my teeth before sleeping."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ 후에",
      "(으)ㄹ 때"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-068",
    "level": "TOPIK I",
    "category": "Decision",
    "pattern": "기로 하다",
    "meaning": "decide to",
    "explanation": "Shows a decision.",
    "examples": [
      {
        "korean": "오늘은 쇼핑하기로 했어요.",
        "english": "I decided to go shopping today."
      },
      {
        "korean": "내일부터 일찍 일어나기로 했어요.",
        "english": "I decided to get up early from tomorrow."
      }
    ],
    "similarPatterns": [
      "(으)려고",
      "(으)ㄹ게요"
    ],
    "tags": [
      "topik-i",
      "decision"
    ]
  },
  {
    "id": "topik-i-grammar-069",
    "level": "TOPIK I",
    "category": "Realization",
    "pattern": "네요",
    "meaning": "I see; right?",
    "explanation": "Shows surprise or realization.",
    "examples": [
      {
        "korean": "다 합쳐서 4000원이네요.",
        "english": "So it is 4000 won all together."
      },
      {
        "korean": "날씨가 정말 좋네요.",
        "english": "The weather is really nice."
      }
    ],
    "similarPatterns": [
      "군요",
      "(이)지요?"
    ],
    "tags": [
      "topik-i",
      "realization"
    ]
  },
  {
    "id": "topik-i-grammar-070",
    "level": "TOPIK I",
    "category": "Advice",
    "pattern": "는 게 좋겠다",
    "meaning": "it is better to",
    "explanation": "Gives advice.",
    "examples": [
      {
        "korean": "시간이 없으니까 빨리 가는 게 좋겠어요.",
        "english": "We should hurry because we do not have time."
      },
      {
        "korean": "약을 먹는 게 좋겠어요.",
        "english": "You'd better take some medicine."
      }
    ],
    "similarPatterns": [
      "아/어/여야 되다",
      "(으)세요"
    ],
    "tags": [
      "topik-i",
      "advice"
    ]
  },
  {
    "id": "topik-i-grammar-071",
    "level": "TOPIK I",
    "category": "Time",
    "pattern": "는데",
    "meaning": "while; when; background",
    "explanation": "Connects a background situation or an action happening when another event occurs.",
    "examples": [
      {
        "korean": "입국심사하는데 별로 많이 안 기다렸어요.",
        "english": "I did not wait long for immigration."
      },
      {
        "korean": "밥을 먹는데 전화가 왔어요.",
        "english": "I was eating when the phone rang."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ데요",
      "(으)면서"
    ],
    "tags": [
      "topik-i",
      "time"
    ]
  },
  {
    "id": "topik-i-grammar-072",
    "level": "TOPIK I",
    "category": "Formal Style",
    "pattern": "ㅂ/습니까?",
    "meaning": "formal question",
    "explanation": "Formal polite question ending.",
    "examples": [
      {
        "korean": "언제 한국에 갑니까?",
        "english": "When are you going to Korea?"
      },
      {
        "korean": "이름이 무엇입니까?",
        "english": "What is your name?"
      }
    ],
    "similarPatterns": [
      "ㅂ/습니다",
      "(으)십시오"
    ],
    "tags": [
      "topik-i",
      "formal-style"
    ]
  },
  {
    "id": "topik-i-grammar-073",
    "level": "TOPIK I",
    "category": "Formal Style",
    "pattern": "ㅂ/습니다",
    "meaning": "formal statement",
    "explanation": "Formal polite statement ending.",
    "examples": [
      {
        "korean": "내일 한국에 갑니다.",
        "english": "I am going to Korea tomorrow."
      },
      {
        "korean": "저는 회사원입니다.",
        "english": "I am an office worker."
      }
    ],
    "similarPatterns": [
      "ㅂ/습니까?",
      "아/어요"
    ],
    "tags": [
      "topik-i",
      "formal-style"
    ]
  },
  {
    "id": "topik-i-grammar-074",
    "level": "TOPIK I",
    "category": "Try",
    "pattern": "아/어/여 보다",
    "meaning": "try doing",
    "explanation": "Means try doing something.",
    "examples": [
      {
        "korean": "이것도 시식해 보세요.",
        "english": "Please try eating this too."
      },
      {
        "korean": "이 옷을 입어 보세요.",
        "english": "Please try on these clothes."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ 적이 있다",
      "아/어/여 주다"
    ],
    "tags": [
      "topik-i",
      "try"
    ]
  },
  {
    "id": "topik-i-grammar-075",
    "level": "TOPIK I",
    "category": "Help",
    "pattern": "아/어/여 주다",
    "meaning": "do for someone",
    "explanation": "Shows doing something for someone.",
    "examples": [
      {
        "korean": "알려줘서 고마워요.",
        "english": "Thank you for telling me."
      },
      {
        "korean": "사진 좀 찍어 주세요.",
        "english": "Please take a photo for me."
      }
    ],
    "similarPatterns": [
      "아/어/여 보다",
      "(으)세요"
    ],
    "tags": [
      "topik-i",
      "help"
    ]
  },
  {
    "id": "topik-i-grammar-076",
    "level": "TOPIK I",
    "category": "Need",
    "pattern": "아/어/여야 되다",
    "meaning": "need to; must",
    "explanation": "Shows obligation or need.",
    "examples": [
      {
        "korean": "한국어를 공부해야 돼요.",
        "english": "I need to study Korean."
      },
      {
        "korean": "지금 가야 돼요.",
        "english": "I have to go now."
      }
    ],
    "similarPatterns": [
      "아/어/여야 하다",
      "는 게 좋겠다"
    ],
    "tags": [
      "topik-i",
      "need"
    ]
  },
  {
    "id": "topik-i-grammar-077",
    "level": "TOPIK I",
    "category": "Need",
    "pattern": "아/어/여야 하다",
    "meaning": "need to; must",
    "explanation": "Shows obligation or need.",
    "examples": [
      {
        "korean": "차 타고 가야 해요.",
        "english": "I need to go by car."
      },
      {
        "korean": "예약을 해야 해요.",
        "english": "I have to make a reservation."
      }
    ],
    "similarPatterns": [
      "아/어/여야 되다",
      "는 게 좋겠다"
    ],
    "tags": [
      "topik-i",
      "need"
    ]
  },
  {
    "id": "topik-i-grammar-078",
    "level": "TOPIK I",
    "category": "Polite Style",
    "pattern": "아/어요",
    "meaning": "polite ending",
    "explanation": "Informal polite sentence ending.",
    "examples": [
      {
        "korean": "좋아요.",
        "english": "That is good."
      },
      {
        "korean": "학교에 가요.",
        "english": "I go to school."
      }
    ],
    "similarPatterns": [
      "ㅂ/습니다",
      "(으)세요"
    ],
    "tags": [
      "topik-i",
      "polite-style"
    ]
  },
  {
    "id": "topik-i-grammar-079",
    "level": "TOPIK I",
    "category": "Wish",
    "pattern": "았/었/였으면 좋겠다",
    "meaning": "hope; wish",
    "explanation": "Shows hope or wish.",
    "examples": [
      {
        "korean": "빨리 배달 왔으면 좋겠어요.",
        "english": "I hope the delivery comes soon."
      },
      {
        "korean": "시험에 합격했으면 좋겠어요.",
        "english": "I hope I pass the exam."
      }
    ],
    "similarPatterns": [
      "고 싶다",
      "(으)면"
    ],
    "tags": [
      "topik-i",
      "wish"
    ]
  },
  {
    "id": "topik-i-grammar-080",
    "level": "TOPIK I",
    "category": "Prohibition",
    "pattern": "지 말다",
    "meaning": "do not",
    "explanation": "Tells someone not to do something.",
    "examples": [
      {
        "korean": "담배 피우지 마세요.",
        "english": "Please do not smoke."
      },
      {
        "korean": "여기에 쓰레기를 버리지 마세요.",
        "english": "Please don't throw trash here."
      }
    ],
    "similarPatterns": [
      "지 않다",
      "(으)세요"
    ],
    "tags": [
      "topik-i",
      "prohibition"
    ]
  },
  {
    "id": "topik-i-grammar-081",
    "level": "TOPIK I",
    "category": "Inability",
    "pattern": "지 못하다",
    "meaning": "cannot",
    "explanation": "Shows inability or failure.",
    "examples": [
      {
        "korean": "도와주지 못해서 죄송해요.",
        "english": "I am sorry that I cannot help."
      },
      {
        "korean": "바빠서 가지 못했어요.",
        "english": "I couldn't go because I was busy."
      }
    ],
    "similarPatterns": [
      "(으)ㄹ 수 없다",
      "지 않다"
    ],
    "tags": [
      "topik-i",
      "inability"
    ]
  },
  {
    "id": "topik-i-grammar-082",
    "level": "TOPIK I",
    "category": "Negative",
    "pattern": "지 않다",
    "meaning": "not",
    "explanation": "Makes a verb or adjective negative.",
    "examples": [
      {
        "korean": "지하철 타지 않고 걸어갈게요.",
        "english": "I will not take the subway and will walk."
      },
      {
        "korean": "저는 고기를 먹지 않아요.",
        "english": "I don't eat meat."
      }
    ],
    "similarPatterns": [
      "지 못하다",
      "이/가 아니다"
    ],
    "tags": [
      "topik-i",
      "negative"
    ]
  },
  {
    "id": "topik-i-grammar-083",
    "level": "TOPIK I",
    "category": "Contrast",
    "pattern": "지만",
    "meaning": "but",
    "explanation": "Connects a contrast.",
    "examples": [
      {
        "korean": "오래 전에 주문했지만 요리가 아직 안 왔어요.",
        "english": "We ordered a while ago, but the food is not here yet."
      },
      {
        "korean": "비싸지만 사고 싶어요.",
        "english": "It's expensive, but I want to buy it."
      }
    ],
    "similarPatterns": [
      "(으)ㄴ데요",
      "는데"
    ],
    "tags": [
      "topik-i",
      "contrast"
    ]
  },
  {
    "id": "topik-i-grammar-084",
    "level": "TOPIK I",
    "category": "Negative",
    "pattern": "이/가 아니다",
    "meaning": "not be",
    "explanation": "Says something is not a noun.",
    "examples": [
      {
        "korean": "제 물건이 아니에요.",
        "english": "That is not mine."
      },
      {
        "korean": "이건 제 가방이 아니에요.",
        "english": "This is not my bag."
      }
    ],
    "similarPatterns": [
      "지 않다",
      "이/가"
    ],
    "tags": [
      "topik-i",
      "negative"
    ]
  }
];

const easyMeaningOverrides = {
  'grammar-001': 'because I did something',
  'grammar-002': 'yes, but',
  'grammar-003': 'to do something',
  'grammar-004': 'it is almost like this',
  'grammar-005': 'while it stays the same',
  'grammar-006': 'I see this, so I think',
  'grammar-007': 'while I am doing it',
  'grammar-008': 'as much as',
  'grammar-009': 'but / on the other side',
  'grammar-010': 'it is normal',
  'grammar-011': 'because of a bad reason',
  'grammar-012': 'it looks like',
  'grammar-013': 'I did not know',
  'grammar-014': 'I thought / I knew how',
  'grammar-015': 'if / whether',
  'grammar-016': 'you know',
  'grammar-017': 'soft background: and/but',
  'grammar-018': 'even if',
  'grammar-019': 'it looks like',
  'grammar-020': 'is it?',
  'grammar-021': 'it is no use',
  'grammar-022': 'because',
  'grammar-023': 'because this is true',
  'grammar-024': 'for two reasons',
  'grammar-025': 'no way',
  'grammar-026': 'worth doing',
  'grammar-027': 'almost did',
  'grammar-028': 'not only, but also',
  'grammar-029': 'only',
  'grammar-030': 'have no choice',
  'grammar-031': 'so much that',
  'grammar-032': 'so much that it is serious',
  'grammar-033': 'because I will',
  'grammar-034': 'I think it will, but',
  'grammar-035': 'I should have',
  'grammar-036': 'should I or not?',
  'grammar-037': 'more and more',
  'grammar-038': 'maybe',
  'grammar-039': 'even if',
  'grammar-040': 'someone said "do it"',
  'grammar-041': 'I was going to, but',
  'grammar-042': 'just about to',
  'grammar-043': 'if you want to',
  'grammar-044': 'because of',
  'grammar-045': 'as a role',
  'grammar-046': 'and / while',
  'grammar-047': 'just need to',
  'grammar-048': 'because',
  'grammar-049': 'no difference',
  'grammar-050': 'if / when',
  'grammar-051': 'make someone do',
  'grammar-052': 'after doing, I learned',
  'grammar-053': 'after doing',
  'grammar-054': 'after doing',
  'grammar-055': 'of course',
  'grammar-056': 'end up doing',
  'grammar-057': 'after thinking about it',
  'grammar-058': 'used to do',
  'grammar-059': 'easy to do',
  'grammar-060': 'likely to happen',
  'grammar-061': 'hard to do',
  'grammar-062': 'in order to',
  'grammar-063': 'naturally happens',
  'grammar-064': 'no, not really',
  'grammar-065': 'only need to do',
  'grammar-066': 'good/bad for doing',
  'grammar-067': 'because I saw or heard',
  'grammar-068': 'pretend to',
  'grammar-069': 'plain sentence ending',
  'grammar-070': 'things like',
  'grammar-071': 'suppose that',
  'grammar-072': 'someone says that',
  'grammar-073': 'even if',
  'grammar-074': 'did you say?',
  'grammar-075': 'I heard, and wow',
  'grammar-076': 'I am telling you',
  'grammar-077': 'they said, but',
  'grammar-078': 'I heard that',
  'grammar-079': 'I heard, and/but',
  'grammar-080': 'if',
  'grammar-081': 'I heard; is it true?',
  'grammar-082': 'it looks like',
  'grammar-083': 'polite question',
  'grammar-084': 'someone asks',
  'grammar-085': 'while doing',
  'grammar-086': 'on the way',
  'grammar-087': 'as soon as / just as',
  'grammar-088': 'instead of',
  'grammar-089': 'thanks to',
  'grammar-090': 'because of a bad result',
  'grammar-091': 'while',
  'grammar-092': 'think of it as',
  'grammar-093': 'may happen',
  'grammar-094': 'have no choice',
  'grammar-095': 'doing now',
  'grammar-096': 'because of trouble',
  'grammar-097': 'tend to',
  'grammar-098': 'as long as',
  'grammar-099': 'while also',
  'grammar-100': 'not even',
  'grammar-101': 'I see!',
  'grammar-102': 'casual question',
  'grammar-103': 'while doing, I learned',
  'grammar-104': 'if you keep doing',
  'grammar-105': 'while doing, then',
  'grammar-106': 'as you know',
  'grammar-107': 'as / according to',
  'grammar-108': 'I saw and learned',
  'grammar-109': 'I saw, then/but',
  'grammar-110': 'I remember',
  'grammar-111': 'I saw and learned',
  'grammar-112': 'even if',
  'grammar-113': 'used to / remembered',
  'grammar-114': 'was it?',
  'grammar-115': 'I noticed, and/but',
  'grammar-116': 'so that',
  'grammar-117': 'any choice',
  'grammar-118': 'like / as if',
  'grammar-119': 'at least',
  'grammar-120': 'not as good as',
  'grammar-121': 'looks',
  'grammar-122': 'maybe because',
  'grammar-123': 'even if',
  'grammar-124': 'do it',
  'grammar-125': 'must / only if',
  'grammar-126': 'should',
  'grammar-127': 'become',
  'grammar-128': 'if I had',
  'grammar-129': 'I think it was',
  'grammar-130': 'I hope',
  'grammar-131': 'this is truly',
  'grammar-132': 'about',
  'grammar-133': 'about',
  'grammar-134': 'depending on',
  'grammar-135': 'by / because of',
  'grammar-136': 'add to',
  'grammar-137': 'including',
  'grammar-138': 'through',
  'grammar-139': 'as soon as',
  'grammar-140': 'said "let us"',
  'grammar-141': 'as soon as',
  'grammar-142': 'you know',
  'grammar-143': 'even',
  'grammar-144': 'as much as',
  'grammar-145': 'any',
  'grammar-146': 'no / not any',
  'grammar-147': 'so... that',
  'grammar-148': 'even',
  'grammar-149': 'for / considering'
};

const easyCategoryTips = {
  'According To': 'It follows a rule, fact, or source.',
  Addition: 'It adds one more thing.',
  'Addition and Contrast': 'It adds something, but also shows a different idea.',
  Agreement: 'It shows you agree or accept something.',
  Alternative: 'It gives another choice.',
  Appearance: 'It talks about how something looks.',
  'As Known': 'It talks about something people already know.',
  Assumption: 'Use it when you guess or think something is true.',
  Background: 'It gives background before the main idea.',
  Basis: 'It shows the reason or base for your idea.',
  Causative: 'It means someone makes another person do something.',
  Cause: 'It gives the reason.',
  'Cause and Agent': 'It shows who or what caused something.',
  'Cause and Effect': 'It tells why something happened.',
  Change: 'It shows something becomes different.',
  Choice: 'It talks about choosing.',
  Command: 'It tells someone to do something.',
  Comparison: 'It compares two things.',
  Completion: 'It shows something finished.',
  Concession: 'It means "even if".',
  Condition: 'It means "if".',
  'Condition Through Experience': 'It means you learn after trying or seeing.',
  Confirmation: 'It checks if something is true.',
  Connection: 'It connects two ideas.',
  Contrast: 'It shows two different ideas.',
  Degree: 'It shows how much or how strong.',
  Difficulty: 'It shows something is easy or hard.',
  Discovery: 'It shows you found out something.',
  'Dual Purpose': 'It gives two purposes or effects.',
  During: 'It means two actions happen at the same time.',
  Emphasis: 'It makes the idea stronger.',
  Evaluation: 'It says what you think about something.',
  Exclamation: 'It shows strong feeling.',
  Expectation: 'It talks about what you expect.',
  Experience: 'It talks about something you saw, heard, or did before.',
  'Extreme Situation': 'It shows a very strong or surprising case.',
  'Free Choice': 'It means any choice is okay.',
  Futility: 'It means trying does not help.',
  'General Truth': 'It talks about something usually true.',
  'Gradual Change': 'It means something changes little by little.',
  Habit: 'It talks about what often happens.',
  Hesitation: 'It shows you are thinking or not sure.',
  Hypothesis: 'It imagines a different situation.',
  'Immediate Sequence': 'It means one action happens right after another.',
  Impossibility: 'It means something cannot happen.',
  Inclusion: 'It means something is included.',
  Inevitability: 'It means there is no other way.',
  Inference: 'It shows what you think from clues.',
  'Informal Question': 'It is a casual question ending.',
  Intention: 'It shows a plan or goal.',
  'Interrupted Intention': 'It means you planned to do it, but something changed.',
  Interruption: 'It means an action stops or changes.',
  Limitation: 'It shows only this thing or amount.',
  'Listing Possibilities': 'It gives examples or possible choices.',
  Means: 'It shows the way or tool.',
  'Natural Tendency': 'It shows what naturally or usually happens.',
  'Near Miss': 'It means something almost happened.',
  Necessity: 'It means you need to do it.',
  Negation: 'It makes the meaning negative.',
  'Negative Cause': 'It gives a reason for a bad result.',
  'Negative Possibility': 'It means something is not likely.',
  'No Exception': 'It means nothing is left out.',
  Opportunity: 'It talks about a chance to do something.',
  'Plain Style': 'It is a plain sentence ending.',
  'Positive Cause': 'It gives a good reason or help.',
  Possibility: 'It means something can happen.',
  Pretense: 'It means acting like something is true.',
  Progress: 'It means an action is happening now.',
  Purpose: 'It tells the goal.',
  'Purpose and Degree': 'It shows a goal or a strong amount.',
  Question: 'It makes a question.',
  Quotation: 'It tells what someone said.',
  'Quoted Speech': 'It tells another person\'s words.',
  Realization: 'It shows you learned or noticed something.',
  Reason: 'It gives the reason.',
  'Reason and Plan': 'It gives a reason for your plan.',
  Recollection: 'It talks about something you remember.',
  'Recollection Background': 'It gives remembered background.',
  'Recollection Modifier': 'It describes something from memory.',
  'Recollection Question': 'It asks about something remembered.',
  'Recollection and Contrast': 'It remembers something and shows a different idea.',
  Regret: 'It shows you feel sorry about the past.',
  'Reported Background': 'It gives background from what you heard.',
  'Reported Contrast': 'It reports words and shows contrast.',
  'Reported Speech': 'It tells what you heard.',
  Requirement: 'It means something must happen first.',
  Resolution: 'It shows a decision or promise.',
  'Role and Qualification': 'It shows a role or job.',
  Sequence: 'It shows the order of actions.',
  'Shared Knowledge': 'It talks about something both people know.',
  Similarity: 'It shows two things are alike.',
  'Soft Response': 'It gives a soft or polite answer.',
  State: 'It shows a state or condition.',
  'Strong Negation': 'It strongly says no.',
  Substitution: 'It means doing one thing instead of another.',
  'Sufficient Condition': 'It means this is enough.',
  Surprise: 'It shows surprise.',
  Tendency: 'It means something often happens.',
  Time: 'It tells when something happens.',
  Timing: 'It tells the time of an action.',
  Topic: 'It shows the topic.',
  Uncertainty: 'It shows you are not sure.',
  Wish: 'It shows what you want.',
  Worth: 'It means something is good enough to do.'
};

function getEasyCoreMeaning(lesson) {
  return easyMeaningOverrides[lesson.id] ?? lesson.coreMeaning ?? lesson.meaning;
}

function polishTopikIExplanation(explanation) {
  if (!explanation) return explanation;

  const replacements = [
    [/^Talks about the future or a guess\.$/, 'Used to talk about the future or make a guess.'],
    [/^Shows (.+)\.$/, 'Used to show $1.'],
    [/^Means (.+)\.$/, 'Used to mean $1.'],
    [/^Gives (.+)\.$/, 'Used to give $1.'],
    [/^Says (.+)\.$/, 'Used to say $1.'],
    [/^Asks (.+)\.$/, 'Used to ask $1.'],
    [/^Connects (.+)\.$/, 'Used to connect $1.'],
    [/^Compares (.+)\.$/, 'Used to compare $1.'],
    [/^Tells (.+)\.$/, 'Used to tell $1.'],
    [/^Makes (.+)\.$/, 'Used to make $1.'],
    [/^Checks (.+)\.$/, 'Used to check $1.'],
    [/^Softly starts (.+)\.$/, 'Used to softly start $1.'],
    [/^Softly says (.+)\.$/, 'Used to softly say $1.'],
    [/^Use for (.+)\.$/, 'Used for $1.'],
    [/^Use to (.+)\.$/, 'Used to $1.'],
    [/^Polite request or command\.$/, 'Used as a polite request or command.'],
    [/^Formal polite request or command\.$/, 'Used as a formal polite request or command.'],
    [/^Formal polite question ending\.$/, 'Used as a formal polite question ending.'],
    [/^Formal polite statement ending\.$/, 'Used as a formal polite statement ending.'],
    [/^Informal polite sentence ending\.$/, 'Used as an informal polite sentence ending.']
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(explanation)) {
      return explanation.replace(pattern, replacement);
    }
  }

  return explanation;
}

function getEasyExplanation(lesson, coreMeaning) {
  if (lesson.explanation) {
    return lesson.level === 'TOPIK I'
      ? polishTopikIExplanation(lesson.explanation)
      : lesson.explanation;
  }

  const tip = easyCategoryTips[lesson.category] ?? 'Use it in a sentence to show this meaning.';
  return `${lesson.pattern} expresses ${coreMeaning}. ${tip}`;
}

const usageOverrides = {
  'grammar-001': {
    verb: 'V-느라고',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs only. Usually the result is negative or unintended.'
  },
  'grammar-002': {
    verb: 'V-기는 하지만',
    adjective: 'A-기는 하지만',
    noun: 'N이기는 하지만',
    note: 'Attach -기는 하지만 to the predicate stem; nouns use 이다.'
  },
  'grammar-003': {
    verb: 'V-고자',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Formal purpose expression used with action verbs.'
  },
  'grammar-004': {
    verb: 'V-는 셈이다 / V-(으)ㄹ 셈이다',
    adjective: 'A-(으)ㄴ 셈이다 / A-(으)ㄹ 셈이다',
    noun: 'N인 셈이다 / N일 셈이다',
    note: 'Present interpretation uses -는/-은/인; intention commonly uses -(으)ㄹ.'
  },
  'grammar-012': {
    verb: 'V-는 모양이다 / V-(으)ㄹ 모양이다',
    adjective: 'A-(으)ㄴ 모양이다 / A-(으)ㄹ 모양이다',
    noun: 'N인 모양이다 / N일 모양이다',
    note: 'Use the tense form that matches the inferred situation.'
  },
  'grammar-013': {
    verb: 'V-는 줄 몰랐다 / V-(으)ㄹ 줄 몰랐다',
    adjective: 'A-(으)ㄴ 줄 몰랐다 / A-(으)ㄹ 줄 몰랐다',
    noun: 'N인 줄 몰랐다 / N일 줄 몰랐다',
    note: 'For ability, use V-(으)ㄹ 줄 몰랐다.'
  },
  'grammar-014': {
    verb: 'V-는 줄 알았다 / V-(으)ㄹ 줄 알았다',
    adjective: 'A-(으)ㄴ 줄 알았다 / A-(으)ㄹ 줄 알았다',
    noun: 'N인 줄 알았다 / N일 줄 알았다',
    note: 'For ability, use V-(으)ㄹ 줄 알았다.'
  },
  'grammar-015': {
    verb: 'V-는지 / V-(으)ㄹ지',
    adjective: 'A-(으)ㄴ지 / A-(으)ㄹ지',
    noun: 'N인지 / N일지',
    note: 'Use for uncertainty or embedded questions.'
  },
  'grammar-019': {
    verb: 'Usually use V-나 보다',
    adjective: 'A-(으)ㄴ가 보다',
    noun: 'N인가 보다',
    note: 'This lesson focuses on the adjective/noun form.'
  },
  'grammar-040': {
    verb: 'V-(으)라고 하다',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Indirect command form; use with action verbs.'
  },
  'grammar-044': {
    verb: 'V-(으)ㅁ으로 인해(서)',
    adjective: 'A-(으)ㅁ으로 인해(서)',
    noun: 'N(으)로 인해(서)',
    note: 'Nouns attach directly with 으로/로; predicates are nominalized with -(으)ㅁ.'
  },
  'grammar-045': {
    verb: 'Not used',
    adjective: 'Not used',
    noun: 'N(으)로서',
    note: 'Use only for role, status, position, or qualification.'
  },
  'grammar-049': {
    verb: 'Not used',
    adjective: 'Not used',
    noun: 'N이나 N이나 할 것 없이',
    note: 'Use with nouns to mean there is no distinction between groups.'
  },
  'grammar-051': {
    verb: 'V-게 하다',
    adjective: 'A-게 하다',
    noun: 'N이게 하다',
    note: 'Causative pattern; nouns require 이다 before -게.'
  },
  'grammar-055': {
    verb: 'V-고 말고요',
    adjective: 'A-고 말고요',
    noun: 'N이고 말고요',
    note: 'Spoken emphatic agreement.'
  },
  'grammar-056': {
    verb: 'V-고 말다',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs for completion or an unwanted final result.'
  },
  'grammar-063': {
    verb: 'V-기 마련이다',
    adjective: 'A-기 마련이다 / A-게 마련이다',
    noun: 'N이기 마련이다',
    note: 'Use -기 broadly; -게 마련이다 is common with adjectives for natural states.'
  },
  'grammar-064': {
    verb: 'V-기는요',
    adjective: 'A-기는요',
    noun: 'N이기는요',
    note: 'Spoken modest denial or soft disagreement.'
  },
  'grammar-065': {
    verb: 'V-기만 하면 되다',
    adjective: 'A-기만 하면 되다',
    noun: 'N이기만 하면 되다',
    note: 'Use when one condition is sufficient.'
  },
  'grammar-066': {
    verb: 'V-기에는',
    adjective: 'A-기에는',
    noun: 'N이기에는',
    note: 'Often followed by evaluative words such as 어렵다, 쉽다, 이르다, 늦다.'
  },
  'grammar-067': {
    verb: 'V-길래',
    adjective: 'A-길래',
    noun: 'N이길래',
    note: 'Spoken reason based on something noticed or experienced.'
  },
  'grammar-068': {
    verb: 'V-는 척하다',
    adjective: 'A-(으)ㄴ 척하다',
    noun: 'N인 척하다',
    note: 'Use present descriptive/adjectival form before 척하다.'
  },
  'grammar-069': {
    verb: 'V-ㄴ/는다',
    adjective: 'A-다',
    noun: 'N이다',
    note: 'Plain declarative style; action verbs use ㄴ/는다.'
  },
  'grammar-070': {
    verb: 'V-ㄴ/는다거나',
    adjective: 'A-다거나',
    noun: 'N이라거나',
    note: 'Use to list examples or possible statements.'
  },
  'grammar-071': {
    verb: 'V-ㄴ/는다고 치다',
    adjective: 'A-다고 치다',
    noun: 'N이라고 치다',
    note: 'Use when assuming something for discussion.'
  },
  'grammar-072': {
    verb: 'V-ㄴ/는다고 하다',
    adjective: 'A-다고 하다',
    noun: 'N이라고 하다',
    note: 'Indirect quotation. Action verbs use ㄴ/는다고.'
  },
  'grammar-073': {
    verb: 'V-ㄴ/는다고 해도',
    adjective: 'A-다고 해도',
    noun: 'N이라고 해도',
    note: 'Concessive quoted/hypothetical pattern.'
  },
  'grammar-074': {
    verb: 'V-ㄴ/는다고요?',
    adjective: 'A-다고요?',
    noun: 'N이라고요?',
    note: 'Spoken confirmation or repetition.'
  },
  'grammar-075': {
    verb: 'V-ㄴ/는다니',
    adjective: 'A-다니',
    noun: 'N이라니',
    note: 'Reaction to surprising or newly heard information.'
  },
  'grammar-076': {
    verb: 'V-ㄴ/는다니까',
    adjective: 'A-다니까',
    noun: 'N이라니까',
    note: 'Strong repetition or reported reason.'
  },
  'grammar-077': {
    verb: 'V-ㄴ/는다더니',
    adjective: 'A-다더니',
    noun: 'N이라더니',
    note: 'Contrasts current reality with previously heard information.'
  },
  'grammar-078': {
    verb: 'V-ㄴ/는다더라',
    adjective: 'A-다더라',
    noun: 'N이라더라',
    note: 'Casual reported speech from what the speaker heard.'
  },
  'grammar-079': {
    verb: 'V-ㄴ/는다던데',
    adjective: 'A-다던데',
    noun: 'N이라던데',
    note: 'Heard information used as background.'
  },
  'grammar-080': {
    verb: 'V-ㄴ/는다면',
    adjective: 'A-다면',
    noun: 'N이라면',
    note: 'Hypothetical condition.'
  },
  'grammar-081': {
    verb: 'V-ㄴ/는다면서요?',
    adjective: 'A-다면서요?',
    noun: 'N이라면서요?',
    note: 'Use to confirm information you heard.'
  },
  'grammar-082': {
    verb: 'V-나 보다',
    adjective: 'Usually use A-(으)ㄴ가 보다',
    noun: 'Usually use N인가 보다',
    note: 'This form is most common with action verbs and 있다/없다.'
  },
  'grammar-083': {
    verb: 'V-나(요)?',
    adjective: 'A-(으)ㄴ가(요)? / A-나요?',
    noun: 'N인가(요)?',
    note: 'Action verbs commonly use -나요?; adjectives often use -(으)ㄴ가요? or -나요? in speech.'
  },
  'grammar-084': {
    verb: 'V-느냐고 하다 / V-냐고 하다',
    adjective: 'A-(으)냐고 하다',
    noun: 'N이냐고 하다',
    note: 'Indirect question quotation. In speech, -냐고 is commonly used across predicate types.'
  },
  'grammar-085': {
    verb: 'V-는 도중에',
    adjective: 'Not used',
    noun: 'N 도중에',
    note: 'Use with action verbs or nouns that describe an event/process, such as 회의 도중에.'
  },
  'grammar-086': {
    verb: 'V-는 길에',
    adjective: 'Not used',
    noun: 'N 가는/오는 길에',
    note: 'Use with movement verbs, especially 가다, 오다, 돌아오다.'
  },
  'grammar-087': {
    verb: 'V-는 대로',
    adjective: 'A-(으)ㄴ 대로',
    noun: 'N인 대로',
    note: 'For “as soon as,” use action verbs. For “just as,” adjectives/nouns can also be used.'
  },
  'grammar-088': {
    verb: 'V-는 대신에',
    adjective: 'A-(으)ㄴ 대신에',
    noun: 'N 대신에',
    note: 'Use to show substitution, compensation, or contrast.'
  },
  'grammar-089': {
    verb: 'V-는 덕분에 / V-(으)ㄴ 덕분에',
    adjective: 'A-(으)ㄴ 덕분에',
    noun: 'N 덕분에',
    note: 'Use for positive results. Past/completed actions often use -(으)ㄴ 덕분에.'
  },
  'grammar-090': {
    verb: 'V-는 바람에 / V-(으)ㄴ 바람에',
    adjective: 'A-(으)ㄴ 바람에',
    noun: 'N인 바람에',
    note: 'Use for unexpected causes, usually with negative results.'
  },
  'grammar-091': {
    verb: 'V-는 사이에',
    adjective: 'A-(으)ㄴ 사이에',
    noun: 'N인 사이에',
    note: 'Use when something happens during an ongoing action or state.'
  },
  'grammar-092': {
    verb: 'V-는 셈 치다 / V-(으)ㄴ 셈 치다',
    adjective: 'A-(으)ㄴ 셈 치다',
    noun: 'N인 셈 치다',
    note: 'Use to mentally treat or assume something as a certain situation.'
  },
  'grammar-093': {
    verb: 'V-는 수가 있다',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs to warn of a possible undesirable result.'
  },
  'grammar-094': {
    verb: 'V-는 수밖에 없다',
    adjective: 'A-(으)ㄴ 수밖에 없다',
    noun: 'N인 수밖에 없다',
    note: 'Use when no other choice or interpretation is possible.'
  },
  'grammar-095': {
    verb: 'V-는 중이다',
    adjective: 'Not used',
    noun: 'N 중이다',
    note: 'Use with action verbs or event nouns, such as 회의 중이다.'
  },
  'grammar-096': {
    verb: 'V-는 통에',
    adjective: 'A-(으)ㄴ 통에',
    noun: 'N인 통에',
    note: 'Use for disruptive causes that lead to an inconvenient result.'
  },
  'grammar-097': {
    verb: 'V-는 편이다',
    adjective: 'A-(으)ㄴ 편이다',
    noun: 'N인 편이다',
    note: 'Use to describe a general tendency or relative characteristic.'
  },
  'grammar-098': {
    verb: 'V-는 한',
    adjective: 'A-(으)ㄴ 한',
    noun: 'N인 한',
    note: 'Means “as long as” a condition remains true.'
  },
  'grammar-099': {
    verb: 'V-는 한편',
    adjective: 'A-(으)ㄴ 한편',
    noun: 'N인 한편',
    note: 'Use to show simultaneous addition or contrast.'
  },
  'grammar-100': {
    verb: 'V-기는커녕 / V-는커녕',
    adjective: 'A기는커녕 / A-(으)ㄴ커녕',
    noun: 'N은/는커녕',
    note: 'Nouns commonly use 은/는커녕. Predicates often use -기는커녕.'
  },
  'grammar-101': {
    verb: 'V-는구나',
    adjective: 'A-구나',
    noun: 'N이구나',
    note: 'Use when newly realizing or noticing something.'
  },
  'grammar-102': {
    verb: 'V-니? / V-냐?',
    adjective: 'A-(으)니? / A-(으)냐?',
    noun: 'N이니? / N이냐?',
    note: 'Casual/plain question endings. Use only in informal contexts.'
  },
  'grammar-103': {
    verb: 'V-다(가) 보니(까)',
    adjective: 'Not commonly used',
    noun: 'Not used',
    note: 'Use with action verbs for realization after repeated or continued action.'
  },
  'grammar-104': {
    verb: 'V-다(가) 보면',
    adjective: 'Not commonly used',
    noun: 'Not used',
    note: 'Use with action verbs to mean “if one keeps doing.”'
  },
  'grammar-105': {
    verb: 'V-다가',
    adjective: 'A-다가',
    noun: 'N이다가',
    note: 'With verbs, it often shows interruption or change of action. With adjectives/nouns, it shows change of state.'
  },
  'grammar-106': {
    verb: 'V-다시피',
    adjective: 'A-다시피',
    noun: 'N이다시피',
    note: 'Common fixed forms include 알다시피, 보다시피, 아시다시피.'
  },
  'grammar-107': {
    verb: 'V-는 대로 / V-(으)ㄴ 대로',
    adjective: 'A-(으)ㄴ 대로',
    noun: 'N대로',
    note: 'Use N대로 for “according to N”; use modifier forms before 대로 with predicates.'
  },
  'grammar-108': {
    verb: 'V-더군요',
    adjective: 'A-더군요',
    noun: 'N이더군요',
    note: 'Use for direct past observation or experience.'
  },
  'grammar-109': {
    verb: 'V-더니',
    adjective: 'A-더니',
    noun: 'N이더니',
    note: 'Connects a remembered observation with a result, change, or contrast.'
  },
  'grammar-110': {
    verb: 'V-더라',
    adjective: 'A-더라',
    noun: 'N이더라',
    note: 'Casual recollection based on direct experience.'
  },
  'grammar-111': {
    verb: 'V-더라고요',
    adjective: 'A-더라고요',
    noun: 'N이더라고요',
    note: 'Polite spoken recollection based on direct experience.'
  },
  'grammar-112': {
    verb: 'V-더라도',
    adjective: 'A-더라도',
    noun: 'N이더라도',
    note: 'Concessive form meaning the result will not change even under that condition.'
  },
  'grammar-113': {
    verb: 'V-던',
    adjective: 'A-던',
    noun: 'N이던',
    note: 'Past recollection modifier. Use -았/었던 when emphasizing completion.'
  },
  'grammar-114': {
    verb: 'V-던가요?',
    adjective: 'A-던가요?',
    noun: 'N이던가요?',
    note: 'Question based on uncertain memory or recollection.'
  },
  'grammar-115': {
    verb: 'V-던데',
    adjective: 'A-던데',
    noun: 'N이던데',
    note: 'Observed past information used as background.'
  },
  'grammar-116': {
    verb: 'V-도록',
    adjective: 'A-도록',
    noun: 'Not used directly',
    note: 'Use with predicates for purpose, direction, or degree. Nouns usually require a verb phrase.'
  },
  'grammar-117': {
    verb: 'V-든지',
    adjective: 'A-든지',
    noun: 'N이든지',
    note: 'Use to show free choice or multiple possible options.'
  },
  'grammar-118': {
    verb: 'V-듯이',
    adjective: 'A-듯이',
    noun: 'N이듯이',
    note: 'Use for “as/just as/as if” comparisons.'
  },
  'grammar-119': {
    verb: 'Usually use V-기라도 하다',
    adjective: 'Usually use A-기라도 하다',
    noun: 'N이라도',
    note: 'Most commonly attaches directly to nouns. Predicates usually need nominalization with -기라도.'
  },
  'grammar-120': {
    verb: 'Usually use V-는 것만 못하다',
    adjective: 'A-(으)ㄴ 것만 못하다',
    noun: 'N만 못하다',
    note: 'Most commonly used with nouns for comparison.'
  },
  'grammar-121': {
    verb: 'Limited: V-아/어 보이다 in some descriptive contexts',
    adjective: 'A-아/어 보이다',
    noun: 'Usually use N처럼 보이다 / N으로 보이다',
    note: 'Most naturally used with adjectives to describe visual impression.'
  },
  'grammar-021': {
    verb: 'V-(으)나 마나',
    adjective: 'Usually not used',
    noun: 'Usually not used',
    note: 'Use with action verbs to say the result is the same whether the action is done or not.'
  },
  'grammar-022': {
    verb: 'V-(으)니까요',
    adjective: 'A-(으)니까요',
    noun: 'N이니까요',
    note: 'Conversational reason ending; use after the predicate stem.'
  },
  'grammar-023': {
    verb: 'V-(으)니만큼',
    adjective: 'A-(으)니만큼',
    noun: 'N이니만큼',
    note: 'Use when the first fact naturally supports the following expectation or result.'
  },
  'grammar-041': {
    verb: 'V-(으)려다가',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs when an intended action changes or is interrupted.'
  },
  'grammar-042': {
    verb: 'V-(으)려던 참이다',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs to say someone was just about to do something.'
  },
  'grammar-043': {
    verb: 'V-(으)려면',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs to mean if one intends to do something.'
  },
  'grammar-046': {
    verb: 'V-(으)며',
    adjective: 'A-(으)며',
    noun: 'N이며',
    note: 'Formal connector for listing or simultaneous states/actions.'
  },
  'grammar-047': {
    verb: 'V-(으)면 되다',
    adjective: 'A-(으)면 되다',
    noun: 'N이면 되다',
    note: 'Use to say a condition is sufficient.'
  },
  'grammar-048': {
    verb: 'V-(으)므로',
    adjective: 'A-(으)므로',
    noun: 'N이므로',
    note: 'Formal reason connector used often in writing and notices.'
  },
  'grammar-050': {
    verb: 'V-거든',
    adjective: 'A-거든',
    noun: 'N이거든',
    note: 'Spoken conditional or background reason; attach to the predicate stem.'
  },
  'grammar-058': {
    verb: 'V-곤 하다',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs to describe a repeated past habit.'
  },
  'grammar-122': {
    verb: 'V-아/어서 그런지',
    adjective: 'A-아/어서 그런지',
    noun: 'N이라서 그런지',
    note: 'Use when guessing the reason for a result.'
  },
  'grammar-123': {
    verb: 'V-아/어도',
    adjective: 'A-아/어도',
    noun: 'N이어도/여도',
    note: 'Use to mean the following result is true even under that condition.'
  },
  'grammar-124': {
    verb: 'V-아/어라',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Plain imperative ending; use carefully because it can sound direct.'
  },
  'grammar-125': {
    verb: 'V-아/어야',
    adjective: 'A-아/어야',
    noun: 'N이어야/여야',
    note: 'Marks a necessary condition; often appears as -아/어야 하다.'
  },
  'grammar-126': {
    verb: 'V-아/어야지',
    adjective: 'A-아/어야지',
    noun: 'N이어야지/여야지',
    note: 'Use for resolution, reminder, or mild advice.'
  },
  'grammar-127': {
    verb: 'Usually use V-게 되다',
    adjective: 'A-아/어지다',
    noun: 'Usually not used',
    note: 'Most commonly attaches to adjectives to show change of state.'
  },
  'grammar-128': {
    verb: 'V-았/었더라면',
    adjective: 'A-았/었더라면',
    noun: 'N이었더라면',
    note: 'Use for an unreal past condition, often with regret.'
  },
  'grammar-129': {
    verb: 'V-았/었던 것 같다',
    adjective: 'A-았/었던 것 같다',
    noun: 'N이었던 것 같다',
    note: 'Use to softly recall or guess about a completed past event/state.'
  },
  'grammar-130': {
    verb: 'V-았/었으면 하다',
    adjective: 'A-았/었으면 하다',
    noun: 'N이었으면 하다',
    note: 'Use to express a hope or wish.'
  },
  'grammar-131': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N(이)야말로',
    note: 'Attach to nouns to strongly emphasize the best or clearest example.'
  },
  'grammar-132': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N에 관해(서)',
    note: 'Use after nouns for the topic of discussion, writing, or research.'
  },
  'grammar-133': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N에 대해(서)',
    note: 'Use after nouns to mean about or concerning.'
  },
  'grammar-134': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N에 따라(서)',
    note: 'Use after a standard, rule, situation, or condition.'
  },
  'grammar-135': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N에 의해(서)',
    note: 'Formal expression for by or due to a cause/agent.'
  },
  'grammar-136': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N에다(가)',
    note: 'Use after nouns to add something to a place, item, or situation.'
  },
  'grammar-137': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N을/를 비롯한 N',
    note: 'Use before another noun to mean including N as a representative example.'
  },
  'grammar-138': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N을/를 통해(서)',
    note: 'Use after nouns to show the method, channel, or experience.'
  },
  'grammar-139': {
    verb: 'V-자',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs to mean as soon as the first action happens.'
  },
  'grammar-140': {
    verb: 'V-자고 하다',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Indirect quotation for suggestions or invitations.'
  },
  'grammar-141': {
    verb: 'V-자마자',
    adjective: 'Not used',
    noun: 'Not used',
    note: 'Use with action verbs to mean immediately after.'
  },
  'grammar-142': {
    verb: 'V-잖아요',
    adjective: 'A-잖아요',
    noun: 'N이잖아요',
    note: 'Spoken reminder for shared or obvious information.'
  },
  'grammar-143': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N마저',
    note: 'Attach to nouns to mean even the last/unexpected item.'
  },
  'grammar-144': {
    verb: 'V-(으)ㄴ/는 만큼',
    adjective: 'A-(으)ㄴ 만큼',
    noun: 'N만큼',
    note: 'Use to compare degree, amount, or extent.'
  },
  'grammar-145': {
    verb: '아무 V-거나',
    adjective: '아무 A-(으)ㄴ 것이나',
    noun: '아무 N(이)나',
    note: 'Use for free choice when any option is acceptable.'
  },
  'grammar-146': {
    verb: '아무 V-지도 않다',
    adjective: '아무 A-지도 않다',
    noun: '아무 N도 + negative',
    note: 'Use with a negative expression to mean not any.'
  },
  'grammar-148': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N조차',
    note: 'Attach to nouns to emphasize even something basic or expected.'
  },
  'grammar-149': {
    verb: 'Not used directly',
    adjective: 'Not used directly',
    noun: 'N치고(는)',
    note: 'Use after nouns to evaluate something against normal expectations for that group.'
  }
};

const topikIUsageOverrides = Object.fromEntries([
  ['001', 'Not used directly', 'Not used directly', 'N이/가', 'Use after a noun to show the subject.'],
  ['002', 'Not used directly', 'Not used directly', 'N은/는', 'Use after a noun to show the topic.'],
  ['003', 'Not used directly', 'Not used directly', 'N을/를', 'Use after a noun to show the object.'],
  ['004', 'Not used directly', 'Not used directly', 'N와/과 N', 'Use between two nouns.'],
  ['005', 'Not used directly', 'Not used directly', 'N(이)랑 N', 'Use between two nouns in speech.'],
  ['006', 'Not used directly', 'Not used directly', 'N(이)랑', 'Use after a noun to mean with someone.'],
  ['007', 'Not used directly', 'Not used directly', 'N하고 N', 'Use between two nouns in speech.'],
  ['008', 'Not used directly', 'Not used directly', 'N도', 'Use after a noun to mean also.'],
  ['009', 'Not used directly', 'Not used directly', 'N에', 'Use after a place or time noun.'],
  ['010', 'Not used directly', 'Not used directly', 'N에서', 'Use after a place where an action happens.'],
  ['011', 'Not used directly', 'Not used directly', 'N까지', 'Use after a noun to show the end point.'],
  ['012', 'Not used directly', 'Not used directly', 'N부터', 'Use after a noun to show the start point.'],
  ['013', 'Not used directly', 'Not used directly', 'N(으)로', 'Use after a noun for way, tool, or direction.'],
  ['014', 'Not used directly', 'Not used directly', 'N께', 'Polite form of 에게.'],
  ['015', 'Not used directly', 'Not used directly', 'N께서', 'Polite form of 이/가.'],
  ['016', 'Not used directly', 'Not used directly', 'N에게', 'Use after a person or animal.'],
  ['017', 'Not used directly', 'Not used directly', 'N에게서', 'Use after a person to mean from.'],
  ['018', 'Not used directly', 'Not used directly', 'N한테', 'Spoken form of 에게.'],
  ['019', 'Not used directly', 'Not used directly', 'N한테서', 'Spoken form of 에게서.'],
  ['020', 'Not used directly', 'Not used directly', 'N(이)나', 'Use after a noun to show choice.'],
  ['021', 'Not used directly', 'Not used directly', 'N(이)나', 'Use after a noun to show amount is more than expected.'],
  ['022', 'Not used directly', 'Not used directly', 'N(이)나', 'Use after a noun to mean or so.'],
  ['023', 'Not used directly', 'Not used directly', 'N만', 'Use after a noun to mean only.'],
  ['024', 'Not used directly', 'Not used directly', 'N의 N', 'Use between nouns to show possession or relation.'],
  ['025', 'Not used directly', 'Not used directly', 'N마다', 'Use after a noun to mean every.'],
  ['026', 'Not used directly', 'Not used directly', 'N밖에 + negative', 'Use with a negative verb to mean only.'],
  ['027', 'Not used directly', 'Not used directly', 'N보다', 'Use after the thing you compare with.'],
  ['028', 'Not used directly', 'Not used directly', 'N처럼', 'Use after a noun to mean like.'],
  ['029', 'V-(으)ㄴ 것 같다', 'A-(으)ㄴ 것 같다', 'N인 것 같다', 'Use for a guess about now or the past.'],
  ['030', 'V-(으)ㄹ 것 같다', 'A-(으)ㄹ 것 같다', 'N일 것 같다', 'Use for a guess about the future.'],
  ['031', 'V-(으)ㄴ 적이 있다', 'Not used', 'Not used', 'Use with action verbs for past experience.'],
  ['032', 'V-(으)ㄴ 적이 없다', 'Not used', 'Not used', 'Use with action verbs for no past experience.'],
  ['033', 'V-(으)ㄴ 지 + time', 'Not used', 'Not used', 'Use with action verbs to show time since an action.'],
  ['034', 'V-(으)ㄴ 지 + time', 'Not used', 'Not used', 'Use with action verbs to show time since an action.'],
  ['035', 'V-(으)ㄴ 후에', 'Not used', 'N 후에', 'Use to say after something.'],
  ['036', 'V-는데요', 'A-(으)ㄴ데요', 'N인데요', 'Use as a soft sentence ending.'],
  ['037', 'V-는데요', 'A-(으)ㄴ데요', 'N인데요', 'Use to give background softly.'],
  ['038', 'V-(으)니까', 'A-(으)니까', 'N이니까', 'Use to give a reason.'],
  ['039', 'V-(으)ㄹ 것이다', 'A-(으)ㄹ 것이다', 'N일 것이다', 'Use for future or guess.'],
  ['040', 'V-(으)ㄹ 때', 'A-(으)ㄹ 때', 'N일 때', 'Use to mean when.'],
  ['041', 'V-(으)ㄹ 수 있다', 'Not used', 'Not used', 'Use with action verbs to say can.'],
  ['042', 'V-(으)ㄹ 수 없다', 'Not used', 'Not used', 'Use with action verbs to say cannot.'],
  ['043', 'V-(으)ㄹ게요', 'Not used', 'Not used', 'Use with action verbs to make a promise.'],
  ['044', 'V-(으)ㄹ까 하다', 'Not used', 'Not used', 'Use with action verbs for a soft plan.'],
  ['045', 'V-(으)ㄹ까 봐', 'A-(으)ㄹ까 봐', 'N일까 봐', 'Use when you worry something may happen.'],
  ['046', 'V-(으)ㄹ까요?', 'A-(으)ㄹ까요?', 'N일까요?', 'Use to ask for an idea or suggestion.'],
  ['047', 'V-(으)ㄹ래요', 'Not used', 'Not used', 'Use with action verbs to say I want or I will.'],
  ['048', 'V-(으)ㄹ래요?', 'Not used', 'Not used', 'Use with action verbs to ask what someone wants.'],
  ['049', 'V-(으)러 가다', 'Not used', 'Not used', 'Use with action verbs to show purpose for going.'],
  ['050', 'V-(으)러 오다', 'Not used', 'Not used', 'Use with action verbs to show purpose for coming.'],
  ['051', 'V-(으)려고', 'Not used', 'Not used', 'Use with action verbs to show intention.'],
  ['052', 'V-(으)려고요', 'Not used', 'Not used', 'Use with action verbs to answer with a plan.'],
  ['053', 'V-(으)면', 'A-(으)면', 'N이면', 'Use to mean if.'],
  ['054', 'V-(으)면서', 'Not commonly used', 'N이면서', 'Use to show two things happen or are true together.'],
  ['055', 'V-(으)ㅂ시다', 'Not used', 'Not used', 'Use with action verbs to say let us.'],
  ['056', 'V-(으)세요', 'Not used', 'Not used', 'Use with action verbs for a polite command.'],
  ['057', 'V-(으)십시오', 'Not used', 'Not used', 'Use with action verbs for a formal command.'],
  ['058', 'V-지요?', 'A-지요?', 'N(이)지요?', 'Use to confirm something.'],
  ['059', 'V-거나', 'A-거나', 'N이거나', 'Use to mean or.'],
  ['060', 'V-게', 'A-게', 'Not used directly', 'Use to change a verb or adjective into an adverb form.'],
  ['061', 'V-게 되다', 'A-게 되다', 'Not used', 'Use to show a change or result.'],
  ['062', 'V-고', 'A-고', 'N이고', 'Use to connect two ideas.'],
  ['063', 'V-고 싶다', 'Not used', 'Not used', 'Use with action verbs to say want to.'],
  ['064', 'V-고 있다', 'Not used', 'Not used', 'Use with action verbs to show now doing.'],
  ['065', 'V-는군요', 'A-군요', 'N이군요', 'Use when you notice something.'],
  ['066', 'V-기 때문에', 'A-기 때문에', 'N이기 때문에', 'Use to give a reason.'],
  ['067', 'V-기 전에', 'Not used', 'N 전에', 'Use to say before something.'],
  ['068', 'V-기로 하다', 'Not used', 'Not used', 'Use with action verbs to say decided to.'],
  ['069', 'V-네요', 'A-네요', 'N이네요', 'Use when you notice something.'],
  ['070', 'V-는 게 좋겠다', 'Not used', 'Not used', 'Use with action verbs to give advice.'],
  ['071', 'V-는데', 'A-(으)ㄴ데', 'N인데', 'Use for background or contrast.'],
  ['072', 'V-ㅂ니까? / V-습니까?', 'A-ㅂ니까? / A-습니까?', 'N입니까?', 'Use for a formal question.'],
  ['073', 'V-ㅂ니다 / V-습니다', 'A-ㅂ니다 / A-습니다', 'N입니다', 'Use for a formal statement.'],
  ['074', 'V-아/어/여 보다', 'Not used', 'Not used', 'Use with action verbs to mean try doing.'],
  ['075', 'V-아/어/여 주다', 'Not used', 'Not used', 'Use with action verbs to mean do for someone.'],
  ['076', 'V-아/어/여야 되다', 'A-아/어/여야 되다', 'N이어야/여야 되다', 'Use to mean must.'],
  ['077', 'V-아/어/여야 하다', 'A-아/어/여야 하다', 'N이어야/여야 하다', 'Use to mean must.'],
  ['078', 'V-아/어요', 'A-아/어요', 'N이에요/예요', 'Use for polite present speech.'],
  ['079', 'V-았/었/였으면 좋겠다', 'A-았/었/였으면 좋겠다', 'N이었으면 좋겠다', 'Use to say I hope or I wish.'],
  ['080', 'V-지 말다', 'Not used', 'Not used', 'Use with action verbs to say do not.'],
  ['081', 'V-지 못하다', 'Not used', 'Not used', 'Use with action verbs to say cannot.'],
  ['082', 'V-지 않다', 'A-지 않다', 'N이/가 아니다', 'Use to make a negative sentence.'],
  ['083', 'V-지만', 'A-지만', 'N이지만', 'Use to mean but.'],
  ['084', 'Not used', 'Not used', 'N이/가 아니다', 'Use after a noun to say it is not that noun.']
].map(([num, verb, adjective, noun, note]) => [
  `topik-i-grammar-${num}`,
  { verb, adjective, noun, note }
]));

function inferUsageGuide(lesson) {
  const pattern = lesson.pattern;

  if (topikIUsageOverrides[lesson.id]) {
    return topikIUsageOverrides[lesson.id];
  }

  if (usageOverrides[lesson.id]) {
    return usageOverrides[lesson.id];
  }

  if (pattern.includes('-(으)ㄴ/는/(으)ㄹ')) {
    return {
      verb: 'V-는 / V-(으)ㄴ / V-(으)ㄹ',
      adjective: 'A-(으)ㄴ / A-(으)ㄹ',
      noun: 'N인 / N일',
      note: 'Choose the tense form that matches the meaning.'
    };
  }

  if (pattern.includes('-(으)ㄴ/는')) {
    return {
      verb: 'V-는',
      adjective: 'A-(으)ㄴ',
      noun: 'N인',
      note: 'Use the modifier form before the following noun/expression.'
    };
  }

  if (pattern.includes('-(으)ㄹ')) {
    return {
      verb: 'V-(으)ㄹ',
      adjective: 'A-(으)ㄹ',
      noun: 'N일',
      note: 'Use future/prospective modifier form.'
    };
  }

  if (pattern.includes('-(으)ㄴ')) {
    return {
      verb: 'V-(으)ㄴ',
      adjective: 'A-(으)ㄴ',
      noun: 'N인',
      note: 'Use past/completed modifier with verbs and present modifier with adjectives.'
    };
  }

  if (pattern.includes('-고')) {
    return {
      verb: 'V-고',
      adjective: 'A-고',
      noun: 'N이고',
      note: 'Attach to the predicate stem; nouns use 이다.'
    };
  }

  if (pattern.includes('-기')) {
    return {
      verb: 'V-기',
      adjective: 'A-기',
      noun: 'N이기',
      note: 'Nominalizes the predicate; nouns use 이다 before -기.'
    };
  }

  return {
    verb: 'Check lesson pattern',
    adjective: 'Check lesson pattern',
    noun: 'Check lesson pattern',
    note: 'Some grammar patterns are limited by meaning, not only by conjugation.'
  };
}

const secondExampleOverrides = {
  'grammar-001': {
    korean: '이사하느라고 주말에 쉬지 못했어요.',
    english: 'I could not rest on the weekend because I was moving.'
  },
  'grammar-002': {
    korean: '가격이 비싸기는 하지만 품질이 좋아요.',
    english: 'It is expensive, but the quality is good.'
  },
  'grammar-003': {
    korean: '문제를 해결하고자 회의를 열었습니다.',
    english: 'We held a meeting in order to solve the problem.'
  },
  'grammar-004': {
    korean: '이미 절반을 끝냈으니 거의 다 한 셈이에요.',
    english: 'Since I already finished half, it is almost like I am done.'
  },
  'grammar-005': {
    korean: '불을 켜 둔 채로 집을 나왔어요.',
    english: 'I left home with the lights still on.'
  },
  'grammar-006': {
    korean: '목소리가 쉰 걸 보니 감기에 걸린 것 같아요.',
    english: 'Seeing that your voice is hoarse, it seems you caught a cold.'
  },
  'grammar-007': {
    korean: '도서관에 가는 김에 책도 반납할게요.',
    english: 'Since I am going to the library, I will return the book too.'
  },
  'grammar-008': {
    korean: '노력한 만큼 실력도 늘 거예요.',
    english: 'Your skills will improve as much as you work hard.'
  },
  'grammar-009': {
    korean: '도시는 편리한 반면에 생활비가 비싸요.',
    english: 'The city is convenient, whereas living costs are high.'
  },
  'grammar-010': {
    korean: '열심히 연습하면 실력이 느는 법이에요.',
    english: 'If you practice hard, your skills naturally improve.'
  },
  'grammar-011': {
    korean: '눈이 많이 온 탓에 비행기가 늦었어요.',
    english: 'The plane was delayed because of the heavy snow.'
  },
  'grammar-012': {
    korean: '가방이 없는 걸 보니 이미 나간 모양이에요.',
    english: 'Seeing that the bag is gone, it seems they already left.'
  },
  'grammar-013': {
    korean: '시험이 이렇게 어려울 줄 몰랐어요.',
    english: 'I did not know the exam would be this difficult.'
  },
  'grammar-014': {
    korean: '그 길이 더 빠른 줄 알았어요.',
    english: 'I thought that road was faster.'
  },
  'grammar-015': {
    korean: '그 사람이 언제 도착할지 모르겠어요.',
    english: 'I do not know when that person will arrive.'
  },
  'grammar-016': {
    korean: '저는 커피를 못 마시는걸요.',
    english: 'Actually, I cannot drink coffee.'
  },
  'grammar-017': {
    korean: '지금 바쁜데 나중에 전화해도 될까요?',
    english: 'I am busy now, so may I call later?'
  },
  'grammar-018': {
    korean: '아무리 설명한들 그가 이해하겠어요?',
    english: 'Even if we explain it, would he understand?'
  },
  'grammar-019': {
    korean: '하늘이 흐린 걸 보니 비가 올까 봐요.',
    english: 'Seeing that the sky is cloudy, I guess it may rain.'
  },
  'grammar-020': {
    korean: '이 음식이 많이 매운가요?',
    english: 'Is this food very spicy?'
  },
  'grammar-021': {
    korean: '지금 공부하나 마나 시험에는 늦었어요.',
    english: 'Whether I study now or not, it is too late for the exam.'
  },
  'grammar-022': {
    korean: '길이 막히니까요. 조금 늦을 것 같아요.',
    english: 'Because there is traffic, I think I will be a little late.'
  },
  'grammar-023': {
    korean: '처음 하는 일이니만큼 실수할 수도 있어요.',
    english: 'Since it is your first time doing it, you may make mistakes.'
  },
  'grammar-024': {
    korean: '바람도 쐴 겸 해서 공원에 다녀왔어요.',
    english: 'I went to the park partly to get some fresh air.'
  },
  'grammar-025': {
    korean: '매일 연습했으니 실패할 리가 없어요.',
    english: 'Since you practiced every day, there is no way you will fail.'
  },
  'grammar-026': {
    korean: '이 식당은 기다려서 먹을 만해요.',
    english: 'This restaurant is worth waiting for.'
  },
  'grammar-027': {
    korean: '계단에서 넘어질 뻔했어요.',
    english: 'I almost fell on the stairs.'
  },
  'grammar-028': {
    korean: '그 영화는 재미있을 뿐만 아니라 감동적이에요.',
    english: 'That movie is not only fun but also moving.'
  },
  'grammar-029': {
    korean: '저는 사실을 말했을 뿐입니다.',
    english: 'I only told the truth.'
  },
  'grammar-030': {
    korean: '일이 많아서 야근할 수밖에 없었어요.',
    english: 'I had no choice but to work overtime because there was a lot to do.'
  },
  'grammar-031': {
    korean: '목소리가 들리지 않을 정도로 시끄러웠어요.',
    english: 'It was so noisy that I could not hear the voice.'
  },
  'grammar-032': {
    korean: '일이 밀려서 주말에도 일해야 할 지경이에요.',
    english: 'Work has piled up to the point that I have to work on the weekend.'
  },
  'grammar-033': {
    korean: '제가 먼저 갈 테니까 천천히 오세요.',
    english: 'I will go first, so please come slowly.'
  },
  'grammar-034': {
    korean: '비가 올 텐데 우산을 가져가세요.',
    english: 'It will probably rain, so take an umbrella.'
  },
  'grammar-035': {
    korean: '그때 솔직하게 말할걸 그랬어요.',
    english: 'I should have spoken honestly then.'
  },
  'grammar-036': {
    korean: '새 노트북을 살까 말까 생각 중이에요.',
    english: 'I am thinking about whether to buy a new laptop or not.'
  },
  'grammar-037': {
    korean: '이 책은 읽을수록 더 깊이가 느껴져요.',
    english: 'The more I read this book, the more depth I feel.'
  },
  'grammar-038': {
    korean: '길이 미끄러울지도 모르니까 조심하세요.',
    english: 'The road might be slippery, so be careful.'
  },
  'grammar-039': {
    korean: '결과가 좋지 않을지라도 끝까지 해 보겠습니다.',
    english: 'Even if the result is not good, I will try until the end.'
  },
  'grammar-040': {
    korean: '친구가 저녁에 같이 먹자고 했어요.',
    english: 'My friend said we should eat dinner together.'
  },
  'grammar-041': {
    korean: '운동을 시작하려다가 시간이 없어서 못 했어요.',
    english: 'I was going to start exercising, but I could not because I had no time.'
  },
  'grammar-042': {
    korean: '마침 점심을 먹으려던 참이었어요.',
    english: 'I was just about to eat lunch.'
  },
  'grammar-043': {
    korean: '좋은 점수를 받으려면 복습을 자주 해야 해요.',
    english: 'If you want to get a good score, you need to review often.'
  },
  'grammar-044': {
    korean: '공사로 인해 지하철 운행이 지연되었습니다.',
    english: 'Subway service was delayed due to construction.'
  },
  'grammar-045': {
    korean: '대표로서 책임감을 가져야 합니다.',
    english: 'As a representative, you must have a sense of responsibility.'
  },
  'grammar-046': {
    korean: '그 사람은 능력이 뛰어나며 성격도 좋아요.',
    english: 'That person is capable and also has a good personality.'
  },
  'grammar-047': {
    korean: '궁금한 점은 이메일로 물어보면 됩니다.',
    english: 'If you have questions, you just need to ask by email.'
  },
  'grammar-048': {
    korean: '날씨가 추우므로 따뜻하게 입으세요.',
    english: 'Since the weather is cold, please dress warmly.'
  },
  'grammar-049': {
    korean: '남녀나 나이나 할 것 없이 모두 참여할 수 있어요.',
    english: 'Everyone can participate regardless of gender or age.'
  },
  'grammar-050': {
    korean: '문제가 있거든 바로 연락하세요.',
    english: 'If there is a problem, contact me right away.'
  },
  'grammar-051': {
    korean: '부모님은 제가 일찍 자게 하셨어요.',
    english: 'My parents made me go to bed early.'
  },
  'grammar-052': {
    korean: '설명을 듣고 나니까 이해가 됐어요.',
    english: 'After listening to the explanation, I understood.'
  },
  'grammar-053': {
    korean: '청소를 하고 나면 기분이 좋아져요.',
    english: 'After cleaning, I feel better.'
  },
  'grammar-054': {
    korean: '회의가 끝나고 나서 다시 전화드릴게요.',
    english: 'I will call you again after the meeting ends.'
  },
  'grammar-055': {
    korean: '물론 도와드리고 말고요.',
    english: 'Of course I will help you.'
  },
  'grammar-056': {
    korean: '결국 계획을 포기하고 말았어요.',
    english: 'In the end, I gave up the plan.'
  },
  'grammar-057': {
    korean: '지나고 보면 그때가 좋은 경험이었어요.',
    english: 'Looking back, that time was a good experience.'
  },
  'grammar-058': {
    korean: '어릴 때 가족과 자주 여행을 가곤 했어요.',
    english: 'When I was young, I used to travel often with my family.'
  },
  'grammar-059': {
    korean: '겨울에는 감기에 걸리기 쉬워요.',
    english: 'It is easy to catch a cold in winter.'
  },
  'grammar-060': {
    korean: '준비 없이 시작하면 실패하기 십상이에요.',
    english: 'If you start without preparation, you are likely to fail.'
  },
  'grammar-061': {
    korean: '이 내용은 혼자 이해하기 어려워요.',
    english: 'This content is difficult to understand alone.'
  },
  'grammar-062': {
    korean: '취업하기 위해서 자격증을 준비하고 있어요.',
    english: 'I am preparing a certificate in order to get a job.'
  },
  'grammar-063': {
    korean: '노력하면 결과가 좋아지기 마련이에요.',
    english: 'If you make an effort, the result is bound to improve.'
  },
  'grammar-064': {
    korean: '제가 화를 내기는요. 그냥 걱정했어요.',
    english: 'Me, angry? I was just worried.'
  },
  'grammar-065': {
    korean: '버튼을 누르기만 하면 예약이 완료됩니다.',
    english: 'You only need to press the button for the reservation to be completed.'
  },
  'grammar-066': {
    korean: '혼자 하기에는 일이 너무 많아요.',
    english: 'There is too much work to do alone.'
  },
  'grammar-067': {
    korean: '길이 막히길래 지하철을 탔어요.',
    english: 'Since there was traffic, I took the subway.'
  },
  'grammar-068': {
    korean: '모르는 척하지 말고 솔직히 말하세요.',
    english: 'Do not pretend not to know, and speak honestly.'
  },
  'grammar-069': {
    korean: '나는 매일 아침 일찍 일어난다.',
    english: 'I wake up early every morning.'
  },
  'grammar-070': {
    korean: '책을 읽는다거나 음악을 들으면서 쉬어요.',
    english: 'I rest by doing things like reading books or listening to music.'
  },
  'grammar-071': {
    korean: '그 말이 사실이라고 쳐도 문제는 남아 있어요.',
    english: 'Even assuming that statement is true, the problem remains.'
  },
  'grammar-072': {
    korean: '뉴스에서 내일 눈이 온다고 했어요.',
    english: 'The news said it will snow tomorrow.'
  },
  'grammar-073': {
    korean: '시간이 부족하다고 해도 포기하면 안 돼요.',
    english: 'Even if you do not have enough time, you should not give up.'
  },
  'grammar-074': {
    korean: '뭐라고요? 지금 출발한다고요?',
    english: 'What? You are leaving now?'
  },
  'grammar-075': {
    korean: '그 사람이 회사를 그만둔다니 정말 놀랐어요.',
    english: 'I was really surprised to hear that he is quitting the company.'
  },
  'grammar-076': {
    korean: '시간이 없다니까 빨리 준비하세요.',
    english: 'I said there is no time, so get ready quickly.'
  },
  'grammar-077': {
    korean: '운동을 시작한다더니 아직도 안 했어요?',
    english: 'You said you were starting to exercise, but you still have not?'
  },
  'grammar-078': {
    korean: '친구가 다음 달에 결혼한다더라.',
    english: 'I heard my friend is getting married next month.'
  },
  'grammar-079': {
    korean: '그 식당이 맛있다던데 같이 가 볼까요?',
    english: 'I heard that restaurant is good, so shall we go together?'
  },
  'grammar-080': {
    korean: '시간이 된다면 같이 산책하고 싶어요.',
    english: 'If I have time, I would like to take a walk together.'
  },
  'grammar-081': {
    korean: '이번 프로젝트에 참여한다면서요?',
    english: 'I heard you are participating in this project, right?'
  },
  'grammar-082': {
    korean: '창문이 열려 있는 걸 보니 누가 왔나 봐요.',
    english: 'Seeing that the window is open, it seems someone came.'
  },
  'grammar-083': {
    korean: '요즘 회사 일이 많이 바쁜가요?',
    english: 'Are things very busy at work these days?'
  },
  'grammar-084': {
    korean: '동생이 언제 오냐고 했어요.',
    english: 'My younger sibling asked when you are coming.'
  },
  'grammar-085': {
    korean: '수업을 듣는 도중에 전화가 왔어요.',
    english: 'I got a call while I was taking class.'
  },
  'grammar-086': {
    korean: '집에 가는 길에 우유를 사 왔어요.',
    english: 'I bought milk on my way home.'
  },
  'grammar-087': {
    korean: '회의가 끝나는 대로 결과를 알려 드리겠습니다.',
    english: 'I will let you know the result as soon as the meeting ends.'
  },
  'grammar-088': {
    korean: '커피를 마시는 대신에 차를 마셨어요.',
    english: 'I drank tea instead of coffee.'
  },
  'grammar-089': {
    korean: '친구가 도와준 덕분에 일을 빨리 끝냈어요.',
    english: 'Thanks to my friend helping me, I finished the work quickly.'
  },
  'grammar-090': {
    korean: '늦잠을 자는 바람에 버스를 놓쳤어요.',
    english: 'Because I overslept, I missed the bus.'
  },
  'grammar-091': {
    korean: '잠깐 나간 사이에 택배가 왔어요.',
    english: 'A package arrived while I briefly went out.'
  },
  'grammar-092': {
    korean: '이번 일은 좋은 경험을 하는 셈 치고 해 보세요.',
    english: 'Try doing this as if you are getting good experience.'
  },
  'grammar-093': {
    korean: '비밀번호를 잊어버리는 수가 있으니 적어 두세요.',
    english: 'You might forget the password, so write it down.'
  },
  'grammar-094': {
    korean: '약속을 지키려면 서두르는 수밖에 없어요.',
    english: 'If we want to keep the appointment, we have no choice but to hurry.'
  },
  'grammar-095': {
    korean: '저는 지금 보고서를 쓰는 중이에요.',
    english: 'I am writing a report now.'
  },
  'grammar-096': {
    korean: '비가 많이 오는 통에 행사가 취소됐어요.',
    english: 'Because it rained heavily, the event was canceled.'
  },
  'grammar-097': {
    korean: '저는 잠을 일찍 자는 편이에요.',
    english: 'I tend to go to bed early.'
  },
  'grammar-098': {
    korean: '건강한 한 계속 일을 하고 싶어요.',
    english: 'As long as I am healthy, I want to keep working.'
  },
  'grammar-099': {
    korean: '그는 회사에 다니는 한편 대학원도 다녀요.',
    english: 'He works at a company while also attending graduate school.'
  },
  'grammar-100': {
    korean: '칭찬은커녕 오히려 혼이 났어요.',
    english: 'Far from being praised, I was scolded instead.'
  },
  'grammar-101': {
    korean: '벌써 봄이 왔구나.',
    english: 'Oh, spring has already come.'
  },
  'grammar-102': {
    korean: '너 지금 뭐 하니?',
    english: 'What are you doing now?'
  },
  'grammar-103': {
    korean: '매일 운동하다 보니까 몸이 가벼워졌어요.',
    english: 'As I exercised every day, my body became lighter.'
  },
  'grammar-104': {
    korean: '계속 연습하다 보면 익숙해질 거예요.',
    english: 'If you keep practicing, you will get used to it.'
  },
  'grammar-105': {
    korean: '책을 읽다가 잠이 들었어요.',
    english: 'I fell asleep while reading a book.'
  },
  'grammar-106': {
    korean: '선생님도 말씀하시다시피 복습이 중요해요.',
    english: 'As the teacher also said, review is important.'
  },
  'grammar-107': {
    korean: '계획한 대로 여행을 다녀왔어요.',
    english: 'I went on the trip as planned.'
  },
  'grammar-108': {
    korean: '그 식당 음식이 정말 맛있더군요.',
    english: 'I found that the food at that restaurant was really good.'
  },
  'grammar-109': {
    korean: '아침에는 맑더니 오후에는 비가 왔어요.',
    english: 'It was clear in the morning, but it rained in the afternoon.'
  },
  'grammar-110': {
    korean: '그 사람이 벌써 떠났더라.',
    english: 'I found out that person had already left.'
  },
  'grammar-111': {
    korean: '생각보다 시험이 어렵더라고요.',
    english: 'The exam was harder than I expected.'
  },
  'grammar-112': {
    korean: '힘들더라도 끝까지 포기하지 마세요.',
    english: 'Even if it is hard, do not give up until the end.'
  },
  'grammar-113': {
    korean: '예전에 살던 동네에 다시 가 봤어요.',
    english: 'I visited the neighborhood where I used to live.'
  },
  'grammar-114': {
    korean: '그 일이 언제였던가요?',
    english: 'When was that again?'
  },
  'grammar-115': {
    korean: '밖이 춥던데 코트를 입고 가세요.',
    english: 'It was cold outside, so wear a coat.'
  },
  'grammar-116': {
    korean: '아이들이 이해하도록 천천히 설명했어요.',
    english: 'I explained slowly so the children could understand.'
  },
  'grammar-117': {
    korean: '주말에는 영화를 보든지 집에서 쉬든지 하려고요.',
    english: 'On the weekend, I plan to either watch a movie or rest at home.'
  },
  'grammar-118': {
    korean: '친구가 말하듯이 건강이 제일 중요해요.',
    english: 'As my friend says, health is the most important.'
  },
  'grammar-119': {
    korean: '바쁘면 문자라도 보내 주세요.',
    english: 'If you are busy, please at least send a text.'
  },
  'grammar-120': {
    korean: '이 방법은 예전 방법만 못해요.',
    english: 'This method is not as good as the old one.'
  },
  'grammar-121': {
    korean: '새 옷을 입으니까 더 어려 보여요.',
    english: 'You look younger wearing the new clothes.'
  },
  'grammar-122': {
    korean: '잠을 못 자서 그런지 머리가 아파요.',
    english: 'Maybe because I could not sleep, my head hurts.'
  },
  'grammar-123': {
    korean: '비가 와도 축제는 예정대로 열립니다.',
    english: 'Even if it rains, the festival will be held as scheduled.'
  },
  'grammar-124': {
    korean: '선생님께서 조용히 하라고 하셨어요.',
    english: 'The teacher told us to be quiet.'
  },
  'grammar-125': {
    korean: '일찍 출발해야 늦지 않아요.',
    english: 'You have to leave early in order not to be late.'
  },
  'grammar-126': {
    korean: '내일은 꼭 병원에 가야지요.',
    english: 'You really should go to the hospital tomorrow.'
  },
  'grammar-127': {
    korean: '운동을 시작한 후 몸이 건강해졌어요.',
    english: 'After starting exercise, my body became healthier.'
  },
  'grammar-128': {
    korean: '그때 더 열심히 했더라면 결과가 달랐을 거예요.',
    english: 'If I had worked harder then, the result would have been different.'
  },
  'grammar-129': {
    korean: '어제 그 사람이 많이 피곤했던 것 같아요.',
    english: 'I think that person was very tired yesterday.'
  },
  'grammar-130': {
    korean: '부모님이 오래오래 건강하셨으면 해요.',
    english: 'I hope my parents stay healthy for a long time.'
  },
  'grammar-131': {
    korean: '오늘이야말로 새롭게 시작하기 좋은 날이에요.',
    english: 'Today is truly a good day to start anew.'
  },
  'grammar-132': {
    korean: '한국 역사에 관해서 발표할 예정입니다.',
    english: 'I plan to give a presentation about Korean history.'
  },
  'grammar-133': {
    korean: '그 문제에 대해 더 이야기해 봅시다.',
    english: 'Let us talk more about that issue.'
  },
  'grammar-134': {
    korean: '계절에 따라 입는 옷이 달라져요.',
    english: 'The clothes people wear change depending on the season.'
  },
  'grammar-135': {
    korean: '이 작품은 많은 사람들에 의해 완성되었습니다.',
    english: 'This work was completed by many people.'
  },
  'grammar-136': {
    korean: '국에다 밥을 넣어서 먹었어요.',
    english: 'I put rice into the soup and ate it.'
  },
  'grammar-137': {
    korean: '서울을 비롯한 여러 도시에서 행사가 열렸어요.',
    english: 'Events were held in several cities, including Seoul.'
  },
  'grammar-138': {
    korean: '인터넷을 통해서 필요한 정보를 찾았어요.',
    english: 'I found the needed information through the internet.'
  },
  'grammar-139': {
    korean: '문을 열자 찬바람이 들어왔어요.',
    english: 'As soon as I opened the door, cold wind came in.'
  },
  'grammar-140': {
    korean: '친구가 주말에 등산 가자고 했어요.',
    english: 'My friend suggested going hiking this weekend.'
  },
  'grammar-141': {
    korean: '수업이 끝나자마자 집에 갔어요.',
    english: 'As soon as class ended, I went home.'
  },
  'grammar-142': {
    korean: '어제 같이 이야기했잖아요.',
    english: 'You know, we talked about it together yesterday.'
  },
  'grammar-143': {
    korean: '친한 친구마저 제 말을 믿지 않았어요.',
    english: 'Even my close friend did not believe what I said.'
  },
  'grammar-144': {
    korean: '기대한 만큼 결과가 좋았어요.',
    english: 'The result was as good as I expected.'
  },
  'grammar-145': {
    korean: '배가 고프면 아무거나 먹어도 돼요.',
    english: 'If you are hungry, you can eat anything.'
  },
  'grammar-146': {
    korean: '아무도 그 사실을 몰랐어요.',
    english: 'Nobody knew that fact.'
  },
  'grammar-147': {
    korean: '얼마나 바쁜지 점심도 못 먹었어요.',
    english: 'I was so busy that I could not even eat lunch.'
  },
  'grammar-148': {
    korean: '가족조차 제 결정을 이해하지 못했어요.',
    english: 'Even my family could not understand my decision.'
  },
  'grammar-149': {
    korean: '초보자치고는 발음이 아주 정확해요.',
    english: 'For a beginner, your pronunciation is very accurate.'
  }
};

function buildLessonExamples(lesson) {
  const examples = lesson.examples || [];
  const coreMeaning = lesson.coreMeaning ?? lesson.meaning;
  const selectedExamples = examples.slice(0, 2);

  if (selectedExamples.length >= 2) {
    return selectedExamples;
  }

  return [
    ...selectedExamples,
    secondExampleOverrides[lesson.id] ?? {
      korean: `${lesson.pattern}은/는 '${coreMeaning}'의 의미를 나타낼 때 사용합니다.`,
      english: `${lesson.pattern} is used to express "${coreMeaning}".`
    }
  ];
}

export const grammarLessons = grammarLessonData.map((lesson) => {
  const coreMeaning = getEasyCoreMeaning(lesson);
  const easyLesson = {
    ...lesson,
    coreMeaning,
    explanation: getEasyExplanation(lesson, coreMeaning)
  };

  return {
    ...easyLesson,
    examples: buildLessonExamples(easyLesson),
    usage: inferUsageGuide(easyLesson)
  };
});
