const PlainTextConversion = require('../utilities/PlainTextConversion');
const generateResponse = require('../utilities/GenerateQuestions');
const GetAnswers = require('../utilities/GetAnswers');

const Mock = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const text = await PlainTextConversion(req.file.buffer);

        const Questions = await generateResponse(text);
        const answers = await GetAnswers.Answers(Questions);

        return res.json({ Questions, answers, Type: "Mock" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = Mock;