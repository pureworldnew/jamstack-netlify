/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function RichEditor({ content, setContent }) {
   return (
      <CKEditor
         editor={ClassicEditor}
         data={content}
         onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
         }}
         onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
            console.log({ event, editor, data });
         }}
         onBlur={(event, editor) => {
            console.log("Blur.", editor);
         }}
         onFocus={(event, editor) => {
            console.log("Focus.", editor);
         }}
      />
   );
}

export default RichEditor;
