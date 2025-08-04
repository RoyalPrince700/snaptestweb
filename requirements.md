Here is the **web version** of the `requirement.md` for your **SnapTest Web App**, adapted from the original mobile documentation while preserving all key concepts and workflows:

---

# SnapTest Web App Documentation

## Project Overview

**SnapTest Web** is a browser-based version of the SnapTest mobile application, designed to help students generate intelligent, contextual exam practice questions (MCQs and Theory) from uploaded educational content. Users can upload textbook images, PDFs, or Word documents, which are processed through OCR for text extraction. Fireworks AI then generates customized questions. All user-generated data is stored and managed using Supabase.

Unlike the mobile version, SnapTest Web allows seamless access across desktop and mobile browsers, enabling students to study and practice without needing to install an app.

---

## Target Users

* Secondary school, college, and university students
* Learners preparing for entrance exams, finals, or standardized tests

---

## Core Features

### 🔐 Username-Based Authentication

* No email/password required.
* A unique **username** is used to create a session and access stored data.
* Acts as the user identifier in Supabase.

### 📁 File Upload

* Supports uploading:

  * Multiple images (`.jpg`, `.png`)
  * PDF files
  * Word documents (`.doc`, `.docx`)
* Drag and drop or traditional upload UI for convenience.

### 📖 OCR Text Extraction

* Uploaded files are processed to extract readable content using OCR.
* Supports scanned textbook pages, typed PDFs, and documents.

### ⚙️ Question Customization

* **Question Type**: Objective (MCQ) or Theory.
* **Quantity**: User selects how many questions to generate (e.g., 5, 10, 15, 20, max 30).
* User interface allows flexible adjustments before generating.

### 🧠 AI-Powered Question Generation

* Extracted text is sent to Fireworks AI.
* The API returns smart, contextual questions based on educational content.
* Prompts are dynamically constructed depending on type/length of extracted text.

### 📝 Quiz Mode

* **MCQ Mode**: Users can answer questions interactively; scores are shown at the end.
* **Theory Mode**: Displays theory questions for study/reference purposes; no scoring involved.

### 🔄 Regenerate Questions

* Users can request new question sets from previously uploaded materials.
* Supports iterative learning and exploration.

### 💾 Question Management (Powered by Supabase)

* All generated question sets are automatically saved per user (username-based).
* Users can:

  * View question history
  * Delete individual question sets
  * Revisit previous sessions

---

## Workflow Summary

1. **Enter Username**

   * A unique page for entering or reusing a username.
   * Used to fetch or store associated data in Supabase.

2. **Upload Files**

   * Drag/drop or select multiple images, PDFs, or DOC files.

3. **Text Extraction (OCR)**

   * Extract readable educational content from files.

4. **Customize Generation**

   * Select question type (MCQ or Theory).
   * Choose the number of questions to generate.

5. **AI Question Generation**

   * Text is sent to Fireworks AI with an optimized prompt.
   * The web app receives and displays the result.

6. **Interactive Quiz (MCQs only)**

   * Users answer questions and receive instant scoring.

7. **Save or Regenerate**

   * All sessions are saved automatically to Supabase.
   * Users can regenerate new question sets anytime.

8. **Manage Questions**

   * View saved sets.
   * Delete old or unwanted questions.

---

## Example Fireworks AI Prompt (MCQ)

```
You are a tutor. Generate 10 objective questions with 4 options (A-D) based on the text below:

<extracted text>

Format:
Question...
A. Option  
B. Option  
C. Option  
D. Option  
Answer: C
```

---

## Future Improvements (Web-Specific Ideas)

* Responsive UI for all screen sizes (mobile, tablet, desktop)
* Browser caching for recent uploads and extracted text
* Offline mode for text extraction (via local OCR engine)
* Export options (PDF/download question sets)
* Teacher/Admin dashboard for batch test generation
* Shareable question links for group practice

---

## Status

* **Project Name**: SnapTest Web
* **Platform**: Web App (Vite + Tailwind + React)
* **Stage**: Development
* **Database**: Supabase
* **AI Provider**: Fireworks AI

---