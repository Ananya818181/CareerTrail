const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Add this for file paths
const analysisController = require('../Features/ResumeAnalysis');
const careerPathController = require("../Features/careerPathSuggestions");
const SkillsRecommend = require('../Features/SkillsRecommendation');
const mockInter = require('../Features/MockInterviews');
const career = require('../Features/careerPathSuggestions');

// CHANGE: Use diskStorage instead of memoryStorage for deployment
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists in your backend root
    },
    filename: (req, file, cb) => {
        // Use a fixed name if your controller expects 'resume.pdf'
        cb(null, 'resume.pdf');
    }
});

const upload = multer({ storage: storage });

router.post('/uploadResume', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      console.log("File saved to uploads/resume.pdf");
      res.json({ message: "Upload successful" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error during upload" });
    }
  });

router.post('/getcareerpaths', career.suggestCareerPaths);
router.post('/getmockinterviews', mockInter);
router.post('/getanalysis', analysisController.analysisControler);
router.post('/getskillsrecommendation', SkillsRecommend.RecommendSkills);

module.exports = router;