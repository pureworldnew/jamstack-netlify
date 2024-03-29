import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   border: "2px solid #000",
   boxShadow: 24,
   p: 4,
};

export default function BasicModal({
   delOpen,
   setDelOpen,
   handleClickConfirm,
}) {
   const handleClose = () => setDelOpen({ show: false });

   return (
      <div>
         <Modal
            open={delOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Confirm to delete?
               </Typography>
               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Do you really want to delete?
               </Typography>
               <div
                  style={{ display: "flex", justifyContent: "space-between" }}
               >
                  <Button onClick={handleClickConfirm}>Yes</Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </div>
            </Box>
         </Modal>
      </div>
   );
}
