/* eslint-disable no-unused-vars */
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
   const data = JSON.parse(event.body);
   console.log("Function `work-create` invoked i", data);
   /* parse the string body into a usable JS object */
   const content = fs.readFileSync(
      path.resolve(__dirname, "resume.docx"),
      "binary"
   );
   const zip = new PizZip(content);
   const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
   });

   // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
   doc.render(data);

   const generatedDocBuffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
   });

   const responseHeaders = {
      "Content-Type":
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=output.docx",
   };

   return {
      statusCode: 200,
      headers: responseHeaders,
      body: generatedDocBuffer.toString("base64"),
      isBase64Encoded: true,
   };
};
