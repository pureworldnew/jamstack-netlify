/* eslint-disable no-unused-vars */
const fs = require("fs");
const HtmlDocx = require("html-docx-js");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   /* parse the string body into a usable JS object */
   const inputPath = "./data/resume.html";
   const outputPath = "./generated-resume.docx";

   try {
      const htmlContent = fs.readFileSync(inputPath, "utf-8");
      const docxContent = HtmlDocx.asBlob(htmlContent);

      fs.writeFileSync(outputPath, docxContent);

      console.log("Resume generated successfully!");
   } catch (error) {
      console.error("Error generating resume:", error);
   }

   return {
      statusCode: 200,
      body: "Hello World!",
   };
};
