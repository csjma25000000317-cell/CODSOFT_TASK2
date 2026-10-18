# 🛡️ PhishGuard – Phishing Awareness Program

## 📌 Project Overview

PhishGuard is a web-based cybersecurity awareness project developed as part of the **CODSOFT Cyber Security Internship – Task 2**.

The main objective of this project is to educate users about phishing attacks, suspicious URLs, fake login pages, and social engineering techniques. It helps users understand common online threats and develop safer browsing habits through interactive learning tools.

## 🎯 Objectives

- Raise awareness about phishing attacks.
- Teach users how to recognize suspicious URLs and common warning signs.
- Explain how fake login pages and social engineering attacks work.
- Provide practical cybersecurity tips.
- Help users test their knowledge through an interactive quiz.
- Encourage safe online practices and responsible digital behaviour.

## ✨ Features

### 1. 🔍 Suspicious URL Analyzer
- Accepts a URL for basic, rule-based analysis.
- Checks for common warning signs such as HTTP usage, unusual hostnames, suspicious URL patterns, and non-standard ports.
- Displays findings and safety recommendations.
- Runs locally in the browser without visiting the submitted website.

**Note:** The analyzer is an educational demonstration. It does not use a real-time threat-intelligence database and cannot guarantee that a website is safe or malicious.

### 2. 🔐 Fake Login Page Awareness
- Explains common warning signs of fraudulent login pages.
- Demonstrates why unexpected login requests should be verified.
- Encourages users to access important accounts through official websites or applications.

### 3. 📚 Phishing Case Studies
Includes illustrative scenarios covering:
- Fake account alerts.
- Unexpected delivery payment requests.
- Fraudulent job offers.

Each scenario explains warning signs and recommended safety actions. These are educational examples, not claims about specific verified incidents.

### 4. 🎭 Social Engineering Awareness
Explains common manipulation techniques, including:
- Urgency and fear.
- Impersonation.
- Curiosity-based messages.
- Fake rewards and suspicious offers.

### 5. ✅ Interactive Security Checklist
Provides practical security habits, including checking senders, verifying domains, protecting OTPs, using unique passwords, and enabling multi-factor authentication.

### 6. 🧠 Interactive Quiz
- Includes five multiple-choice questions.
- Provides instant feedback and explanations.
- Tracks the score.
- Allows users to restart the quiz.

### 7. 🎨 Responsive User Interface
- Modern cybersecurity-inspired design.
- Dark and light theme toggle.
- Responsive layout for desktop and mobile screens.
- CSS animations and interactive elements.

## 🛠️ Technologies Used

- **HTML5** – Website structure.
- **CSS3** – Styling, responsive layout, and animations.
- **JavaScript** – URL analysis, quiz logic, checklist progress, and theme switching.

## 📂 Project Structure

```text
CODSOFT_TASK2/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run the Project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Ensure that `index.html`, `style.css`, and `script.js` are in the same folder.
4. Open `index.html` in a web browser, or use the Live Server extension in VS Code.
5. Explore the URL Analyzer, phishing awareness sections, case studies, checklist, and quiz.

No backend server or database is required for this educational demonstration.

## 🧪 Testing

The following features can be tested manually:

| Feature | Test |
|---|---|
| URL Analyzer | Enter `https://example.com` and review the findings. |
| URL validation | Try an empty input or malformed URL. |
| Fake login awareness | Click the safe-response demonstration button. |
| Security checklist | Select and deselect checklist items. |
| Quiz | Answer all five questions and review the score. |
| Restart quiz | Click “Try again” after completing the quiz. |
| Theme toggle | Switch between dark and light themes. |
| Responsive design | Open the website on a mobile-sized screen. |

## 🔒 Privacy and Security Limitations

- The project is designed for cybersecurity education and awareness.
- The URL Analyzer performs basic checks in the browser.
- The tool does not contact the submitted website or a threat-intelligence service.
- The project does not guarantee the detection of phishing websites.
- A lack of warning signs does not mean a website is trustworthy.
- Users should independently verify websites before sharing sensitive information.

## 🎓 Internship Context

**Program:** CODSOFT Cyber Security Internship  
**Task:** Task 2 – Phishing Awareness Program  
**Project Name:** PhishGuard

## 🔮 Future Improvements

- Integration with a trusted URL reputation or threat-intelligence API.
- Additional phishing scenarios and educational resources.
- More quiz questions and learning progress tracking.
- Accessibility and usability improvements.
- Optional reporting and awareness resources for users.

## 👨‍💻 Author

**Developed by:** Janshu Verma

## 📄 Disclaimer

PhishGuard is an educational project intended to promote cybersecurity awareness. It is not a replacement for professional security tools, antivirus software, or verified threat-intelligence services.
