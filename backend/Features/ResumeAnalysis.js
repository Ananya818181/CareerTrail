const PlainTextConversion = require('../utilities/PlainTextConversion');
const GetGemmaResponse = require('../utilities/GemmaResponse');

exports.analysisControler = async (req, res) => {
    try {
        // SUCCESS FIX: Check for the buffer in req.file
        // memoryStorage provides the file data in req.file.buffer
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ 
                error: "No resume data found", 
                message: "Please upload your resume again." 
            });
        }
        
        // Pass the buffer directly to the conversion utility
        let resume = await PlainTextConversion(req.file.buffer);

        // Define Prompts
        const prompt1 = `Here is the resume: ${resume}. Identify skill gaps and suggest learning resources.`;
        const prompt2 = `Here is the resume: ${resume}. Recommend specific online courses (free/paid) with platforms.`;
        const prompt3 = `Based on this resume: ${resume}, suggest real certifications from providers like AWS, Google, or Microsoft.`;
        const prompt4 = `Based on this resume: ${resume}, suggest 3 portfolio projects to improve their hireability.`;

        // Parallel execution
        const [SkillsGaps, RecommendedCourse, RecommendedCertificates, ReleventProjects] = await Promise.all([
            GetGemmaResponse.main(prompt1),
            GetGemmaResponse.main(prompt2),
            GetGemmaResponse.main(prompt3),
            GetGemmaResponse.main(prompt4)
        ]);
        
        return res.json({
            SkillsGaps,
            RecommendedCourse,
            RecommendedCertificates,
            ReleventProjects,
            Type: "Analysis"
        });

    } catch (error) {
        console.error('Analysis Error:', error);
        return res.status(500).json({ 
            error: "Analysis failed", 
            message: error.message 
        });
    }
};