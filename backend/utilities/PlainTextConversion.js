const PdfParser = require('pdf-parse');
const fs = require('fs');
const path = require('path'); // Add this

const PlainTextConversion = (filepath) => {
    return new Promise((resolve, reject) => {
        try {
            // Resolve the absolute path to ensure the file is found regardless of where the script runs
            const absolutePath = path.resolve(filepath);
            
            if (!fs.existsSync(absolutePath)) {
                return reject(new Error(`File not found at: ${absolutePath}`));
            }

            let dataBuffer = fs.readFileSync(absolutePath);
            PdfParser(dataBuffer)
                .then((data) => {
                    resolve(data.text);
                })
                .catch((error) => {
                    console.error("Error while parsing PDF:", error);
                    reject(error);
                });
        } catch (error) {
            console.error("Error while reading file:", error);
            reject(error);
        }
    });
};

module.exports = PlainTextConversion;