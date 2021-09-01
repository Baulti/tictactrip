const justifyTools = require('../tools/justify-tools');

justify = (req, res) => {
    const LINE_LENGTH = justifyTools.LINE_LENGTH;
    let text = req.body;
    let textIndex = 0;
    let arrayIndex = 0;
    let justifiedText = '';

    while (textIndex < text.length - LINE_LENGTH) {
        let currentLine = text.slice(textIndex, textIndex + LINE_LENGTH + 1);
        let currentLineArray = Array.from(currentLine);

        // If there is a backline, count the characters and add the line
        if (currentLine.includes('\n')) {
            textIndex += currentLine.indexOf('\n') + 1;
            currentLine = currentLine.split('\n')[0];
            justifiedText += currentLine.trim() + '\n';
        } else {
            textIndex += LINE_LENGTH;
            arrayIndex = LINE_LENGTH;
            // Cut the line at the last word
            while (currentLineArray[arrayIndex] !== ' ') arrayIndex--;
            // Adjust text parsing cursor
            textIndex -= LINE_LENGTH - arrayIndex;
            // Convert the line to string and remove useless spaces
            currentLine = currentLineArray.splice(0, arrayIndex + 1).join('').trim();
            // Justify the line and add it to the final justified text
            justifiedText += justifyTools.justifyLine(currentLine, justifyTools.spaceCount(currentLine)) + '\n';

        }
    }

    // Add the last line
    justifiedText += text.slice(textIndex).trim();

    return res.status(200).send(justifiedText);
}

module.exports = { justify }