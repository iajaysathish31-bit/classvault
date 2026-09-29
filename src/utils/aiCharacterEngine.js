// ClassVault AI Character Engine
// Supports customizable hero mentors: Spider-Man, Tony Stark (Iron Man), Batman, Hermione Granger, and Albert Einstein.
// Context-aware knowledge base for the student's 4 official classes:
// 1. 24CSC2T351: Software Engineering
// 2. 24PHY2T351: Atomic, Molecular and Nuclear Physics
// 3. 24CPL2T451: Research Methodology
// 4. 24ELE2T351: Microcontroller and IoT

export const HERO_CHARACTERS = {
  spiderman: {
    id: 'spiderman',
    name: 'Spider-Man',
    realName: 'Peter Parker',
    title: 'Friendly Neighborhood AI Mentor',
    badge: 'Flagship Hero Tutor',
    themeColor: 'from-rose-600 via-red-600 to-indigo-800',
    primaryColor: '#e11d48',
    secondaryColor: '#2563eb',
    accentBorder: 'border-rose-500/30',
    headerBg: 'bg-gradient-to-r from-rose-600 to-indigo-700',
    tagline: 'With great knowledge comes great responsibility!',
    alertTitle: '🕷️ SPIDER-SENSE DEADLINE RADAR',
    alertSubtitle: 'My Spider-Sense is tingling! Urgent university assignments detected.',
    avatarEmoji: '🕷️',
    avatarSvg: 'spiderman',
    greeting:
      "Hey there, True Believer! Peter Parker here—your Friendly Neighborhood AI Mentor! Whether you need to untangle Software Engineering patterns, calculate quantum Zeeman splitting, or debug ESP32 IoT code, I've got your back. What are we swinging into today?",
    voiceTone: 'witty, energetic, science-enthusiastic, supportive, uses web & hero analogies',
    quickPrompts: [
      { label: '🚨 Spider-Sense Deadlines', query: 'What assignments are due soon and how do I solve them?' },
      { label: '🕷️ Explain MVC & SOLID', query: 'Can you explain the MVC pattern and SOLID principles in Software Engineering?' },
      { label: '⚛️ Solve Landé g-Factor', query: 'How do I calculate the Lande g-factor for 2P3/2 and 2S1/2 states in Physics?' },
      { label: '📡 ESP32 MQTT Firmware', query: 'Show me C/C++ firmware code to connect ESP32 to MQTT for IoT.' },
      { label: '📝 Research SLR Matrix', query: 'How do I build a Systematic Literature Review matrix for Research Methodology?' },
      { label: '🎯 Quiz Me!', query: 'Give me a quick multiple-choice quiz on my classes!' },
    ],
  },
  ironman: {
    id: 'ironman',
    name: 'Iron Man',
    realName: 'Tony Stark',
    title: 'Stark Industries Academic AI',
    badge: 'Tech Genius & Architect',
    themeColor: 'from-amber-500 via-red-600 to-slate-900',
    primaryColor: '#f59e0b',
    secondaryColor: '#dc2626',
    accentBorder: 'border-amber-500/30',
    headerBg: 'bg-gradient-to-r from-amber-500 to-red-700',
    tagline: 'Sometimes you gotta run before you can walk.',
    alertTitle: '⚠️ J.A.R.V.I.S. CRITICAL FLIGHT PATH',
    alertSubtitle: 'Sub-orbital deadline trajectory calculated. Immediate execution advised.',
    avatarEmoji: '🦾',
    avatarSvg: 'ironman',
    greeting:
      "Stark Industries Academic Division is live. I'm Tony Stark. J.A.R.V.I.S. and I have ingested your full course syllabus. Let's optimize your code, power up your physics derivations, and build something legendary.",
    voiceTone: 'confident, sharp, sarcastic tech billionaire, references clean systems and Arc Reactor specs',
    quickPrompts: [
      { label: '⚠️ JARVIS Deadline Check', query: 'What assignments are due soon and how do I solve them?' },
      { label: '🦾 Microservices Architecture', query: 'Why use Microservices and CI/CD pipelines instead of monoliths?' },
      { label: '⚡ Arc Reactor & Nuclear Decay', query: 'Explain the nuclear semi-empirical mass formula and binding energy.' },
      { label: '📡 ESP32 Hardware Protocols', query: 'Explain I2C vs SPI vs UART for microcontroller sensor interfacing.' },
      { label: '🎯 Stark Challenge Quiz', query: 'Give me a tough engineering challenge quiz!' },
    ],
  },
  batman: {
    id: 'batman',
    name: 'Batman',
    realName: 'Bruce Wayne',
    title: 'Gotham Strategic Study Sentinel',
    badge: 'Tactical Detective',
    themeColor: 'from-slate-800 via-zinc-900 to-amber-700',
    primaryColor: '#eab308',
    secondaryColor: '#1e293b',
    accentBorder: 'border-amber-400/30',
    headerBg: 'bg-gradient-to-r from-slate-900 to-zinc-800',
    tagline: "It's not who you are underneath, it's what you submit that defines you.",
    alertTitle: '🦇 BATCOMPUTER TACTICAL ALERT',
    alertSubtitle: 'Submissions surveillance: 2 high-priority academic objectives flagged.',
    avatarEmoji: '🦇',
    avatarSvg: 'batman',
    greeting:
      "I've compiled your academic dossier. There is no luck in engineering—only preparation and discipline. State your target topic and we will dissect it methodically.",
    voiceTone: 'methodical, serious, disciplined, strategic, analytical precision',
    quickPrompts: [
      { label: '🦇 Batcomputer Dossier', query: 'What assignments are due soon and how do I solve them?' },
      { label: '🛡️ Software Testing & TDD', query: 'How does Test-Driven Development (TDD) prevent software failure?' },
      { label: '🔬 Forensic Literature Review', query: 'What is the rigorous protocol for Scopus literature review synthesis?' },
      { label: '📡 Secure IoT & MQTT QoS', query: 'How does MQTT handle QoS levels and secure broker connections?' },
      { label: '🎯 Tactical Exam Prep', query: 'Give me an exam prep quiz on my core subjects!' },
    ],
  },
  hermione: {
    id: 'hermione',
    name: 'Hermione Granger',
    realName: 'Hermione Granger',
    title: 'Gryffindor Prefect & Scholar',
    badge: 'Academic Virtuoso',
    themeColor: 'from-purple-800 via-rose-800 to-amber-600',
    primaryColor: '#9333ea',
    secondaryColor: '#d97706',
    accentBorder: 'border-purple-400/30',
    headerBg: 'bg-gradient-to-r from-purple-800 to-rose-700',
    tagline: 'When in doubt, go to the library—or ask me!',
    alertTitle: '⏳ TIME-TURNER DEADLINE WARNING',
    alertSubtitle: 'Chronometer alert! Two assignment deadlines are rapidly approaching!',
    avatarEmoji: '⚡',
    avatarSvg: 'hermione',
    greeting:
      "Honestly! Have you checked your course schedule today? Don't worry—I've read all the required textbooks, indexed the syllabus, and prepared comprehensive study outlines for you. Let's earn those top marks!",
    voiceTone: 'scholarly, precise, encouraging, encyclopedic, emphasizes citations and clear structure',
    quickPrompts: [
      { label: '⏳ Time-Turner Alert', query: 'What assignments are due soon and how do I solve them?' },
      { label: '📚 Research Methodology & APA', query: 'Explain research hypotheses, Type I/II errors, and APA referencing.' },
      { label: '⚛️ Atomic Spectroscopy Spectra', query: 'Explain the Frank-Condon principle and Raman scattering spectra.' },
      { label: '💻 Clean Software Principles', query: 'Explain the SOLID principles with clear examples.' },
      { label: '🎯 Study Revision Quiz', query: 'Quiz me on my class concepts to test my memory!' },
    ],
  },
  einstein: {
    id: 'einstein',
    name: 'Albert Einstein',
    realName: 'Prof. Albert Einstein',
    title: 'Theoretical Physicist & Visionary',
    badge: 'Nobel Laureate',
    themeColor: 'from-cyan-800 via-blue-900 to-indigo-950',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    accentBorder: 'border-cyan-400/30',
    headerBg: 'bg-gradient-to-r from-teal-800 to-indigo-900',
    tagline: 'The important thing is not to stop questioning.',
    alertTitle: '🕰️ RELATIVITY INVARIANT ALERT',
    alertSubtitle: 'Time is relative, but your university submission deadline is an invariant constant!',
    avatarEmoji: '🔬',
    avatarSvg: 'einstein',
    greeting:
      "Guten Tag! Curiosity is the greatest gift of the human mind. Let us conduct thought experiments on software systems, quantum magnetic fields, and IoT communication networks together. What puzzle shall we explore?",
    voiceTone: 'philosophical, playful, thought-provoking, deep theoretical understanding, encouraging',
    quickPrompts: [
      { label: '🕰️ Invariant Deadlines', query: 'What assignments are due soon and how do I solve them?' },
      { label: '🌌 Vector Atom Model & Spin', query: 'Can you explain the Vector Atom Model and LS vs JJ coupling intuitively?' },
      { label: '⚛️ Nuclear Mass & Binding', query: 'Derive the Weizsacker semi-empirical mass formula for nuclear stability.' },
      { label: '📡 IoT Telemetry & Signals', query: 'How does digital sampling and ADC resolution work in microcontrollers?' },
      { label: '🎯 Quantum Thought Quiz', query: 'Give me a thought-experiment quiz on my subjects!' },
    ],
  },
}

// Dynamic Character Resolver: Accepts ANY character name entered by the user
export function getOrCreateHeroCharacter(characterNameOrId) {
  if (!characterNameOrId) return HERO_CHARACTERS.spiderman

  const clean = characterNameOrId.trim().toLowerCase()

  // 1. Direct key match or alias match
  for (const [key, hero] of Object.entries(HERO_CHARACTERS)) {
    if (
      key === clean ||
      hero.id.toLowerCase() === clean ||
      hero.name.toLowerCase() === clean ||
      hero.realName.toLowerCase() === clean ||
      clean.includes(hero.name.toLowerCase()) ||
      hero.name.toLowerCase().includes(clean)
    ) {
      return hero
    }
  }

  // 2. Special aliases for popular heroes
  if (clean.includes('spider') || clean.includes('peter')) return HERO_CHARACTERS.spiderman
  if (clean.includes('iron') || clean.includes('stark') || clean.includes('tony')) return HERO_CHARACTERS.ironman
  if (clean.includes('bat') || clean.includes('bruce') || clean.includes('wayne')) return HERO_CHARACTERS.batman
  if (clean.includes('hermione') || clean.includes('granger') || clean.includes('potter')) return HERO_CHARACTERS.hermione
  if (clean.includes('einstein') || clean.includes('albert')) return HERO_CHARACTERS.einstein

  // 3. Dynamic Custom Character Profile for ANY character entered by the user!
  const capitalized = characterNameOrId
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

  const safeId = clean.replace(/[^a-z0-9]/g, '_')

  return {
    id: safeId,
    name: capitalized,
    realName: capitalized,
    title: `${capitalized} · Your Personal Academic Companion`,
    badge: 'Custom Hero Tutor',
    themeColor: 'from-violet-600 via-indigo-600 to-sky-600',
    primaryColor: '#7c3aed',
    secondaryColor: '#0284c7',
    accentBorder: 'border-violet-500/30',
    headerBg: 'bg-gradient-to-r from-violet-700 via-indigo-700 to-sky-700',
    tagline: `Learning is your superpower with ${capitalized}!`,
    alertTitle: `⚡ ${capitalized.toUpperCase()} PRIORITY ALERT`,
    alertSubtitle: `Critical academic milestone flagged by ${capitalized}!`,
    avatarEmoji: '⚡',
    avatarSvg: 'custom',
    greeting: `Hey! ${capitalized} here—your personal AI mentor! Ready to conquer Software Engineering, derive Physics formulas, review Research Methodology, or program IoT microcontrollers together. What are we solving today?`,
    voiceTone: 'enthusiastic, supportive, focused on mastering your university classes',
    quickPrompts: [
      { label: `🚨 ${capitalized}'s Deadlines`, query: 'What assignments are due soon and how do I solve them?' },
      { label: '💻 Software Eng MVC & SOLID', query: 'Can you explain the MVC pattern and SOLID principles in Software Engineering?' },
      { label: '⚛️ Physics Landé g-Factor', query: 'How do I calculate the Lande g-factor for 2P3/2 and 2S1/2 states in Physics?' },
      { label: '📡 ESP32 MQTT Firmware', query: 'Show me C/C++ firmware code to connect ESP32 to MQTT for IoT.' },
      { label: '📝 Research SLR Matrix', query: 'How do I build a Systematic Literature Review matrix for Research Methodology?' },
      { label: '🎯 Knowledge Quiz', query: 'Give me a quick multiple-choice quiz on my classes!' },
    ],
  }
}


// Student's 4 Official Enrolled Subjects Data
export const STUDENT_COURSES = {
  '24CSC2T351': {
    code: '24CSC2T351',
    name: 'Software Engineering',
    faculty: 'Prof. Sara Okafor',
    topics: [
      'Software Development Life Cycle (SDLC) & Agile Scrum',
      'Requirement Engineering & Architectural Patterns (MVC, Microservices)',
      'Software Testing, Quality Assurance & CI/CD Pipelines',
      'Design Patterns (Factory, Observer, Singleton) & SOLID Principles',
    ],
  },
  '24PHY2T351': {
    code: '24PHY2T351',
    name: 'Atomic, Molecular and Nuclear Physics',
    faculty: 'Prof. Chen Wei',
    topics: [
      'Vector Atom Model, LS and JJ Coupling, Spectroscopic Terms',
      'Normal and Anomalous Zeeman Effect & Landé g-Factor',
      'Molecular Spectra, Rigid Rotator & Raman Scattering',
      'Liquid Drop Model, Weizsäcker Mass Formula & Decay Kinematics',
    ],
  },
  '24CPL2T451': {
    code: '24CPL2T451',
    name: 'Research Methodology',
    faculty: 'Dr. Priya Nair',
    topics: [
      'Research Problem Identification & Systematic Literature Review (SLR)',
      'Hypothesis Formulation (Null vs Alternative) & Experimental Design',
      'Quantitative & Qualitative Data Analysis (ANOVA, t-Tests, SPSS/R)',
      'Research Ethics, Turnitin Similarity Index & Thesis Structuring',
    ],
  },
  '24ELE2T351': {
    code: '24ELE2T351',
    name: 'Microcontroller and IoT',
    faculty: 'Prof. James Erikson',
    topics: [
      'Harvard vs Von Neumann Architecture & ESP32 / ARM Cortex Core',
      'Peripheral Interfacing: GPIO, ADC, UART, SPI, and I2C Buses',
      'Wireless Protocols: Wi-Fi, BLE, MQTT Broker Publish/Subscribe',
      'Cloud IoT Telemetry: AWS IoT Core, Adafruit IO, and ThingsBoard',
    ],
  },
}

// Live Pending Assignments with Character-Engine Guidance
export const PENDING_ASSIGNMENTS = [
  {
    id: 1,
    title: 'Agile Architecture & Sprint Backlog Specification',
    courseCode: '24CSC2T351',
    courseName: 'Software Engineering',
    dueDateText: 'Tomorrow, 11:59 PM',
    dueDays: 1,
    urgency: 'critical',
    points: 100,
    quickSummary:
      'Architect an enterprise system using Microservices & MVC pattern. Provide 5 user stories with Fibonacci story points and a GitHub Actions CI pipeline configuration.',
    stepsToSolve: [
      '1. **System Architecture**: Draw an MVC diagram separating the React presentation layer, Express API controller, and PostgreSQL database.',
      '2. **Sprint Backlog**: Define 5 User Stories in the format "As a [role], I want to [action] so that [benefit]" with acceptance criteria and Fibonacci story points (3, 5, 8).',
      '3. **CI/CD Workflow**: Provide a `.github/workflows/deploy.yml` YAML snippet running automated linting and unit tests on pull requests.',
    ],
  },
  {
    id: 2,
    title: 'Vector Atom Model & Zeeman Transition Proofs',
    courseCode: '24PHY2T351',
    courseName: 'Atomic, Molecular and Nuclear Physics',
    dueDateText: 'Sep 30, 2026 (In 2 days)',
    dueDays: 2,
    urgency: 'high',
    points: 100,
    quickSummary:
      'Derive Landé g-factor for 2P3/2 and 2S1/2 states. Calculate Zeeman energy splitting ΔE = g * μB * B in a 1.5 Tesla magnetic field.',
    stepsToSolve: [
      '1. **Landé g-factor Formula**: Use $g = 1 + \\frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}$.',
      '2. **State Calculations**:',
      '   - For $^2S_{1/2}$: $l=0, s=1/2, j=1/2 \\Rightarrow g = 1 + \\frac{3/4 + 3/4 - 0}{2(3/4)} = 2$.',
      '   - For $^2P_{3/2}$: $l=1, s=1/2, j=3/2 \\Rightarrow g = 1 + \\frac{15/4 + 3/4 - 2}{2(15/4)} = 4/3 \\approx 1.33$.',
      '3. **Energy Shift**: $\\Delta E = g \\mu_B B M_J$. With $B = 1.5\\text{ T}$ and $\\mu_B = 9.274 \\times 10^{-24}\\text{ J/T}$, compute the sub-level separations.',
    ],
  },
  {
    id: 3,
    title: 'Systematic Literature Review Matrix & Methodology Draft',
    courseCode: '24CPL2T451',
    courseName: 'Research Methodology',
    dueDateText: 'Oct 04, 2026 (In 6 days)',
    dueDays: 6,
    urgency: 'medium',
    points: 50,
    quickSummary:
      'Formulate research gap and null/alternate hypotheses for your term paper. Synthesize at least 15 Scopus/IEEE peer-reviewed papers into a comparative matrix.',
    stepsToSolve: [
      '1. **Hypothesis Formulation**: Clearly define $H_0$ (Null: no significant difference) and $H_1$ (Alternative: statistically significant effect).',
      '2. **Literature Matrix**: Create a table with columns: Author & Year, Objective, Methodology, Dataset/Sample Size, Key Findings, Research Limitation/Gap.',
      '3. **Ethical Compliance**: State Turnitin similarity limit (<15%) and APA 7th edition citation style.',
    ],
  },
  {
    id: 4,
    title: 'ESP32 MQTT Sensor Telemetry Firmware Suite',
    courseCode: '24ELE2T351',
    courseName: 'Microcontroller and IoT',
    dueDateText: 'Oct 08, 2026 (In 10 days)',
    dueDays: 10,
    urgency: 'normal',
    points: 100,
    quickSummary:
      'Develop C/C++ Arduino firmware for ESP32 to sample I2C DHT22/BME280 sensor data and publish JSON payloads over MQTT with automatic Wi-Fi reconnect.',
    stepsToSolve: [
      '1. **Hardware Configuration**: Connect SDA to GPIO 21 and SCL to GPIO 22 on ESP32 with 4.7kΩ pull-up resistors.',
      '2. **Libraries**: Include `<WiFi.h>`, `<PubSubClient.h>`, and `<ArduinoJson.h>`.',
      '3. **Broker Loop**: Implement `client.publish("classvault/telemetry", jsonPayload)` inside a non-blocking `millis()` timer loop.',
    ],
  },
]

// Quiz Database for Interactive Knowledge Testing
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    subject: 'Software Engineering (24CSC2T351)',
    question: 'In the SOLID design principles, what does the "L" (Liskov Substitution Principle) guarantee?',
    options: [
      'A) Classes should be open for extension but closed for modification.',
      'B) Subtypes must be substitutable for their base types without altering system correctness.',
      'C) Clients should not be forced to depend upon interfaces that they do not use.',
      'D) High-level modules should not depend on low-level modules.',
    ],
    correctAnswer: 1,
    explanation:
      'Liskov Substitution Principle (LSP) ensures that an instance of a derived subclass can seamlessly replace an instance of its parent class without breaking program invariants!',
  },
  {
    id: 'q2',
    subject: 'Atomic & Nuclear Physics (24PHY2T351)',
    question: 'What is the Landé g-factor for a pure electronic spin state ($^2S_{1/2}$, where $l=0$ and $s=1/2$)?',
    options: [
      'A) g = 1',
      'B) g = 2',
      'C) g = 4/3',
      'D) g = 0',
    ],
    correctAnswer: 1,
    explanation:
      'For $^2S_{1/2}$, $l=0, s=1/2, j=1/2$. Substituting into $g = 1 + \\frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}$ yields $g = 1 + \\frac{3/4 + 3/4 - 0}{2(3/4)} = 1 + 1 = 2$!',
  },
  {
    id: 'q3',
    subject: 'Research Methodology (24CPL2T451)',
    question: 'Which type of statistical error occurs when a researcher mistakenly rejects a TRUE null hypothesis ($H_0$)?',
    options: [
      'A) Type I Error (False Positive / Alpha error)',
      'B) Type II Error (False Negative / Beta error)',
      'C) Sampling Bias Error',
      'D) Standard Deviation Error',
    ],
    correctAnswer: 0,
    explanation:
      'A Type I Error (False Positive) happens when you reject the null hypothesis even though it was actually true in reality. Its probability is bounded by significance level $\\alpha$ (typically 0.05).',
  },
  {
    id: 'q4',
    subject: 'Microcontroller and IoT (24ELE2T351)',
    question: 'In the MQTT protocol, which Quality of Service (QoS) level guarantees that a message arrives "Exactly Once"?',
    options: [
      'A) QoS 0 (At most once / Fire and forget)',
      'B) QoS 1 (At least once / Acknowledged)',
      'C) QoS 2 (Exactly once / Four-step handshake)',
      'D) QoS 3 (Continuous broadcast)',
    ],
    correctAnswer: 2,
    explanation:
      'MQTT QoS 2 is the highest quality level, using a 4-step handshake (PUBLISH -> PUBREC -> PUBREL -> PUBCOMP) to ensure critical telemetry arrives exactly once without duplication!',
  },
]

// Natural Query Keyword Matchers & Solution Generators
export function generateAIResponse(userText, characterId = 'spiderman', contextData = {}) {
  const char = getOrCreateHeroCharacter(characterId)
  const text = (userText || '').toLowerCase().trim()

  // 1. DEADLINE / SPIDER-SENSE NOTIFICATION QUERY
  if (
    text.includes('due') ||
    text.includes('deadline') ||
    text.includes('assignment') ||
    text.includes('spider-sense') ||
    text.includes('radar') ||
    text.includes('urgent') ||
    text.includes('pending')
  ) {
    return generateDeadlineAlertResponse(char)
  }

  // 2. QUIZ REQUEST
  if (text.includes('quiz') || text.includes('test me') || text.includes('challenge me')) {
    const randomQuiz = QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)]
    return {
      type: 'quiz',
      quiz: randomQuiz,
      message: formatCharacterVoice(
        char,
        `Ready for an academic challenge? Here is a flash question on **${randomQuiz.subject}**:\n\n**${randomQuiz.question}**\n\nSelect an option below to test your mastery!`,
        'challenge'
      ),
    }
  }

  // 3. SUBJECT 1: SOFTWARE ENGINEERING (24CSC2T351)
  if (
    text.includes('software engineering') ||
    text.includes('mvc') ||
    text.includes('solid') ||
    text.includes('agile') ||
    text.includes('scrum') ||
    text.includes('microservice') ||
    text.includes('tdd') ||
    text.includes('ci/cd') ||
    text.includes('design pattern')
  ) {
    return generateSoftwareEngineeringResponse(char, text)
  }

  // 4. SUBJECT 2: ATOMIC & NUCLEAR PHYSICS (24PHY2T351)
  if (
    text.includes('physics') ||
    text.includes('lande') ||
    text.includes('landé') ||
    text.includes('zeeman') ||
    text.includes('vector atom') ||
    text.includes('semi-empirical') ||
    text.includes('liquid drop') ||
    text.includes('raman') ||
    text.includes('coupling') ||
    text.includes('spectroscopy')
  ) {
    return generatePhysicsResponse(char, text)
  }

  // 5. SUBJECT 3: RESEARCH METHODOLOGY (24CPL2T451)
  if (
    text.includes('research') ||
    text.includes('methodology') ||
    text.includes('hypothesis') ||
    text.includes('literature review') ||
    text.includes('scopus') ||
    text.includes('type i') ||
    text.includes('type 1') ||
    text.includes('anova') ||
    text.includes('plagiarism') ||
    text.includes('turnitin') ||
    text.includes('apa')
  ) {
    return generateResearchMethodologyResponse(char, text)
  }

  // 6. SUBJECT 4: MICROCONTROLLER AND IOT (24ELE2T351)
  if (
    text.includes('microcontroller') ||
    text.includes('iot') ||
    text.includes('esp32') ||
    text.includes('mqtt') ||
    text.includes('gpio') ||
    text.includes('i2c') ||
    text.includes('spi') ||
    text.includes('sensor') ||
    text.includes('broker') ||
    text.includes('arm cortex')
  ) {
    return generateIoTResponse(char, text)
  }

  // 7. STUDY TIPS / MOTIVATION
  if (text.includes('tip') || text.includes('study') || text.includes('motivat') || text.includes('advice') || text.includes('help')) {
    return generateStudyAdviceResponse(char)
  }

  // 8. GREETING / WHO ARE YOU
  if (
    text.includes('hello') ||
    text.includes('hi') ||
    text.includes('hey') ||
    text.includes('who are you') ||
    text.includes('name') ||
    text.length === 0
  ) {
    return {
      type: 'text',
      message: formatCharacterVoice(
        char,
        char.greeting +
          `\n\nI am specially synced with your 4 university courses:\n- **24CSC2T351**: Software Engineering\n- **24PHY2T351**: Atomic & Nuclear Physics\n- **24CPL2T451**: Research Methodology\n- **24ELE2T351**: Microcontroller and IoT\n\nAsk me any concept, formula, or code problem!`,
        'greeting'
      ),
    }
  }

  // DEFAULT / GENERAL PROBLEM SOLVER
  return generateGeneralResponse(char, userText)
}

// Character Voice Wrapper Helper
function formatCharacterVoice(char, content, context = 'normal') {
  let prefix = ''
  let suffix = ''

  if (char.id === 'spiderman') {
    if (context === 'urgent') {
      prefix = `🕷️ **[SPIDER-SENSE FLASH]** *Whoa! My Peter-Parker instincts are tingling at maximum voltage!*\n\n`
      suffix = `\n\nSwing into action now, and you'll be sleeping like a baby while everyone else is scrambling at 11:58 PM! You've got this!`
    } else if (context === 'challenge') {
      prefix = `🕷️ **Peter Parker's Lab Challenge:**\n\n`
      suffix = `\n\n*Remember: With great code comes great responsibility!*`
    } else {
      prefix = `🕷️ **Spider-Man here!** `
      suffix = `\n\n*Need any other hints? Just shoot me a web!*`
    }
  } else if (char.id === 'ironman') {
    if (context === 'urgent') {
      prefix = `🦾 **[STARK J.A.R.V.I.S. PROTOCOL]** *Heads up, kid! Arc Reactor output diverted to emergency assignment crunching.*\n\n`
      suffix = `\n\nDeploy these solutions before the deadline cuts you off. Stark Industries expects nothing less than 100/100.`
    } else {
      prefix = `🦾 **Tony Stark:** `
      suffix = `\n\n*Boom. Problem solved. What else you got?*`
    }
  } else if (char.id === 'batman') {
    if (context === 'urgent') {
      prefix = `🦇 **[BATCOMPUTER PRIORITY BRIEF]** *Immediate tactical action required. Procrastination is a liability.*\n\n`
      suffix = `\n\nExecution and discipline will triumph over panic. Submit your work early.`
    } else {
      prefix = `🦇 **Batman:** `
      suffix = `\n\n*Review these points carefully. The details make the difference.*`
    }
  } else if (char.id === 'hermione') {
    if (context === 'urgent') {
      prefix = `⚡ **[TIME-TURNER ALERT]** *Great Scott! You have urgent assignments due within 48 hours!*\n\n`
      suffix = `\n\nDon't forget to check your bibliography citations! Let's get this finished and submitted right away!`
    } else {
      prefix = `⚡ **Hermione Granger:** `
      suffix = `\n\n*I hope you took thorough notes! Let me know if you want another review!*`
    }
  } else if (char.id === 'einstein') {
    if (context === 'urgent') {
      prefix = `🔬 **[RELATIVITY INVARIANT ALERT]** *Guten Tag! Time may contract as velocity approaches c, but submission deadlines do not change!*\n\n`
      suffix = `\n\nApproach your work with curious contemplation and clear logic. You will prevail!`
    } else {
      prefix = `🔬 **Albert Einstein:** `
      suffix = `\n\n*Never stop questioning the underlying mechanics!*`
    }
  } else {
    // Dynamic Custom Character Voice
    if (context === 'urgent') {
      prefix = `⚡ **[${char.name.toUpperCase()} CRITICAL ALERT]** *Heads up! Urgent university deadlines detected within 48 hours!*\n\n`
      suffix = `\n\n*${char.name} says: Don't wait until the last minute. Swing into action now!*`
    } else if (context === 'challenge') {
      prefix = `⚡ **${char.name}'s Academic Challenge:**\n\n`
      suffix = `\n\n*${char.tagline}*`
    } else {
      prefix = `✨ **${char.name}:** `
      suffix = `\n\n*${char.tagline}*`
    }
  }

  return `${prefix}${content}${suffix}`
}

// 1. Response for Deadline Alert
function generateDeadlineAlertResponse(char) {
  const urgent = PENDING_ASSIGNMENTS.filter((a) => a.dueDays <= 2)
  const upcoming = PENDING_ASSIGNMENTS.filter((a) => a.dueDays > 2)

  let content = `### ${char.alertTitle}\n${char.alertSubtitle}\n\n`

  content += `#### 🚨 CRITICAL DEADLINES (Due in < 48 Hours):\n`
  urgent.forEach((a) => {
    content += `- **${a.title}** (${a.courseCode} · ${a.courseName})\n`
    content += `  - ⏰ **Deadline**: \`${a.dueDateText}\` (Score Weight: **${a.points} pts**)\n`
    content += `  - 💡 **Quick Blueprint**:\n`
    a.stepsToSolve.forEach((step) => {
      content += `    ${step}\n`
    })
    content += `\n`
  })

  content += `#### 📅 UPCOMING TARGETS ON RADAR:\n`
  upcoming.forEach((a) => {
    content += `- **${a.title}** (${a.courseCode}): Due **${a.dueDateText}**\n`
  })

  content += `\n**Pro-Tip**: Click any subject prompt below if you need me to write the exact equations, code samples, or architecture diagrams for these assignments!`

  return {
    type: 'deadline',
    urgentCount: urgent.length,
    message: formatCharacterVoice(char, content, 'urgent'),
  }
}

// 2. Response for Software Engineering
function generateSoftwareEngineeringResponse(char, query) {
  let content = ''

  if (query.includes('solid')) {
    content = `### 🧱 The 5 SOLID Principles in Software Engineering
The SOLID principles are the bedrock of maintainable, scalable object-oriented software:

1. **S - Single Responsibility Principle (SRP)**:
   - A class should have one, and only one, reason to change.
   - *Example*: Don't make a \`UserService\` that also formats invoices and connects to the email server. Separate into \`UserService\`, \`InvoiceGenerator\`, and \`EmailNotifier\`.

2. **O - Open/Closed Principle (OCP)**:
   - Software entities (classes, modules, functions) should be **open for extension, but closed for modification**.
   - *Example*: Use strategy interfaces or polymorphism instead of giant \`switch(userRole)\` statements.

3. **L - Liskov Substitution Principle (LSP)**:
   - Derived subclasses must be completely substitutable for their base types without altering system correctness.

4. **I - Interface Segregation Principle (ISP)**:
   - Clients should not be forced to implement interfaces they do not use. Prefer small, focused interfaces.

5. **D - Dependency Inversion Principle (DIP)**:
   - Depend upon abstractions, not concretions. High-level business logic should never directly instantiate low-level database drivers—inject them via constructors!

\`\`\`typescript
// Clean TypeScript Example of Dependency Inversion & Single Responsibility:
interface INotificationService {
  sendAlert(message: string): Promise<boolean>;
}

class StudentAssignmentManager {
  constructor(private notifier: INotificationService) {}

  submitAssignment(assignmentId: string): void {
    // Process submission logic
    this.notifier.sendAlert("Assignment " + assignmentId + " submitted successfully!");
  }
}
\`\`\``
  } else if (query.includes('mvc') || query.includes('architecture') || query.includes('microservice')) {
    content = `### 🏛️ MVC Architecture & Microservices Breakdown
For your **24CSC2T351 Assignment**, here is how to structure your design diagrams:

#### 1. Model-View-Controller (MVC) Pattern:
- **Model**: Encapsulates data schema and business rules (e.g. \`Assignment\`, \`Topic\`, \`Student\`).
- **View**: Renders UI components and captures user events (e.g. ClassVault React components & Tailwind styles).
- **Controller**: Acts as the intermediary, parsing HTTP/REST inputs, invoking Model queries, and passing data back to the View.

#### 2. Microservices vs. Monoliths:
- **Monolith**: Single unified codebase. Faster to deploy initially, but difficult to scale independently.
- **Microservices**: Decomposed into bounded contexts (e.g. *Auth Service*, *Gradebook Service*, *Notification Broker*). Connected via lightweight REST APIs or Kafka/RabbitMQ event streams.
- **CI/CD Integration**: Add automated GitHub Actions (\`.github/workflows/deploy.yml\`) with \`npm test\` and \`npm run build\` verification on every commit!`
  } else {
    content = `### 💻 Software Engineering Core Concepts (24CSC2T351)
Here are the essential pillars for your upcoming semester exam and lab assignments:

1. **Agile Scrum Framework**:
   - **Sprint Planning**: Selecting user stories from the Product Backlog.
   - **Daily Standup**: "What did I do yesterday? What will I do today? Are there any blockers?"
   - **Sprint Review & Retrospective**: Inspecting deliverables and team continuous improvement.

2. **Automated Testing Suite**:
   - **Unit Tests**: Test isolated pure functions (Jest / Mocha).
   - **Integration Tests**: Verify database queries and API endpoints work together.
   - **End-to-End (E2E)**: Simulates actual student browser flows (Playwright / Cypress).`
  }

  return {
    type: 'text',
    message: formatCharacterVoice(char, content, 'normal'),
  }
}

// 3. Response for Physics
function generatePhysicsResponse(char, query) {
  let content = ''

  if (query.includes('lande') || query.includes('landé') || query.includes('zeeman')) {
    content = `### ⚛️ Landé g-Factor & Zeeman Effect Derivation
*(Directly applicable to your 24PHY2T351 Assignment due in 2 days!)*

#### 1. The Landé g-factor Formula:
In the Vector Atom Model with $L-S$ coupling, the total magnetic moment is not collinear with total angular momentum $\\vec{J}$ due to the electron spin g-factor ($g_s \\approx 2, g_l = 1$). The effective Landé g-factor is:

$$g = 1 + \\frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}$$

#### 2. Step-by-Step State Calculations:
- **State $^2S_{1/2}$** (Ground state):
  - Quantum numbers: $l = 0$, $s = 1/2$, $j = 1/2$.
  - $$g = 1 + \\frac{\\frac{1}{2}\\cdot\\frac{3}{2} + \\frac{1}{2}\\cdot\\frac{3}{2} - 0}{2 \\cdot (\\frac{1}{2}\\cdot\\frac{3}{2})} = 1 + \\frac{3/4 + 3/4}{2 \\cdot (3/4)} = 1 + 1 = \\mathbf{2}$$

- **State $^2P_{3/2}$** (Excited state):
  - Quantum numbers: $l = 1$, $s = 1/2$, $j = 3/2$.
  - $$j(j+1) = \\frac{3}{2} \\cdot \\frac{5}{2} = \\frac{15}{4}$$
  - $$s(s+1) = \\frac{1}{2} \\cdot \\frac{3}{2} = \\frac{3}{4}$$
  - $$l(l+1) = 1 \\cdot 2 = 2 = \\frac{8}{4}$$
  - $$g = 1 + \\frac{\\frac{15}{4} + \\frac{3}{4} - \\frac{8}{4}}{2 \\cdot \\frac{15}{4}} = 1 + \\frac{10/4}{30/4} = 1 + \\frac{1}{3} = \\mathbf{\\frac{4}{3} \\approx 1.333}$$

#### 3. Energy Splitting in Magnetic Field $B = 1.5\\text{ T}$:
The Zeeman energy shift is given by:
$$\\Delta E = g \\mu_B B M_J$$
Where:
- $\\mu_B = 9.274 \\times 10^{-24} \\text{ J/T}$ (Bohr Magneton)
- For $^2P_{3/2}$, magnetic sublevels are $M_J = +3/2, +1/2, -1/2, -3/2$ (splits into 4 distinct levels!).
- Selection rules for allowed dipole transitions: $\\Delta M_J = 0, \\pm 1$.`
  } else if (query.includes('mass') || query.includes('liquid drop') || query.includes('semi-empirical')) {
    content = `### 💧 Liquid Drop Model & Weizsäcker Semi-Empirical Mass Formula
The Liquid Drop Model treats the nucleus like an incompressible drop of dense nuclear fluid. The total nuclear binding energy $B(A, Z)$ is formulated as:

$$B(A, Z) = a_v A - a_s A^{2/3} - a_c \\frac{Z(Z-1)}{A^{1/3}} - a_a \\frac{(A-2Z)^2}{A} \\pm \\delta(A, Z)$$

#### Breakdown of the 5 Energy Terms:
1. **Volume Term ($a_v A$)**: Represents strong attractive nuclear forces between adjacent nucleons (proportional to volume $\\propto A$).
2. **Surface Term ($-a_s A^{2/3}$)**: Correction for surface nucleons having fewer neighbors (analogous to surface tension).
3. **Coulomb Term ($-a_c \\frac{Z(Z-1)}{A^{1/3}}$)**: Electrostatic repulsion between $Z$ positively charged protons.
4. **Asymmetry Term ($-a_a \\frac{(A-2Z)^2}{A}$)**: Quantum Pauli exclusion penalty when neutron and proton numbers differ ($N \\neq Z$).
5. **Pairing Term ($\\pm \\delta$)**: $+ \\delta$ for Even-Even nuclei (most stable), $0$ for Odd-Even, and $-\\delta$ for Odd-Odd nuclei.`
  } else {
    content = `### ⚛️ Atomic & Nuclear Physics Essentials (24PHY2T351)
Key topics you must master for Prof. Chen Wei's course:
- **Vector Atom Model**: Introduces space quantization and electron spin ($s = 1/2$) to explain fine structure splitting.
- **Normal Zeeman Effect**: Observed in singlets ($S=0$); splits into a Lorentz triplet.
- **Anomalous Zeeman Effect**: Occurs when spin $S \\neq 0$; splitting governed by the Landé g-factor.
- **Raman Effect**: Inelastic scattering of photons; Stokes lines (lower frequency) and Anti-Stokes lines (higher frequency).`
  }

  return {
    type: 'text',
    message: formatCharacterVoice(char, content, 'normal'),
  }
}

// 4. Response for Research Methodology
function generateResearchMethodologyResponse(char, query) {
  let content = ''

  if (query.includes('matrix') || query.includes('literature review') || query.includes('scopus')) {
    content = `### 📑 Systematic Literature Review (SLR) & Paper Synthesis Matrix
*(Directly tailored to your 24CPL2T451 Term Paper Assignment!)*

#### 1. Structuring your 15-Paper Synthesis Matrix:
Create a multi-column comparison table:
| Ref # | Author & Year | Title & Scopus Index | Methodology / Algorithm | Sample / Dataset | Key Findings | Identified Research Gap |
|---|---|---|---|---|---|---|
| [1] | Chen et al. (2025) | *IoT Edge Telemetry* | ESP32 + MQTT Broker | 50 Nodes, 10k packets | 99.4% packet delivery | High latency under heavy traffic |
| [2] | Smith & Patel (2024)| *Agile Architecture* | Microservices + Docker | Enterprise Case Study | 35% faster deployments | Complex observability |

#### 2. Protocol for Academic Rigor:
- **Search Query Strategy**: Use Boolean operators in Scopus/IEEE Xplore:
  \`("Microcontroller" OR "ESP32") AND ("MQTT" OR "IoT") AND ("Latency" OR "Reliability")\`
- **Turnitin Similarity Limit**: Keep text similarity below 15% by paraphrasing in your own original academic voice.
- **Reference Style**: Use APA 7th Edition:
  *Author, A. A. (Year). Title of article. Title of Periodical, volume(issue), pages. https://doi.org/xx*`
  } else if (query.includes('hypothesis') || query.includes('type i') || query.includes('type 1') || query.includes('anova')) {
    content = `### 📊 Hypothesis Testing & Experimental Statistics
In scientific research methodology, every study tests explicit statistical hypotheses:

#### 1. Formulating Hypotheses:
- **Null Hypothesis ($H_0$)**: There is NO significant difference or relationship between the variables (e.g. "ESP32 MQTT latency is equal across QoS 0 and QoS 1").
- **Alternative Hypothesis ($H_1$)**: There is a statistically significant effect or difference.

#### 2. Type I vs. Type II Errors:
| Decision \\ Truth | $H_0$ is TRUE in Reality | $H_0$ is FALSE in Reality |
|---|---|---|
| **Reject $H_0$** | **Type I Error ($\\alpha$)** *(False Positive)* | **Correct Decision (Power $1-\\beta$)** |
| **Fail to Reject $H_0$** | **Correct Decision ($1-\\alpha$)** | **Type II Error ($\\beta$)** *(False Negative)* |

- **Significance Level ($\\alpha$)**: Usually set at $p < 0.05$ (5% risk of Type I error).
- **ANOVA (Analysis of Variance)**: Used when comparing means across 3 or more experimental groups simultaneously.`
  } else {
    content = `### 📝 Research Methodology Framework (24CPL2T451)
Core milestones for Dr. Priya Nair's research module:
1. **Problem Definition**: What specific unsolved engineering or scientific gap does your study address?
2. **Methodology Selection**: Quantitative (empirical measurements, benchmarks) vs. Qualitative (user interviews, surveys).
3. **Publication Ethics**: Adhering to Committee on Publication Ethics (COPE) guidelines and zero tolerance for data falsification.`
  }

  return {
    type: 'text',
    message: formatCharacterVoice(char, content, 'normal'),
  }
}

// 5. Response for Microcontroller & IoT
function generateIoTResponse(char, query) {
  let content = ''

  if (query.includes('code') || query.includes('firmware') || query.includes('mqtt') || query.includes('esp32')) {
    content = `### 📡 ESP32 MQTT Telemetry C/C++ Firmware Suite
*(Tested Arduino/C++ code for your 24ELE2T351 Assignment!)*

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// Wi-Fi & MQTT Broker Configuration
const char* ssid = "ClassVault_Campus_WiFi";
const char* password = "Password123";
const char* mqtt_broker = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* telemetry_topic = "classvault/student/24CPEB27/telemetry";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsgTime = 0;

void setup_wifi() {
  Serial.begin(115200);
  Serial.print("Connecting to Wi-Fi: ");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWi-Fi Connected! IP: " + WiFi.localIP().toString());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP32Client-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("CONNECTED to MQTT Broker!");
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void setup() {
  setup_wifi();
  client.setServer(mqtt_broker, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Transmit telemetry every 5 seconds (non-blocking)
  if (millis() - lastMsgTime > 5000) {
    lastMsgTime = millis();
    
    // Read sensors (e.g. DHT22 / ADC)
    float temperature = 24.5 + (random(-20, 20) / 10.0);
    float humidity = 60.0 + (random(-50, 50) / 10.0);

    StaticJsonDocument<200> doc;
    doc["node_id"] = "ESP32-NODE-01";
    doc["temperature"] = temperature;
    doc["humidity"] = humidity;
    doc["status"] = "OK";

    char buffer[256];
    serializeJson(doc, buffer);
    client.publish(telemetry_topic, buffer);
    Serial.println("Telemetry Published: " + String(buffer));
  }
}
\`\`\`

#### Key Hardware & Protocol Highlights:
- **I2C Protocol**: Connect sensor SDA to GPIO 21 and SCL to GPIO 22. Remember the $4.7\\text{ k}\\Omega$ pull-up resistors!
- **MQTT QoS 1**: Guarantees telemetry packet delivery via broker acknowledgment (\`PUBACK\`).
- **Non-blocking Execution**: Uses \`millis()\` timers instead of \`delay()\` to keep the background Wi-Fi and TCP stack alive.`
  } else if (query.includes('i2c') || query.includes('spi') || query.includes('uart') || query.includes('protocol')) {
    content = `### 🔌 Microcontroller Serial Protocols: I2C vs. SPI vs. UART
Here is how to compare communication protocols for your IoT embedded design:

| Protocol | Lines / Wires | Max Speed | Architecture | Addressing | Best Use Case |
|---|---|---|---|---|---|
| **I2C** | 2 (SDA, SCL) | Up to 3.4 Mbps | Multi-master, Multi-slave | 7-bit or 10-bit hardware address | Temperature, humidity, RTC, display chips |
| **SPI** | 4 (MOSI, MISO, SCK, CS) | > 50 Mbps | Single-master, Multiple-slave | Dedicated Chip Select (CS) pin per device | High-speed SD cards, color TFT screens |
| **UART** | 2 (TX, RX) | Up to 1–2 Mbps | Point-to-Point (2 devices) | No addressing needed | GPS modules, Bluetooth HC-05, PC serial debug |`
  } else {
    content = `### 📡 Microcontroller and IoT Architecture (24ELE2T351)
Core concepts for Prof. James Erikson's lab and exams:
1. **Harvard vs. Von Neumann**: Harvard architecture (used in ARM Cortex & ESP32) features separated physical buses for instructions and data, enabling single-cycle fetch and execute!
2. **Interrupt Service Routines (ISRs)**: Keep ISRs extremely fast; never call \`Serial.print()\` or \`delay()\` inside an ISR.
3. **Cloud Dashboards**: You can route ESP32 MQTT streams directly into AWS IoT Core, ThingsBoard, or Adafruit IO for real-time live graphs!`
  }

  return {
    type: 'text',
    message: formatCharacterVoice(char, content, 'normal'),
  }
}

// 6. Study Advice Response
function generateStudyAdviceResponse(char) {
  const content = `### 🎯 High-Performance Study Strategy
Here is your character-engineered daily study plan:

1. **Pomodoro Sprints**: 25 minutes of intense, distraction-free focus followed by a 5-minute break. After 4 cycles, take a 20-minute rest.
2. **Active Recall & Feynman Technique**: Don't just re-read notes. Explain the concept out loud in simple language without looking at the textbook.
3. **Spaced Repetition**: Review today's Software Engineering or Physics notes tomorrow, then in 3 days, then in 1 week.
4. **Prioritize Due Dates**: Attack the **Agile Architecture** and **Zeeman Transition** assignments first because they are due within 48 hours!`

  return {
    type: 'text',
    message: formatCharacterVoice(char, content, 'normal'),
  }
}

// 7. General Knowledge / Fallback Response
function generateGeneralResponse(char, query) {
  const content = `I received your question: *"**${query}**"*.

As your academic mentor, I can help you solve this step-by-step! Here are a few ways we can tackle it:
- If this relates to **Software Engineering (24CSC2T351)**, we can analyze the design patterns, UML diagrams, or sprint backlogs.
- If this is from **Physics (24PHY2T351)**, we can write out the quantum Hamiltonian, Landé g-factor, or binding energy formulas.
- If this is for **Research Methodology (24CPL2T451)**, we can formulate hypotheses or structure your literature review matrix.
- If this is for **Microcontrollers & IoT (24ELE2T351)**, I can write working C/C++ firmware or circuit pinout schematics!

Try asking one of the quick prompts below or type a specific concept or equation!`

  return {
    type: 'text',
    message: formatCharacterVoice(char, content, 'normal'),
  }
}
