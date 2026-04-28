# CareerTrail

CareerTrail is a Generative AI web application that analyzes resumes and provides:

- Resume Analysis  
- Mock Interview Questions  
- Career Path Suggestions  
- Skill Recommendations  

Built using React, Node.js, Express, PostgreSQL concepts, and Groq-powered LLM APIs.

---

## Features

### Resume Analysis
Analyze uploaded resumes and identify:
- Skill gaps
- Recommended courses
- Certifications
- Relevant projects

### Mock Interviews
Generate interview questions and suggested answers.

### Career Path Suggestions
Get role recommendations based on resume skills.

### Skill Recommendations
Receive personalized learning roadmaps.

---

## Tech Stack

- Frontend: React.js, React-Bootstrap, Axios  
- Backend: Node.js, Express  
- AI Model: Llama 3.1 8B Instant (via Groq API)  
- File Upload: Multer  
- Resume Parsing Utilities  

---

## Repository

```bash
git clone https://github.com/Ananya818181/CareerTrail.git
cd CareerTrail
```

---

## Installation

### Backend Setup
```bash
cd backend
npm install
```

Create `.env`

```env
GROQ_API_KEY=your_api_key
PORT=5000
```

Run backend:

```bash
npm start
```

---

### Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

Backend runs on:

```text
http://localhost:5000
```

---

## Project Structure

```text
CareerTrail/
├── backend/
│   ├── Features/
│   ├── routes/
│   ├── uploads/
│   ├── utilities/
│   ├── .env
│   └── index.js

├── frontend/
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── App.js
│       └── Home.js
```

---

## Usage

1. Upload resume (PDF)
2. Select feature:
   - Resume Analysis
   - Mock Interviews
   - Career Paths
   - Skill Recommendations
3. View generated output
4. Export results as PDF

---

## Notes
- Updated to supported Groq models after deprecation of `gemma2-9b-it`
- Added prompt constraints to reduce inaccurate certification recommendations

---

## Contributors

- Ananya Singh  
- Ananya Sharma  
- Mohammad Rashid

---

## License

MIT