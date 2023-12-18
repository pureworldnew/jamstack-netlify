import * as React from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NewModalAppBar } from "components/new-modal-appbar";

import { FormInputText, FormInputDatePicker } from "components/form";

const Transition = React.forwardRef((props, ref) => (
   <Slide direction="up" ref={ref} {...props} />
));

const validationSchema = Yup.object().shape({
   cashTitle: Yup.string().required("Title is required"),
});

function AddNewCash({
   open,
   handleSubmitNew,
   handleSubmitEdit,
   handleClose,
   editData,
}) {
   const {
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

   React.useEffect(() => {
      if (Object.keys(editData).length !== 0) {
         setValue("cashTitle", editData.cashTitle);
         setValue("cashValue", editData.cashValue);
         setValue("cashForWhom", editData.cashForWhom);
         setValue("cashWhy", editData.cashWhy);
         setValue("planStatus", editData.planStatus);
         setValue("createDate", new Date(editData.createDate));
      }
   }, [editData]);

   const onSubmit = (data) => {
      if (Object.keys(editData).length !== 0) {
         handleSubmitEdit(editData.id, data);
      } else {
         handleSubmitNew(data);
      }
   };

   const handleCloseDialog = () => {
      reset({
         cashTitle: "",
         cashValue: "",
         cashForWhom: "",
         cashWhy: "",
         planStatus: "",
      });
      handleClose();
   };

   return (
      <div>
         <Dialog
            fullScreen
            open={open}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
         >
            <form>
               <NewModalAppBar
                  handleCloseDialog={handleCloseDialog}
                  handleClickSave={handleSubmit(onSubmit)}
               />
               <Box
                  sx={{
                     "& .MuiTextField-root": { m: 1 },
                     p: 3,
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <Divider>About what I spent</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={6} xs={6}>
                        <FormInputText
                           name="cashTitle"
                           control={control}
                           label="Title"
                           required
                           error={!!errors.cashTitle}
                        />
                        <Typography variant="inherit" color="textSecondary">
                           {errors.cashTitle?.message}
                        </Typography>
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputText
                           name="cashValue"
                           control={control}
                           label="Budget"
                        />
                     </Grid>
                     <Grid item md={3} xs={6}>
                        <FormInputDatePicker
                           name="createDate"
                           control={control}
                        />
                     </Grid>
                  </Grid>
                  <Divider>About why and for whom I spent</Divider>
                  <Grid container spacing={2} alignItems="center">
                     <Grid item md={6} xs={6}>
                        <FormInputText
                           name="cashForWhom"
                           control={control}
                           label="For whom"
                        />
                     </Grid>
                     <Grid item md={6} xs={6}>
                        <FormInputText
                           name="cashWhy"
                           control={control}
                           label="Reason"
                        />
                     </Grid>
                  </Grid>
               </Box>
            </form>
         </Dialog>
      </div>
   );
}

export default AddNewCash;
