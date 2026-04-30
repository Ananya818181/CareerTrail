const PlainTextConversion = require('../utilities/PlainTextConversion');
const GetGemmaResponse = require('../utilities/GemmaResponse');

exports.analysisControler = async (req, res) => {
    try {
        // SUCCESS CHECK: In deployment, always use the path provided by multer
        // This ensures you aren't pointing to a file that doesn't exist on the server
        let resumePath = req.file ? req.file.path : 'uploads/resume.pdf'; 
        
        let resume = await PlainTextConversion(resumePath);

        // Define Prompts - Added ${resume} to all prompts to ensure AI context
        const prompt1 = `Here is the resume: ${resume}. Identify skill gaps and suggest learning resources.`;
        const prompt2 = `Here is the resume: ${resume}. Recommend specific online courses (free/paid) with platforms.`;
        const prompt3 = `Based on this resume: ${resume}, suggest real certifications from providers like AWS, Google, or Microsoft.`;
        const prompt4 = `Based on this resume: ${resume}, suggest 3 portfolio projects to improve their hireability.`;

        // Parallel execution to prevent deployment timeouts (Render/Vercel have 10-30s limits)
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
        // CRITICAL: Return JSON so the frontend spinner stops and shows the error
        return res.status(500).json({ 
            error: "Analysis failed", 
            message: error.message 
        });
    }
};