/* eslint-disable no-unused-vars */
const natural = require("natural");

const tokenizer = new natural.WordTokenizer();

function calculateMatchPercentage(resumeText, jobDescriptionText) {
   // Tokenize the input text
   const resumeTokens = tokenizer.tokenize(resumeText.toLowerCase());
   const jobTokens = tokenizer.tokenize(jobDescriptionText.toLowerCase());

   // Calculate the Jaccard similarity coefficient
   const intersection = new Set(
      resumeTokens.filter((token) => jobTokens.includes(token))
   );
   const union = new Set([...resumeTokens, ...jobTokens]);
   const similarity = intersection.size / union.size;

   // Convert similarity to a percentage
   const matchPercentage = similarity * 100;

   // Get matched keywords
   const matchedKeywords = Array.from(intersection);

   return { matchPercentage: matchPercentage.toFixed(2), matchedKeywords };
}
/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   /* parse the string body into a useable JS object */
   const data = JSON.parse(event.body);
   console.log("Function `work-resume-match` invoked", data);

   const { matchPercentage, matchedKeywords } = calculateMatchPercentage(
      data.resumeContent,
      data.jobDescription
   );

   console.log(`Match Percentage: ${matchPercentage}%`);
   console.log("Matched Keywords:", matchedKeywords);

   /* construct the fauna query */
   return {
      statusCode: 200,
      body: JSON.stringify({ matchPercentage, matchedKeywords }),
   };
};
