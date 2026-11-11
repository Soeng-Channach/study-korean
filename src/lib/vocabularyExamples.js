import { topikIExamples } from '../data/topikIExamples';
import { topikIIExamples } from '../data/topikIIExamples';
import { levelOf } from './levels';

const TOPIK_I_EXAMPLES = {
  가게: { example: '집 앞 가게에서 물을 샀습니다.', exampleMeaning: 'I bought water at the store in front of my house.', exampleMeaningKm: 'ខ្ញុំបានទិញទឹកនៅហាងមុខផ្ទះ។' },
  가격: { example: '이 가방은 가격이 비싸지 않습니다.', exampleMeaning: 'This bag is not expensive.', exampleMeaningKm: 'កាបូបនេះមិនថ្លៃទេ។' },
  가구: { example: '방에 책상과 침대 같은 가구가 있습니다.', exampleMeaning: 'There is furniture such as a desk and a bed in the room.', exampleMeaningKm: 'មានគ្រឿងសង្ហារិមដូចជាតុ និងគ្រែនៅក្នុងបន្ទប់។' },
  가깝다: { example: '우리 집은 학교에서 가깝습니다.', exampleMeaning: 'My house is close to school.', exampleMeaningKm: 'ផ្ទះរបស់ខ្ញុំនៅជិតសាលា។' },
  가끔: { example: '저는 가끔 친구와 영화를 봅니다.', exampleMeaning: 'I sometimes watch movies with my friend.', exampleMeaningKm: 'ម្តងម្កាល ខ្ញុំមើលភាពយន្តជាមួយមិត្ត។' },
  가다: { example: '내일 학교에 갑니다.', exampleMeaning: 'I am going to school tomorrow.', exampleMeaningKm: 'ថ្ងៃស្អែក ខ្ញុំនឹងទៅសាលា។' },
  가르치다: { example: '선생님이 한국어를 가르칩니다.', exampleMeaning: 'The teacher teaches Korean.', exampleMeaningKm: 'គ្រូបង្រៀនភាសាកូរ៉េ។' },
  가방: { example: '가방 안에 책이 있습니다.', exampleMeaning: 'There is a book inside the bag.', exampleMeaningKm: 'មានសៀវភៅមួយនៅក្នុងកាបូប។' },
  가볍다: { example: '이 가방은 작고 가볍습니다.', exampleMeaning: 'This bag is small and light.', exampleMeaningKm: 'កាបូបនេះតូច និងស្រាល។' },
  가수: { example: '제가 좋아하는 가수는 노래를 잘합니다.', exampleMeaning: 'The singer I like sings well.', exampleMeaningKm: 'អ្នកចម្រៀងដែលខ្ញុំចូលចិត្តច្រៀងពីរោះ។' },
  가슴: { example: '운동을 한 후에 가슴이 조금 아픕니다.', exampleMeaning: 'My chest hurts a little after exercising.', exampleMeaningKm: 'ទ្រូងរបស់ខ្ញុំឈឺបន្តិចបន្ទាប់ពីហាត់ប្រាណ។' },
  가요: { example: '저는 한국 가요를 자주 듣습니다.', exampleMeaning: 'I often listen to Korean pop songs.', exampleMeaningKm: 'ខ្ញុំតែងស្តាប់ចម្រៀងប៉ុបកូរ៉េ។' },
  가운데: { example: '책상 가운데에 꽃이 있습니다.', exampleMeaning: 'There is a flower in the middle of the desk.', exampleMeaningKm: 'មានផ្កាមួយនៅកណ្តាលតុ។' },
  가위: { example: '가위로 종이를 자릅니다.', exampleMeaning: 'I cut paper with scissors.', exampleMeaningKm: 'ខ្ញុំកាត់ក្រដាសដោយកន្ត្រៃ។' },
  가을: { example: '가을에는 날씨가 시원합니다.', exampleMeaning: 'In autumn, the weather is cool.', exampleMeaningKm: 'នៅរដូវស្លឹកឈើជ្រុះ អាកាសធាតុត្រជាក់ស្រួល។' },
  가장: { example: '저는 봄을 가장 좋아합니다.', exampleMeaning: 'I like spring the most.', exampleMeaningKm: 'ខ្ញុំចូលចិត្តរដូវផ្ការីកជាងគេ។' },
  가져가다: { example: '우산을 꼭 가져가세요.', exampleMeaning: 'Please make sure to take an umbrella.', exampleMeaningKm: 'សូមកុំភ្លេចយកឆ័ត្រទៅជាមួយ។' },
  가져오다: { example: '숙제를 내일 가져오세요.', exampleMeaning: 'Please bring your homework tomorrow.', exampleMeaningKm: 'សូមយកកិច្ចការផ្ទះមកនៅថ្ងៃស្អែក។' },
  가족: { example: '주말에 가족과 같이 밥을 먹었습니다.', exampleMeaning: 'I ate with my family on the weekend.', exampleMeaningKm: 'ខ្ញុំបានញ៉ាំអាហារជាមួយគ្រួសារនៅចុងសប្តាហ៍។' },
  가지다: { example: '저는 작은 우산을 가지고 있습니다.', exampleMeaning: 'I have a small umbrella.', exampleMeaningKm: 'ខ្ញុំមានឆ័ត្រតូចមួយ។' },
  간단하다: { example: '이 문제는 아주 간단합니다.', exampleMeaning: 'This question is very simple.', exampleMeaningKm: 'សំណួរនេះសាមញ្ញណាស់។' },
  간단히: { example: '아침을 간단히 먹었습니다.', exampleMeaning: 'I ate a simple breakfast.', exampleMeaningKm: 'ខ្ញុំបានញ៉ាំអាហារពេលព្រឹកសាមញ្ញៗ។' },
  갈비: { example: '저녁에 가족과 갈비를 먹었습니다.', exampleMeaning: 'I ate galbi with my family for dinner.', exampleMeaningKm: 'ខ្ញុំបានញ៉ាំកាល់ប៊ីជាមួយគ្រួសារជាអាហារពេលល្ងាច។' },
  갈아타다: { example: '시청역에서 지하철을 갈아탑니다.', exampleMeaning: 'I transfer subway lines at City Hall Station.', exampleMeaningKm: 'ខ្ញុំប្តូរខ្សែរថភ្លើងក្រោមដីនៅស្ថានីយសាលាក្រុង។' },
  감기: { example: '감기에 걸려서 병원에 갔습니다.', exampleMeaning: 'I caught a cold, so I went to the hospital.', exampleMeaningKm: 'ខ្ញុំផ្តាសាយ ដូច្នេះខ្ញុំបានទៅមន្ទីរពេទ្យ។' },
  감사하다: { example: '도와주셔서 감사합니다.', exampleMeaning: 'Thank you for helping me.', exampleMeaningKm: 'អរគុណដែលបានជួយខ្ញុំ។' },
  갑자기: { example: '갑자기 비가 왔습니다.', exampleMeaning: 'It suddenly rained.', exampleMeaningKm: 'ស្រាប់តែភ្លៀងធ្លាក់។' },
  값: { example: '이 과일은 값이 쌉니다.', exampleMeaning: 'This fruit is cheap.', exampleMeaningKm: 'ផ្លែឈើនេះថោក។' },
  강아지: { example: '공원에 귀여운 강아지가 있습니다.', exampleMeaning: 'There is a cute puppy in the park.', exampleMeaningKm: 'មានកូនឆ្កែគួរឱ្យស្រលាញ់មួយនៅក្នុងសួន។' },
  같이: { example: '친구와 같이 점심을 먹었습니다.', exampleMeaning: 'I ate lunch together with my friend.', exampleMeaningKm: 'ខ្ញុំបានញ៉ាំអាហារថ្ងៃត្រង់ជាមួយមិត្ត។' },
  개: { example: '저는 개를 좋아합니다.', exampleMeaning: 'I like dogs.', exampleMeaningKm: 'ខ្ញុំចូលចិត្តឆ្កែ។' },
  거기: { example: '거기에 제 가방이 있습니다.', exampleMeaning: 'My bag is there.', exampleMeaningKm: 'កាបូបរបស់ខ្ញុំនៅទីនោះ។' },
  건강: { example: '건강을 위해 매일 운동합니다.', exampleMeaning: 'I exercise every day for my health.', exampleMeaningKm: 'ខ្ញុំហាត់ប្រាណរៀងរាល់ថ្ងៃដើម្បីសុខភាព។' },
  걷다: { example: '저는 학교까지 걸어갑니다.', exampleMeaning: 'I walk to school.', exampleMeaningKm: 'ខ្ញុំដើរទៅសាលា។' },
  게임: { example: '동생은 컴퓨터 게임을 좋아합니다.', exampleMeaning: 'My younger sibling likes computer games.', exampleMeaningKm: 'ប្អូនរបស់ខ្ញុំចូលចិត្តហ្គេមកុំព្យូទ័រ។' },
  겨울: { example: '겨울에는 눈이 많이 옵니다.', exampleMeaning: 'It snows a lot in winter.', exampleMeaningKm: 'នៅរដូវរងា ព្រិលធ្លាក់ច្រើន។' },
  결혼: { example: '언니는 다음 달에 결혼을 합니다.', exampleMeaning: 'My older sister is getting married next month.', exampleMeaningKm: 'បងស្រីរបស់ខ្ញុំនឹងរៀបការនៅខែក្រោយ។' },
  경찰: { example: '길을 몰라서 경찰에게 물었습니다.', exampleMeaning: 'I did not know the way, so I asked a police officer.', exampleMeaningKm: 'ខ្ញុំមិនស្គាល់ផ្លូវ ដូច្នេះខ្ញុំបានសួរមន្ត្រីប៉ូលិស។' },
  고기: { example: '저녁에 고기를 먹었습니다.', exampleMeaning: 'I ate meat for dinner.', exampleMeaningKm: 'ខ្ញុំបានញ៉ាំសាច់ជាអាហារពេលល្ងាច។' },
  고맙다: { example: '선물을 받아서 정말 고맙습니다.', exampleMeaning: 'Thank you very much for the gift.', exampleMeaningKm: 'អរគុណច្រើនសម្រាប់កាដូ។' },
  고양이: { example: '고양이가 의자 위에서 잡니다.', exampleMeaning: 'The cat is sleeping on the chair.', exampleMeaningKm: 'ឆ្មាកំពុងដេកលើកៅអី។' },
  공부: { example: '저는 도서관에서 한국어 공부를 합니다.', exampleMeaning: 'I study Korean at the library.', exampleMeaningKm: 'ខ្ញុំរៀនភាសាកូរ៉េនៅបណ្ណាល័យ។' },
  공원: { example: '오후에 공원에서 산책합니다.', exampleMeaning: 'I take a walk in the park in the afternoon.', exampleMeaningKm: 'ខ្ញុំដើរលេងនៅសួនពេលរសៀល។' },
  과일: { example: '아침에 과일을 먹습니다.', exampleMeaning: 'I eat fruit in the morning.', exampleMeaningKm: 'ខ្ញុំញ៉ាំផ្លែឈើនៅពេលព្រឹក។' },
  괜찮다: { example: '저는 괜찮습니다.', exampleMeaning: 'I am okay.', exampleMeaningKm: 'ខ្ញុំមិនអីទេ។' },
  교실: { example: '학생들이 교실에서 공부합니다.', exampleMeaning: 'Students study in the classroom.', exampleMeaningKm: 'សិស្សៗរៀននៅក្នុងថ្នាក់រៀន។' },
  구두: { example: '새 구두를 샀습니다.', exampleMeaning: 'I bought new dress shoes.', exampleMeaningKm: 'ខ្ញុំបានទិញស្បែកជើងស្បែកថ្មី។' },
  구입하다: { example: '인터넷으로 책을 구입했습니다.', exampleMeaning: 'I bought a book online.', exampleMeaningKm: 'ខ្ញុំបានទិញសៀវភៅតាមអនឡាញ។' },
  국: { example: '아침에 따뜻한 국을 먹었습니다.', exampleMeaning: 'I ate warm soup in the morning.', exampleMeaningKm: 'ខ្ញុំបានញ៉ាំស៊ុបក្តៅៗនៅពេលព្រឹក។' },
  권: { example: '책 한 권을 읽었습니다.', exampleMeaning: 'I read one book.', exampleMeaningKm: 'ខ្ញុំបានអានសៀវភៅមួយក្បាល។' },
  귀: { example: '귀가 아파서 병원에 갔습니다.', exampleMeaning: 'My ear hurt, so I went to the hospital.', exampleMeaningKm: 'ខ្ញុំឈឺត្រចៀក ដូច្នេះខ្ញុំបានទៅមន្ទីរពេទ្យ។' },
  그래서: { example: '비가 왔습니다. 그래서 집에 있었습니다.', exampleMeaning: 'It rained. So I stayed home.', exampleMeaningKm: 'ភ្លៀងបានធ្លាក់។ ដូច្នេះខ្ញុំនៅផ្ទះ។' },
  그릇: { example: '그릇에 밥을 담았습니다.', exampleMeaning: 'I put rice in the bowl.', exampleMeaningKm: 'ខ្ញុំបានដាក់បាយក្នុងចាន។' },
  그리고: { example: '저는 빵을 샀습니다. 그리고 우유도 샀습니다.', exampleMeaning: 'I bought bread. And I also bought milk.', exampleMeaningKm: 'ខ្ញុំបានទិញនំប៉័ង។ ហើយខ្ញុំក៏បានទិញទឹកដោះគោដែរ។' },
  금요일: { example: '금요일에 친구를 만납니다.', exampleMeaning: 'I meet my friend on Friday.', exampleMeaningKm: 'ខ្ញុំជួបមិត្តនៅថ្ងៃសុក្រ។' },
  기차: { example: '부산까지 기차를 탑니다.', exampleMeaning: 'I take a train to Busan.', exampleMeaningKm: 'ខ្ញុំជិះរថភ្លើងទៅប៊ូសាន។' },
  김치: { example: '저는 김치를 잘 먹습니다.', exampleMeaning: 'I can eat kimchi well.', exampleMeaningKm: 'ខ្ញុំអាចញ៉ាំគីមឈីបានល្អ។' },
  꽃: { example: '책상 위에 꽃이 있습니다.', exampleMeaning: 'There is a flower on the desk.', exampleMeaningKm: 'មានផ្កាមួយនៅលើតុ។' },
  끝나다: { example: '수업이 세 시에 끝납니다.', exampleMeaning: "Class ends at three o'clock.", exampleMeaningKm: 'ថ្នាក់រៀនចប់នៅម៉ោងបី។' },
  나라: { example: '어느 나라에서 왔습니까?', exampleMeaning: 'Which country are you from?', exampleMeaningKm: 'តើអ្នកមកពីប្រទេសណា?' },
  나무: { example: '집 앞에 큰 나무가 있습니다.', exampleMeaning: 'There is a big tree in front of the house.', exampleMeaningKm: 'មានដើមឈើធំមួយនៅមុខផ្ទះ។' },
  남자: { example: '그 남자는 제 친구입니다.', exampleMeaning: 'That man is my friend.', exampleMeaningKm: 'បុរសនោះជាមិត្តរបស់ខ្ញុំ។' },
  내일: { example: '내일 시험이 있습니다.', exampleMeaning: 'I have an exam tomorrow.', exampleMeaningKm: 'ថ្ងៃស្អែកខ្ញុំមានប្រឡង។' },
  냉면: { example: '여름에 냉면을 자주 먹습니다.', exampleMeaning: 'I often eat cold noodles in summer.', exampleMeaningKm: 'ខ្ញុំតែងញ៉ាំមីត្រជាក់នៅរដូវក្តៅ។' },
  너무: { example: '오늘 날씨가 너무 덥습니다.', exampleMeaning: 'The weather is too hot today.', exampleMeaningKm: 'ថ្ងៃនេះអាកាសធាតុក្តៅពេក។' },
  노래: { example: '친구가 노래를 잘합니다.', exampleMeaning: 'My friend sings well.', exampleMeaningKm: 'មិត្តរបស់ខ្ញុំច្រៀងពីរោះ។' },
  높다: { example: '이 건물은 아주 높습니다.', exampleMeaning: 'This building is very tall.', exampleMeaningKm: 'អគារនេះខ្ពស់ណាស់។' },
  누구: { example: '누구를 기다립니까?', exampleMeaning: 'Who are you waiting for?', exampleMeaningKm: 'តើអ្នកកំពុងរង់ចាំនរណា?' },
  눈: { example: '겨울에는 눈이 옵니다.', exampleMeaning: 'It snows in winter.', exampleMeaningKm: 'ព្រិលធ្លាក់នៅរដូវរងា។' },
  녹차: { example: '저는 따뜻한 녹차를 마십니다.', exampleMeaning: 'I drink warm green tea.', exampleMeaningKm: 'ខ្ញុំផឹកតែបៃតងក្តៅៗ។' },
  다니다: { example: '저는 한국어 학원에 다닙니다.', exampleMeaning: 'I attend a Korean language academy.', exampleMeaningKm: 'ខ្ញុំរៀននៅសាលាបង្រៀនភាសាកូរ៉េ។' },
  닫다: { example: '창문을 닫아 주세요.', exampleMeaning: 'Please close the window.', exampleMeaningKm: 'សូមបិទបង្អួច។' },
  대학교: { example: '형은 서울에 있는 대학교에 다닙니다.', exampleMeaning: 'My older brother attends a university in Seoul.', exampleMeaningKm: 'បងប្រុសរបស់ខ្ញុំរៀននៅសាកលវិទ្យាល័យមួយនៅសេអ៊ូល។' },
  도서관: { example: '도서관에서 책을 읽습니다.', exampleMeaning: 'I read books at the library.', exampleMeaningKm: 'ខ្ញុំអានសៀវភៅនៅបណ្ណាល័យ។' },
  돈: { example: '지갑에 돈이 없습니다.', exampleMeaning: 'There is no money in my wallet.', exampleMeaningKm: 'គ្មានលុយនៅក្នុងកាបូបលុយរបស់ខ្ញុំទេ។' },
  듣다: { example: '저는 매일 한국어를 듣습니다.', exampleMeaning: 'I listen to Korean every day.', exampleMeaningKm: 'ខ្ញុំស្តាប់ភាសាកូរ៉េរៀងរាល់ថ្ងៃ។' },
  마시다: { example: '물을 많이 마십니다.', exampleMeaning: 'I drink a lot of water.', exampleMeaningKm: 'ខ្ញុំផឹកទឹកច្រើន។' },
  만나다: { example: '오늘 친구를 만납니다.', exampleMeaning: 'I meet my friend today.', exampleMeaningKm: 'ថ្ងៃនេះខ្ញុំជួបមិត្ត។' },
  먹다: { example: '아침에 빵을 먹습니다.', exampleMeaning: 'I eat bread in the morning.', exampleMeaningKm: 'ខ្ញុំញ៉ាំនំប៉័ងនៅពេលព្រឹក។' },
  버스: { example: '학교에 버스를 타고 갑니다.', exampleMeaning: 'I go to school by bus.', exampleMeaningKm: 'ខ្ញុំទៅសាលាដោយឡានក្រុង។' },
  병원: { example: '아파서 병원에 갔습니다.', exampleMeaning: 'I was sick, so I went to the hospital.', exampleMeaningKm: 'ខ្ញុំឈឺ ដូច្នេះខ្ញុំបានទៅមន្ទីរពេទ្យ។' },
  사람: { example: '교실에 사람이 많습니다.', exampleMeaning: 'There are many people in the classroom.', exampleMeaningKm: 'មានមនុស្សច្រើននៅក្នុងថ្នាក់រៀន។' },
  사다: { example: '시장에서 과일을 샀습니다.', exampleMeaning: 'I bought fruit at the market.', exampleMeaningKm: 'ខ្ញុំបានទិញផ្លែឈើនៅផ្សារ។' },
  사진: { example: '공원에서 사진을 찍었습니다.', exampleMeaning: 'I took a photo in the park.', exampleMeaningKm: 'ខ្ញុំបានថតរូបនៅក្នុងសួន។' },
  선생님: { example: '선생님께 질문을 했습니다.', exampleMeaning: 'I asked the teacher a question.', exampleMeaningKm: 'ខ្ញុំបានសួរសំណួរគ្រូ។' },
  시간: { example: '지금 시간이 없습니다.', exampleMeaning: 'I do not have time now.', exampleMeaningKm: 'ឥឡូវខ្ញុំគ្មានពេលទេ។' },
  시장: { example: '시장에서 채소를 샀습니다.', exampleMeaning: 'I bought vegetables at the market.', exampleMeaningKm: 'ខ្ញុំបានទិញបន្លែនៅផ្សារ។' },
  식당: { example: '점심에 식당에서 밥을 먹었습니다.', exampleMeaning: 'I ate lunch at a restaurant.', exampleMeaningKm: 'ខ្ញុំបានញ៉ាំអាហារថ្ងៃត្រង់នៅភោជនីយដ្ឋាន។' },
  아침: { example: '아침에 운동을 합니다.', exampleMeaning: 'I exercise in the morning.', exampleMeaningKm: 'ខ្ញុំហាត់ប្រាណនៅពេលព្រឹក។' },
  없다: { example: '오늘 숙제가 없습니다.', exampleMeaning: 'There is no homework today.', exampleMeaningKm: 'ថ្ងៃនេះគ្មានកិច្ចការផ្ទះទេ។' },
  있다: { example: '책상 위에 책이 있습니다.', exampleMeaning: 'There is a book on the desk.', exampleMeaningKm: 'មានសៀវភៅមួយនៅលើតុ។' },
  학교: { example: '저는 아침에 학교에 갑니다.', exampleMeaning: 'I go to school in the morning.', exampleMeaningKm: 'ខ្ញុំទៅសាលានៅពេលព្រឹក។' },
  학생: { example: '저는 한국어를 배우는 학생입니다.', exampleMeaning: 'I am a student learning Korean.', exampleMeaningKm: 'ខ្ញុំជាសិស្សដែលរៀនភាសាកូរ៉េ។' },
  한국어: { example: '저는 한국어를 공부합니다.', exampleMeaning: 'I study Korean.', exampleMeaningKm: 'ខ្ញុំរៀនភាសាកូរ៉េ។' },
  회사: { example: '아버지는 회사에 다닙니다.', exampleMeaning: 'My father works at a company.', exampleMeaningKm: 'ឪពុករបស់ខ្ញុំធ្វើការនៅក្រុមហ៊ុនមួយ។' },
  화장실: { example: '화장실이 어디에 있습니까?', exampleMeaning: 'Where is the restroom?', exampleMeaningKm: 'តើបន្ទប់ទឹកនៅឯណា?' }
};

const GENERIC_EXAMPLE = /에 대해 배웠습니다|의 뜻을 배웠습니다|문장에서/;

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

  const written = topikIExamples[word.word];
  if (written && levelOf(word) === 'TOPIK I') {
    return { example: written[0], exampleMeaning: written[1], exampleMeaningKm: written[2], improved: true };
  }

  // TOPIK II words whose stored example is only a generic "we learned about" line.
  const rewritten = topikIIExamples[word.word];
  if (rewritten && levelOf(word) === 'TOPIK II' && GENERIC_EXAMPLE.test(word.example || '')) {
    return { example: rewritten[0], exampleMeaning: rewritten[1], exampleMeaningKm: rewritten[2], improved: true };
  }

  // No real sentence has been written for this word yet. The card hides the
  // example box when `placeholder` is set.
  if (isGeneratedTopikIExample(word)) {
    return {
      placeholder: true,
      example: `TOPIK I 기본 어휘: ${word.word}`,
      exampleMeaning: `Basic TOPIK I vocabulary: ${word.meaning}`,
      exampleMeaningKm: word.meaningKm ? `វាក្យសព្ទមូលដ្ឋាន TOPIK I៖ ${word.meaningKm}` : undefined,
      improved: false
    };
  }

  return {
    example: word.example,
    exampleMeaning: word.exampleMeaning,
    exampleMeaningKm: word.exampleMeaningKm,
    improved: false
  };
}

