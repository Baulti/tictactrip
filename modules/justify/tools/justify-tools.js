const LINE_LENGTH = 80;

// Return an array of space character occurences of a string
function spaceCount(line) {
    let res = [];
    let cpt = 0;
    Array.from(line).forEach(elm => {
        if (elm === ' ') {
            res.push(cpt);
        }
        cpt++;
    });

    return res;
}

// Return a string of LINE_LENGTH characters justified
function justifyLine(line, spaceOccurences) {
    let lineLength = line.length;
    let laps = 0;
    let addedSpaces = 0;
    let cpt = 0;
    let arrayLine = Array.from(line);
    const spacesToAdd = LINE_LENGTH - lineLength;

    if (spacesToAdd < 0) return null;
    if (spacesToAdd === 0) {
        return line;
    }

    while (addedSpaces != spacesToAdd) {
        // Alternate space adding
        if (cpt >= spaceOccurences.length) {
            laps++;
            cpt = (laps % 2 == 0) ? 0 : 1;
        }

        arrayLine.splice(spaceOccurences[cpt], 0, ' ');
        // Shift spaces index depending on current space add
        spaceOccurences = spaceOccurences.slice(0, cpt + 1).concat(spaceOccurences.slice(cpt + 1).map(elm => elm + 1));
        addedSpaces++;
        cpt += 2;
    }

    return arrayLine.join('');
}

module.exports = { LINE_LENGTH, justifyLine, spaceCount }