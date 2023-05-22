import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
   return (
      <div className="app">
         <h3>
            You&rsquo ve not provided your details. Kindly head back to the{" "}
            <Link to="/resume">Resume</Link>.
         </h3>
      </div>
   );
}

export default ErrorPage;
