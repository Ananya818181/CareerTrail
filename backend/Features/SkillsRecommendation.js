exports.RecommendSkills = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const Text = await PlainTextConversion(req.file.buffer);

        const Prompt = `Please analyze the following resume... ${Text}`;

        const SkillsRoadMap = await GemmaResponse.main(Prompt);

        return res.json({
            SkillsRoadMap,
            Type: "Recommend"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};