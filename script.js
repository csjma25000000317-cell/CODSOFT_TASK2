
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Dark and light theme
  const themeButton = document.getElementById("theme-toggle");

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const isLight = document.body.classList.toggle("light-theme");
      themeButton.textContent = isLight ? "🌙" : "☀️";
      themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    });
  }

  // Fake login awareness demonstration
  const warningButton = document.getElementById("warning-btn");
  const warningAnswer = document.getElementById("warning-answer");

  if (warningButton && warningAnswer) {
    warningButton.addEventListener("click", function () {
      warningAnswer.hidden = !warningAnswer.hidden;
      warningButton.textContent = warningAnswer.hidden
        ? "Reveal safe response"
        : "Hide safe response";
    });
  }

  // URL analysis: local heuristic checks only
  const urlInput = document.getElementById("url-input");
  const analyzeButton = document.getElementById("analyze-btn");
  const resultPanel = document.getElementById("analyzer-result");

  const suspiciousWords = [
    "login", "verify", "secure", "account", "update",
    "password", "wallet", "confirm", "signin", "bonus"
  ];

  function analyzeURL(rawValue) {
    const raw = rawValue.trim();
    const findings = [];
    let parsed;

    if (!raw) {
      return {
        error: "Please enter a URL first."
      };
    }

    if (/\s/.test(raw)) {
      return {
        error: "The input contains spaces. Check the URL and try again."
      };
    }

    if (/^(javascript|data|file):/i.test(raw)) {
      return {
        error: "This tool accepts website URLs, not script, data or local-file URLs."
      };
    }

    try {
      parsed = new URL(
        /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(raw)
          ? raw
          : "https://" + raw
      );
    } catch (error) {
      return {
        error: "This URL could not be parsed. Check its format and try again."
      };
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return {
        error: "Only HTTP and HTTPS website URLs are supported."
      };
    }

    const hostname = parsed.hostname.toLowerCase();
    const fullURL = parsed.href.toLowerCase();

    if (!hostname || !hostname.includes(".")) {
      findings.push("The hostname may be incomplete or unusual.");
    }

    if (parsed.protocol === "http:") {
      findings.push("The URL uses HTTP rather than encrypted HTTPS.");
    }

    if (raw.includes("@") || parsed.username || parsed.password) {
      findings.push("The URL contains an @ symbol or user-information field, which can disguise the actual destination.");
    }

    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      findings.push("The hostname is an IP address rather than a typical domain name.");
    }

    if (hostname.includes("xn--")) {
      findings.push("The domain contains an internationalized hostname encoding. Check for lookalike characters.");
    }

    if (hostname.split(".").length > 4) {
      findings.push("The hostname contains many subdomain levels. Check the registered domain carefully.");
    }

    if (hostname.length > 45) {
      findings.push("The hostname is unusually long.");
    }

    if (hostname.split("-").length >= 3) {
      findings.push("The hostname contains several hyphens. This is not proof of phishing, but deserves inspection.");
    }

    const matchedWords = suspiciousWords.filter(function (word) {
      return fullURL.includes(word);
    });

    if (matchedWords.length > 0) {
      findings.push(
        "The URL contains potentially sensitive words: " +
        matchedWords.join(", ") +
        ". These words can also appear on legitimate websites."
      );
    }

    if (parsed.port && !["80", "443"].includes(parsed.port)) {
      findings.push("The URL specifies a non-standard web port.");
    }

    if (parsed.hostname.endsWith(".invalid")) {
      findings.push("The .invalid domain is reserved for examples and is not a normal public website.");
    }

    if (parsed.protocol === "https:") {
      // HTTPS alone is not a trust guarantee.
    }

    const highRisk =
      /^(javascript|data|file):/i.test(raw) ||
      Boolean(parsed.username || parsed.password);

    let level = "No common warning signs found";
    let statusClass = "good";
    let summary =
      "This basic check did not find the warning patterns it looks for. That does not prove the URL is safe.";

    if (highRisk) {
      level = "High-risk URL pattern";
      statusClass = "bad";
      summary = "Avoid opening or interacting with this input.";
    } else if (findings.length >= 3) {
      level = "Several warning signs";
      statusClass = "bad";
      summary = "Review these indicators carefully. Do not enter personal information unless you independently verify the website.";
    } else if (findings.length > 0) {
      level = "Use caution";
      statusClass = "warn";
      summary = "One or more warning signs were found. Verify the destination independently.";
    }

    return {
      url: parsed.href,
      hostname: hostname,
      findings: findings,
      level: level,
      statusClass: statusClass,
      summary: summary
    };
  }

  function showAnalysis(result) {
    resultPanel.replaceChildren();
    resultPanel.hidden = false;

    if (result.error) {
      const heading = document.createElement("h3");
      heading.textContent = "Unable to analyze URL";

      const message = document.createElement("p");
      message.textContent = result.error;

      resultPanel.append(heading, message);
      return;
    }

    const badge = document.createElement("span");
    badge.className = "result-status " + result.statusClass;
    badge.textContent = result.level;

    const heading = document.createElement("h3");
    heading.textContent = "Analysis result";

    const host = document.createElement("p");
    host.textContent = "Hostname: " + result.hostname;

    const summary = document.createElement("p");
    summary.textContent = result.summary;

    const listHeading = document.createElement("strong");
    listHeading.textContent = "Findings";

    const list = document.createElement("ul");

    if (result.findings.length === 0) {
      const item = document.createElement("li");
      item.textContent =
        "No configured warning patterns were detected. This is not a safety guarantee.";
      list.appendChild(item);
    } else {
      result.findings.forEach(function (finding) {
        const item = document.createElement("li");
        item.textContent = finding;
        list.appendChild(item);
      });
    }

    const advice = document.createElement("p");
    advice.textContent =
      "Safety advice: use the official app or a known website address. Never enter passwords or OTPs through an unexpected link.";

    const note = document.createElement("p");
    note.className = "muted";
    note.textContent =
      "This is a local educational heuristic. It does not visit the URL, check its reputation, or guarantee that a website is safe or malicious.";

    resultPanel.append(
      badge,
      heading,
      host,
      summary,
      listHeading,
      list,
      advice,
      note
    );
  }

  if (analyzeButton && urlInput && resultPanel) {
    analyzeButton.addEventListener("click", function () {
      showAnalysis(analyzeURL(urlInput.value));
    });

    urlInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        showAnalysis(analyzeURL(urlInput.value));
      }
    });

    document.querySelectorAll(".sample-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        urlInput.value = button.dataset.url || "";
        showAnalysis(analyzeURL(urlInput.value));
      });
    });
  }

  // Security checklist progress
  const checkboxes = document.querySelectorAll(
    "#checklist .check-item input[type='checkbox']"
  );

  const checkCount = document.getElementById("check-count");
  const checkProgress = document.getElementById("check-progress");
  const checkMessage = document.getElementById("check-message");

  function updateChecklist() {
    const completed = Array.from(checkboxes).filter(function (checkbox) {
      return checkbox.checked;
    }).length;

    const total = checkboxes.length;
    const percentage = total ? (completed / total) * 100 : 0;

    if (checkCount) {
      checkCount.textContent = completed + " / " + total + " completed";
    }

    if (checkProgress) {
      checkProgress.style.width = percentage + "%";
    }

    if (checkMessage) {
      checkMessage.textContent =
        completed === total && total > 0
          ? "Great! You reviewed every safety action."
          : "You have completed " + completed + " of " + total +
            " safety actions. Keep learning!";
    }
  }

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateChecklist);
  });

  updateChecklist();

  // Interactive phishing awareness quiz
  const questions = [
    {
      question: "You receive an unexpected email asking you to sign in immediately. What should you do?",
      options: [
        "Click the link immediately",
        "Reply with your password",
        "Verify the request through the official service",
        "Forward the email to everyone"
      ],
      answer: 2,
      explanation: "Verify unexpected requests using the official app or a website address you already know."
    },
    {
      question: "Does HTTPS alone prove that a website is trustworthy?",
      options: [
        "Yes, always",
        "No, phishing websites can also use HTTPS",
        "Only on mobile phones",
        "Only if the logo looks genuine"
      ],
      answer: 1,
      explanation: "HTTPS protects the connection, but it does not prove that the website owner is trustworthy."
    },
    {
      question: "A caller asks for your OTP to prevent account closure. What is safest?",
      options: [
        "Share it if the caller sounds official",
        "Share only part of it",
        "Do not share it; verify independently",
        "Send it by email instead"
      ],
      answer: 2,
      explanation: "Never disclose OTPs or recovery codes to unexpected callers or messages."
    },
    {
      question: "A recruiter offers guaranteed work but asks for an unexpected fee. What should you do?",
      options: [
        "Pay immediately",
        "Verify the employer and offer independently",
        "Share your banking password",
        "Send your OTP to confirm your identity"
      ],
      answer: 1,
      explanation: "Check the employer independently and be cautious about unexpected payment demands."
    },
    {
      question: "What is a safer way to open your bank account online?",
      options: [
        "Use a random link from a message",
        "Trust any website with a bank logo",
        "Open the official app or type a known website address",
        "Use the first search result without checking"
      ],
      answer: 2,
      explanation: "Use the official app or independently verify the bank's website address."
    }
  ];

  const questionCount = document.getElementById("question-count");
  const scoreLabel = document.getElementById("score-label");
  const questionText = document.getElementById("question-text");
  const answerOptions = document.getElementById("answer-options");
  const quizFeedback = document.getElementById("quiz-feedback");
  const quizProgress = document.getElementById("quiz-progress");
  const nextButton = document.getElementById("next-btn");
  const restartButton = document.getElementById("restart-btn");

  if (
    questionCount &&
    scoreLabel &&
    questionText &&
    answerOptions &&
    quizFeedback &&
    quizProgress &&
    nextButton &&
    restartButton
  ) {
    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function showQuestion() {
      answered = false;

      const item = questions[currentQuestion];

      questionCount.textContent =
        "QUESTION " + (currentQuestion + 1) +
        " OF " + questions.length;

      scoreLabel.textContent = "Score: " + score;
      questionText.textContent = item.question;
      quizFeedback.textContent = "";
      quizFeedback.className = "";
      answerOptions.replaceChildren();

      quizProgress.style.width =
        (currentQuestion / questions.length) * 100 + "%";

      nextButton.hidden = true;
      restartButton.hidden = true;

      item.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-option";
        button.textContent = option;

        button.addEventListener("click", function () {
          if (answered) return;
          answered = true;

          const correct = index === item.answer;

          if (correct) {
            score++;
            quizFeedback.textContent = "Correct! " + item.explanation;
            quizFeedback.className = "feedback-correct";
          } else {
            quizFeedback.textContent = "Not quite. " + item.explanation;
            quizFeedback.className = "feedback-incorrect";
          }

          Array.from(answerOptions.children).forEach(
            function (optionButton, optionIndex) {
              optionButton.disabled = true;

              if (optionIndex === item.answer) {
                optionButton.classList.add("correct");
              } else if (optionIndex === index) {
                optionButton.classList.add("incorrect");
              }
            }
          );

          scoreLabel.textContent = "Score: " + score;

          if (currentQuestion < questions.length - 1) {
            nextButton.hidden = false;
          } else {
            quizProgress.style.width = "100%";
            quizFeedback.textContent +=
              " Final score: " + score + "/" + questions.length + ".";
            restartButton.hidden = false;
          }
        });

        answerOptions.appendChild(button);
      });
    }

    nextButton.addEventListener("click", function () {
      if (currentQuestion < questions.length - 1 && answered) {
        currentQuestion++;
        showQuestion();
      }
    });

    restartButton.addEventListener("click", function () {
      currentQuestion = 0;
      score = 0;
      showQuestion();
    });

    showQuestion();
  }
});
