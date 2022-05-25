import keyword_extractor from "keyword-extractor";
const sentence =
  "I am a student";
const extraction_result = keyword_extractor.extract(sentence, {
  language: "english",
  remove_digits: true,
  return_changed_case: true,
  remove_duplicates: false,
});

console.log(extraction_result)

const  commonWords =require("./src/data/commonWord.js")

var text = "Tôi là học sinh bị  thôi học  "

text = text.trim()
text = text.toLowerCase();

var unsignedText = text.normalize("NFD")
unsignedText = unsignedText.replace(/[^\w\d ]/g, '')

console.log({unsignedText})

var result = unsignedText.split(' ');

// remove commonWords
result = result.filter(function (word) {
    return !commonWords.includes(word)
});
console.log({result})

// Unique words
const keywords = [...new Set(result)]

console.log({keywords});

