/* eslint-disable no-unused-vars */
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   /* parse the string body into a usable JS object */
   const content = fs.readFileSync(
      path.resolve(__dirname, "resume-template.docx"),
      "binary"
   );
   const zip = new PizZip(content);
   const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
   });

   // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
   doc.render({
      NAME: "John Doe",
      address: "Bachelor of Science",
      phone: "5 years of industry experience",
   });

   const buf = doc.getZip().generate({
      type: "nodebuffer",
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: "DEFLATE",
   });

   // buf is a nodejs Buffer, you can either write it to a
   // file or res.send it with express for example.
   fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);

   return {
      statusCode: 200,
      body: "Hello World!",
   };
};
