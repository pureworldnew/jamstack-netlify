import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AccordionComponent({ summary, children, expand, setExpand }) {
   const toggleAccordion = () => {
      setExpand((prev) => !prev);
   };
   return (
      <Accordion expanded={expand} onClick={toggleAccordion}>
         <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
         >
            <Typography onClick={toggleAccordion}>{summary}</Typography>
         </AccordionSummary>
         <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
   );
}

export default AccordionComponent;
