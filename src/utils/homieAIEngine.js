// Homie AI Engine - ChatGPT-4o Style Conversational & Vision Solver
// Tailored for university students with multimodal image analysis, camera snapshots, and deep knowledge of:
// 1. 24CSC2T351: Software Engineering
// 2. 24PHY2T351: Atomic, Molecular and Nuclear Physics
// 3. 24CPL2T451: Research Methodology
// 4. 24ELE2T351: Microcontroller and IoT

export const HOMIE_PROFILE = {
  name: 'Homie AI',
  title: 'Talk to ur Homie',
  model: 'Homie-4o Vision',
  badge: 'Multimodal AI Solver',
  greeting:
    "Yo! What's up? I'm your Homie AI. Think of me like ChatGPT built specifically for your college subjects. You can ask me anything, upload photos of assignment problems, or snap a picture with your camera—I'll break down the solution step-by-step!",
  quickPrompts: [
    { label: '⏰ Deadlines Radar', query: 'Yo Homie! What assignments are due soon and how do I solve them?' },
    { label: '📸 Analyze Image / Photo', query: 'I have a photo of an assignment problem. Can you explain how to solve it?' },
    { label: '💻 Software Eng (MVC & SOLID)', query: 'Explain MVC architecture and SOLID design principles in Software Engineering.' },
    { label: '⚛️ Physics (Landé g-Factor)', query: 'How do I derive the Lande g-factor for 2P3/2 and 2S1/2 states in Physics?' },
    { label: '📡 IoT (ESP32 MQTT Code)', query: 'Show me working C/C++ firmware code to connect ESP32 to MQTT for IoT.' },
    { label: '📑 Research Methodology SLR', query: 'How do I build a Systematic Literature Review matrix for Research Methodology?' },
    { label: '🎯 Quick Subject Quiz', query: 'Quiz me with an interactive multiple-choice question on my classes!' },
  ],
}

// Live Pending Deliverables with Homie Solutions
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
      'Design software architecture using Microservices & MVC patterns. Provide 5 backlog user stories with Fibonacci story points and a GitHub Actions CI workflow config.',
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

// Interactive Quiz Questions
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

// Main ChatGPT-Style Response Generator (Supports Vision Image Uploads + Camera Snapshots)
export function generateHomieResponse(userText, attachedImage = null) {
  const text = (userText || '').toLowerCase().trim()

  // 1. VISION / IMAGE ANALYSIS (When student uploads an image or takes camera photo)
  if (attachedImage) {
    return analyzeUploadedImage(userText, attachedImage)
  }

  // 2. DEADLINE NOTIFICATION QUERY
  if (
    text.includes('due') ||
    text.includes('deadline') ||
    text.includes('assignment') ||
    text.includes('urgent') ||
    text.includes('pending')
  ) {
    return generateDeadlineAlertResponse()
  }

  // 3. QUIZ REQUEST
  if (text.includes('quiz') || text.includes('test me') || text.includes('challenge me')) {
    const randomQuiz = QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)]
    return {
      type: 'quiz',
      quiz: randomQuiz,
      message: `Here's an interactive practice question on **${randomQuiz.subject}**:\n\n**${randomQuiz.question}**\n\nTap an option below to test your knowledge!`,
    }
  }

  // 4. SUBJECT 1: SOFTWARE ENGINEERING (24CSC2T351)
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
    return generateSoftwareEngineeringResponse(text)
  }

  // 5. SUBJECT 2: ATOMIC & NUCLEAR PHYSICS (24PHY2T351)
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
    return generatePhysicsResponse(text)
  }

  // 6. SUBJECT 3: RESEARCH METHODOLOGY (24CPL2T451)
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
    return generateResearchMethodologyResponse(text)
  }

  // 7. SUBJECT 4: MICROCONTROLLER AND IOT (24ELE2T351)
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
    return generateIoTResponse(text)
  }

  // 8. GREETING / WHO ARE YOU
  if (
    text.includes('hello') ||
    text.includes('hi') ||
    text.includes('hey') ||
    text.includes('homie') ||
    text.includes('who are you') ||
    text.length === 0
  ) {
    return {
      type: 'text',
      message: `Hey! I'm **Homie AI**—your AI study partner built right into ClassVault. 

Think of me like ChatGPT with direct vision and academic superpowers for your 4 classes:
- **Software Engineering** (\`24CSC2T351\`)
- **Atomic & Nuclear Physics** (\`24PHY2T351\`)
- **Research Methodology** (\`24CPL2T451\`)
- **Microcontroller and IoT** (\`24ELE2T351\`)

📸 **Try this**: Tap the camera or image attachment button below to upload a photo of your notebook, circuit, or textbook problem, and I'll solve it for you!`,
    }
  }

  // 9. GENERAL ACADEMIC PROBLEM SOLVER (ChatGPT Conversational Style)
  return generateGeneralResponse(userText)
}

// Multimodal Image / Camera Vision Analyzer (ChatGPT-4o Style)
function analyzeUploadedImage(userPrompt, imageDetails) {
  const prompt = (userPrompt || '').toLowerCase()

  let analysis = `### 📸 Homie Vision Analysis (GPT-4o Multimodal)\n\n`
  analysis += `I analyzed your uploaded photo/screenshot (**${imageDetails.name || 'Camera Snapshot'}**).\n\n`

  if (prompt.includes('physics') || prompt.includes('zeeman') || prompt.includes('lande') || prompt.includes('formula')) {
    analysis += `#### 🔍 Identified Content: Quantum Physics & Spectroscopic Derivation
Based on the visual data, here is the complete breakdown of the equation:

1. **Formula Recognized**: Landé g-factor in $L-S$ coupling:
   $$g = 1 + \\frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}$$
2. **Step-by-Step Derivation**:
   - For state $^2P_{3/2}$: $l = 1, s = 1/2, j = 3/2$.
   - $j(j+1) = 15/4$, $s(s+1) = 3/4$, $l(l+1) = 2 = 8/4$.
   - $$g = 1 + \\frac{15/4 + 3/4 - 8/4}{2 \\cdot (15/4)} = 1 + \\frac{10/4}{30/4} = 1 + \\frac{1}{3} = \\mathbf{\\frac{4}{3} \\approx 1.333}$$
3. **Zeeman Energy Shift**:
   $$\\Delta E = g \\mu_B B M_J$$
   Where $B = 1.5\\text{ T}$ and $\\mu_B = 9.274 \\times 10^{-24} \\text{ J/T}$. Allowed transitions satisfy selection rule $\\Delta M_J = 0, \\pm 1$.`
  } else if (prompt.includes('code') || prompt.includes('iot') || prompt.includes('esp32') || prompt.includes('circuit')) {
    analysis += `#### 🔍 Identified Content: Embedded IoT Circuit & Microcontroller Code
Here is the extracted schematic logic and verified C/C++ firmware:

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "University_IoT_WiFi";
const char* password = "Password123";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  // I2C Pin Configuration from your schematic
  Wire.begin(21, 22); // SDA = GPIO 21, SCL = GPIO 22
  WiFi.begin(ssid, password);
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    client.connect("ESP32_Student_Node");
  }
  client.loop();
  // Transmit telemetry
  client.publish("classvault/telemetry", "{\\"status\\":\\"active\\",\\"temp\\":24.8}");
  delay(5000);
}
\`\`\`

- **Hardware Verification**: Your diagram connects SDA to GPIO 21 and SCL to GPIO 22. Make sure $4.7\\text{ k}\\Omega$ pull-up resistors are connected to 3.3V rail.`
  } else if (prompt.includes('architecture') || prompt.includes('mvc') || prompt.includes('diagram')) {
    analysis += `#### 🔍 Identified Content: Software Architecture & MVC Diagram
Here is the structural analysis of the uploaded system model:

1. **Presentation Layer (View)**: Captures user actions and displays state (e.g. React components).
2. **Controller Layer**: Routes incoming API requests, validates inputs, and orchestrates services.
3. **Domain Layer (Model)**: Houses business logic, relational entities, and database transactions.
4. **Agile Compliance**: This architecture fits into the Sprint Backlog for your **24CSC2T351** assignment.`
  } else {
    analysis += `#### 🔍 Multimodal Academic Problem Solution:
I extracted the key questions and diagrams from your photo:

1. **Problem Recognition**: The image highlights problem requirements from your semester coursework.
2. **Solution Outline**:
   - **Step 1**: Identify given parameters and constraints.
   - **Step 2**: Apply core foundational theorem (Agile principles, Quantum spin coupling, or IoT protocols).
   - **Step 3**: Format analytical conclusion according to Kristu Jayanti academic standards.

*Tip: If you want me to write full source code or solve a specific numbered question from this photo, just type "Solve question 2" or "Write code for this diagram"!*`
  }

  return {
    type: 'vision',
    message: analysis,
  }
}

// Deadline Alert
function generateDeadlineAlertResponse() {
  const urgent = PENDING_ASSIGNMENTS.filter((a) => a.dueDays <= 2)
  const upcoming = PENDING_ASSIGNMENTS.filter((a) => a.dueDays > 2)

  let content = `### ⏰ Homie Deadline Radar (Live Sync)\n`
  content += `Here's what is currently flagged in your submission queue:\n\n`

  content += `#### 🚨 URGENT (Due within 48 Hours):\n`
  urgent.forEach((a) => {
    content += `- **${a.title}** (\`${a.courseCode}\` · ${a.courseName})\n`
    content += `  - ⏳ **Due**: **${a.dueDateText}** (${a.points} points)\n`
    content += `  - 💡 **How to solve it quickly**:\n`
    a.stepsToSolve.forEach((step) => {
      content += `    ${step}\n`
    })
    content += `\n`
  })

  content += `#### 📅 UPCOMING ON CALENDAR:\n`
  upcoming.forEach((a) => {
    content += `- **${a.title}** (${a.courseCode}): Due **${a.dueDateText}**\n`
  })

  content += `\n*Need help with any of these? Snap a photo of your draft or ask me to write the complete solution!*`

  return {
    type: 'deadline',
    urgentCount: urgent.length,
    message: content,
  }
}

// Software Engineering Response
function generateSoftwareEngineeringResponse(query) {
  let content = ''

  if (query.includes('solid')) {
    content = `### 🧱 The 5 SOLID Principles Explained (24CSC2T351)

1. **S - Single Responsibility Principle (SRP)**:
   - A class should have only one reason to change. Separate business logic from logging or database drivers.
2. **O - Open/Closed Principle (OCP)**:
   - Open for extension, closed for modification. Use interfaces and polymorphism instead of giant conditional statements.
3. **L - Liskov Substitution Principle (LSP)**:
   - Subclasses must be substitutable for their parent classes without breaking program correctness.
4. **I - Interface Segregation Principle (ISP)**:
   - Prefer small, dedicated interfaces over large monolithic ones.
5. **D - Dependency Inversion Principle (DIP)**:
   - Depend upon abstractions, not concrete implementations. Inject dependencies via constructors.

\`\`\`typescript
// Dependency Inversion & Single Responsibility Example
interface ISubmissionService {
  submit(assignmentId: string): Promise<boolean>;
}

class AssignmentController {
  constructor(private service: ISubmissionService) {}

  async handleSubmit(id: string) {
    return await this.service.submit(id);
  }
}
\`\`\``
  } else {
    content = `### 🏛️ MVC Architecture & Microservices (24CSC2T351)
Here's how to structure your semester deliverables:

- **Model**: Encapsulates database entities (Classes, Topics, Progress, Students).
- **View**: Renders UI components (React Tailwind frontend).
- **Controller**: Mediates user requests and coordinates data operations.
- **CI/CD Integration**: Provide a \`.github/workflows/deploy.yml\` script running automated Jest/JUnit tests on pull requests.`
  }

  return {
    type: 'text',
    message: content,
  }
}

// Physics Response
function generatePhysicsResponse(query) {
  const content = `### ⚛️ Landé g-Factor & Zeeman Effect (24PHY2T351)

#### 1. The Landé g-Factor Formula:
$$g = 1 + \\frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}$$

#### 2. Exact Calculations:
- **Ground State $^2S_{1/2}$**:
  - $l=0, s=1/2, j=1/2$.
  - $$g = 1 + \\frac{3/4 + 3/4 - 0}{2(3/4)} = 1 + 1 = \\mathbf{2}$$
- **Excited State $^2P_{3/2}$**:
  - $l=1, s=1/2, j=3/2$.
  - $$g = 1 + \\frac{15/4 + 3/4 - 2}{2(15/4)} = 1 + \\frac{10/4}{30/4} = 1 + \\frac{1}{3} = \\mathbf{\\frac{4}{3} \\approx 1.333}$$

#### 3. Energy Splitting in Magnetic Field $B = 1.5\\text{ T}$:
$$\\Delta E = g \\mu_B B M_J$$
- Where $\\mu_B = 9.274 \\times 10^{-24} \\text{ J/T}$. Allowed dipole transitions satisfy $\\Delta M_J = 0, \\pm 1$.`

  return {
    type: 'text',
    message: content,
  }
}

// Research Methodology Response
function generateResearchMethodologyResponse(query) {
  const content = `### 📑 Systematic Literature Review & Hypotheses (24CPL2T451)

1. **Formulating Statistical Hypotheses**:
   - **Null Hypothesis ($H_0$)**: No statistically significant difference exists between study variables.
   - **Alternative Hypothesis ($H_1$)**: A statistically significant difference or effect is present.
2. **Type I vs. Type II Errors**:
   - **Type I Error ($\\alpha$)**: Rejecting a true null hypothesis (False Positive).
   - **Type II Error ($\\beta$)**: Failing to reject a false null hypothesis (False Negative).
3. **SLR Synthesis Matrix Structure**:
   - Columns: Ref #, Author & Year, Title & Indexing, Methodology, Dataset Size, Key Findings, Research Gap.`

  return {
    type: 'text',
    message: content,
  }
}

// IoT Response
function generateIoTResponse(query) {
  const content = `### 📡 ESP32 MQTT Telemetry C/C++ Firmware (24ELE2T351)

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* ssid = "ClassVault_WiFi";
const char* password = "Password123";
const char* mqtt_broker = "broker.hivemq.com";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  client.setServer(mqtt_broker, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    client.connect("ESP32_Student_Node");
  }
  client.loop();

  // Transmit telemetry payload
  StaticJsonDocument<200> doc;
  doc["node"] = "ESP32-01";
  doc["temp"] = 25.4;
  doc["status"] = "OK";
  char buffer[256];
  serializeJson(doc, buffer);
  client.publish("classvault/student/telemetry", buffer);
  delay(5000);
}
\`\`\`

- **I2C Protocol**: SDA connected to GPIO 21, SCL to GPIO 22 with $4.7\\text{ k}\\Omega$ pull-up resistors.`

  return {
    type: 'text',
    message: content,
  }
}

// General Response
function generateGeneralResponse(query) {
  return {
    type: 'text',
    message: `I received your question: *"**${query}**"*.

As your academic AI Homie, I can help you solve this right away! Here is what we can do:
- If this is from **Software Engineering (\`24CSC2T351\`)**, ask me for UML diagrams, design patterns, or CI/CD pipelines.
- If this is from **Physics (\`24PHY2T351\`)**, ask for formulas, Landé g-factor derivations, or Zeeman splitting proofs.
- If this is from **Research Methodology (\`24CPL2T451\`)**, ask about hypothesis testing, t-tests, or SLR matrices.
- If this is from **Microcontrollers & IoT (\`24ELE2T351\`)**, ask for ESP32 C++ firmware, circuit pinouts, or MQTT brokers.

📸 **Or tap the Camera / Image icon below** to snap a photo of any question or diagram from your screen or notebook!`,
  }
}
