// Questions are organised into 4 tiers per subject.
// Tier 1 (Lv 1-2)  - Year 3-5 equivalent - everyday "nice to know" facts
// Tier 2 (Lv 3-4)  - Year 6-8 equivalent - secondary school basics
// Tier 3 (Lv 5-6)  - GCSE equivalent - needs some study
// Tier 4 (Lv 7+)   - A-Level / degree equivalent - genuinely tricky

export const QUESTIONS = {

  // SCIENCE
  science: {
    1: [
      { q: "Which direction does the Earth spin?", opts: ["West to east","East to west","North to south","It doesn't spin"], a: 0, exp: "The Earth spins west to east, which is why the sun appears to rise in the east." },
      { q: "Frogs, lizards, and snakes are all examples of which animal group?", opts: ["Mammals","Reptiles","Amphibians","Birds"], a: 1, exp: "Lizards and snakes are reptiles. Frogs are actually amphibians - a common mix-up!" },
      { q: "What gas do humans breathe out?", opts: ["Oxygen","Hydrogen","Carbon dioxide","Nitrogen"], a: 2, exp: "We breathe in oxygen and breathe out carbon dioxide as a waste product." },
      { q: "How many legs does a spider have?", opts: ["6","8","10","12"], a: 1, exp: "Spiders have 8 legs, which is one way to tell them apart from insects, which have 6." },
      { q: "What do bees make that humans eat?", opts: ["Honey","Wax only","Pollen","Nectar only"], a: 0, exp: "Bees collect nectar and turn it into honey, which they store in honeycombs." },
      { q: "Which part of the plant absorbs water from the soil?", opts: ["Leaves","Flowers","Roots","Stem"], a: 2, exp: "Roots draw up water and nutrients from the soil to feed the rest of the plant." },
      { q: "What is the closest star to Earth?", opts: ["The North Star","The Sun","Sirius","Proxima Centauri"], a: 1, exp: "The Sun is a star, and it's by far the closest one to Earth." },
      { q: "What do you call an animal that only eats plants?", opts: ["Carnivore","Omnivore","Herbivore","Predator"], a: 2, exp: "Herbivores eat only plants. Cows, rabbits, and elephants are all herbivores." },
      { q: "Which of these is a solid, liquid, and gas depending on temperature?", opts: ["Wood","Water","Glass","Sand"], a: 1, exp: "Water can be ice (solid), liquid water, or steam (gas) depending on temperature." },
      { q: "What part of your body pumps blood?", opts: ["Lungs","Brain","Heart","Liver"], a: 2, exp: "The heart is a muscle that pumps blood around your entire body." },
      { q: "What do plants need to make their own food?", opts: ["Sunlight, water, and carbon dioxide","Soil and darkness","Only water","Only sunlight"], a: 0, exp: "Through photosynthesis, plants use sunlight, water, and CO2 to make energy." },
      { q: "Which sense organ do you use to hear?", opts: ["Eyes","Nose","Ears","Skin"], a: 2, exp: "Ears detect sound waves and send signals to the brain so we can hear." },
    ],
    2: [
      { q: "What is the powerhouse of the cell, producing energy?", opts: ["Nucleus","Mitochondria","Ribosome","Cell wall"], a: 1, exp: "Mitochondria convert nutrients into ATP, the energy currency of the cell." },
      { q: "How many bones are in the adult human body?", opts: ["186","206","226","246"], a: 1, exp: "Adults have 206 bones. Babies are born with around 270, which fuse together over time." },
      { q: "What planet is known as the Red Planet?", opts: ["Venus","Jupiter","Mars","Saturn"], a: 2, exp: "Mars gets its reddish colour from iron oxide - essentially rust - on its surface." },
      { q: "What is the chemical symbol for gold?", opts: ["Go","Gd","Au","Ag"], a: 2, exp: "Gold's symbol Au comes from the Latin word 'aurum'." },
      { q: "Which gas do plants absorb from the air during photosynthesis?", opts: ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], a: 2, exp: "Plants absorb CO2 and release oxygen as a byproduct of photosynthesis." },
      { q: "What is the boiling point of water at sea level in Celsius?", opts: ["90C","100C","110C","120C"], a: 1, exp: "Water boils at 100C (212F) at standard sea-level air pressure." },
      { q: "Which organ in the body produces insulin?", opts: ["Liver","Kidney","Pancreas","Stomach"], a: 2, exp: "The pancreas produces insulin, which helps regulate blood sugar levels." },
      { q: "What force pulls objects toward the Earth?", opts: ["Magnetism","Friction","Gravity","Tension"], a: 2, exp: "Gravity is the force that pulls objects toward the centre of the Earth." },
      { q: "What is the largest organ in the human body?", opts: ["Liver","Brain","Skin","Lungs"], a: 2, exp: "Skin is the body's largest organ, covering an average of about 2 square metres." },
      { q: "Which planet has the most moons in our solar system?", opts: ["Earth","Mars","Jupiter","Saturn"], a: 3, exp: "Saturn currently holds the record with over 140 confirmed moons, more than Jupiter." },
      { q: "What is the most abundant gas in Earth's atmosphere?", opts: ["Oxygen","Carbon dioxide","Argon","Nitrogen"], a: 3, exp: "Nitrogen makes up about 78% of Earth's atmosphere - oxygen is only around 21%." },
      { q: "Which blood type is known as the universal donor?", opts: ["A","B","AB","O negative"], a: 3, exp: "O negative blood lacks the antigens that trigger immune reactions, so it can be given to almost anyone in an emergency." },
    ],
    3: [
      { q: "What is Newton's first law of motion also known as?", opts: ["Law of gravity","Law of inertia","Law of action-reaction","Law of momentum"], a: 1, exp: "Newton's first law - the law of inertia - says an object stays at rest or in motion unless acted on by a force." },
      { q: "What is the atomic number of carbon?", opts: ["4","6","8","12"], a: 1, exp: "Carbon has 6 protons in its nucleus, giving it atomic number 6." },
      { q: "Which part of the eye controls how much light enters?", opts: ["Retina","Cornea","Iris","Lens"], a: 2, exp: "The iris adjusts the size of the pupil to control how much light enters the eye." },
      { q: "What type of rock is formed from cooled lava or magma?", opts: ["Sedimentary","Metamorphic","Igneous","Mineral"], a: 2, exp: "Igneous rock forms when molten rock cools and solidifies, either above or below the surface." },
      { q: "What is the speed of light in a vacuum, approximately?", opts: ["300,000 km/s","150,000 km/s","500,000 km/s","1,000,000 km/s"], a: 0, exp: "Light travels at roughly 299,792 km per second in a vacuum - the universe's speed limit." },
      { q: "What is the process by which plants lose water vapour through their leaves called?", opts: ["Respiration","Transpiration","Germination","Photosynthesis"], a: 1, exp: "Transpiration is the evaporation of water from plant leaves, helping draw water up from the roots." },
      { q: "What does DNA stand for?", opts: ["Deoxyribonucleic acid","Dynamic nuclear acid","Double nucleotide acid","Distributed nuclear arrangement"], a: 0, exp: "DNA - deoxyribonucleic acid - carries the genetic instructions for life." },
      { q: "Which element has the chemical symbol 'Na'?", opts: ["Nitrogen","Neon","Sodium","Nickel"], a: 2, exp: "Na comes from 'natrium', the Latin name for sodium." },
      { q: "What is the unit used to measure electrical resistance?", opts: ["Volt","Watt","Ohm","Amp"], a: 2, exp: "Resistance is measured in ohms, named after physicist Georg Ohm." },
      { q: "What type of bond involves the sharing of electron pairs between atoms?", opts: ["Ionic bond","Covalent bond","Metallic bond","Hydrogen bond"], a: 1, exp: "Covalent bonds form when atoms share pairs of electrons, common in molecules like water and CO2." },
      { q: "Which gland in the brain is often called the 'master gland'?", opts: ["Thyroid","Adrenal","Pituitary","Pineal"], a: 2, exp: "The pituitary gland regulates many other glands in the body via hormones." },
      { q: "What is the term for an organism that can make its own food using sunlight?", opts: ["Heterotroph","Autotroph","Decomposer","Parasite"], a: 1, exp: "Autotrophs, like plants and algae, produce their own food via photosynthesis." },
    ],
    4: [
      { q: "What does Avogadro's number represent?", opts: ["The number of protons in an atom","The number of particles in one mole of a substance","The speed of a chemical reaction","The mass of an electron"], a: 1, exp: "Avogadro's number, approximately 6.022 x 10^23, is the number of particles in one mole of a substance." },
      { q: "What is the Heisenberg Uncertainty Principle primarily about?", opts: ["The age of the universe","The limits of knowing a particle's position and momentum simultaneously","The speed of light in different media","The decay rate of radioactive elements"], a: 1, exp: "It states that the more precisely you know a particle's position, the less precisely you can know its momentum, and vice versa." },
      { q: "Which enzyme unwinds the DNA double helix during replication?", opts: ["DNA polymerase","Helicase","Ligase","RNA polymerase"], a: 1, exp: "Helicase unwinds the double helix by breaking the hydrogen bonds between base pairs." },
      { q: "What is the term for the energy required to remove an electron from an atom?", opts: ["Electronegativity","Ionisation energy","Electron affinity","Activation energy"], a: 1, exp: "Ionisation energy is the energy needed to remove the outermost electron from a neutral atom." },
      { q: "In thermodynamics, what does the second law state about entropy in an isolated system?", opts: ["It always decreases","It always increases or stays the same","It remains constant","It oscillates"], a: 1, exp: "The second law of thermodynamics states entropy in an isolated system tends to increase over time." },
      { q: "What is the name of the process where a star collapses under its own gravity to form a black hole?", opts: ["Nuclear fusion","Gravitational collapse","Nebular contraction","Stellar drift"], a: 1, exp: "When a massive star runs out of fuel, gravity overwhelms outward pressure and the core collapses, potentially forming a black hole." },
      { q: "What is the Krebs cycle also known as?", opts: ["The glycolysis cycle","The citric acid cycle","The electron transport chain","The fermentation cycle"], a: 1, exp: "The Krebs cycle, or citric acid cycle, is a key stage of cellular respiration that releases energy from nutrients." },
      { q: "Which subatomic particle has no electric charge?", opts: ["Proton","Electron","Neutron","Positron"], a: 2, exp: "Neutrons are electrically neutral, unlike protons (positive) and electrons (negative)." },
      { q: "What is the term for two or more elements having the same atomic number but different mass numbers?", opts: ["Isomers","Isotopes","Allotropes","Isobars"], a: 1, exp: "Isotopes are atoms of the same element with different numbers of neutrons, giving them different mass numbers." },
      { q: "What does the term 'half-life' refer to in radioactive decay?", opts: ["The time for all atoms to decay","The time for half the atoms in a sample to decay","Half the energy released by decay","The midpoint of an element's discovery"], a: 1, exp: "Half-life is the time it takes for half of a radioactive sample to decay into other elements." },
      { q: "Which law states that pressure and volume of a gas are inversely proportional at constant temperature?", opts: ["Charles's Law","Boyle's Law","Avogadro's Law","Gay-Lussac's Law"], a: 1, exp: "Boyle's Law states that for a fixed amount of gas at constant temperature, pressure and volume are inversely related." },
      { q: "What is the main function of ribosomes in a cell?", opts: ["Energy production","Protein synthesis","Waste removal","Storing genetic material"], a: 1, exp: "Ribosomes read genetic instructions from mRNA and assemble amino acids into proteins." },
    ],
  },

  // HISTORY
  history: {
    1: [
      { q: "Who is known for discovering America in 1492 (according to popular history)?", opts: ["Christopher Columbus","Ferdinand Magellan","Marco Polo","Vasco da Gama"], a: 0, exp: "Christopher Columbus sailed across the Atlantic in 1492, landing in the Caribbean." },
      { q: "What ancient civilisation built the pyramids of Giza?", opts: ["The Romans","The Greeks","The Egyptians","The Aztecs"], a: 2, exp: "The ancient Egyptians built the pyramids as tombs for their pharaohs, around 4,500 years ago." },
      { q: "Which country has a history connected to samurai warriors?", opts: ["China","Japan","Korea","Thailand"], a: 1, exp: "Samurai were the military nobility of Japan for centuries." },
      { q: "What were knights typically known for in medieval times?", opts: ["Farming","Fighting on horseback in armour","Sailing ships","Building roads"], a: 1, exp: "Knights were armoured warriors who fought on horseback, often serving lords or kings." },
      { q: "Which famous wall was built to separate East and West Berlin?", opts: ["The Great Wall","The Berlin Wall","Hadrian's Wall","The Western Wall"], a: 1, exp: "The Berlin Wall divided the city from 1961 until it fell in 1989." },
      { q: "What did ancient people use before modern money was invented?", opts: ["Bartering goods","Credit cards","Cheques","Paper notes"], a: 0, exp: "Before coins and notes, people traded goods and services directly through bartering." },
      { q: "Who was a famous queen of ancient Egypt?", opts: ["Cleopatra","Boudicca","Joan of Arc","Marie Antoinette"], a: 0, exp: "Cleopatra was the last active ruler of the Ptolemaic Kingdom of Egypt." },
      { q: "What did people travel in before cars were invented?", opts: ["Horse-drawn carriages","Bicycles only","Trains only","Airplanes"], a: 0, exp: "Before motor vehicles, horse-drawn carriages and carts were a primary mode of land transport." },
      { q: "Which famous ship sank in 1912 after hitting an iceberg?", opts: ["The Titanic","The Mayflower","The Lusitania","The Beagle"], a: 0, exp: "The RMS Titanic sank on its maiden voyage after striking an iceberg in the North Atlantic." },
      { q: "What is the name for ancient stone monuments like Stonehenge?", opts: ["Pyramids","Megaliths","Aqueducts","Mausoleums"], a: 1, exp: "Megaliths are large stones used in prehistoric monuments - Stonehenge is one of the most famous." },
      { q: "Which empire was ruled by emperors and built famous roads across Europe?", opts: ["The Roman Empire","The British Empire","The Ottoman Empire","The Mongol Empire"], a: 0, exp: "The Roman Empire built an extensive network of roads, many of which still exist in parts today." },
      { q: "Who is famous for leading the first powered flight?", opts: ["Orville and Wilbur Wright","Amelia Earhart","Charles Lindbergh","Leonardo da Vinci"], a: 0, exp: "The Wright brothers achieved the first powered, controlled flight in 1903." },
    ],
    2: [
      { q: "In what year did World War II end?", opts: ["1943","1944","1945","1946"], a: 2, exp: "WWII ended in 1945 - VE Day in Europe was May, and VJ Day in Japan was August." },
      { q: "Who was the first President of the United States?", opts: ["Thomas Jefferson","John Adams","Benjamin Franklin","George Washington"], a: 3, exp: "George Washington served as the first US President from 1789 to 1797." },
      { q: "Which empire built the Colosseum in Rome?", opts: ["Greek","Ottoman","Roman","Byzantine"], a: 2, exp: "The Colosseum was completed around 80 AD under the Roman Emperor Titus." },
      { q: "In what year did the Berlin Wall fall?", opts: ["1987","1989","1991","1993"], a: 1, exp: "The Berlin Wall fell on 9 November 1989, marking the symbolic end of the Cold War era in Europe." },
      { q: "Which country was the first to grant women the right to vote nationally?", opts: ["USA","UK","New Zealand","France"], a: 2, exp: "New Zealand became the first self-governing country to grant women the vote, in 1893." },
      { q: "The French Revolution began in which year?", opts: ["1776","1789","1799","1804"], a: 1, exp: "The French Revolution began in 1789 with the storming of the Bastille prison in Paris." },
      { q: "Who was the first man to walk on the Moon?", opts: ["Buzz Aldrin","Yuri Gagarin","Neil Armstrong","John Glenn"], a: 2, exp: "Neil Armstrong stepped onto the Moon on 20 July 1969 during the Apollo 11 mission." },
      { q: "What was the name of the period of artistic rebirth in Europe after the Middle Ages?", opts: ["The Enlightenment","The Renaissance","The Reformation","The Industrial Revolution"], a: 1, exp: "The Renaissance, meaning 'rebirth', was a cultural movement spanning roughly the 14th to 17th centuries." },
      { q: "Which civilisation is credited with inventing democracy?", opts: ["Ancient Rome","Ancient Greece","Ancient Egypt","Ancient China"], a: 1, exp: "Ancient Athens developed an early form of democracy where citizens could vote on laws." },
      { q: "Who agreed to the Magna Carta in 1215?", opts: ["King John and the barons","Henry VIII alone","Parliament alone","Queen Elizabeth I"], a: 0, exp: "The Magna Carta was agreed between King John and a group of rebellious barons, limiting royal power." },
      { q: "What event is widely considered to have triggered the start of World War I?", opts: ["The bombing of Pearl Harbor","The assassination of Archduke Franz Ferdinand","The fall of the Berlin Wall","The signing of the Treaty of Versailles"], a: 1, exp: "The assassination of Archduke Franz Ferdinand of Austria-Hungary in 1914 set off a chain of events leading to WWI." },
      { q: "Which ancient trade route connected China to the Mediterranean?", opts: ["The Silk Road","The Amber Road","The Spice Route","The Royal Road"], a: 0, exp: "The Silk Road was a network of trade routes connecting East Asia with the Mediterranean for centuries." },
    ],
    3: [
      { q: "Which dynasty built the Great Wall of China in its most famous form?", opts: ["Tang Dynasty","Ming Dynasty","Qin Dynasty","Han Dynasty"], a: 1, exp: "While construction began earlier, most of the Great Wall as it stands today was built during the Ming Dynasty." },
      { q: "What treaty officially ended World War I?", opts: ["Treaty of Versailles","Treaty of Paris","Treaty of Vienna","Treaty of Westphalia"], a: 0, exp: "The Treaty of Versailles, signed in 1919, formally ended WWI and imposed heavy penalties on Germany." },
      { q: "Who was the leader of the Soviet Union during most of World War II?", opts: ["Vladimir Lenin","Nikita Khrushchev","Joseph Stalin","Leon Trotsky"], a: 2, exp: "Joseph Stalin led the Soviet Union from the late 1920s until his death in 1953, including through WWII." },
      { q: "Which English king was famously beheaded in 1649?", opts: ["Henry VIII","Charles I","James II","Richard III"], a: 1, exp: "Charles I was executed in 1649 following the English Civil War, after which England briefly became a republic." },
      { q: "The Industrial Revolution began primarily in which country?", opts: ["France","Germany","Great Britain","United States"], a: 2, exp: "The Industrial Revolution began in Great Britain in the late 18th century, driven by innovations like the steam engine." },
      { q: "Which civilisation developed cuneiform, one of the first known writing systems?", opts: ["Ancient Egypt","Ancient Sumer","Ancient Greece","Ancient Rome"], a: 1, exp: "The Sumerians of Mesopotamia developed cuneiform around 3400 BC, one of the earliest known writing systems." },
      { q: "What was the name of the policy of appeasement most associated with British PM Neville Chamberlain before WWII?", opts: ["The Munich Agreement","The Marshall Plan","The Yalta Conference","The Lend-Lease Act"], a: 0, exp: "The 1938 Munich Agreement allowed Germany to annex part of Czechoslovakia in an attempt to avoid war." },
      { q: "Which queen ruled England during a period often called a 'Golden Age', including the defeat of the Spanish Armada?", opts: ["Queen Victoria","Mary I","Elizabeth I","Anne"], a: 2, exp: "Elizabeth I's reign (1558-1603) saw the defeat of the Spanish Armada in 1588 and a flourishing of arts and exploration." },
      { q: "What was the main cause of the Boston Tea Party in 1773?", opts: ["A protest against taxation without representation","A trade war with France","A religious dispute","A protest against slavery"], a: 0, exp: "American colonists protested British taxes on tea, dumping shipments into Boston Harbor." },
      { q: "Which empire was ruled from Constantinople for over a thousand years?", opts: ["The Roman Empire","The Ottoman Empire","The Byzantine Empire","The Persian Empire"], a: 2, exp: "The Byzantine Empire, the eastern continuation of Rome, was centred on Constantinople until 1453." },
      { q: "What was the name of the major famine that struck Ireland in the 1840s?", opts: ["The Great Famine","The Long Winter","The Black Death","The Hunger Years"], a: 0, exp: "The Great Famine, caused largely by potato blight, led to mass death and emigration from Ireland." },
      { q: "Who was the first Emperor of unified China?", opts: ["Qin Shi Huang","Sun Tzu","Confucius","Genghis Khan"], a: 0, exp: "Qin Shi Huang unified China's warring states in 221 BC and became its first emperor." },
    ],
    4: [
      { q: "What diplomatic system do historians argue made WWI spread so quickly across Europe?", opts: ["The mandate system","The alliance system","Non-aggression pacts","Colonial trade routes"], a: 1, exp: "A web of alliances (Triple Entente and Triple Alliance) meant a regional conflict quickly drew in most of Europe." },
      { q: "The Council of Trent was a major response by the Catholic Church to which movement?", opts: ["The Renaissance","The Enlightenment","The Protestant Reformation","The Crusades"], a: 2, exp: "The Council of Trent (1545-1563) was central to the Counter-Reformation, reaffirming Catholic doctrine against Protestant challenges." },
      { q: "Which 19th-century war was fought between Prussia and France, leading to German unification?", opts: ["The Crimean War","The Franco-Prussian War","The Napoleonic Wars","The Seven Years' War"], a: 1, exp: "Prussia's victory in the Franco-Prussian War (1870-71) directly led to the unification of Germany under Prussian leadership." },
      { q: "What economic theory, dominant before the 20th century, held that a nation's wealth was measured by its stock of gold and silver?", opts: ["Capitalism","Mercantilism","Socialism","Feudalism"], a: 1, exp: "Mercantilism emphasised exporting more than importing to accumulate precious metals, shaping European colonial policy." },
      { q: "The Edict of Nantes, issued in 1598, granted rights to which religious group in France?", opts: ["Catholics","Huguenots (Protestants)","Jews","Muslims"], a: 1, exp: "The Edict of Nantes granted substantial rights to French Protestants, known as Huguenots, ending decades of religious war." },
      { q: "Which Mongol leader's empire became the largest contiguous land empire in history?", opts: ["Genghis Khan","Kublai Khan","Tamerlane","Attila the Hun"], a: 0, exp: "Genghis Khan founded the Mongol Empire, which his successors expanded into the largest contiguous land empire ever." },
      { q: "What was the 'Scramble for Africa'?", opts: ["A gold rush in South Africa","The rapid colonisation of Africa by European powers in the late 19th century","A series of African independence wars","A migration of African populations to Europe"], a: 1, exp: "Between roughly 1881 and 1914, European powers rapidly invaded and colonised almost all of Africa." },
      { q: "The Defenestration of Prague in 1618 helped trigger which major European conflict?", opts: ["The Hundred Years' War","The Thirty Years' War","The War of the Roses","The War of Spanish Succession"], a: 1, exp: "This event, where officials were thrown from a castle window, sparked the devastating Thirty Years' War (1618-1648)." },
      { q: "Which ancient Greek historian is often called the 'Father of History'?", opts: ["Thucydides","Herodotus","Plutarch","Plato"], a: 1, exp: "Herodotus, writing in the 5th century BC, is often credited as the first writer to apply systematic methods to historical narrative." },
      { q: "The Meiji Restoration of 1868 marked the end of which Japanese system of government?", opts: ["The shogunate","The empire","Colonial rule","Democratic parliament"], a: 0, exp: "The Meiji Restoration ended over 250 years of rule by the Tokugawa shogunate, restoring imperial power and modernising Japan." },
      { q: "What was the 'Domesday Book', commissioned in 1086?", opts: ["A religious text","A legal code","A survey of land and property in England","A map of trade routes"], a: 2, exp: "Commissioned by William the Conqueror, the Domesday Book was a detailed survey of land ownership across England." },
      { q: "Which agreement in 1494 divided newly discovered lands outside Europe between Spain and Portugal?", opts: ["Treaty of Tordesillas","Treaty of Westphalia","Treaty of Utrecht","Treaty of Madrid"], a: 0, exp: "The Treaty of Tordesillas drew a line dividing new territories between the Spanish and Portuguese empires." },
    ],
  },

  // GEOGRAPHY
  geography: {
    1: [
      { q: "Which is the largest ocean on Earth?", opts: ["Atlantic Ocean","Indian Ocean","Arctic Ocean","Pacific Ocean"], a: 3, exp: "The Pacific Ocean covers more than 165 million km2 - roughly a third of the Earth's surface." },
      { q: "Which continent is the Sahara Desert located on?", opts: ["Asia","Africa","Australia","South America"], a: 1, exp: "The Sahara is the largest hot desert in the world and covers much of North Africa." },
      { q: "What is the name of the line that divides the Earth into Northern and Southern hemispheres?", opts: ["The Prime Meridian","The Equator","The Tropic of Cancer","The International Date Line"], a: 1, exp: "The Equator is an imaginary line around the middle of the Earth, splitting it into two hemispheres." },
      { q: "Which country is shaped like a boot?", opts: ["Spain","Italy","Greece","Portugal"], a: 1, exp: "Italy's distinctive boot shape is one of the most recognisable on a world map." },
      { q: "What do you call a large area of frozen land near the poles?", opts: ["Desert","Tundra","Savanna","Rainforest"], a: 1, exp: "Tundra is a cold, treeless region found near the Arctic, with frozen subsoil." },
      { q: "Which famous river flows through Egypt?", opts: ["The Amazon","The Nile","The Yangtze","The Danube"], a: 1, exp: "The Nile flows through northeastern Africa and has supported Egyptian civilisation for thousands of years." },
      { q: "What is the tallest mountain in the world?", opts: ["K2","Mount Kilimanjaro","Mount Everest","Denali"], a: 2, exp: "Mount Everest, on the border of Nepal and Tibet, stands at about 8,849 metres." },
      { q: "Which of these is NOT one of the seven continents?", opts: ["Antarctica","Europe","Greenland","Australia"], a: 2, exp: "Greenland is the world's largest island, but it's not a continent - it's part of North America geographically." },
      { q: "What is the name for a body of water surrounded by land on all sides?", opts: ["Bay","Lake","Strait","Peninsula"], a: 1, exp: "A lake is an inland body of water, fully or mostly surrounded by land." },
      { q: "Which country is famous for the Eiffel Tower?", opts: ["Italy","Spain","France","Germany"], a: 2, exp: "The Eiffel Tower stands in Paris, France, and was built in 1889." },
      { q: "What do you call a piece of land surrounded by water on three sides?", opts: ["Island","Peninsula","Isthmus","Archipelago"], a: 1, exp: "A peninsula is land that is almost surrounded by water but connected to a larger landmass." },
      { q: "Which animal is commonly associated with Australia and hops on two legs?", opts: ["Kangaroo","Panda","Penguin","Camel"], a: 0, exp: "Kangaroos are marsupials native to Australia, known for their powerful hind legs." },
    ],
    2: [
      { q: "What is the capital of Australia?", opts: ["Sydney","Melbourne","Canberra","Brisbane"], a: 2, exp: "Canberra is Australia's capital - it was purpose-built as a compromise between Sydney and Melbourne." },
      { q: "Which is the longest river in the world?", opts: ["Amazon","Congo","Mississippi","Nile"], a: 3, exp: "The Nile is generally recognised as the world's longest river, at roughly 6,650 km." },
      { q: "How many countries are there in Africa?", opts: ["48","54","60","44"], a: 1, exp: "Africa has 54 recognised sovereign countries - the most of any continent." },
      { q: "What is the smallest country in the world?", opts: ["Monaco","San Marino","Liechtenstein","Vatican City"], a: 3, exp: "Vatican City covers just 0.44 km2, making it by far the world's smallest country." },
      { q: "Mount Everest sits on the border between Nepal and which other territory?", opts: ["India","China (Tibet)","Bhutan","Pakistan"], a: 1, exp: "Mount Everest straddles the border between Nepal and Tibet, an autonomous region of China." },
      { q: "What is the capital of Canada?", opts: ["Toronto","Vancouver","Montreal","Ottawa"], a: 3, exp: "Ottawa, located in Ontario, is Canada's capital - though Toronto is its largest city." },
      { q: "What is the currency of Japan?", opts: ["Yuan","Won","Yen","Baht"], a: 2, exp: "Japan's currency is the Yen, one of the most traded currencies in the world." },
      { q: "Which European country has the largest population?", opts: ["France","Germany","UK","Italy"], a: 1, exp: "Germany has the largest population in the European Union, at around 84 million people." },
      { q: "What is the largest desert in the world (including cold deserts)?", opts: ["Sahara Desert","Gobi Desert","Arabian Desert","Antarctic Desert"], a: 3, exp: "Technically, Antarctica is the world's largest desert by area, since deserts are defined by low precipitation, not heat." },
      { q: "Which strait separates Europe from Africa at its narrowest point?", opts: ["Strait of Gibraltar","Bosphorus Strait","Strait of Hormuz","Bering Strait"], a: 0, exp: "The Strait of Gibraltar separates Spain from Morocco by just about 13 km at its narrowest." },
      { q: "What is the most populous city in the world?", opts: ["Tokyo","Shanghai","Delhi","Mexico City"], a: 0, exp: "The Tokyo metropolitan area is generally ranked as the world's most populous urban area." },
      { q: "Which mountain range separates Europe from Asia?", opts: ["The Alps","The Andes","The Ural Mountains","The Himalayas"], a: 2, exp: "The Ural Mountains in Russia form a traditional boundary between the continents of Europe and Asia." },
    ],
    3: [
      { q: "Which country has the most time zones?", opts: ["Russia","USA","France","China"], a: 2, exp: "France has 12 time zones due to its overseas territories scattered across the globe - more than any other country." },
      { q: "What is the deepest point in the world's oceans?", opts: ["Puerto Rico Trench","Mariana Trench","Java Trench","Tonga Trench"], a: 1, exp: "The Mariana Trench in the Pacific Ocean reaches depths of nearly 11,000 metres, the deepest known point on Earth." },
      { q: "Which African country was never colonised by a European power?", opts: ["Ethiopia","Kenya","Nigeria","Egypt"], a: 0, exp: "Ethiopia successfully resisted Italian colonisation attempts and remained independent, with a brief occupation during WWII." },
      { q: "What is the name of the imaginary line at 0 degrees longitude that passes through Greenwich, England?", opts: ["The Equator","The Prime Meridian","The Tropic of Capricorn","The International Date Line"], a: 1, exp: "The Prime Meridian at 0 degrees longitude is the reference line from which all other longitudes are measured." },
      { q: "Which landlocked country is entirely surrounded by South Africa?", opts: ["Lesotho","Eswatini","Botswana","Zimbabwe"], a: 0, exp: "Lesotho is one of only three countries in the world entirely enclosed within another country - in this case, South Africa." },
      { q: "What type of climate is found in the Amazon rainforest?", opts: ["Mediterranean","Tropical","Temperate","Arid"], a: 1, exp: "The Amazon has a tropical climate, characterised by high temperatures and heavy rainfall year-round." },
      { q: "Which sea is the saltiest large body of water on Earth?", opts: ["Red Sea","Dead Sea","Caspian Sea","Mediterranean Sea"], a: 1, exp: "The Dead Sea's extremely high salt content (around 34%) makes it roughly 10 times saltier than the ocean." },
      { q: "What is the name for a wind that blows seasonally and brings heavy rain to South Asia?", opts: ["The Trade Winds","The Monsoon","The Sirocco","The Jet Stream"], a: 1, exp: "The monsoon is a seasonal wind pattern that brings heavy rainfall to regions like India each year." },
      { q: "Which two countries share the longest international border in the world?", opts: ["USA and Canada","Russia and China","Chile and Argentina","Kazakhstan and Russia"], a: 0, exp: "The US-Canada border stretches over 8,800 km, the longest international border in the world." },
      { q: "What is the term for a city that serves as the seat of government of a country?", opts: ["Metropolis","Capital","Province","Municipality"], a: 1, exp: "A capital city is the official seat of a country's government, though it isn't always the largest city." },
      { q: "Which river flows through more countries than any other in the world?", opts: ["The Nile","The Danube","The Amazon","The Niger"], a: 1, exp: "The Danube flows through 10 countries, more than any other river in the world." },
      { q: "What is the name of the boundary where tectonic plates move apart from each other?", opts: ["Convergent boundary","Divergent boundary","Transform boundary","Subduction zone"], a: 1, exp: "At a divergent boundary, plates move apart, often creating new crust - like along the Mid-Atlantic Ridge." },
    ],
    4: [
      { q: "What is the Koppen climate classification system primarily based on?", opts: ["Altitude and latitude only","Temperature and precipitation patterns","Soil composition","Ocean currents only"], a: 1, exp: "The Koppen system classifies the world's climates based on temperature and precipitation patterns throughout the year." },
      { q: "Which geological feature is the East African Rift an example of?", opts: ["A subduction zone","A continental divergent boundary","A volcanic hotspot only","An ancient impact crater"], a: 1, exp: "The East African Rift is where the African continent is slowly splitting into two tectonic plates." },
      { q: "What is the term for the line on a map connecting points of equal elevation?", opts: ["Isobar","Contour line","Isotherm","Meridian"], a: 1, exp: "Contour lines connect points of equal elevation, used on topographic maps to show terrain shape." },
      { q: "Which ocean current keeps Western Europe's climate milder than other regions at similar latitudes?", opts: ["The Humboldt Current","The Gulf Stream","The Kuroshio Current","The Benguela Current"], a: 1, exp: "The Gulf Stream carries warm water from the Gulf of Mexico across the Atlantic, moderating Western Europe's climate." },
      { q: "What is an exclave?", opts: ["An island nation","A piece of territory politically attached to a country but not physically connected to it","A demilitarised zone","A region with its own currency"], a: 1, exp: "An exclave is a portion of a country's territory that is geographically separated from the main part, like Kaliningrad for Russia." },
      { q: "Which desert is the largest hot desert in the world by area?", opts: ["Gobi Desert","Sahara Desert","Kalahari Desert","Arabian Desert"], a: 1, exp: "The Sahara, covering much of North Africa, is the largest hot desert in the world at roughly 9.2 million km2." },
      { q: "What causes the phenomenon of a 'rain shadow'?", opts: ["Ocean currents blocking clouds","Mountains forcing air to rise, lose moisture, then descend dry on the other side","Excess pollution in the atmosphere","The rotation of the Earth"], a: 1, exp: "As air rises over a mountain it cools and drops its moisture; the descending air on the far side is dry, creating a 'rain shadow'." },
      { q: "Which country has the most active volcanoes in the world?", opts: ["Japan","Indonesia","Iceland","United States"], a: 1, exp: "Indonesia has the highest number of active volcanoes, due to its position on the Pacific Ring of Fire." },
      { q: "What is the term for a region where two or more tectonic plates meet, creating earthquakes and volcanoes?", opts: ["A craton","A plate boundary","A continental shelf","A seamount"], a: 1, exp: "Plate boundaries are zones of intense geological activity, including most of the world's earthquakes and volcanoes." },
      { q: "Which country is the only one to span all four hemispheres (North, South, East, and West)?", opts: ["Brazil","Kiribati","Indonesia","Russia"], a: 1, exp: "Kiribati is the only country whose territory extends into all four hemispheres, due to its scattered Pacific islands." },
      { q: "What is the name for the boundary that marks the highest point reached by the tide?", opts: ["The continental shelf","The high water mark","The littoral zone","The bathymetric line"], a: 1, exp: "The high water mark is the highest point on land reached by the tide, often used to define coastal boundaries." },
      { q: "Which projection is commonly used for world maps but distorts the size of regions near the poles?", opts: ["Robinson projection","Mercator projection","Mollweide projection","Goode projection"], a: 1, exp: "The Mercator projection preserves angles and shapes locally but greatly exaggerates the size of areas near the poles, like Greenland." },
    ],
  },

  // MATHS
  maths: {
    1: [
      { q: "What is 12 + 15?", opts: ["25","27","29","23"], a: 1, exp: "12 + 15 = 27." },
      { q: "What is half of 50?", opts: ["20","25","30","15"], a: 1, exp: "Half of 50 is 25, since 25 + 25 = 50." },
      { q: "How many sides does a hexagon have?", opts: ["5","6","7","8"], a: 1, exp: "A hexagon has 6 sides - 'hexa' means six in Greek." },
      { q: "What is 9 x 3?", opts: ["24","27","30","21"], a: 1, exp: "9 x 3 = 27." },
      { q: "What is 100 - 37?", opts: ["63","67","73","53"], a: 0, exp: "100 - 37 = 63." },
      { q: "How many minutes are there in an hour?", opts: ["50","60","100","30"], a: 1, exp: "There are 60 minutes in one hour." },
      { q: "What is the next number in this sequence: 2, 4, 6, 8, ___?", opts: ["9","10","12","11"], a: 1, exp: "This sequence increases by 2 each time, so the next number is 10." },
      { q: "What shape has 4 equal sides and 4 right angles?", opts: ["Rectangle","Triangle","Square","Circle"], a: 2, exp: "A square has 4 equal sides and 4 right angles (90 degrees each)." },
      { q: "What is 7 x 8?", opts: ["54","56","58","64"], a: 1, exp: "7 x 8 = 56." },
      { q: "If you have 3 apples and someone gives you 5 more, how many do you have?", opts: ["7","8","9","6"], a: 1, exp: "3 + 5 = 8 apples." },
      { q: "What is 1/2 + 1/4?", opts: ["1/6","2/6","3/4","1/4"], a: 2, exp: "1/2 is the same as 2/4, so 2/4 + 1/4 = 3/4." },
      { q: "What is 20% of 50?", opts: ["5","10","15","20"], a: 1, exp: "20% of 50 = 0.20 x 50 = 10." },
    ],
    2: [
      { q: "What is 17 x 8?", opts: ["126","134","136","138"], a: 2, exp: "17 x 8 = 136. Quick method: (20 x 8) - (3 x 8) = 160 - 24 = 136." },
      { q: "What is the square root of 144?", opts: ["11","12","13","14"], a: 1, exp: "12 x 12 = 144, so the square root of 144 is 12." },
      { q: "What is 15% of 200?", opts: ["25","30","35","40"], a: 1, exp: "15% of 200 = 0.15 x 200 = 30." },
      { q: "What is the next prime number after 13?", opts: ["15","16","17","19"], a: 2, exp: "17 is prime - it's not divisible by 2, 3, or 5. 15 and 16 are not prime." },
      { q: "What is 2 to the power of 10?", opts: ["512","1024","2048","256"], a: 1, exp: "2 to the power of 10 is 1024. This is why a kilobyte is often defined as 1024 bytes." },
      { q: "A train travels 120 miles in 2 hours. What is its average speed?", opts: ["50 mph","60 mph","70 mph","80 mph"], a: 1, exp: "Speed = distance / time = 120 / 2 = 60 mph." },
      { q: "What is the sum of angles in a triangle?", opts: ["90 degrees","120 degrees","180 degrees","360 degrees"], a: 2, exp: "The interior angles of any triangle always sum to 180 degrees." },
      { q: "What is 3/4 expressed as a decimal?", opts: ["0.34","0.7","0.75","0.8"], a: 2, exp: "3 divided by 4 = 0.75." },
      { q: "What is the perimeter of a square with sides of 9cm?", opts: ["18cm","36cm","81cm","27cm"], a: 1, exp: "Perimeter = 4 x side length = 4 x 9 = 36cm." },
      { q: "What is 144 divided by 12?", opts: ["10","11","12","14"], a: 2, exp: "144 / 12 = 12." },
      { q: "If x + 7 = 15, what is x?", opts: ["6","7","8","9"], a: 2, exp: "x = 15 - 7 = 8." },
      { q: "What is the area of a rectangle with a length of 8cm and a width of 5cm?", opts: ["13cm2","26cm2","40cm2","45cm2"], a: 2, exp: "Area = length x width = 8 x 5 = 40cm2." },
    ],
    3: [
      { q: "What is the value of pi to two decimal places?", opts: ["3.14","3.41","3.12","3.16"], a: 0, exp: "Pi is approximately 3.14159, commonly rounded to 3.14." },
      { q: "What is the formula for the area of a circle?", opts: ["2 x pi x r","pi x r squared","pi x d","2 x pi x r squared"], a: 1, exp: "The area of a circle is pi multiplied by the radius squared." },
      { q: "Solve for x: 3x - 5 = 16", opts: ["5","6","7","8"], a: 1, exp: "3x = 21, so x = 21 / 3 = 7." },
      { q: "What is the hypotenuse, according to Pythagoras' theorem, for a right triangle with sides 3 and 4?", opts: ["5","6","7","12"], a: 0, exp: "a squared + b squared = c squared, so 9 + 16 = 25, and c = the square root of 25 = 5." },
      { q: "What is 12.5% as a fraction in its simplest form?", opts: ["1/4","1/8","1/6","1/16"], a: 1, exp: "12.5% = 12.5/100 = 1/8." },
      { q: "What is the median of this set of numbers: 3, 7, 9, 12, 15?", opts: ["7","9","12","10.4"], a: 1, exp: "The median is the middle value when numbers are ordered - here it's 9." },
      { q: "What is 5 cubed?", opts: ["15","25","125","625"], a: 2, exp: "5 cubed = 5 x 5 x 5 = 125." },
      { q: "What type of angle is greater than 90 degrees but less than 180 degrees?", opts: ["Acute","Right","Obtuse","Reflex"], a: 2, exp: "An obtuse angle is between 90 and 180 degrees." },
      { q: "If a shirt costs 40 pounds and is discounted by 25%, what is the new price?", opts: ["25 pounds","30 pounds","32 pounds","35 pounds"], a: 1, exp: "25% of 40 pounds is 10 pounds, so the new price is 40 - 10 = 30 pounds." },
      { q: "What is the lowest common multiple (LCM) of 4 and 6?", opts: ["10","12","18","24"], a: 1, exp: "The smallest number divisible by both 4 and 6 is 12." },
      { q: "What is the gradient (slope) of a line that rises 6 units for every 2 units it runs horizontally?", opts: ["2","3","4","6"], a: 1, exp: "Gradient = rise / run = 6 / 2 = 3." },
      { q: "What is 0.4 expressed as a fraction in its simplest form?", opts: ["1/4","2/5","4/10","1/2"], a: 1, exp: "0.4 = 4/10, which simplifies to 2/5." },
    ],
    4: [
      { q: "What is the derivative of x squared with respect to x?", opts: ["x","2x","x squared","2"], a: 1, exp: "Using the power rule, the derivative of x squared is 2x." },
      { q: "What is the value of sin(90 degrees)?", opts: ["0","0.5","1","Undefined"], a: 2, exp: "sin(90 degrees) = 1, the maximum value of the sine function." },
      { q: "What is the sum of the interior angles of a hexagon?", opts: ["360 degrees","540 degrees","720 degrees","900 degrees"], a: 2, exp: "The sum of interior angles of a polygon is (n-2) x 180 degrees. For a hexagon (n=6), that's 4 x 180 = 720 degrees." },
      { q: "What is the formula for compound interest, where P is principal, r is rate, n is times compounded per year, and t is years?", opts: ["P(1+rt)","P(1+r)^t","P(1+r/n)^(nt)","Prt"], a: 2, exp: "Compound interest is calculated as A = P(1 + r/n)^(nt), accounting for compounding frequency." },
      { q: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?", opts: ["a+d-b-c","ad-bc","ab-cd","ad+bc"], a: 1, exp: "The determinant of a 2x2 matrix is calculated as (a times d) minus (b times c)." },
      { q: "If log base 10 of x = 3, what is x?", opts: ["30","300","1000","3000"], a: 2, exp: "log base 10 of x = 3 means 10 to the power of 3 = x, so x = 1000." },
      { q: "What is the integral of 1/x with respect to x?", opts: ["x squared / 2","the natural log of the absolute value of x, plus C","1/x squared + C","e to the x + C"], a: 1, exp: "The integral of 1/x is the natural logarithm of the absolute value of x, plus a constant." },
      { q: "In a standard normal distribution, approximately what percentage of values fall within one standard deviation of the mean?", opts: ["50%","68%","95%","99.7%"], a: 1, exp: "About 68% of values in a normal distribution fall within one standard deviation of the mean - part of the '68-95-99.7' rule." },
      { q: "What is the value of i squared in complex numbers, where i is the imaginary unit?", opts: ["1","-1","0","i"], a: 1, exp: "By definition, i is the square root of -1, so i squared = -1." },
      { q: "What is the formula for the nth term of an arithmetic sequence with first term a and common difference d?", opts: ["a + (n-1)d","a x d^n","a + nd","a^n x d"], a: 0, exp: "The nth term of an arithmetic sequence is given by a + (n-1)d." },
      { q: "What does it mean for two events to be 'mutually exclusive' in probability?", opts: ["They always occur together","They cannot occur at the same time","They have equal probability","They are independent"], a: 1, exp: "Mutually exclusive events cannot both happen at the same time - if one occurs, the other cannot." },
      { q: "What is the result of differentiating sin(x) with respect to x?", opts: ["cos(x)","-cos(x)","-sin(x)","tan(x)"], a: 0, exp: "The derivative of sin(x) is cos(x)." },
    ],
  },

  // SOCIAL STUDIES
  socialstudies: {
    1: [
      { q: "What do we call the document that lists the rules a country is governed by?", opts: ["A treaty","A constitution","A manifesto","A census"], a: 1, exp: "A constitution sets out the fundamental laws and principles by which a country is governed." },
      { q: "What is the term for money that a government collects from people and businesses?", opts: ["Tax","Interest","Profit","Loan"], a: 0, exp: "Taxes are payments collected by governments to fund public services like roads, schools, and healthcare." },
      { q: "What do you call the process where citizens choose their leaders by voting?", opts: ["A census","An election","A referendum","A debate"], a: 1, exp: "An election is the formal process by which citizens vote to choose their representatives or leaders." },
      { q: "What is the name for a group of countries that work together, such as for trade or peace?", opts: ["A union or alliance","A monarchy","A dictatorship","A colony"], a: 0, exp: "Unions and alliances, like the EU or NATO, are groups of countries cooperating on shared goals." },
      { q: "What do we call a person who has fled their home country due to war or persecution?", opts: ["A tourist","A refugee","An ambassador","A citizen"], a: 1, exp: "A refugee is someone who has been forced to leave their country, often due to conflict or persecution." },
      { q: "What is the name for the money a country uses?", opts: ["Currency","Capital","Commerce","Census"], a: 0, exp: "Currency is the system of money used in a particular country, like the pound, dollar, or yen." },
      { q: "What do we call the basic rights and freedoms that belong to every person?", opts: ["Privileges","Human rights","Civil duties","Public services"], a: 1, exp: "Human rights are fundamental rights and freedoms that belong to everyone, regardless of nationality or background." },
      { q: "What is the name for a community's local governing body, often dealing with things like roads and bins?", opts: ["Parliament","Council","Senate","Cabinet"], a: 1, exp: "A local council manages community services at a local level, separate from national government." },
      { q: "What is it called when a country buys goods from another country?", opts: ["Exporting","Importing","Investing","Lending"], a: 1, exp: "Importing means bringing goods into a country from abroad, the opposite of exporting." },
      { q: "What do you call someone who represents their country in another nation?", opts: ["A diplomat or ambassador","A tourist","A migrant","A senator"], a: 0, exp: "Ambassadors and diplomats represent their country's interests and maintain relations abroad." },
      { q: "What is the term for a country ruled by a king or queen?", opts: ["A republic","A monarchy","A democracy","A federation"], a: 1, exp: "A monarchy is a system of government with a king, queen, or emperor as head of state." },
      { q: "What does 'GDP' commonly relate to?", opts: ["A country's population size","The size of a country's economy","A country's land area","A country's military strength"], a: 1, exp: "GDP, or Gross Domestic Product, measures the total value of goods and services a country produces." },
    ],
    2: [
      { q: "How many members are in the UK House of Commons?", opts: ["450","550","650","750"], a: 2, exp: "The House of Commons has 650 elected MPs, each representing a constituency." },
      { q: "What does GDP stand for?", opts: ["General Domestic Product","Gross Domestic Product","Global Development Plan","Government Debt Proportion"], a: 1, exp: "GDP - Gross Domestic Product - measures the total value of goods and services a country produces in a given period." },
      { q: "Which organisation currently has 193 member states?", opts: ["NATO","The European Union","The United Nations","The World Bank"], a: 2, exp: "The United Nations has 193 member states, making it the largest international organisation of its kind." },
      { q: "What is inflation?", opts: ["A rise in unemployment","A fall in the stock market","A general rise in prices over time","A government spending cut"], a: 2, exp: "Inflation is the rate at which the general level of prices for goods and services rises, reducing purchasing power." },
      { q: "In which year did the United Kingdom vote in the Brexit referendum?", opts: ["2014","2015","2016","2017"], a: 2, exp: "The Brexit referendum took place on 23 June 2016, with a majority voting to leave the European Union." },
      { q: "What is the role of a central bank, such as the Bank of England?", opts: ["To lend money to individuals directly","To manage a country's currency and monetary policy","To collect income tax","To run the national stock exchange"], a: 1, exp: "Central banks manage a country's money supply, interest rates, and overall monetary stability." },
      { q: "What is a 'bill' in the context of government?", opts: ["A type of tax","A proposed law before it is passed","A government department","A type of currency"], a: 1, exp: "A bill is a draft of a proposed law that is debated and voted on before potentially becoming an act." },
      { q: "What is the term for the movement of people from rural areas to cities?", opts: ["Migration","Urbanisation","Globalisation","Colonisation"], a: 1, exp: "Urbanisation describes the increasing proportion of a population living in towns and cities." },
      { q: "Which of these best describes a 'mixed economy'?", opts: ["An economy with only government-owned businesses","An economy with only private businesses","An economy combining private enterprise and government intervention","An economy based purely on bartering"], a: 2, exp: "A mixed economy combines elements of both free-market capitalism and government regulation or ownership." },
      { q: "What is the term for the legal right to vote?", opts: ["Citizenship","Suffrage","Sovereignty","Legislation"], a: 1, exp: "Suffrage refers to the right to vote in political elections." },
      { q: "What does the term 'separation of powers' refer to?", opts: ["Dividing a country into states","Splitting government into branches like executive, legislative, and judicial","Separating church and state only","Dividing the economy into sectors"], a: 1, exp: "Separation of powers divides government responsibilities into branches to prevent any one part from gaining too much power." },
      { q: "What is a 'recession'?", opts: ["A period of rapid economic growth","A significant decline in economic activity over a sustained period","A sudden increase in employment","A type of government policy"], a: 1, exp: "A recession is typically defined as a significant decline in economic activity lasting more than a few months." },
    ],
    3: [
      { q: "What is the term for a tax that takes a larger percentage from low-income earners than high-income earners?", opts: ["Progressive tax","Regressive tax","Proportional tax","Flat tax"], a: 1, exp: "A regressive tax takes a larger share of income from those who earn less, such as many sales taxes." },
      { q: "What is the name for the system where power is divided between a central government and regional governments?", opts: ["Unitary system","Federal system","Confederation","Theocracy"], a: 1, exp: "In a federal system, like the USA or Germany, power is constitutionally divided between national and regional governments." },
      { q: "What does 'fiscal policy' refer to?", opts: ["A central bank adjusting interest rates","Government use of spending and taxation to influence the economy","Trade agreements between countries","Regulations on imports and exports"], a: 1, exp: "Fiscal policy involves government decisions on spending and taxation to influence economic conditions." },
      { q: "What is the term for goods and services available to everyone and not reduced by one person's use, like national defence?", opts: ["Private goods","Public goods","Merit goods","Demerit goods"], a: 1, exp: "Public goods, like street lighting or national defence, are non-excludable and non-rivalrous - everyone can use them without depleting them." },
      { q: "Which international organisation focuses on global trade rules between nations?", opts: ["The World Trade Organization","The International Monetary Fund","UNESCO","The World Health Organization"], a: 0, exp: "The World Trade Organization (WTO) sets rules for international trade and resolves disputes between member countries." },
      { q: "What is the term for when a government spends more money than it receives in revenue in a given year?", opts: ["A trade deficit","A budget deficit","A current account surplus","A balance of payments"], a: 1, exp: "A budget deficit occurs when government spending exceeds its income from taxes and other revenue in a given period." },
      { q: "What is 'soft power' in international relations?", opts: ["Military strength used to influence others","The ability to influence through culture, diplomacy, and values rather than force","Economic sanctions","Cyber warfare capability"], a: 1, exp: "Soft power refers to a country's ability to influence others through attraction and persuasion - culture, diplomacy, and values - rather than coercion." },
      { q: "What does the term 'electoral college' refer to in the US presidential election system?", opts: ["A university for politicians","A group of electors chosen to formally elect the President","The popular vote count","A committee that writes laws"], a: 1, exp: "The Electoral College is a body of electors, allocated by state, who formally cast votes to elect the US President." },
      { q: "What is 'civil society' generally understood to include?", opts: ["Only government institutions","Only businesses","NGOs, charities, unions, and community groups outside government and business","The military"], a: 2, exp: "Civil society refers to the space of voluntary organisations and associations - like charities, unions, and community groups - separate from government and business." },
      { q: "What is the term for a situation where a single company dominates a market with no real competition?", opts: ["Oligopoly","Monopoly","Duopoly","Cartel"], a: 1, exp: "A monopoly exists when one company has total or near-total control of a market, with no significant competitors." },
      { q: "What is the principal function of the judiciary branch of government?", opts: ["To create new laws","To enforce laws and maintain order","To interpret laws and administer justice","To collect taxes"], a: 2, exp: "The judiciary's role is to interpret laws, resolve disputes, and ensure justice is administered fairly." },
      { q: "What does 'devolution' mean in the context of UK governance?", opts: ["The abolition of regional governments","The transfer of certain powers from central government to regional bodies like Scotland or Wales","The merging of political parties","A type of taxation"], a: 1, exp: "Devolution involves transferring specific powers from the UK Parliament to devolved administrations like the Scottish Parliament or Welsh Senedd." },
    ],
    4: [
      { q: "What economic concept describes the idea that resources should go to whoever values them most, as reflected by willingness to pay?", opts: ["Marginal utility","Allocative efficiency","Comparative advantage","Diminishing returns"], a: 1, exp: "Allocative efficiency occurs when resources are distributed in a way that matches consumer preferences as expressed through prices." },
      { q: "What is the 'social contract' theory, associated with thinkers like Hobbes, Locke, and Rousseau?", opts: ["A legal document signed by all citizens","The idea that legitimate government authority derives from an implicit agreement among individuals to form society","A type of trade agreement","A religious doctrine about governance"], a: 1, exp: "Social contract theory holds that individuals consent, explicitly or implicitly, to surrender some freedoms to a government in exchange for protection of their remaining rights." },
      { q: "What is 'quantitative easing', a policy used by central banks?", opts: ["Raising interest rates sharply","A central bank purchasing financial assets to increase money supply and stimulate the economy","Reducing government spending","Increasing taxes on imports"], a: 1, exp: "Quantitative easing involves a central bank buying assets like government bonds to inject money into the economy, typically used when interest rates are already very low." },
      { q: "What does the term 'gerrymandering' refer to?", opts: ["A type of voting machine fraud","Manipulating electoral district boundaries to favour a particular party or group","A campaign finance loophole","A method of counting votes"], a: 1, exp: "Gerrymandering is the practice of drawing electoral district lines to give one political group an advantage over others." },
      { q: "What is the 'Gini coefficient' used to measure?", opts: ["A country's GDP growth rate","Income or wealth inequality within a population","Inflation rates","Unemployment levels"], a: 1, exp: "The Gini coefficient measures inequality, where 0 represents perfect equality and 1 represents maximum inequality." },
      { q: "What is 'realpolitik' in the context of international relations?", opts: ["A focus on ethical and moral principles in foreign policy","A practical, often pragmatic approach to politics based on power and national interest rather than ideals","A type of voting system","A theory of global trade"], a: 1, exp: "Realpolitik refers to politics based on practical considerations of power and national interest, rather than ideological or moral concerns." },
      { q: "What does the principle of 'subsidiarity' refer to, particularly in EU governance?", opts: ["Decisions should be made at the most local level possible, unless a higher level is more effective","All decisions must be made centrally","Member states have no individual sovereignty","Trade tariffs should be reduced to zero"], a: 0, exp: "Subsidiarity holds that matters should be handled by the smallest, lowest, or least centralised competent authority unless a higher level can act more effectively." },
      { q: "What is a 'liquidity trap' in economics?", opts: ["A situation where interest rates are very low but people still hoard cash rather than spend or invest","A sudden stock market crash","A type of trade barrier","A rapid increase in the money supply causing hyperinflation"], a: 0, exp: "A liquidity trap occurs when monetary policy becomes ineffective because people prefer holding cash even at near-zero interest rates, often during deflationary periods." },
      { q: "What does 'asymmetric information' refer to in economics?", opts: ["When one party in a transaction has more or better information than the other","When two countries trade unequal amounts","A type of stock market index","A government policy on information disclosure"], a: 0, exp: "Asymmetric information occurs when one party to a transaction has more or superior information than the other, which can lead to market inefficiencies." },
      { q: "What is the 'tragedy of the commons'?", opts: ["A Greek play about democracy","A scenario where individuals acting in their own interest deplete a shared resource, against the common good","A type of government collapse","A historical famine"], a: 1, exp: "The tragedy of the commons describes how shared resources, like fisheries or grazing land, can become depleted when individuals act in their own self-interest." },
      { q: "What is 'cultural hegemony', a concept developed by Antonio Gramsci?", opts: ["The dominance of one country's military over others","The way a ruling class's values and norms become accepted as the natural, default culture of a society","A type of trade agreement","A government's official language policy"], a: 1, exp: "Cultural hegemony refers to how a dominant group's worldview becomes seen as 'common sense', shaping society's norms and values." },
      { q: "What is the 'median voter theorem' in political science?", opts: ["The idea that the candidate closest to the preferences of the median voter tends to win in a two-party system","A method of counting votes","A theory about voter turnout rates","A rule about campaign spending limits"], a: 0, exp: "The median voter theorem suggests that in a majority-rule system with one-dimensional preferences, the median voter's preference tends to determine the outcome." },
    ],
  },
};

export const SUBJECT_CONFIG = {
  science:      { label: "Science",       emoji: "..", bg: "#EEEDFE", text: "#3C3489", bar: "#7F77DD" },
  history:      { label: "History",       emoji: "..", bg: "#E1F5EE", text: "#085041", bar: "#1D9E75" },
  geography:    { label: "Geography",     emoji: "..", bg: "#FAEEDA", text: "#633806", bar: "#EF9F27" },
  maths:        { label: "Maths",         emoji: "..", bg: "#FAECE7", text: "#712B13", bar: "#D85A30" },
  socialstudies:{ label: "Social Studies",emoji: "..", bg: "#E6F1FB", text: "#0C447C", bar: "#378ADD" }
};

export const DAILY_SUBJECT_ORDER = ["science","history","geography","maths","socialstudies"];

export const XP_PER_CORRECT = 20;
export const XP_PER_LEVEL   = 100;
export const MAX_FIFTY_FIFTY = 3;
export const PRACTICE_QS    = 5;

// Maps a subject level to a question tier (1-4)
// Lv 1-2 -> Tier 1, Lv 3-4 -> Tier 2, Lv 5-6 -> Tier 3, Lv 7+ -> Tier 4
export function getTierFromLevel(level) {
  return Math.min(4, Math.ceil(level / 2));
}

// Starting level mapping for onboarding calibration
// "New to this" -> Level 1 (Tier 1), "Pretty good" -> Level 3 (Tier 2), "Confident" -> Level 5 (Tier 3)
export const STARTING_LEVELS = {
  beginner: 1,
  average: 3,
  confident: 5,
};

export const DIFFICULTY_LABELS = [
  { key: 'beginner', label: 'New to this', level: 1 },
  { key: 'average',  label: 'Pretty good', level: 3 },
  { key: 'confident', label: 'Confident',  level: 5 },
];
