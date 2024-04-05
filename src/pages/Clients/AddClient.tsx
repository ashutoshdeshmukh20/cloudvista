import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Container, Card, CardBody,
  Nav, NavItem, NavLink, TabContent, TabPane, Col
} from 'reactstrap';
import Breadcrumbs from 'Components/Common/Breadcrumb';
import classnames from 'classnames';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddClient = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = (tab: React.SetStateAction<string>) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const validationSchema1 = Yup.object().shape({
    companyName: Yup.string().required('Company Name is required'),
    companyEmail: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
    address: Yup.string().required('Address is required'),
    contact: Yup.string().matches(/^[0-9]{10}$/).required("Please Enter Your Phone No"),
  });

  const validationSchema2 = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
    mobile: Yup.string().matches(/^[0-9]{10}$/).required("Please Enter Your Phone No"),
    designation: Yup.string().required('Designation is required'),
  });

  const validationSchema3 = Yup.object().shape({
    service_4: Yup.boolean(),
    service_5: Yup.boolean(),
    service_6: Yup.boolean(),
    service_7: Yup.boolean(),
  });

  const validationSchema4 = Yup.object().shape({
    clientName: Yup.string().required('Client Name is required'),
    billingAddress: Yup.string().required('Billing Address is required'),
    creditCardNumber: Yup.string().required('Credit Card Number is required'),
    expirationDate: Yup.string().required('Expiration Date is required'),
    cvv: Yup.string().required('CVV is required'),
    billingAmount: Yup.string().required('Billing Amount is required'),
    paymentMethod: Yup.string().required('Payment Method is required'),
  });

  const formik1 = useFormik({
    initialValues: {
      companyName: '',
      companyEmail: '',
      address: '',
      contact: '',
    },
    validationSchema: validationSchema1,
    onSubmit: (values) => {
      console.log('Form 1 submitted:', values);
      setActiveTab('2');
    },
  });

  const formik2 = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      designation: '',
    },
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      console.log('Form 2 submitted:', values);
      setActiveTab('3');
    },
  });

  const formik3 = useFormik({
    initialValues: {
      service_4: false,
      service_5: false,
      service_6: false,
      service_7: false,
    },
    validationSchema: validationSchema3,
    onSubmit: (values) => {
      console.log('Form 3 submitted:', values);
      setActiveTab('4');
    },
  });

  const formik4 = useFormik({
    initialValues: {
      clientName: '',
      billingAddress: '',
      creditCardNumber: '',
      expirationDate: '',
      cvv: '',
      billingAmount: '',
      paymentMethod: '',
    },
    validationSchema: validationSchema4,
    onSubmit: (values) => {
      console.log('Form 4 submitted:', values);
      // Handle final form submission logic here
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Clients" breadcrumbItem="Add Client" />
        <Card>
          <CardBody>
            <div className="d-flex justify-content-end mb-3">
              <Button color="primary" href="/clients">View Clients</Button>
            </div>
            <Nav tabs className="nav-tabs-custom nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggleTab('1'); }}
                >
                  Company Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggleTab('2'); }}
                >
                  Contact Person
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { toggleTab('3'); }}
                >
                  Services
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => { toggleTab('4'); }}
                >
                  Billing
                </NavLink>
              </NavItem>

              <div className="line" />
            </Nav>
            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="1">
                <Form onSubmit={formik1.handleSubmit}>
                  <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formik1.values.companyName}
                      onChange={formik1.handleChange}
                    />
                    {formik1.errors.companyName && <div className="text-danger">{formik1.errors.companyName}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="companyEmail">Email</Label>
                    <Input
                      type="email"
                      name="companyEmail"
                      id="companyEmail"
                      value={formik1.values.companyEmail}
                      onChange={formik1.handleChange}
                    />
                    {formik1.errors.companyEmail && <div className="text-danger">{formik1.errors.companyEmail}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="contact">Contact No.</Label>
                    <Input
                      type="number"
                      name="contact"
                      id="contact"
                      value={formik1.values.contact}
                      onChange={formik1.handleChange}
                    />
                    {formik1.errors.contact && <div className="text-danger">{formik1.errors.contact}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      value={formik1.values.address}
                      onChange={formik1.handleChange}
                    />
                    {formik1.errors.address && <div className="text-danger">{formik1.errors.address}</div>}
                  </FormGroup>
                  <div className="d-flex justify-content-end">
                    <Button color="primary" type="submit">Next</Button>
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form onSubmit={formik2.handleSubmit}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={formik2.values.name}
                      onChange={formik2.handleChange}
                    />
                    {formik2.errors.name && <div className="text-danger">{formik2.errors.name}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={formik2.values.email}
                      onChange={formik2.handleChange}
                    />
                    {formik2.errors.email && <div className="text-danger">{formik2.errors.email}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="mobile">Mobile</Label>
                    <Input
                      type="text"
                      name="mobile"
                      id="mobile"
                      value={formik2.values.mobile}
                      onChange={formik2.handleChange}
                    />
                    {formik2.errors.mobile && <div className="text-danger">{formik2.errors.mobile}</div>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="designation">Designation</Label>
                    <Input
                      type="text"
                      name="designation"
                      id="designation"
                      value={formik2.values.designation}
                      onChange={formik2.handleChange}
                    />
                    {formik2.errors.designation && <div className="text-danger">{formik2.errors.designation}</div>}
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    <Button color="secondary" onClick={() => setActiveTab('1')}>Previous</Button>
                    <Button color="primary" type="submit">Next</Button>
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="3">
                <Form onSubmit={formik3.handleSubmit}>
                  <FormGroup>
                    <Col md="3">
                      <Form>
                        <FormGroup>
                          <div className="d-flex flex-column mt-3">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name={`service_4`} className="form-check-input-md" />
                                Another Service 1
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name={`service_5`} className="form-check-input-md" />
                                Another Service 2
                              </Label>
                            </FormGroup>
                          </div>
                          <div className="d-flex flex-column">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name={`service_6`} className="form-check-input-md" />
                                Another Service 3
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox" name={`service_7`} className="form-check-input-md" />
                                Another Service 4
                              </Label>
                            </FormGroup>
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    <Button color="secondary" onClick={() => setActiveTab('2')}>Previous</Button>
                    <Button color="primary" type="submit">Next</Button>
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="4">
                <Form onSubmit={formik4.handleSubmit}>
                  <FormGroup>
                    <Label for="clientName">Client Name</Label>
                    <Input type="text" name="clientName" id="clientName" placeholder="Enter client name for billing" value={formik4.values.clientName} onChange={formik4.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="billingAddress">Billing Address</Label>
                    <Input type="text" name="billingAddress" id="billingAddress" placeholder="Enter billing address" value={formik4.values.billingAddress} onChange={formik4.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="creditCardNumber">Credit Card Number</Label>
                    <Input type="text" name="creditCardNumber" id="creditCardNumber" placeholder="Enter credit card number" value={formik4.values.creditCardNumber} onChange={formik4.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="expirationDate">Expiration Date</Label>
                    <Input type="text" name="expirationDate" id="expirationDate" placeholder="Enter expiration date (MM/YY)" value={formik4.values.expirationDate} onChange={formik4.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="cvv">CVV</Label>
                    <Input type="text" name="cvv" id="cvv" placeholder="Enter CVV" value={formik4.values.cvv} onChange={formik4.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="billingAmount">Billing Amount</Label>
                    <Input type="number" name="billingAmount" id="billingAmount" placeholder="Enter billing amount" value={formik4.values.billingAmount} onChange={formik4.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="paymentMethod">Payment Method</Label>
                    <Input type="select" name="paymentMethod" id="paymentMethod" value={formik4.values.paymentMethod} onChange={formik4.handleChange}>
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                    </Input>
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    <Button color="secondary" onClick={() => setActiveTab('3')}>Previous</Button>
                    <Button color="primary" type="submit">Submit</Button>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AddClient;
