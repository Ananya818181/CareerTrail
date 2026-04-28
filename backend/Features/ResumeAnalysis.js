const PlainTextConversion = require('../utilities/PlainTextConversion');
const GetGemmaResponse = require('../utilities/GemmaResponse');

exports.analysisControler = async (req, res) => {
    try{
        let resumePath = 'uploads/resume.pdf';
        let resume = await PlainTextConversion(resumePath);
        
        const prompt1 = `Here is the detailed resume: ${resume}. Based on the skills mentioned, please identify any skill gaps the candidate has. Provide a list of related missing or underdeveloped skills that could improve their qualifications (Note. Only add related to mentioned skills on resume, don't add every skill). Include suggestions for learning resources and platforms where the candidate can improve these skills. Be sure to reference specific skills from the resume.`
        const prompt2 = `Here is the detailed resume: ${resume}. Based on the skills mentioned, recommend online courses (both free and paid) that would help the candidate strengthen their skills and make their resume more competitive. Include course names, platforms, URLs, and any additional relevant information about the course.`
        const prompt3 = `
        Based on the resume, recommend ONLY real, verifiable certifications.
        
        Rules:
        - Do NOT invent certifications.
        - Do NOT treat documentation/tutorials as certifications.
        - If no official certification exists for a technology, explicitly say "No official certification available".
        - Only include certifications from recognized providers (AWS, Google Cloud, Microsoft, Oracle, EDB, CompTIA, Coursera if course certificate).
        - Include only accurate URLs.
        - If uncertain, say uncertain instead of guessing.
        `;
               const prompt4 = `Here is the detailed resume: ${resume}. Based on the candidate's skills and experience, suggest relevant personal or professional projects that can be worked on to improve their portfolio. These projects should be aligned with their career goals and should help showcase their expertise. Provide project ideas along with any resources or tools that can be used to build them.`

        const SkillsGaps = await GetGemmaResponse.main(prompt1);
        const RecommendedCourse = await GetGemmaResponse.main(prompt2);
        const RecommendedCertificates = await GetGemmaResponse.main(prompt3);
        const ReleventProjects = await GetGemmaResponse.main(prompt4);
        
        return res.json({
            SkillsGaps,
            RecommendedCourse,
            RecommendedCertificates,
            ReleventProjects,
            Type: "Analysis"
        });

    }catch (error) {
        console.error('Error:', error);
    }
};

