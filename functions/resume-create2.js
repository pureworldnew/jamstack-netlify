/* eslint-disable no-unused-vars */
/* Import faunaDB sdk */
const { v4: uuidv4 } = require("uuid");
const GPTFunction = require("./utils/gptFunction");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   /* configure faunaDB Client with our secret */
   /* parse the string body into a useable JS object */
   const data = JSON.parse(event.body);
   console.log("Function `Resume-create` invoked", data);
   const {
      prompt,
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      requiredJobResp,
      workHistory, // JSON format
   } = data;

   const workArray = JSON.parse(workHistory); // an array

   // 👇🏻 group the values into an object
   const newEntry = {
      id: uuidv4(),
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      requiredJobResp,
      workHistory: workArray,
   };

   // 👇🏻 loops through the items in the workArray and converts them to a string
   const remainderText = () => {
      let stringText = "";
      for (let i = 0; i < workArray.length; i += 1) {
         stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
      }
      return stringText;
   };
   let chatgptData = {};
   // 👇🏻 generate a GPT-3 result

   if (prompt === "prompt1") {
      // 👇🏻 The job description prompt
      const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}.\n I write for this job requirements: ${requiredJobResp}. \n Can you write a 100 words description for the top of the resume(first person writing)?`;
      // const objective = await GPTFunction(prompt1);
      const objective = prompt1;
      chatgptData = { objective };
      console.log("prompt1", prompt1);
   } else if (prompt === "prompt2") {
      // 👇🏻 The job responsibilities prompt
      const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}.\n I write for this job requirements: ${requiredJobResp}. \n Can you write 8 bullet points with metrics for a resume on what I am good at?`;
      // const keypoints = await GPTFunction(prompt2);
      const keypoints = prompt2;
      chatgptData = { keypoints };
      console.log("prompt2", prompt2);
   } else if (prompt === "prompt3") {
      // 👇🏻 The job achievements prompt
      const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years).\n During my years I worked at ${
         workArray.length
      } companies. ${remainderText()} \n Can you write me 50 words achievements with metrics based on these job responsibilites: ${requiredJobResp} for each company seperated in numbers of my succession in the company (in first person)?`;
      console.log("prompt3", prompt3);
      // const jobResponsibilities = await GPTFunction(prompt3);
      const jobResponsibilities = prompt3;
      chatgptData = { jobResponsibilities };
   } else if (prompt === "prompt4") {
      // 👇🏻 The Skills section prompt
      const prompt4 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}.\n I write for this job requirements: ${requiredJobResp}.\n Can you write 3 Skill Categories for a resume skills on what I am good at?`;
      // const skillsSection = await GPTFunction(prompt4);
      const skillsSection = prompt4;
      chatgptData = { skillsSection };
      console.log("prompt4", prompt4);
   } else if (prompt === "prompt5") {
      // 👇🏻 The Skills section prompt
      const prompt5 = `I am writing a cover letter, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}.\n I write for this job requirements: ${requiredJobResp}. \n Can you write cover letter less than 300 words for job applying?`;
      // const coverLetter = await GPTFunction(prompt5);
      const coverLetter = prompt5;
      chatgptData = { coverLetter };
      console.log("prompt5", prompt5);
   }

   const saveData = { ...newEntry, ...chatgptData };
   // ToDo:  Saving generated data into Database

   // 👇🏻log the result
   console.log(saveData);

   return {
      statusCode: 200,
      body: JSON.stringify(saveData),
   };
};
