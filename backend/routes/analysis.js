const express = require('express');
const router = express.Router();
const multer = require('multer');
const analysisController = require('../Features/ResumeAnalysis');
const careerPathController = require("../Features/careerPathSuggestions");
const SkillsRecommend = require('../Features/SkillsRecommendation');
const mockInter = require('../Features/MockInterviews');
const career = require('../Features/careerPathSuggestions');

// SUCCESS FIX: Use memoryStorage for Vercel/Serverless deployment
// This avoids "Read-only file system" errors by keeping the file in RAM
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/uploadResume', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // The file is now available at req.file.buffer instead of a path
      console.log("File received in memory:", req.file.originalname);
      res.json({ message: "Upload successful" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error during upload" });
    }
  });

router.post('/getcareerpaths', upload.single('file'), career.suggestCareerPaths);
router.post('/getmockinterviews', upload.single('file'), mockInter);
router.post('/getanalysis', upload.single('file'), analysisController.analysisControler);
router.post('/getskillsrecommendation', upload.single('file'), SkillsRecommend.RecommendSkills);

module.exports = router;