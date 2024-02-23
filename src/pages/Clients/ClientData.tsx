import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const ClientData = () => {
  //meta title
  document.title = "Client Details";

  const navigate = useNavigate();
  const viewsuborg = () => {
    navigate("/addsuborg");
  };
  const [customchkPrimary, setcustomchkPrimary] = useState(true);

  const [activeTab, setactiveTab] = useState<number>(1);
  const [activeTabVartical, setoggleTabVertical] = useState<number>(1);

  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedStepsVertical, setPassedStepsVertical] = useState([1]);

  function toggleTab(tab: any) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  function toggleTabVertical(tab: any) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab];

      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab);
        setPassedStepsVertical(modifiedSteps);
      }
    }
  }

  // Wizard form
  const wizardformik: any = useFormik({
    initialValues: {
      companyname: "",
      phoneno: "",
      email: "",
      address: "",
      //tab 2
      panNo: "",
      vatNo: "",
      cstNo: "",
      taxNo: "",
      uin: "",
      declaration: "",
      //tab 3
      card: "",
      creditcard: "",
      creditno: "",
      cardvarification: "",
      expiratdata: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      lastname: Yup.string().required("This field is required"),
      email: Yup.string()
        .email()
        .matches(/^(?!.*@[^,]*,)/)
        .required("Please Enter Your Email"),
      phoneno: Yup.string()
        .matches(/^[0-9]{10}$/)
        .required("Please Enter Your Phone No"),
      address: Yup.string().required("Enter Your Address"),
      //tab 2
    
      //tab 3
      card: Yup.string().required("This field is required"),
      creditcard: Yup.string().required("This field is required"),
      creditno: Yup.string().required("This field is required"),
      cardvarification: Yup.string().required("This field is required"),
      expiratdata: Yup.string().required("This field is required"),
    }),

    onSubmit: (values: any) => {
      // console.log("value", values.password);
    },
  });

  // Vertical Wizard form
  const verticalformik: any = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      email: "",
      address: "",
      //tab 2
      panNo: "",
      vatNo: "",
      cstNo: "",
      taxNo: "",
      uin: "",
      declaration: "",
      //tab 3
      card: "",
      creditcard: "",
      creditno: "",
      cardvarification: "",
      expiratdata: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("This field is required"),
      lastname: Yup.string().required("This field is required"),
      email: Yup.string()
        .email()
        .matches(/^(?!.*@[^,]*,)/)
        .required("Please Enter Your Email"),
      phoneno: Yup.string()
        .matches(/^[0-9]{10}$/)
        .required("Please Enter Your Phone No"),
      address: Yup.string().required("This field is required"),
      //tab 2
      panNo: Yup.string().required("This field is required"),
      vatNo: Yup.string().required("This field is required"),
      cstNo: Yup.string().required("This field is required"),
      taxNo: Yup.string().required("This field is required"),
      uin: Yup.string().required("This field is required"),
      declaration: Yup.string().required("This field is required"),
      //tab 3
      card: Yup.string().required("This field is required"),
      creditcard: Yup.string().required("This field is required"),
      creditno: Yup.string().required("This field is required"),
      cardvarification: Yup.string().required("This field is required"),
      expiratdata: Yup.string().required("This field is required"),
    }),

    onSubmit: (values: any) => {
      // console.log("value", values.password);
    },
  });
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Client Details" />
          

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                <div className="d-flex justify-content-end align-items-center">
                    <button
                      className="btn btn-primary"
                      onClick={viewsuborg}
                    >
                      Add Sub Organizations
                    </button>
                  </div> <br />
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1);
                            }}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1.</span> Company Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2);
                            }}
                            disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Contact Person
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3);
                            }}
                            disabled={!(passedSteps || []).includes(3)}
                          >
                            <span className="number">3.</span> Services
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 4 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4);
                            }}
                            disabled={!(passedSteps || []).includes(4)}
                          >
                            <span className="number">4.</span> Billing
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <TabContent activeTab={activeTab} className="body">
                        <TabPane tabId={1}>
                          <Form onSubmit={wizardformik.handleSubmit}>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    Company Name
                                  </Label>
                                  <Input
                                    type="text"
                                    name="fristname"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter Company Name"
                                    value={wizardformik.values.firstname}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.firstname &&
                                  wizardformik.touched.firstname ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.firstname}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-phoneno-input3">
                                    Phone
                                  </Label>
                                  <Input
                                    type="text"
                                    name="phoneno"
                                    className="form-control"
                                    id="basicpill-phoneno-input3"
                                    placeholder="Enter Your Phone No."
                                    value={wizardformik.values.phoneno}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.phoneno &&
                                  wizardformik.touched.phoneno ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.phoneno}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-email-input4">
                                    Email
                                  </Label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="basicpill-email-input4"
                                    name="email"
                                    placeholder="Enter Your Email ID"
                                    value={wizardformik.values.email}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.email &&
                                  wizardformik.touched.email ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.email}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-address-input1">
                                    Address
                                  </Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control"
                                    name="address"
                                    rows={1}
                                    placeholder="Enter Your Address"
                                    value={wizardformik.values.address}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.address &&
                                  wizardformik.touched.address ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.address}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row></Row>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-pancard-input5">
                                      Name
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-pancard-input5"
                                      name="panNo"
                                      placeholder="Enter Your Name"
                                      value={wizardformik.values.panNo}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {wizardformik.errors.panNo &&
                                    wizardformik.touched.panNo ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.panNo}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-email-input4">
                                      Email
                                    </Label>
                                    <Input
                                      type="email"
                                      className="form-control"
                                      id="basicpill-email-input4"
                                      name="email"
                                      placeholder="Enter Your Email ID"
                                      value={wizardformik.values.email}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {wizardformik.errors.email &&
                                    wizardformik.touched.email ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.email}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-phoneno-input3">
                                      Phone
                                    </Label>
                                    <Input
                                      type="text"
                                      name="phoneno"
                                      className="form-control"
                                      id="basicpill-phoneno-input3"
                                      placeholder="Enter Your Phone No."
                                      value={wizardformik.values.phoneno}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {wizardformik.errors.phoneno &&
                                    wizardformik.touched.phoneno ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.phoneno}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-servicetax-input8">
                                      Designation
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-servicetax-input8"
                                      placeholder="Enter Your Designation"
                                      name="taxNo"
                                      value={wizardformik.values.taxNo}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {wizardformik.errors.taxNo &&
                                    wizardformik.touched.taxNo ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.taxNo}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={3}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="form-check form-check-primary mb-3">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="customCheckcolor1"
                                      checked={customchkPrimary}
                                      onChange={() => {
                                        setcustomchkPrimary(!customchkPrimary);
                                      }}
                                    />

                                    <label
                                      className="form-check-label"
                                      htmlFor="customCheckcolor1"
                                    >
                                      AWS
                                    </label>
                                  </div>

                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                        <TabPane tabId={4}>
                          <div className="row justify-content-center">
                            <Col lg="6">
                              
                            </Col>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab - 1);
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 4 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab + 1);
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* vertical */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ClientData;
