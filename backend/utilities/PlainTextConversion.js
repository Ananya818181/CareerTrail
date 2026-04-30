const PdfParser = require('pdf-parse');

/**
 * Converts a PDF buffer into plain text.
 * @param {Buffer} fileBuffer - The raw data buffer from multer memoryStorage.
 */
const PlainTextConversion = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        try {
            // Validate that we actually received a buffer
            if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
                return reject(new Error("Invalid input: Expected a file buffer."));
            }

            // pdf-parse accepts the buffer directly
            PdfParser(fileBuffer)
                .then((data) => {
                    // Success: resolve with the extracted text
                    resolve(data.text);
                })
                .catch((error) => {
                    console.error("Error while parsing PDF buffer:", error);
                    reject(error);
                });
        } catch (error) {
            console.error("Unexpected error in PlainTextConversion:", error);
            reject(error);
        }
    });
};

module.exports = PlainTextConversion;