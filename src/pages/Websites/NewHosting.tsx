import React, { useState, useEffect } from "react";
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
const NewHosting = () => {
  const [nextRenewalDate, setNextRenewalDate] = useState("");
  const navigate = useNavigate();
  const handleCancle = () => {
    navigate("/websites");
  }

  document.title = "Add Web | CV";
  const rangeValidation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      domain: "",
      ssl: "",
      created_timestamp: "",
      amc: "",
      amc_charges: 0,
      amc_renewal_period: "",
      hosting: "",
      hosting_charges: 0,
      hosting_renewal_period: "",
      hosting_renewal_date: "",
      total_charges: 0,
      payment_date: "",
      payment_status: "",
    },
    validationSchema: Yup.object().shape({
      domain: Yup.string().required('Domain name is required'),
      ssl: Yup.string().required('SSL status is required'),
      created_timestamp: Yup.date().required('Creation timestamp is required'),
      amc: Yup.string().required('AMC name is required'),
      amc_charges: Yup.number().required('AMC charges are required'),
      amc_renewal_period: Yup.string().required('AMC renewal period is required'),
      hosting: Yup.string().required('Hosting name is required'),
      hosting_charges: Yup.number().required('Hosting charges are required'),
      hosting_renewal_period: Yup.string().required('Hosting renewal period is required'),
      hosting_renewal_date: Yup.date().required('Hosting renewal date is required'),
      total_charges: Yup.number().required('Total charges are required'),
      payment_date: Yup.date().required('Payment date is required'),
      payment_status: Yup.string().required('Payment status is required')
    }),
    onSubmit: async (values) => {
      try {

        const response = await api.create("add-websites", values);
        console.log(response.new_websites);
        navigate("/websites");
      } catch (error) {
        console.error("Error occurred while submitting form:", error);
      }
    },
  });
// eslint-disable-next-line 
  const calculateNextRenewalDate = () => {
    const registrationDate = new Date(rangeValidation.values.created_timestamp);
    const renewalPeriod = parseInt(rangeValidation.values.hosting_renewal_period);

    if (!isNaN(renewalPeriod) && registrationDate instanceof Date && !isNaN(registrationDate.getTime())) {
      let nextRenewal = new Date(registrationDate);
      nextRenewal.setFullYear(nextRenewal.getFullYear() + renewalPeriod);
      setNextRenewalDate(nextRenewal.toISOString().split('T')[0]);
    }
  };


  useEffect(() => {
    calculateNextRenewalDate();
  }, [rangeValidation.values.created_timestamp, rangeValidation.values.amc_renewal_period, rangeValidation.values.hosting_renewal_period, calculateNextRenewalDate]);


  const calculateTotalCharges = () => {
    const amcCharges = parseFloat(rangeValidation.values.amc_charges) || 0;
    const hostingCharges = parseFloat(rangeValidation.values.hosting_charges) || 0;
    return amcCharges + hostingCharges;
  };



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Websites" breadcrumbItem="Add Web" />
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
                        <Label>Domain :</Label>
                        <Input
                          name="domain"
                          label="domain"
                          placeholder="example.com"
                          type="text"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.domain || ""}
                          invalid={
                            rangeValidation.touched.domain &&
                              rangeValidation.errors.domain
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.domain &&
                          rangeValidation.errors.domain ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.domain}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>SSL :</Label>
                        <Input
                          name="ssl"
                          placeholder="Enter Your valid email"
                          type="select"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.ssl || ""}
                          invalid={
                            rangeValidation.touched.ssl &&
                              rangeValidation.errors.ssl
                              ? true
                              : false
                          }
                        >
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Input>
                        {rangeValidation.touched.ssl &&
                          rangeValidation.errors.ssl ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.ssl}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Registered Date :</Label>
                        <Input
                          name="created_timestamp"
                          placeholder="Select a date"
                          type="date"
                          onChange={(e) => { rangeValidation.handleChange(e); }}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.created_timestamp || ""}
                          invalid={
                            rangeValidation.touched.created_timestamp &&
                              rangeValidation.errors.created_timestamp
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.created_timestamp &&
                          rangeValidation.errors.created_timestamp ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.created_timestamp}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} className="mb-3">
                        <Label>AMC :</Label>
                        <Input
                          name="amc"
                          label="AMC "
                          type="select"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.amc || ""}
                          invalid={
                            rangeValidation.touched.amc &&
                              rangeValidation.errors.amc
                              ? true
                              : false
                          }
                        >
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Input>
                        {rangeValidation.touched.amc &&
                          rangeValidation.errors.amc ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.amc}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>AMC charges:</Label>
                        <Input
                          name="amc_charges"
                          label="AMC charges"
                          placeholder="Charges"
                          type="text"
                          onChange={(e) => {
                            rangeValidation.handleChange(e);
                          }}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.amc_charges || ""}
                          invalid={
                            rangeValidation.touched.amc_charges &&
                              rangeValidation.errors.amc_charges
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.amc_charges &&
                          rangeValidation.errors.amc_charges ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.amc_charges}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label for="country">AMC Renewal period:</Label>
                        <Input
                          type="select"
                          name="amc_renewal_period"
                          id="amc_renewal_period"
                          placeholder="Select"
                          onChange={(e) => { rangeValidation.handleChange(e); }}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.amc_renewal_period || ""}
                          invalid={
                            rangeValidation.touched.amc_renewal_period &&
                            rangeValidation.errors.amc_renewal_period
                          }
                        >
                          <option value="select">Select</option>
                          <option value="1Yr">1 Yr</option>
                          <option value="3Yr">2 Yr</option>
                          <option value="4Yr">3 Yr</option>
                          <option value="5Yr">4 Yr</option>
                        </Input>
                        {rangeValidation.touched.amc_renewal_period &&
                          rangeValidation.errors.amc_renewal_period ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.amc_renewal_period}
                          </FormFeedback>
                        ) : null}
                      </Col>

                      <Col md={3} className="mb-3">
                        <Label>AMC Next Renewal Date :</Label>
                        <Input
                          name="hosting_renewal_date"
                          placeholder="Select a date"
                          type="date"
                          readOnly
                          onChange={(e) => { rangeValidation.handleChange(e); }}
                          onBlur={rangeValidation.handleBlur}
                          value={nextRenewalDate}
                          invalid={
                            rangeValidation.touched.hosting_renewal_date &&
                              rangeValidation.errors.hosting_renewal_date
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.hosting_renewal_date &&
                          rangeValidation.errors.hosting_renewal_date ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.hosting_renewal_date}
                          </FormFeedback>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} className="mb-3">
                        <Label>Hosting :</Label>
                        <Input
                          name="hosting"
                          label="AMC "
                          type="select"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.hosting || ""}
                          invalid={
                            rangeValidation.touched.hosting &&
                              rangeValidation.errors.hosting
                              ? true
                              : false
                          }
                        >
                          <option value="select">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Input>
                        {rangeValidation.touched.hosting &&
                          rangeValidation.errors.hosting ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.hosting}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Hosting Charges :</Label>
                        <Input
                          name="hosting_charges"
                          label="hosting_charges"
                          placeholder="Charges"
                          type="text"
                          onChange={(e) => {
                            rangeValidation.handleChange(e);
                          }}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.hosting_charges || ""}
                          invalid={
                            rangeValidation.touched.hosting_charges &&
                              rangeValidation.errors.hosting_charges
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.hosting_charges &&
                          rangeValidation.errors.hosting_charges ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.hosting_charges}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Hosting Renewal Period :</Label>
                        <Input
                          name="hosting_renewal_period"
                          label="hosting_renewal_period"
                          placeholder="Currency"
                          type="select"
                          onChange={(e) => {
                            rangeValidation.handleChange(e);
                            calculateNextRenewalDate();
                          }}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.hosting_renewal_period || ""}
                          invalid={
                            rangeValidation.touched.hosting_renewal_period &&
                              rangeValidation.errors.hosting_renewal_period
                              ? true
                              : false
                          }
                        >
                          <option value="select">Select</option>
                          <option value="1Yr">1 Yr</option>
                          <option value="2Yr">2 Yr</option>
                          <option value="3Yr">3 Yr</option>
                          <option value="4Yr">4 Yr</option>
                        </Input>
                        {rangeValidation.touched.hosting_renewal_period &&
                          rangeValidation.errors.hosting_renewal_period ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.hosting_renewal_period}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Hosting Next Renewal Date :</Label>
                        <Input
                          name="hosting_renewal_date"
                          placeholder="Select a date"
                          type="date"
                          readOnly
                          onChange={(e) => { rangeValidation.handleChange(e); }}
                          onBlur={rangeValidation.handleBlur}
                          value={nextRenewalDate}
                          invalid={
                            rangeValidation.touched.hosting_renewal_date &&
                              rangeValidation.errors.hosting_renewal_date
                              ? true
                              : false
                          }
                        />
                        {rangeValidation.touched.hosting_renewal_date &&
                          rangeValidation.errors.hosting_renewal_date ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.touched.hosting_renewal_date && rangeValidation.errors.hosting_renewal_date}
                          </FormFeedback>

                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} className="mb-3">
                        <Label>Payment Date :</Label>
                        <Input
                          name="payment_date"
                          label="payment_date"
                          placeholder=""
                          type="date"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.payment_date || ""}
                          invalid={
                            rangeValidation.touched.payment_date &&
                              rangeValidation.errors.payment_date
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.payment_date &&
                          rangeValidation.errors.payment_date ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.payment_date}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Total Charges :</Label>
                        <Input
                          name="total_charges"
                          label="total_charges"
                          placeholder="Total Charges"
                          type="text"
                          value={calculateTotalCharges()}
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}

                          invalid={
                            rangeValidation.touched.total_charges &&
                              rangeValidation.errors.total_charges
                              ? true
                              : false
                          }
                        ></Input>
                        {rangeValidation.touched.total_charges &&
                          rangeValidation.errors.total_charges ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.total_charges}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={3} className="mb-3">
                        <Label>Payment Status :</Label>
                        <Input
                          name="payment_status"
                          label="payment_status"
                          placeholder="Enter Tax Number"
                          type="select"
                          onChange={rangeValidation.handleChange}
                          onBlur={rangeValidation.handleBlur}
                          value={rangeValidation.values.payment_status || ""}
                          invalid={
                            rangeValidation.touched.payment_status &&
                              rangeValidation.errors.payment_status
                              ? true
                              : false
                          }
                        >
                          <option value="select">Select</option>
                          <option value="Unpaid">Unnpaid</option>
                          <option value="Paid">Paid</option>
                          <option value="pending">Pending</option>
                        </Input>
                        {rangeValidation.touched.payment_status &&
                          rangeValidation.errors.payment_status ? (
                          <FormFeedback type="invalid">
                            {rangeValidation.errors.payment_status}
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

export default NewHosting;
