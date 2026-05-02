const GemmaResponse = require('./GemmaResponse');

const Answers = async (Questions) => {
    try {
        const prompt = `You are an expert technical interviewer. 
        Below is a list of interview questions: 
        "${Questions}"
        
        Please provide a detailed, professional, and concise example answer for EACH question. 
        Format your response clearly using bullet points for each answer.`;

        const response = await GemmaResponse.main(prompt);
        return response || "No answers could be generated.";
    } catch (error) {
        console.error("Error in GetAnswers utility:", error);
        return "An error occurred while generating answers.";
    }
};

// This exports the function directly for easier access
module.exports = Answers;