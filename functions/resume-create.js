/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const authenticate = require("./utils/authenticate");
const { sendResponse } = require("./utils/responseUtils");

exports.handler = async (event, context) => {
   const auth = authenticate(event);
   if (!auth.status) {
      return auth.resData;
   }
   const data = JSON.parse(event.body);
   console.log("Function `Resume-create` invoked", data);
   const {
      prompt,
      fullName,
      currentPosition,
      currentLength,
      jobDescription,
      workHistory, // JSON format
   } = data;

   const workArray = JSON.parse(workHistory); // an array

   // 👇🏻 group the values into an object
   const newEntry = {
      id: uuidv4(),
      fullName,
      currentPosition,
      currentLength,
      jobDescription,
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
      const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in this job Description: ${jobDescription}. \n Can you write a 75 words description for the top of the resume(first person writing)?`;
      // const objective = await GPTFunction(prompt1);
      const objective = prompt1;
      chatgptData = { objective };
      console.log("prompt1", prompt1);
   } else if (prompt === "prompt2") {
      // 👇🏻 The job responsibilities prompt
      const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in this job Description: ${jobDescription}. \n Can you write 5 bullet points with metrics for a resume on what I am good at?`;
      // const keypoints = await GPTFunction(prompt2);
      const keypoints = prompt2;
      chatgptData = { keypoints };
      console.log("prompt2", prompt2);
   } else if (prompt === "prompt3") {
      // 👇🏻 The job achievements prompt
      const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years).\n During my years I worked at ${
         workArray.length
      } companies. ${remainderText()} \n I want to follow this format: "At company name:" only once of using company name\n Can you write me achievements with metrics based on these job description: ${jobDescription} for each company seperated in numbers of my succession in the company (in first person)?`;
      console.log("prompt3", prompt3);
      // const jobResponsibilities = await GPTFunction(prompt3);
      const jobResponsibilities = prompt3;
      chatgptData = { jobResponsibilities };
   } else if (prompt === "prompt4") {
      // 👇🏻 The Skills section prompt
      const prompt4 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in this Job Description : ${jobDescription}.\n Can you write 3 Skill Categories for a resume skills on what I am good at?`;
      // const skillsSection = await GPTFunction(prompt4);
      const skillsSection = prompt4;
      chatgptData = { skillsSection };
      console.log("prompt4", prompt4);
   } else if (prompt === "prompt5") {
      // 👇🏻 The Skills section prompt
      const prompt5 = `I am writing a cover letter, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in this job description: ${jobDescription}.\n Can you write cover letter less than 300 words for job applying?`;
      // const coverLetter = await GPTFunction(prompt5);
      const coverLetter = prompt5;
      chatgptData = { coverLetter };
      console.log("prompt5", prompt5);
   }

   const saveData = { ...newEntry, ...chatgptData };
   // ToDo:  Saving generated data into Database

   return sendResponse(200, saveData);
};
