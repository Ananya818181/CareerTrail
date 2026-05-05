const PlainTextConversion = require('../utilities/PlainTextConversion');
const GemmaResponse = require('../utilities/GemmaResponse');
exports.suggestCareerPaths = async (req, res) => {
    try {
        console.log("Career API hit, file:", req.file?.originalname);

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ 
                message: "No resume file detected. Please upload your resume again." 
            });
        }

        const Text = await PlainTextConversion(req.file.buffer);

        if (!Text || Text.trim().length === 0) {
            return res.status(400).json({
                message: "Could not extract text from resume"
            });
        }

        const prompt = `Based on the following resume, suggest relevant career paths, industry trends, and future growth areas:
        Resume Text: "${Text}"
        
        Focus on skills, qualifications, and interests mentioned in the resume.`;

        const recommendedPaths = await GemmaResponse.main(prompt);

        return res.status(200).json({
            message: "Career paths suggested successfully",
            recommendedPaths,
            Type: "Career",
        });

    } catch (error) {
        console.error('Error processing career suggestions:', error);

        return res.status(500).json({ 
            message: "Failed to generate career suggestions",
            error: error.message 
        });
    }
};