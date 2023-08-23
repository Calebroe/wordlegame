//parser used to split a json file dictionary into smaller lists of words based on target length param
//this script works by extract the words first from the object and then filtering
const fs = require('fs');

function filterAndSaveWords(jsonFilePath, targetLength) {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      const wordsObject = JSON.parse(data);
      const words = Object.keys(wordsObject); // Extract words from the object
      const filteredWords = words.filter(word => word.length === targetLength);
      
      // Rest of the code to save filteredWords to a new JSON file
      const newFileName = `dictionary${targetLength}.json`;

      fs.writeFile(newFileName, JSON.stringify(filteredWords), err => {
        if (err) {
          console.error('Error writing filtered words to file:', err);
        } else {
          console.log(`Filtered words saved as ${newFileName}`);
        }
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });
}

const jsonFilePath = process.argv[2];
const targetLength = parseInt(process.argv[3], 10);

if (!jsonFilePath || isNaN(targetLength)) {
  console.error('Usage: node script.js <jsonFilePath> <targetLength>');
} else {
  filterAndSaveWords(jsonFilePath, targetLength);
}
