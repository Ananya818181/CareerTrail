const generateResponse = require('../utilities/GenerateQuestions');
const GetAnswers = require('../utilities/GetAnswers');

const Mock = async (req, res) => {
    try {
        // Validation belongs here, not in the utility file
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // 1. Generate Questions
        const Questions = await generateResponse(req.file.buffer);

        // 2. Generate Answers using the utility
        // Since we exported 'Answers' directly, we call 'GetAnswers' as a function
        const answers = await GetAnswers(Questions);

        // 3. Send the final JSON back to the frontend
        return res.json({ 
            Questions, 
            answers, 
            Type: "Mock" 
        });

    } catch (error) {
        console.error("Mock Interview Controller Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = Mock;