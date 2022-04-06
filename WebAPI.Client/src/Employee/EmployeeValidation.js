import * as yup from 'yup';

export const employeeSchema = yup.object().shape({
    EmployeeId: yup.number(),
    EmployeeFirstName: yup.string().required("Employee's first name is required"),
    EmployeeLastName: yup.string().required("Employee's last name is required"),
    EmployeeSsn: yup
        .string()
        .required("Employee's SSN is required")
        .matches(/\d{9}/, 'Must only be numbers')
        .min(9, 'You must have exactly 9 numbers')
        .max(9, 'You must have exactly 9 numbers'),
    DateOfBirth: yup.string().required("Employee's date of birth is required"),
    IsTerminated: yup.bool().required(),
    CompanyId: yup.number().required(),
});

export const dependentSchema = yup.object().shape({
    DependentId: yup.number(),
    DependentFirstName: yup.string().required("Dependent's first name is required"),
    DependentLastName: yup.string().required("Dependent's last name is required"),
    DependentSsn: yup
        .string()
        .required("Dependent's SSN is required")
        .matches(/\d{9}/, 'Must only be numbers')
        .min(9, 'You must have exactly 9 numbers')
        .max(9, 'You must have exactly 9 numbers'),
    DateOfBirth: yup.date().required("Dependent's date of birth is required"),
    IsTerminated: yup.bool().required(),
    CompanyId: yup.number().required(),
});