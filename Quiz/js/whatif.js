/* ============================================================
   What If...? — 30 situation cards (Classes 6-8)
   From "What If...? Situation Cards on Discipline, Waste and Hygiene"
   ============================================================ */

const WHATIF_CARDS = [
  /* ---------------- School Discipline ---------------- */
  {
    id: 1, theme: "discipline", type: "chain",
    title: "Everyone Picks Their Own Time",
    situation: "The school bell is broken, and the principal jokes that every student can decide their own arrival and break times for one day.",
    ask: "What if every student really did decide for themselves? How would the school day look by noon?",
    think: [
      "How would teachers plan lessons, group work and exams?",
      "What would happen to buses, assembly and the lunch break?"
    ],
    note: "Shared time is what lets many people work together. Punctuality is cooperation, not only obedience."
  },
  {
    id: 2, theme: "discipline", type: "dilemma",
    title: "The Answer Key on the Desk",
    situation: "You go back to the empty classroom to collect your water bottle. The answer key for tomorrow's test is lying open on the teacher's desk.",
    ask: "What if you peek at it? What if you walk away? What if you tell the teacher?",
    think: [
      "Who else is affected if you look at it?",
      "How would you feel when the test results come out?"
    ],
    note: "Integrity is what we do when nobody is watching. Fair tests protect everyone's hard work."
  },
  {
    id: 3, theme: "discipline", type: "dilemma",
    title: "The Broken Window",
    situation: "While playing catch at lunch, your ball breaks a classroom window. Nobody saw, and the other children ran off.",
    ask: "What if you stay silent? What if you go to the teacher right now?",
    think: [
      "What is the worst that could happen if you tell? And if you don't?",
      "Who might get blamed if you say nothing?"
    ],
    note: "Owning a mistake early keeps it small. Offer to help repair or pay with effort."
  },
  {
    id: 4, theme: "discipline", type: "dilemma",
    title: "The Shortcut",
    situation: "You are late on the first day of exams. The main gate is far, but there is a gap in the fence that some older students use.",
    ask: "What if you use the gap, and tomorrow everyone does the same?",
    think: [
      "What safety or trust problems could a shortcut create?",
      "What could you change tonight so you do not need a shortcut tomorrow?"
    ],
    note: "Shortcuts solve today's problem but create new ones. The real fix is planning and time management."
  },
  {
    id: 5, theme: "discipline", type: "chain",
    title: "The Dismissal Rush",
    situation: "The last bell rings and your whole class runs to the gate at once. Younger students are walking in the same corridor.",
    ask: "What if no one slows down? What can happen in ten seconds?",
    think: [
      "Who is most at risk in a crowd?",
      "What small action by one person could change what everyone else does?"
    ],
    note: "One calm person can change a crowd. Safety rules protect the youngest first."
  },
  {
    id: 6, theme: "discipline", type: "dilemma",
    title: "The Group Chat Joke",
    situation: "Someone posts an embarrassing photo of a classmate in the class group chat. Everyone is replying with laughing faces.",
    ask: "What if you add a laughing face? What if you stay silent? What if you speak up?",
    think: [
      "How might the classmate feel when they open the chat?",
      "What would you want others to do if it were you?"
    ],
    note: "Respect applies online too. Speaking up, messaging the classmate privately and telling a trusted adult are all valid actions."
  },
  {
    id: 7, theme: "discipline", type: "chain",
    title: "The Class Left Alone",
    situation: "Your teacher is called away for ten minutes. The principal might walk by at any moment.",
    ask: "What if the class stays calm and keeps working? What if it turns noisy? What is different afterwards?",
    think: [
      "Why do people often behave better when watched?",
      "What would make us choose well even when no one is watching?"
    ],
    note: "Self-discipline comes from understanding why a rule exists, not from fear of being caught."
  },
  {
    id: 8, theme: "discipline", type: "dilemma",
    title: "The Queue Jumper",
    situation: "You are standing in a long canteen queue. Your best friend arrives hungry and asks to slip in front of you.",
    ask: "What if you let her in? What if you say no? What if you find a third way?",
    think: [
      "How would the students behind you feel?",
      "How can you stay a good friend and still be fair?"
    ],
    note: "Friendship does not require unfairness. Look for kind alternatives, such as sharing a snack."
  },
  {
    id: 9, theme: "discipline", type: "dilemma",
    title: "The Lost Library Book",
    situation: "You borrowed a library book and cannot find it. It is due tomorrow, and you are afraid of being scolded.",
    ask: "What if you pretend you returned it? What if you tell the librarian today?",
    think: [
      "What solutions could you offer: searching, replacing, helping in the library?",
      "What does the librarian gain from your honesty?"
    ],
    note: "Telling the truth early opens the door to solutions and builds trust."
  },
  {
    id: 10, theme: "discipline", type: "dilemma",
    title: "The Rule You Don't Like",
    situation: "Your school bans a game you love on the playground. You think the rule is unfair.",
    ask: "What if you break the rule quietly? What if you ask for a change in the right way?",
    think: [
      "How can students raise concerns respectfully, for example through the student council?",
      "Which approach could actually change the rule?"
    ],
    note: "Rules can be questioned, but through respectful channels, not by breaking them."
  },

  /* ---------------- Waste Management ---------------- */
  {
    id: 11, theme: "waste", type: "chain",
    title: "One Chapati",
    situation: "In a school of 800 students, each child leaves about one chapati's worth of food uneaten every day.",
    ask: "What if this goes on for the whole school year of about 200 days? How much food is that?",
    think: [
      "Where does the wasted food go, and who could have eaten it?",
      "What could the school change: portion size, a share table, compost?"
    ],
    note: "800 × 200 = 160,000 portions. Small daily waste becomes huge, and ideas like smaller servings or composting help."
  },
  {
    id: 12, theme: "waste", type: "dilemma",
    title: "The Full Bin",
    situation: "At the end of lunch the bin is overflowing and the next bin is far away. You are holding a wrapper.",
    ask: "What if you place it on top? Drop it beside the bin? Carry it to the next bin?",
    think: [
      "What happens to a wrapper on top of a full bin when the wind blows?",
      "Who has to clean up afterwards?"
    ],
    note: "Small choices matter. Telling a teacher that the bin needs emptying is also a good action."
  },
  {
    id: 13, theme: "waste", type: "dilemma",
    title: "The Birthday Chocolates",
    situation: "It's your birthday and you want to give chocolates to all 40 classmates. Each one is wrapped in plastic and packed in a plastic bag.",
    ask: "What if you choose a lower-waste way to share your birthday? What might it look like?",
    think: [
      "What is left over after the party?",
      "Could the gift itself be something that makes less waste?"
    ],
    note: "Ideas: paper-wrapped sweets, fruit, seed paper, homemade treats, or a donation in the class's name. Avoid shaming others who choose differently."
  },
  {
    id: 14, theme: "waste", type: "change",
    title: "Half-Used Notebooks",
    situation: "At the end of the year, your bag has five notebooks with many blank pages. Your friend is about to throw hers away.",
    ask: "What if you collect all the blank pages and make rough notebooks for the whole class?",
    think: [
      "How much paper would the class save?",
      "Who else could use the rough notebooks?"
    ],
    note: "Reuse comes before recycling. Small projects show how the 3Rs work in practice."
  },
  {
    id: 15, theme: "waste", type: "dilemma",
    title: "The Cow at the Gate",
    situation: "A cow near the school gate keeps eating leftovers thrown out in plastic bags. Yesterday it fell sick.",
    ask: "What if the bags were never thrown there? What could your class do?",
    think: [
      "How does careless waste harm animals?",
      "What are two small steps you could take at the school gate?"
    ],
    note: "Do not throw food in plastic bags. Ideas: a bin near the gate, talking to nearby shopkeepers, posters."
  },
  {
    id: 16, theme: "waste", type: "dilemma",
    title: "The Mixed-Up Bins",
    situation: "You carefully sort your waste into the right bins. A friend dumps everything into one bin and says it all goes to the same place anyway.",
    ask: "What if you say nothing? What if you show your friend why sorting helps?",
    think: [
      "How could you explain it without making your friend feel silly?",
      "Could you turn it into a game or challenge?"
    ],
    note: "Influence works better through friendly example than through scolding."
  },
  {
    id: 17, theme: "waste", type: "dilemma",
    title: "No Bin on the Trip",
    situation: "On a school trip to an old fort, you finish your snack and cannot see a single dustbin. Others toss wrappers on the grass.",
    ask: "What if you put your wrapper in your pocket and invite others to do the same?",
    think: [
      "What would the place look like if every visitor did the same?",
      "What could you carry next time to make it easier?"
    ],
    note: "Carry it back. A spare bag takes care of it, and acting first often inspires others."
  },
  {
    id: 18, theme: "waste", type: "chain",
    title: "No Plastic Bottles Tomorrow",
    situation: "The principal announces that from tomorrow, plastic bottles are not allowed in school.",
    ask: "What if you had no plastic bottle tomorrow? What would you carry, and what would the school need to provide?",
    think: [
      "Who will find the change easy, and who might need help?",
      "What facilities, like water stations, make the change smoother?"
    ],
    note: "Change works when alternatives are available. Think about both individual and school-level solutions."
  },
  {
    id: 19, theme: "waste", type: "chain",
    title: "The Dripping Tap",
    situation: "A tap in the school garden drips all night, one drop at a time. Nobody has noticed.",
    ask: "What if it keeps dripping for a whole month? What if you report it today?",
    think: [
      "Where does the water come from, and who else needs it?",
      "How could the school check taps regularly?"
    ],
    note: "Water is a shared resource, and small leaks add up. A weekly 'tap check' is easy to organise."
  },
  {
    id: 20, theme: "waste", type: "change",
    title: "Peels to Plants",
    situation: "The canteen throws away buckets of peels and leaves every day. The school garden has dry, tired soil.",
    ask: "What if the peels and leaves went into a compost pit managed by your class?",
    think: [
      "What might the garden look like in six months?",
      "Who would do the work, and how could it be fun?"
    ],
    note: "Wet waste becomes compost, which feeds the garden. It closes the loop from waste to resource."
  },

  /* ---------------- Personal and Community Hygiene ---------------- */
  {
    id: 21, theme: "hygiene", type: "chain",
    title: "The Skipped Soap Week",
    situation: "For one whole week, nobody in your class washes hands before lunch.",
    ask: "What if one student is carrying a stomach bug? Trace how it could spread by Friday.",
    think: [
      "Which objects would carry germs: door handles, shared bottles, the ball?",
      "How many students might be absent by the end of the week?"
    ],
    note: "A small gap in hygiene can spread illness quickly, and mapping the chain makes it clear."
  },
  {
    id: 22, theme: "hygiene", type: "dilemma",
    title: "The Sniffly Friend",
    situation: "Your best friend has a cold. She offers you a sip from her water bottle, as she always does.",
    ask: "What if you say no? How could you do it kindly?",
    think: [
      "Does refusing mean you care less about her?",
      "What else could you do to look after her?"
    ],
    note: "Caring and hygiene go together. You can say 'I'll get you your own cup', and offer help in other ways."
  },
  {
    id: 23, theme: "hygiene", type: "dilemma",
    title: "The Empty Soap Dispenser",
    situation: "You go to wash your hands before lunch and the soap dispenser is empty. A queue is forming behind you.",
    ask: "What if you rinse with water and leave? What if you also tell someone?",
    think: [
      "Who is the right person to tell?",
      "Will the next 100 students have soap by lunch?"
    ],
    note: "Rinse well for now, then report it. One report protects everyone after you."
  },
  {
    id: 24, theme: "hygiene", type: "dilemma",
    title: "Someone Else's Mess",
    situation: "You find the washroom floor wet and dirty. It wasn't you, and the cleaner isn't due for an hour.",
    ask: "What if you leave it? What if you tell the cleaner or a teacher?",
    think: [
      "How will the next user feel?",
      "What is a safe, small thing you could do yourself?"
    ],
    note: "Report it. Do not handle anything unsafe. Respect the cleaner's work by keeping spaces tidy."
  },
  {
    id: 25, theme: "hygiene", type: "dilemma",
    title: "The Sneeze with No Tissue",
    situation: "During assembly you feel a big sneeze coming. You have no tissue, and you are standing close to your friends.",
    ask: "What if you sneeze into your hand? What if you use your elbow?",
    think: [
      "Where do the germs go in each case?",
      "What could you carry in your bag every day to be prepared?"
    ],
    note: "Elbow is the better choice. A pocket tissue or small packet is a good daily habit."
  },
  {
    id: 26, theme: "hygiene", type: "chain",
    title: "The Puddle by the Gate",
    situation: "After the rains, a puddle by the school gate stays for days. Mosquitoes are buzzing around it.",
    ask: "What if nothing is done for two weeks? What if students report it?",
    think: [
      "How are mosquitoes connected to illnesses like dengue?",
      "Who can fix this, and how can students help?"
    ],
    note: "Stagnant water breeds mosquitoes. Reporting, draining and weekly checks protect the whole community."
  },
  {
    id: 27, theme: "hygiene", type: "dilemma",
    title: "The Uncovered Snacks",
    situation: "A stall near school sells snacks that are uncovered, with flies buzzing around. All your friends are buying.",
    ask: "What if you buy it too? What if you suggest an alternative?",
    think: [
      "How can food become unsafe?",
      "What snacks could you bring or buy instead?"
    ],
    note: "Peer pressure is real. Having a ready alternative makes it easier to say no without drama."
  },
  {
    id: 28, theme: "hygiene", type: "dilemma",
    title: "The Shared Sports Towel",
    situation: "After a hot game, a teammate hands you the towel he just used and says 'just wipe your face, it's fine'.",
    ask: "What if you use it? What if you ask for another way?",
    think: [
      "What can pass between people through shared towels?",
      "What small items could the team carry for the next game?"
    ],
    note: "Personal items like towels, combs and bottles should not be shared. Every player can bring their own."
  },
  {
    id: 29, theme: "hygiene", type: "dilemma",
    title: "The Lice Rumour",
    situation: "A classmate scratches her head often. Whispers say she has lice, and other kids are moving away from her.",
    ask: "What if you walk away? What if you support her kindly and share facts?",
    think: [
      "How would it feel to be avoided by everyone?",
      "What facts could you share instead of rumours?"
    ],
    note: "Lice can affect anyone and are not about being dirty. They are treatable, and kindness matters. Suggest speaking privately to the teacher or nurse."
  },
  {
    id: 30, theme: "hygiene", type: "change",
    title: "The Clean Desk Week",
    situation: "Your class decides to try a challenge: every student keeps their desk, floor space and bag area clean for one week.",
    ask: "What if the whole class manages it? What might change in the classroom?",
    think: [
      "What daily two-minute routine would make it easy?",
      "How could you celebrate success?"
    ],
    note: "Shared habits make a shared space better. Small routines, repeated, make a visible difference."
  }
];

const WHATIF_BY_ID = {};
WHATIF_CARDS.forEach(function (c) { WHATIF_BY_ID[c.id] = c; });

const WHATIF_TYPES = {
  chain:    { label: "Chain Reaction", emoji: "🔗", className: "type-chain" },
  dilemma:  { label: "Dilemma",        emoji: "🤔", className: "type-dilemma" },
  change:   { label: "Be the Change",  emoji: "🌱", className: "type-change" }
};

const WHATIF_THEMES = {
  discipline: { name: "School Discipline",             emoji: "🎒", accent: "#7c5cff" },
  waste:      { name: "Waste Management",              emoji: "♻️", accent: "#00b894" },
  hygiene:    { name: "Personal & Community Hygiene",  emoji: "🧼", accent: "#0984e3" }
};
