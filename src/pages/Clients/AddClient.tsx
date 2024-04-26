import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { APIClient } from "../../helpers/api_helper";

const api = new APIClient();
const AddClient = () => {
  const navigate = useNavigate();
  const handleCancle = () => {
    navigate("/clients");
  }

  document.title = "Add Client | CV"; 
  const rangeValidation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      client_name: "",
      phone_number: "",
      email: "",
      reg_date: "",
      address_line_1: "",
      address_line_2: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      currency: "",
      timezone: "",
      tax_number: "",
      logo: "",
      credit_period: "",
    },
    validationSchema: Yup.object().shape({
      client_name: Yup.string()
        .matches(
          /^[a-zA-Z\s]+$/,
          "Name cannot contain special characters or numbers"
        )
        .required("Customer Name is required"),
        phone_number: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]+$/, "Phone number must contain only numbers")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number cannot exceed 10 digits"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email format"
        )
        .max(25, "Email cannot exceed 25 characters"),
      reg_date: Yup.string().required("Please select a date"),
      address_line_1: Yup.string().required("Address Line 1 is required"),
      address_line_2: Yup.string().required("Address Line 2 is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      zip_code: Yup.string().required("Zip Code is required"),
      currency: Yup.string().required("Currency is required"),
      timezone: Yup.string().required("Timezone is required"),
      tax_number: Yup.string().required("Tax Number is required"),
      logo: Yup.string().required("Logo is required"),
      credit_period: Yup.number().required("Credit Period is required"),
    }),
    onSubmit: async (values) => {
      try {
        
        const response = await api.create("add-clients", values);
        console.log(response.data);
        navigate("/clients");
      } catch (error) {
        console.error("Error occurred while submitting form:", error);
      }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Clients" breadcrumbItem="Add Client" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      rangeValidation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col md={3} className="mb-3">
                        <Label>customer Name :</Label>
                        <Input
                          name="client_name"
                          label="client_name name  "
                          placeholder="Name"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.client_name || ""}
                          invalid={
                            rangeValidation.touched.client_name &&
                              rangeValidation.errors.client_name
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.client_name &&
                          rangeValidation.errors.client_name ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.client_name}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Phone :</Label>
                        <Input
                          name="phone_number"
                          label="phone_number"
                          placeholder="Contact number"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.phone_number || ""}
                          invalid={
                            rangeValidation.touched.phone_number &&
                              rangeValidation.errors.phone_number
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.phone_number &&
                          rangeValidation.errors.phone_number ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.phone_number}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Email :</Label>
                        <Input
                          name="email"
                          placeholder="Enter Your valid email"
                          type="email"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.email || ""}
                          invalid={
                            rangeValidation.touched.email &&
                              rangeValidation.errors.email
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.email &&
                          rangeValidation.errors.email ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Registered Date :</Label>
                        <Input
                          name="reg_date"
                          placeholder="Select a date"
                          type="date"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.reg_date || ""}
                          invalid={
                            rangeValidation.touched.reg_date &&
                              rangeValidation.errors.reg_date
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.reg_date &&
                          rangeValidation.errors.reg_date ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.reg_date}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} className="mb-3">
                        <Label>Adress Line 1 :</Label>
                        <Input
                          name="address_line_1"
                          label="Adress Line 1 "
                          placeholder="First Line Adress"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.address_line_1 || ""}
                          invalid={
                            rangeValidation.touched.address_line_1 &&
                              rangeValidation.errors.address_line_1
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.address_line_1 &&
                          rangeValidation.errors.address_line_1 ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.address_line_1}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Adress Line 2 :</Label>
                        <Input
                          name="address_line_2"
                          label="Adress Line 2 "
                          placeholder="First Line Adress"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.address_line_2 || ""}
                          invalid={
                            rangeValidation.touched.address_line_2 &&
                              rangeValidation.errors.address_line_2
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.address_line_2 &&
                          rangeValidation.errors.address_line_2 ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.address_line_2}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label for="country">Country:</Label>
                        <Input
                          type="text"
                          name="country"
                          id="country"
                          placeholder="Select a Country"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.country || ""}
                          invalid={
                            rangeValidation.touched.country &&
                            rangeValidation.errors.country
                          }
                        >
                          
                        </Input>
                        {rangeValidation.touched.country &&
                          rangeValidation.errors.country ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.country}
                          </FormFeedback>
                        ) : null}
                      </Col>

                      <Col md={3} className="mb-3">
                        <Label>State :</Label>
                        <Input
                          name="state"
                          label="State"
                          placeholder="Select a state"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.state || ""}
                          invalid={
                            rangeValidation.touched.state &&
                              rangeValidation.errors.state
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.state &&
                          rangeValidation.errors.state ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.state}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} className="mb-3">
                        <Label>City :</Label>
                        <Input
                          name="city"
                          label="City"
                          placeholder="Select a city"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.city || ""}
                          invalid={
                            rangeValidation.touched.city &&
                              rangeValidation.errors.city
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.city &&
                          rangeValidation.errors.city ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.city}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Postal Code :</Label>
                        <Input
                          name="zip_code"
                          label="zip_code"
                          placeholder="Enter your zip code"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.zip_code || ""}
                          invalid={
                            rangeValidation.touched.zip_code &&
                              rangeValidation.errors.zip_code
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.zip_code &&
                          rangeValidation.errors.zip_code ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.zip_code}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Currency :</Label>
                        <Input
                          name="currency"
                          label="currency"
                          placeholder="Currency"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.currency || ""}
                          invalid={
                            rangeValidation.touched.currency &&
                              rangeValidation.errors.currency
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.currency &&
                          rangeValidation.errors.currency ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.currency}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Timezone :</Label>
                        <Input
                          name="timezone"
                          label="timezone"
                          placeholder="Timezone"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.timezone || ""}
                          invalid={
                            rangeValidation.touched.timezone &&
                              rangeValidation.errors.timezone
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.timezone &&
                          rangeValidation.errors.timezone ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.currency}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} className="mb-3">
                        <Label>Tax No :</Label>
                        <Input
                          name="tax_number"
                          label="tax_number"
                          placeholder="Enter Tax Number"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.tax_number || ""}
                          invalid={
                            rangeValidation.touched.tax_number &&
                              rangeValidation.errors.tax_number
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.tax_number &&
                          rangeValidation.errors.tax_number ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.tax_number}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>logo :</Label>
                        <Input
                          name="logo"
                          label="logo"
                          placeholder="Enter Tax Number"
                          type="file"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.logo || ""}
                          invalid={
                            rangeValidation.touched.logo &&
                              rangeValidation.errors.logo
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.logo &&
                          rangeValidation.errors.logo ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.logo}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Credit period :</Label>
                        <Input
                          name="credit_period"
                          label="credit_period"
                          placeholder="Enter Tax Number"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.credit_period || ""}
                          invalid={
                            rangeValidation.touched.credit_period &&
                              rangeValidation.errors.credit_period
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.credit_period &&
                          rangeValidation.errors.credit_period ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.credit_period}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <FormGroup className="mb-0">
                      <div>
                        <Button type="submit" color="primary" className="ms-1">
                          Submit
                        </Button>{" "}
                        <Button type="reset" color="secondary" onClick={handleCancle}>
                          Cancel
                        </Button>
                      </div>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddClient;
