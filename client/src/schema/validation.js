import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(9, "Enter valid phone no.")
    .max(17, "Enter valid phone no."),
});
