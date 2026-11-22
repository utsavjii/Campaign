/* ============================================================
   Quiz content — from "Themes Quiz, Classes 6-8"
   ============================================================ */

const THEMES = [
  {
    id: 'discipline',
    name: 'School Discipline',
    emoji: '🎒',
    desc: 'Rules, respect, punctuality and being kind at school.',
    accent: '#7c5cff',
    accentDark: '#5133d6',
    soft: '#efeaff',
    floaters: ['🎒', '📚', '✏️', '⏰', '🏫', '⭐', '📖', '🎓'],
    marks: 18,
    steps: [
      { type: 'mc', q: 'Punctuality means:', options: ['Arriving on time or before time', 'Arriving after the bell', 'Arriving only for favourite subjects', 'Arriving when you feel like it'], a: 0, explain: 'Being punctual shows respect for your own time and for others.' },
      { type: 'mc', q: 'If you do not understand a lesson, the most respectful way to ask is to:', options: ['Shout the question', 'Raise your hand and wait to be called', 'Whisper to a friend during the lesson', 'Leave the room'], a: 1, explain: 'Raising your hand lets the teacher hear you and keeps the class orderly.' },
      { type: 'mc', q: 'Which action shows respect for school property?', options: ['Writing on desks', 'Keeping books and furniture in good condition', 'Kicking the classroom door', 'Tearing pages from library books'], a: 1, explain: 'School property is shared by everyone, now and in the future.' },
      { type: 'mc', q: 'You reach class late. What is the best thing to do?', options: ['Walk in loudly and joke', 'Apologise politely, enter quietly and catch up', 'Skip the class', 'Blame a classmate'], a: 1, explain: 'A polite apology and a quiet entry cause the least disturbance.' },
      { type: 'mc', q: 'Why is silence required in a library or during exams?', options: ['Because teachers like it', 'So everyone can concentrate', 'Because the room is small', 'So that no one can talk ever'], a: 1, explain: 'Quiet gives everyone a fair chance to read, think and write.' },
      { type: 'mc', q: 'Taking responsibility means:', options: ['Blaming others', 'Admitting your mistake and trying to fix it', 'Hiding the mistake', 'Ignoring the problem'], a: 1, explain: 'Owning a mistake and repairing it builds trust.' },
      { type: 'mc', q: 'What is the right way to enter a teacher\'s room?', options: ['Walk straight in', 'Knock, ask permission and wait', 'Shout from the door', 'Push the door open'], a: 1, explain: 'Asking permission shows respect for other people\'s space.' },
      { type: 'mc', q: 'When a teacher is explaining something, you should:', options: ['Talk to your neighbour', 'Listen carefully and note doubts to ask later', 'Draw in your notebook', 'Walk around'], a: 1, explain: 'Attention shows respect and helps you learn.' },
      { type: 'mc', q: 'A school uniform helps mainly by:', options: ['Showing who is richer', 'Creating equality and a sense of belonging', 'Making classes noisy', 'Hiding students'], a: 1, explain: 'A uniform makes everyone look equal.' },
      { type: 'mc', q: 'During assembly or a fire drill, students should:', options: ['Run and push', 'Follow instructions calmly and walk in a line', 'Stay behind', 'Take photographs'], a: 1, explain: 'Calm, orderly movement keeps everyone safe.' },
      { type: 'mc', q: 'What is a good way to settle a disagreement with a classmate?', options: ['Shout at them', 'Talk calmly and listen to each other', 'Fight', 'Never speak again'], a: 1, explain: 'Calm conversation solves problems without hurting anyone.' },
      { type: 'mc', q: 'Using a mobile phone in class without permission is:', options: ['Allowed during lessons', 'Usually against school rules because it distracts', 'Fine if it is silent', 'Required'], a: 1, explain: 'Phones distract you and others from learning.' },
      { type: 'tf', q: 'School rules matter only if someone is watching.', a: false, explain: 'Real discipline means following rules even when no one is watching.' },
      { type: 'tf', q: 'Copying in an exam is a form of dishonesty.', a: true, explain: 'It is unfair to honest students and stops you from learning.' },
      { type: 'tf', q: 'Running in school corridors can cause accidents.', a: true, explain: 'Crowded corridors and sudden turns make falls and collisions likely.' },
      { type: 'tf', q: 'Respecting teachers means you can never disagree with them.', a: false, explain: 'You can disagree politely and with reasons.' },
      { type: 'tf', q: 'Helping a new classmate settle in is part of good school behaviour.', a: true, explain: 'Kindness and inclusion are part of a disciplined school community.' },
      { type: 'tf', q: 'Bullying is a serious breach of school discipline.', a: true, explain: 'It harms others and breaks the basic rule of respect.' },
      { type: 'discuss', q: 'A classmate keeps talking during silent reading time. How would you handle it politely?', sample: 'Ask quietly to stop, explain that it disturbs others, and tell the teacher if it continues.' },
      { type: 'discuss', q: 'You see a classmate being teased by a group. What do you do?', sample: 'Do not join in. Support the classmate, ask the group to stop, and tell a teacher if it continues.' }
    ]
  },

  {
    id: 'waste',
    name: 'Waste Management',
    emoji: '♻️',
    desc: 'The 3Rs, composting and keeping our planet tidy.',
    accent: '#00b894',
    accentDark: '#00805f',
    soft: '#e2fbf4',
    floaters: ['♻️', '🍃', '🗑️', '🌍', '🍌', '📰', '🌱', '🥤'],
    marks: 18,
    steps: [
      { type: 'mc', q: 'The 3Rs of waste management stand for:', options: ['Read, Write, Recite', 'Reduce, Reuse, Recycle', 'Remove, Replace, Repeat', 'Rinse, Rub, Rest'], a: 1, explain: 'Reduce first, reuse next and recycle last.' },
      { type: 'mc', q: 'Which of these is wet (biodegradable) waste?', options: ['Plastic bottle', 'Vegetable peels', 'Glass jar', 'Tin can'], a: 1, explain: 'Peels and leftover food rot naturally and can become compost.' },
      { type: 'mc', q: 'Which of these can be recycled if it is clean and dry?', options: ['Used tissue', 'Banana peel', 'Old newspaper', 'Broken ceramic'], a: 2, explain: 'Clean paper can be recycled into new paper.' },
      { type: 'mc', q: 'What is the best way to reduce plastic use?', options: ['Buy more bottles', 'Carry a reusable bottle and cloth bag', 'Burn plastic', 'Bury plastic in the garden'], a: 1, explain: 'Avoiding single-use plastic stops waste before it starts.' },
      { type: 'mc', q: 'What usually happens to plastic in nature?', options: ['It turns into soil in a few days', 'It takes hundreds of years to break down', 'It dissolves in water', 'It becomes food for plants'], a: 1, explain: 'Plastic lasts a very long time and can harm animals and soil.' },
      { type: 'mc', q: 'Compost is:', options: ['Plastic made from peels', 'Nutrient-rich soil made from rotted food and plant waste', 'Burnt waste', 'A type of metal'], a: 1, explain: 'Composting turns food scraps into natural fertiliser.' },
      { type: 'mc', q: 'Which of these is NOT one of the 3Rs?', options: ['Reduce', 'Reuse', 'Recycle', 'Remove'], a: 3, explain: 'The 3Rs are Reduce, Reuse and Recycle.' },
      { type: 'mc', q: 'Using an empty glass jar to store pencils is an example of:', options: ['Reduce', 'Reuse', 'Burning', 'Dumping'], a: 1, explain: 'Reuse means using an item again for a new purpose.' },
      { type: 'mc', q: 'Which item should go to an e-waste collection point?', options: ['Banana peel', 'Old mobile charger', 'Newspaper', 'Orange peel'], a: 1, explain: 'Electronic items contain materials that need special handling.' },
      { type: 'mc', q: 'Why should waste not be burned in the open?', options: ['It smells nice', 'It releases toxic smoke that pollutes air', 'It makes soil better', 'It saves money'], a: 1, explain: 'Burning plastic and mixed waste releases harmful gases.' },
      { type: 'mc', q: 'Which of these is a single-use plastic item?', options: ['Steel bottle', 'Cloth bag', 'Plastic straw', 'Glass tumbler'], a: 2, explain: 'A straw is used once and then thrown away.' },
      { type: 'mc', q: 'Dumping plastic in drains can cause:', options: ['Cleaner water', 'Blocked drains and flooding', 'Better rain', 'More fish'], a: 1, explain: 'Plastic blocks drains and water overflows.' },
      { type: 'tf', q: 'Used batteries can be thrown with normal waste.', a: false, explain: 'Batteries are hazardous and should go to e-waste or special collection points.' },
      { type: 'tf', q: 'About one-third of the food produced in the world is wasted.', a: true, explain: 'Reducing food waste saves resources and reduces pollution.' },
      { type: 'tf', q: 'Sorting waste at the source makes recycling easier.', a: true, explain: 'Mixed waste is hard to recycle, and clean sorted waste gets a second life.' },
      { type: 'tf', q: 'Composting wet waste reduces the amount of waste sent to landfills.', a: true, explain: 'Wet waste is a big part of what we throw away.' },
      { type: 'tf', q: 'Thermocol (polystyrene) plates are easy to recycle and harmless to the environment.', a: false, explain: 'Thermocol is hard to recycle and lasts for a very long time.' },
      { type: 'tf', q: 'Reducing what we use is better than recycling.', a: true, explain: 'Reducing stops waste from being created at all.' },
      { type: 'discuss', q: 'Your birthday is coming up and you want to celebrate with less waste. What could you do?', sample: 'Use cloth or reusable decorations, steel plates and glasses, avoid plastic gifts and plan food portions.' },
      { type: 'discuss', q: 'Your class is organising a school function. Suggest three eco-friendly ideas for decorations and food.', sample: 'Use cloth or paper decor that can be reused, serve food on steel or leaf plates, avoid plastic cups and plan food quantities.' }
    ]
  },

  {
    id: 'hygiene',
    name: 'Personal & Community Hygiene',
    emoji: '🧼',
    desc: 'Handwashing, clean water and healthy habits.',
    accent: '#0984e3',
    accentDark: '#0660a8',
    soft: '#e3f2ff',
    floaters: ['🧼', '💧', '🦷', '🧴', '🚿', '🍎', '🧻', '🌞'],
    marks: 18,
    steps: [
      { type: 'mc', q: 'For how long should you wash your hands with soap?', options: ['5 seconds', '10 seconds', 'At least 20 seconds', '5 minutes'], a: 2, explain: 'Twenty seconds gives enough time to remove germs from all parts of the hands.' },
      { type: 'mc', q: 'Which of these can spread through unwashed hands?', options: ['Diarrhoea', 'Fracture', 'Sunburn', 'Colour blindness'], a: 0, explain: 'Germs on hands can enter the body through food and the mouth.' },
      { type: 'mc', q: 'What is the best way to cover a sneeze?', options: ['With bare hands', 'Into your elbow or a tissue', 'Towards a friend', 'Not at all'], a: 1, explain: 'This stops germs from spreading to your hands and surfaces.' },
      { type: 'mc', q: 'Which water is the safest to drink?', options: ['Water from a puddle', 'Boiled or filtered water', 'Water from a pond', 'Any cool water'], a: 1, explain: 'Boiling or filtering removes harmful germs.' },
      { type: 'mc', q: 'Dengue mosquitoes breed mainly in:', options: ['Stagnant water in containers', 'Dry sand', 'Fast rivers', 'Sunlight'], a: 0, explain: 'Empty water from coolers, pots and tyres weekly to prevent mosquito breeding.' },
      { type: 'mc', q: 'Which is a good personal hygiene habit?', options: ['Sharing towels', 'Biting nails', 'Trimming nails regularly', 'Skipping brushing'], a: 2, explain: 'Short, clean nails keep germs away from food and mouth.' },
      { type: 'mc', q: 'Which is NOT a key time to wash hands?', options: ['Before eating', 'After using the toilet', 'After coughing into your hands', 'While sleeping'], a: 3, explain: 'Wash before meals, after the toilet and after covering a cough with hands.' },
      { type: 'mc', q: 'How often should you brush your teeth?', options: ['Once a week', 'At least twice a day', 'Only after sweets', 'Never'], a: 1, explain: 'Brushing morning and night prevents cavities and bad breath.' },
      { type: 'mc', q: 'Which disease can spread through contaminated water?', options: ['Typhoid', 'Fracture', 'Sprain', 'Myopia'], a: 0, explain: 'Unsafe water can carry germs that cause typhoid, cholera and diarrhoea.' },
      { type: 'mc', q: 'Fruits and vegetables should be:', options: ['Eaten without washing', 'Washed well before eating', 'Kept in the sun', 'Dipped in mud'], a: 1, explain: 'Washing removes dirt and germs.' },
      { type: 'mc', q: 'Uncovered garbage attracts:', options: ['Flies and rats that spread disease', 'Butterflies', 'Rainbows', 'Fresh air'], a: 0, explain: 'Pests carry germs from waste to food and surfaces.' },
      { type: 'mc', q: 'Which habit helps keep a classroom hygienic?', options: ['Leaving tissues on the floor', 'Using the dustbin and wiping desks regularly', 'Eating in class and leaving crumbs', 'Opening no windows'], a: 1, explain: 'Shared habits keep a shared space clean.' },
      { type: 'tf', q: 'Hand sanitiser can replace soap when hands are visibly dirty or greasy.', a: false, explain: 'Soap and water work better when hands are dirty.' },
      { type: 'tf', q: 'Sharing combs and towels can spread lice and skin infections.', a: true, explain: 'Personal items should not be shared.' },
      { type: 'tf', q: 'Leaving a washroom clean for the next person is part of community hygiene.', a: true, explain: 'A clean shared space protects everyone\'s health.' },
      { type: 'tf', q: 'A person with a cold should share their water bottle to be friendly.', a: false, explain: 'Sharing bottles spreads germs.' },
      { type: 'tf', q: 'Washing hands after playing outside helps prevent infection.', a: true, explain: 'Playgrounds and equipment carry many germs.' },
      { type: 'tf', q: 'Open drains and stagnant water have nothing to do with community health.', a: false, explain: 'They attract mosquitoes and spread disease.' },
      { type: 'discuss', q: 'You notice a friend eating without washing hands. How could you remind them kindly?', sample: 'Offer to walk together to wash hands, share a quick tip, and avoid teasing or shaming.' },
      { type: 'discuss', q: 'Your classroom desks are dusty and tissues lie around. Suggest a simple weekly plan to keep it clean.', sample: 'Make a duty chart, keep a covered dustbin, wipe desks weekly and clear the floor before leaving.' }
    ]
  }
];

const MIXED = {
  id: 'mixed',
  name: 'Mixed Challenge',
  emoji: '🏆',
  desc: 'A big finale: fill the blanks, match the waste and spot the odd one out!',
  accent: '#ff8a3d',
  accentDark: '#c95408',
  soft: '#fff0e2',
  floaters: ['🏆', '🥇', '🎯', '✨', '🎉', '🌟', '🧠', '💫'],
  marks: 20,
  steps: [
    {
      type: 'fill',
      title: 'Part A · Fill in the blanks',
      items: [
        { text: 'Wash hands with soap for at least ___ seconds.', answer: '20' },
        { text: 'The 3Rs are Reduce, Reuse and ___.', answer: 'Recycle' },
        { text: 'Peels and leftover food are ___ waste.', answer: 'wet' },
        { text: 'Being ___ means arriving before the bell.', answer: 'punctual' },
        { text: 'Cover your cough with your ___ or a tissue.', answer: 'elbow' },
        { text: 'Dengue mosquitoes breed in ___ water.', answer: 'stagnant' },
        { text: 'Food scraps can be turned into ___ for plants.', answer: 'compost' },
        { text: 'Reaching class on time shows ___ for others.', answer: 'respect' }
      ],
      bank: ['20', 'Recycle', 'wet', 'punctual', 'elbow', 'stagnant', 'compost', 'respect', 'hazardous']
    },
    {
      type: 'match',
      title: 'Part B · Where does the waste belong?',
      pairs: [
        { left: 'Banana peel', right: 'Wet bin or compost pit' },
        { left: 'Old newspaper', right: 'Paper recycling' },
        { left: 'Clean plastic bottle', right: 'Plastic recycling' },
        { left: 'Used battery', right: 'E-waste or hazardous collection point' },
        { left: 'Old glass jar', right: 'Reuse at home for storage' },
        { left: 'Used tissue', right: 'Covered general dustbin' }
      ]
    },
    { type: 'odd', q: 'Odd one out (waste):', options: ['Vegetable peels', 'Leftover rice', 'Plastic bottle', 'Tea leaves'], a: 2, explain: 'The plastic bottle is not wet waste; the others are.' },
    { type: 'odd', q: 'Odd one out (hygiene):', options: ['Soap', 'Clean towel', 'Sanitiser', 'Mud'], a: 3, explain: 'Mud spreads dirt; the others help keep us clean.' },
    { type: 'odd', q: 'Odd one out (discipline):', options: ['Punctuality', 'Honesty', 'Littering', 'Respect'], a: 2, explain: 'Littering is the habit that breaks rules.' },
    { type: 'odd', q: 'Odd one out (hygiene):', options: ['Trimmed nails', 'Daily bath', 'Sharing towels', 'Clean uniform'], a: 2, explain: 'Sharing towels can spread infections.' },
    { type: 'odd', q: 'Odd one out (waste):', options: ['Cloth bag', 'Steel bottle', 'Plastic straw', 'Paper bag'], a: 2, explain: 'A plastic straw is single-use plastic.' },
    { type: 'odd', q: 'Odd one out (discipline):', options: ['Raising a hand', 'Interrupting', 'Listening', 'Waiting for a turn'], a: 1, explain: 'Interrupting is disrespectful.' }
  ]
};

const ALL_QUIZZES = {};
THEMES.forEach(function (t) { ALL_QUIZZES[t.id] = t; });
ALL_QUIZZES.mixed = MIXED;
