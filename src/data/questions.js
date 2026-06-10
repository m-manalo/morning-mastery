export const QUESTIONS = {
  science: [
    { q: "What is the chemical symbol for gold?", opts: ["Au","Ag","Fe","Gd"], a: 0, exp: "Gold's symbol Au comes from the Latin word 'aurum'." },
    { q: "How many bones are in the adult human body?", opts: ["206","196","212","186"], a: 0, exp: "Adults have 206 bones. Babies are born with around 270, which fuse over time." },
    { q: "What planet is known as the Red Planet?", opts: ["Venus","Jupiter","Mars","Saturn"], a: 2, exp: "Mars gets its red colour from iron oxide (rust) on its surface." },
    { q: "What is the powerhouse of the cell?", opts: ["Nucleus","Ribosome","Mitochondria","Golgi body"], a: 2, exp: "Mitochondria produce ATP, the energy currency of the cell." },
    { q: "What is the speed of light (approx)?", opts: ["300,000 km/s","150,000 km/s","500,000 km/s","1,000,000 km/s"], a: 0, exp: "Light travels at approximately 299,792 km/s in a vacuum." },
    { q: "What gas do plants absorb during photosynthesis?", opts: ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], a: 2, exp: "Plants absorb CO₂ and release oxygen as a byproduct of photosynthesis." },
    { q: "What is the atomic number of carbon?", opts: ["6","8","12","14"], a: 0, exp: "Carbon has 6 protons in its nucleus, giving it atomic number 6." },
    { q: "Which organ produces insulin?", opts: ["Liver","Kidney","Pancreas","Stomach"], a: 2, exp: "The pancreas produces insulin, which regulates blood sugar levels." },
    { q: "What is Newton's first law also known as?", opts: ["Law of gravity","Law of inertia","Law of action","Law of momentum"], a: 1, exp: "Newton's first law states an object remains at rest or in motion unless acted upon by a force." },
    { q: "What is the most abundant gas in Earth's atmosphere?", opts: ["Oxygen","Carbon dioxide","Argon","Nitrogen"], a: 3, exp: "Nitrogen makes up about 78% of Earth's atmosphere." }
  ],
  history: [
    { q: "In what year did World War II end?", opts: ["1943","1944","1945","1946"], a: 2, exp: "WWII ended in 1945 — VE Day (Europe) in May and VJ Day (Japan) in August." },
    { q: "Who was the first President of the United States?", opts: ["Thomas Jefferson","John Adams","Benjamin Franklin","George Washington"], a: 3, exp: "George Washington served as the first US President from 1789 to 1797." },
    { q: "Which empire built the Colosseum?", opts: ["Greek","Ottoman","Roman","Byzantine"], a: 2, exp: "The Roman Colosseum was completed around 80 AD under Emperor Titus." },
    { q: "In what year did the Berlin Wall fall?", opts: ["1987","1989","1991","1993"], a: 1, exp: "The Berlin Wall fell on 9 November 1989, marking the end of the Cold War era." },
    { q: "Which country was the first to grant women the right to vote?", opts: ["USA","UK","New Zealand","France"], a: 2, exp: "New Zealand became the first self-governing country to grant women the vote in 1893." },
    { q: "Who agreed to the Magna Carta?", opts: ["King John alone","Henry VIII","Parliament alone","Barons and King John"], a: 3, exp: "The Magna Carta was agreed between King John and rebellious barons in 1215." },
    { q: "What ancient wonder was located in Alexandria?", opts: ["The Colossus","The Lighthouse","The Hanging Gardens","The Sphinx"], a: 1, exp: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World." },
    { q: "The French Revolution began in which year?", opts: ["1776","1789","1799","1804"], a: 1, exp: "The French Revolution began in 1789 with the storming of the Bastille." },
    { q: "Who was the first man to walk on the Moon?", opts: ["Buzz Aldrin","Yuri Gagarin","Neil Armstrong","John Glenn"], a: 2, exp: "Neil Armstrong stepped onto the Moon on 20 July 1969 during the Apollo 11 mission." },
    { q: "What was the name of the ship that sank in 1912?", opts: ["Lusitania","Britannic","Olympic","Titanic"], a: 3, exp: "The RMS Titanic sank on 15 April 1912 after hitting an iceberg in the North Atlantic." }
  ],
  geography: [
    { q: "What is the capital of Australia?", opts: ["Sydney","Melbourne","Canberra","Brisbane"], a: 2, exp: "Canberra is Australia's capital — chosen as a compromise between Sydney and Melbourne." },
    { q: "Which is the longest river in the world?", opts: ["Amazon","Congo","Mississippi","Nile"], a: 3, exp: "The Nile is generally recognised as the world's longest river at about 6,650 km." },
    { q: "How many countries are in Africa?", opts: ["48","54","60","44"], a: 1, exp: "Africa has 54 recognised sovereign countries — the most of any continent." },
    { q: "What is the smallest country in the world?", opts: ["Monaco","San Marino","Liechtenstein","Vatican City"], a: 3, exp: "Vatican City covers just 0.44 km², making it the world's smallest country." },
    { q: "Mount Everest is on the border of which two countries?", opts: ["India and China","Nepal and China","Nepal and India","Bhutan and China"], a: 1, exp: "Mount Everest sits on the border between Nepal and Tibet (China)." },
    { q: "What is the capital of Canada?", opts: ["Toronto","Vancouver","Montreal","Ottawa"], a: 3, exp: "Ottawa is Canada's capital, located in the province of Ontario." },
    { q: "Which ocean is the largest?", opts: ["Atlantic","Indian","Arctic","Pacific"], a: 3, exp: "The Pacific Ocean covers more than 165 million km² — roughly half the world's ocean area." },
    { q: "What is the currency of Japan?", opts: ["Yuan","Won","Yen","Baht"], a: 2, exp: "Japan's currency is the Yen (¥), one of the most traded currencies in the world." },
    { q: "Through how many countries does the Amazon River flow?", opts: ["2","3","5","7"], a: 1, exp: "The Amazon flows through Peru, Colombia, and Brazil — 3 countries in total." },
    { q: "What is the seat of South Africa's executive government?", opts: ["Cape Town","Johannesburg","Pretoria","Durban"], a: 2, exp: "Pretoria is the executive capital. South Africa also has legislative (Cape Town) and judicial (Bloemfontein) capitals." }
  ],
  maths: [
    { q: "What is 17 × 8?", opts: ["126","134","136","138"], a: 2, exp: "17 × 8 = 136. Quick method: (20 × 8) − (3 × 8) = 160 − 24 = 136." },
    { q: "What is the square root of 144?", opts: ["11","12","13","14"], a: 1, exp: "12 × 12 = 144, so √144 = 12." },
    { q: "What is 15% of 200?", opts: ["25","30","35","40"], a: 1, exp: "15% of 200 = 0.15 × 200 = 30." },
    { q: "What is the next prime number after 13?", opts: ["15","16","17","19"], a: 2, exp: "17 is prime — not divisible by 2, 3, or 5. 15 and 16 are composite." },
    { q: "What is 2 to the power of 10?", opts: ["512","1024","2048","256"], a: 1, exp: "2¹⁰ = 1024. This is why a kilobyte is 1024 bytes." },
    { q: "What is the perimeter of a square with sides of 7cm?", opts: ["21cm","28cm","49cm","14cm"], a: 1, exp: "Perimeter = 4 × side = 4 × 7 = 28cm." },
    { q: "A train travels 120 miles in 2 hours. What is its speed?", opts: ["50 mph","60 mph","70 mph","80 mph"], a: 1, exp: "Speed = distance ÷ time = 120 ÷ 2 = 60 mph." },
    { q: "What is the sum of angles in a triangle?", opts: ["90°","120°","180°","360°"], a: 2, exp: "The interior angles of any triangle always sum to 180°." },
    { q: "What is 3/4 expressed as a decimal?", opts: ["0.34","0.7","0.75","0.8"], a: 2, exp: "3 ÷ 4 = 0.75." },
    { q: "How many degrees are in a full circle?", opts: ["180°","270°","360°","400°"], a: 2, exp: "A full rotation is 360°, a convention from ancient Babylonian astronomy." }
  ]
};

export const SUBJECT_CONFIG = {
  science:   { label: "Science",   emoji: "🔬", bg: "#EEEDFE", text: "#3C3489", bar: "#7F77DD" },
  history:   { label: "History",   emoji: "📜", bg: "#E1F5EE", text: "#085041", bar: "#1D9E75" },
  geography: { label: "Geography", emoji: "🌍", bg: "#FAEEDA", text: "#633806", bar: "#EF9F27" },
  maths:     { label: "Maths",     emoji: "🔢", bg: "#FAECE7", text: "#712B13", bar: "#D85A30" }
};

export const XP_PER_CORRECT = 20;
export const XP_PER_LEVEL = 100;
export const MAX_LIVES = 3;
export const QS_PER_SESSION = 1;       // 1 question per subject per daily session
export const BONUS_QS = 4;             // bonus round length
export const MAX_FIFTY_FIFTY = 3;      // 50/50 uses per day
