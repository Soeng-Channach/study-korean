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
  }
];

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
  }
};

function inferUsageGuide(lesson) {
  const pattern = lesson.pattern;

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

export const grammarLessons = grammarLessonData.map((lesson) => ({
  ...lesson,
  coreMeaning: lesson.coreMeaning ?? lesson.meaning,
  usage: inferUsageGuide(lesson)
}));
