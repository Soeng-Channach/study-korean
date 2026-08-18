import { levelOf } from './levels';

const TOPIK_I_EXAMPLES = {
  가게: { example: '집 앞 가게에서 물을 샀습니다.', exampleMeaning: 'I bought water at the store in front of my house.' },
  가격: { example: '이 가방은 가격이 비싸지 않습니다.', exampleMeaning: 'This bag is not expensive.' },
  가구: { example: '방에 책상과 침대 같은 가구가 있습니다.', exampleMeaning: 'There is furniture such as a desk and a bed in the room.' },
  가깝다: { example: '우리 집은 학교에서 가깝습니다.', exampleMeaning: 'My house is close to school.' },
  가끔: { example: '저는 가끔 친구와 영화를 봅니다.', exampleMeaning: 'I sometimes watch movies with my friend.' },
  가다: { example: '내일 학교에 갑니다.', exampleMeaning: 'I am going to school tomorrow.' },
  가르치다: { example: '선생님이 한국어를 가르칩니다.', exampleMeaning: 'The teacher teaches Korean.' },
  가방: { example: '가방 안에 책이 있습니다.', exampleMeaning: 'There is a book inside the bag.' },
  가볍다: { example: '이 가방은 작고 가볍습니다.', exampleMeaning: 'This bag is small and light.' },
  가수: { example: '제가 좋아하는 가수는 노래를 잘합니다.', exampleMeaning: 'The singer I like sings well.' },
  가슴: { example: '운동을 한 후에 가슴이 조금 아픕니다.', exampleMeaning: 'My chest hurts a little after exercising.' },
  가요: { example: '저는 한국 가요를 자주 듣습니다.', exampleMeaning: 'I often listen to Korean pop songs.' },
  가운데: { example: '책상 가운데에 꽃이 있습니다.', exampleMeaning: 'There is a flower in the middle of the desk.' },
  가위: { example: '가위로 종이를 자릅니다.', exampleMeaning: 'I cut paper with scissors.' },
  가을: { example: '가을에는 날씨가 시원합니다.', exampleMeaning: 'In autumn, the weather is cool.' },
  가장: { example: '저는 봄을 가장 좋아합니다.', exampleMeaning: 'I like spring the most.' },
  가져가다: { example: '우산을 꼭 가져가세요.', exampleMeaning: 'Please make sure to take an umbrella.' },
  가져오다: { example: '숙제를 내일 가져오세요.', exampleMeaning: 'Please bring your homework tomorrow.' },
  가족: { example: '주말에 가족과 같이 밥을 먹었습니다.', exampleMeaning: 'I ate with my family on the weekend.' },
  가지다: { example: '저는 작은 우산을 가지고 있습니다.', exampleMeaning: 'I have a small umbrella.' },
  간단하다: { example: '이 문제는 아주 간단합니다.', exampleMeaning: 'This question is very simple.' },
  간단히: { example: '아침을 간단히 먹었습니다.', exampleMeaning: 'I ate a simple breakfast.' },
  갈비: { example: '저녁에 가족과 갈비를 먹었습니다.', exampleMeaning: 'I ate galbi with my family for dinner.' },
  갈아타다: { example: '시청역에서 지하철을 갈아탑니다.', exampleMeaning: 'I transfer subway lines at City Hall Station.' },
  감기: { example: '감기에 걸려서 병원에 갔습니다.', exampleMeaning: 'I caught a cold, so I went to the hospital.' },
  감사하다: { example: '도와주셔서 감사합니다.', exampleMeaning: 'Thank you for helping me.' },
  갑자기: { example: '갑자기 비가 왔습니다.', exampleMeaning: 'It suddenly rained.' },
  값: { example: '이 과일은 값이 쌉니다.', exampleMeaning: 'This fruit is cheap.' },
  강아지: { example: '공원에 귀여운 강아지가 있습니다.', exampleMeaning: 'There is a cute puppy in the park.' },
  같이: { example: '친구와 같이 점심을 먹었습니다.', exampleMeaning: 'I ate lunch together with my friend.' },
  개: { example: '저는 개를 좋아합니다.', exampleMeaning: 'I like dogs.' },
  거기: { example: '거기에 제 가방이 있습니다.', exampleMeaning: 'My bag is there.' },
  건강: { example: '건강을 위해 매일 운동합니다.', exampleMeaning: 'I exercise every day for my health.' },
  걷다: { example: '저는 학교까지 걸어갑니다.', exampleMeaning: 'I walk to school.' },
  게임: { example: '동생은 컴퓨터 게임을 좋아합니다.', exampleMeaning: 'My younger sibling likes computer games.' },
  겨울: { example: '겨울에는 눈이 많이 옵니다.', exampleMeaning: 'It snows a lot in winter.' },
  결혼: { example: '언니는 다음 달에 결혼을 합니다.', exampleMeaning: 'My older sister is getting married next month.' },
  경찰: { example: '길을 몰라서 경찰에게 물었습니다.', exampleMeaning: 'I did not know the way, so I asked a police officer.' },
  고기: { example: '저녁에 고기를 먹었습니다.', exampleMeaning: 'I ate meat for dinner.' },
  고맙다: { example: '선물을 받아서 정말 고맙습니다.', exampleMeaning: 'Thank you very much for the gift.' },
  고양이: { example: '고양이가 의자 위에서 잡니다.', exampleMeaning: 'The cat is sleeping on the chair.' },
  공부: { example: '저는 도서관에서 한국어 공부를 합니다.', exampleMeaning: 'I study Korean at the library.' },
  공원: { example: '오후에 공원에서 산책합니다.', exampleMeaning: 'I take a walk in the park in the afternoon.' },
  과일: { example: '아침에 과일을 먹습니다.', exampleMeaning: 'I eat fruit in the morning.' },
  괜찮다: { example: '저는 괜찮습니다.', exampleMeaning: 'I am okay.' },
  교실: { example: '학생들이 교실에서 공부합니다.', exampleMeaning: 'Students study in the classroom.' },
  구두: { example: '새 구두를 샀습니다.', exampleMeaning: 'I bought new dress shoes.' },
  구입하다: { example: '인터넷으로 책을 구입했습니다.', exampleMeaning: 'I bought a book online.' },
  국: { example: '아침에 따뜻한 국을 먹었습니다.', exampleMeaning: 'I ate warm soup in the morning.' },
  권: { example: '책 한 권을 읽었습니다.', exampleMeaning: 'I read one book.' },
  귀: { example: '귀가 아파서 병원에 갔습니다.', exampleMeaning: 'My ear hurt, so I went to the hospital.' },
  그래서: { example: '비가 왔습니다. 그래서 집에 있었습니다.', exampleMeaning: 'It rained. So I stayed home.' },
  그릇: { example: '그릇에 밥을 담았습니다.', exampleMeaning: 'I put rice in the bowl.' },
  그리고: { example: '저는 빵을 샀습니다. 그리고 우유도 샀습니다.', exampleMeaning: 'I bought bread. And I also bought milk.' },
  금요일: { example: '금요일에 친구를 만납니다.', exampleMeaning: 'I meet my friend on Friday.' },
  기차: { example: '부산까지 기차를 탑니다.', exampleMeaning: 'I take a train to Busan.' },
  김치: { example: '저는 김치를 잘 먹습니다.', exampleMeaning: 'I can eat kimchi well.' },
  꽃: { example: '책상 위에 꽃이 있습니다.', exampleMeaning: 'There is a flower on the desk.' },
  끝나다: { example: '수업이 세 시에 끝납니다.', exampleMeaning: "Class ends at three o'clock." },
  나라: { example: '어느 나라에서 왔습니까?', exampleMeaning: 'Which country are you from?' },
  나무: { example: '집 앞에 큰 나무가 있습니다.', exampleMeaning: 'There is a big tree in front of the house.' },
  남자: { example: '그 남자는 제 친구입니다.', exampleMeaning: 'That man is my friend.' },
  내일: { example: '내일 시험이 있습니다.', exampleMeaning: 'I have an exam tomorrow.' },
  냉면: { example: '여름에 냉면을 자주 먹습니다.', exampleMeaning: 'I often eat cold noodles in summer.' },
  너무: { example: '오늘 날씨가 너무 덥습니다.', exampleMeaning: 'The weather is too hot today.' },
  노래: { example: '친구가 노래를 잘합니다.', exampleMeaning: 'My friend sings well.' },
  높다: { example: '이 건물은 아주 높습니다.', exampleMeaning: 'This building is very tall.' },
  누구: { example: '누구를 기다립니까?', exampleMeaning: 'Who are you waiting for?' },
  눈: { example: '겨울에는 눈이 옵니다.', exampleMeaning: 'It snows in winter.' },
  녹차: { example: '저는 따뜻한 녹차를 마십니다.', exampleMeaning: 'I drink warm green tea.' },
  다니다: { example: '저는 한국어 학원에 다닙니다.', exampleMeaning: 'I attend a Korean language academy.' },
  닫다: { example: '창문을 닫아 주세요.', exampleMeaning: 'Please close the window.' },
  대학교: { example: '형은 서울에 있는 대학교에 다닙니다.', exampleMeaning: 'My older brother attends a university in Seoul.' },
  도서관: { example: '도서관에서 책을 읽습니다.', exampleMeaning: 'I read books at the library.' },
  돈: { example: '지갑에 돈이 없습니다.', exampleMeaning: 'There is no money in my wallet.' },
  듣다: { example: '저는 매일 한국어를 듣습니다.', exampleMeaning: 'I listen to Korean every day.' },
  마시다: { example: '물을 많이 마십니다.', exampleMeaning: 'I drink a lot of water.' },
  만나다: { example: '오늘 친구를 만납니다.', exampleMeaning: 'I meet my friend today.' },
  먹다: { example: '아침에 빵을 먹습니다.', exampleMeaning: 'I eat bread in the morning.' },
  버스: { example: '학교에 버스를 타고 갑니다.', exampleMeaning: 'I go to school by bus.' },
  병원: { example: '아파서 병원에 갔습니다.', exampleMeaning: 'I was sick, so I went to the hospital.' },
  사람: { example: '교실에 사람이 많습니다.', exampleMeaning: 'There are many people in the classroom.' },
  사다: { example: '시장에서 과일을 샀습니다.', exampleMeaning: 'I bought fruit at the market.' },
  사진: { example: '공원에서 사진을 찍었습니다.', exampleMeaning: 'I took a photo in the park.' },
  선생님: { example: '선생님께 질문을 했습니다.', exampleMeaning: 'I asked the teacher a question.' },
  시간: { example: '지금 시간이 없습니다.', exampleMeaning: 'I do not have time now.' },
  시장: { example: '시장에서 채소를 샀습니다.', exampleMeaning: 'I bought vegetables at the market.' },
  식당: { example: '점심에 식당에서 밥을 먹었습니다.', exampleMeaning: 'I ate lunch at a restaurant.' },
  아침: { example: '아침에 운동을 합니다.', exampleMeaning: 'I exercise in the morning.' },
  없다: { example: '오늘 숙제가 없습니다.', exampleMeaning: 'There is no homework today.' },
  있다: { example: '책상 위에 책이 있습니다.', exampleMeaning: 'There is a book on the desk.' },
  학교: { example: '저는 아침에 학교에 갑니다.', exampleMeaning: 'I go to school in the morning.' },
  학생: { example: '저는 한국어를 배우는 학생입니다.', exampleMeaning: 'I am a student learning Korean.' },
  한국어: { example: '저는 한국어를 공부합니다.', exampleMeaning: 'I study Korean.' },
  회사: { example: '아버지는 회사에 다닙니다.', exampleMeaning: 'My father works at a company.' },
  화장실: { example: '화장실이 어디에 있습니까?', exampleMeaning: 'Where is the restroom?' }
};

function isGeneratedTopikIExample(word) {
  return (
    levelOf(word) === 'TOPIK I' &&
    (word.example?.includes('에 대해 배웠습니다') ||
      word.example?.includes('의 뜻을 배웠습니다') ||
      word.example?.includes('문장에서'))
  );
}

export function getVocabularyExample(word) {
  const override = TOPIK_I_EXAMPLES[word.word];
  if (override) return { ...override, improved: true };

  if (isGeneratedTopikIExample(word)) {
    return {
      example: `TOPIK I 기본 어휘: ${word.word}`,
      exampleMeaning: `Basic TOPIK I vocabulary: ${word.meaning}`,
      improved: false
    };
  }

  return {
    example: word.example,
    exampleMeaning: word.exampleMeaning,
    improved: false
  };
}

