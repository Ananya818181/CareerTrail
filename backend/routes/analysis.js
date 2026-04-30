const express = require('express');
const router = express.Router();
const multer = require('multer');
const analysisController = require('../Features/ResumeAnalysis');
const careerPathController = require("../Features/careerPathSuggestions");
const SkillsRecommend = require('../Features/SkillsRecommendation');
const mockInter = require('../Features/MockInterviews');
const career = require('../Features/careerPathSuggestions');

const upload = multer({ storage: multer.memoryStorage() });
router.post('/uploadResume', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      console.log("File received:", req.file.originalname);
  
      res.json({ message: "Upload successful" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

router.post('/getcareerpaths', career.suggestCareerPaths);
router.post('/getmockinterviews', mockInter);
router.post('/getanalysis', analysisController.analysisControler);
router.post('/getskillsrecommendation', SkillsRecommend.RecommendSkills);

module.exports = router;