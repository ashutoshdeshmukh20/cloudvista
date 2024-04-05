import React, { useState } from 'react';
import { Container, Card, CardBody, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const NewHost = (props: any) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        clientName: "",
        websiteDomain: "",
        ssl: "",
        hostingWithUs: "",
        paymentStatus: "",
        amc: "",
        amcCharges: 0,
        registeredDate: "",
        hostingCharges: 0,
        totalPayment: "",
        renewalPeriod: "",
        nextRenewalDate: "",
        hostingRenewalPeriod: "",
        nextHostingRenewalDate: "",
        paymentDate: ""
    });
    const validationSchema = Yup.object().shape({
        clientName: Yup.string().required('Customer Name is required'),
        websiteDomain: Yup.string()
            .required('Website domain is required')
            .matches(/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/, 'Invalid website domain'),
        ssl: Yup.string().required('SSL is required'),
        registeredDate: Yup.string().required('Registered Date is required'),
        amc: Yup.string().required('AMC is required'),
        amcCharges: Yup.number().required('AMC Charges is required').min(0, 'AMC Charges must be greater than or equal to 0'),
        renewalPeriod: Yup.string().required('AMC Renewal Period is required'),
        hostingWithUs: Yup.string().required('Hosting With Us is required'),
        hostingCharges: Yup.number().required('Hosting Charges is required').min(0, 'Hosting Charges must be greater than or equal to 0'),
        hostingRenewalPeriod: Yup.string().required('Hosting Renewal Period is required'),
        paymentDate: Yup.string().required('Payment Date is required'),
        totalPayment: Yup.string().required('Total Payment is required'),
        paymentStatus: Yup.string().required('Payment Status is required'),
    });


    const calculateNextRenewalDate = (renewalPeriod: number, registeredDate: string) => {
        if (!registeredDate) return ""; // If registered date is not provided, return empty string
        const currentDate = new Date(registeredDate);
        const nextRenewalDate = new Date(currentDate.getFullYear() + parseInt(renewalPeriod.toString()), currentDate.getMonth(), currentDate.getDate());
        return nextRenewalDate.toLocaleDateString();
    };

    const handleRenewalPeriodChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        const nextRenewalDate = value ? calculateNextRenewalDate(parseInt(value), formData.registeredDate) : " ";
        setFormData({
            ...formData,
            renewalPeriod: value,
            nextRenewalDate: nextRenewalDate
        });
    };

    const handleHostingRenewalPeriodChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        const nextHostingRenewalDate = value ? calculateNextRenewalDate(parseInt(value), formData.registeredDate) : " ";
        setFormData({
            ...formData,
            hostingRenewalPeriod: value,
            nextHostingRenewalDate: nextHostingRenewalDate
        });
    };

    const handleAMCChargesChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        const amcCharges = parseFloat(value);
        const totalPayment = amcCharges + formData.hostingCharges;

        setFormData({
            ...formData,
            amcCharges,
            totalPayment: totalPayment.toString()
        });
    };

    const handleHostingChargesChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        const hostingCharges = parseFloat(value);
        const totalPayment = formData.amcCharges + hostingCharges;

        setFormData({
            ...formData,
            hostingCharges,
            totalPayment: totalPayment.toString()
        });
    };

    const handleCancleClick = () => {
        navigate("/websites");
    }

    // Function to handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            clientName: "",
            websiteDomain: "",
            ssl: "",
            hostingWithUs: "",
            paymentStatus: "",
            amc: "",
            amcCharges: 0,
            registeredDate: "",
            hostingCharges: 0,
            totalPayment: "",
            renewalPeriod: "",
            nextRenewalDate: "",
            hostingRenewalPeriod: "",
            nextHostingRenewalDate: "",
            paymentDate: ""
        });
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Services" breadcrumbItem="Add New Web Hosting" />
                    <Card>
                        <CardBody>
                            <Formik
                                initialValues={formData}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {formik => (
                                    <Form onSubmit={formik.handleSubmit}>

                                        <Row>
                                            <Col md={3}>
                                                <Label for="clientname">Customer Name</Label>
                                                <Field
                                                    type="text"
                                                    name="clientName"
                                                    id="clientName"
                                                    placeholder="Enter name"
                                                    className={`form-control ${formik.errors.clientName && formik.touched.clientName ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="clientName" component="div" className="invalid-feedback" />
                                            </Col>
                                            <Col md={3}>
                                                {/* Website Domain */}
                                                <FormGroup>
                                                    <Label for="websiteDomain">Website Domain</Label>
                                                    <Field
                                                        type="text"
                                                        name="websiteDomain"
                                                        id="websiteDomain"
                                                        placeholder="Enter website domain"
                                                        className={`form-control ${formik.errors.websiteDomain && formik.touched.websiteDomain ? 'is-invalid' : ''}`}
                                                    />
                                                    <ErrorMessage name="websiteDomain" component="div" className="invalid-feedback" />

                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                {/* SSL */}
                                                <FormGroup>
                                                    <Label for="ssl">SSL</Label>
                                                    <Input type="select" name="ssl" id="ssl" value={formData.ssl} onChange={(e) => setFormData({ ...formData, ssl: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="registeredDate">Registered Date</Label>
                                                    <Input type="date" name="registeredDate" id="registeredDate"
                                                        value={formData.registeredDate} onChange={(e) => setFormData({ ...formData, registeredDate: e.target.value })} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="amc">AMC</Label>
                                                    <Input type="select" name="amc" id="amc" value={formData.amc} onChange={(e) => setFormData({ ...formData, amc: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                {/* Hosting Charges */}
                                                <FormGroup>
                                                    <Label for="amcCharges">AMC Charges</Label>
                                                    <Input
                                                        type="number"
                                                        name="amcCharges"
                                                        id="amcCharges"
                                                        placeholder="Enter Amc charges"
                                                        value={formData.amcCharges}
                                                        onChange={handleAMCChargesChange}
                                                        step="0.01"
                                                        min="0.00"
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>

                                                <FormGroup>
                                                    <Label for="renewalPeriod">AMC Renewal Period</Label>
                                                    <Input
                                                        type="select"
                                                        name="renewalPeriod"
                                                        id="renewalPeriod"
                                                        value={formData.renewalPeriod}
                                                        onChange={handleRenewalPeriodChange}
                                                    >
                                                        <option value="">Select renewal period</option>
                                                        <option value="1">1 Year</option>
                                                        <option value="2">2 Years</option>
                                                        <option value="3">3 Years</option>
                                                        <option value="4">4 Years</option>
                                                        <option value="5">5 Years</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="nextRenewalDate">Next Renewal Date</Label>
                                                    <Input
                                                        type="text"
                                                        name="nextRenewalDate"
                                                        id="nextRenewalDate"
                                                        value={formData.nextRenewalDate}
                                                        readOnly
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                {/* Hosting With Us */}
                                                <FormGroup>
                                                    <Label for="hostingWithUs">Hosting With Us</Label>
                                                    <Input type="select" name="hostingWithUs" id="hostingWithUs" value={formData.hostingWithUs} onChange={(e) => setFormData({ ...formData, hostingWithUs: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                {/* Hosting Charges */}
                                                <FormGroup>
                                                    <Label for="hostingCharges">Hosting Charges</Label>
                                                    <Input
                                                        type="number"
                                                        name="hostingCharges"
                                                        id="hostingCharges"
                                                        placeholder="Enter hosting charges"
                                                        value={formData.hostingCharges}
                                                        onChange={handleHostingChargesChange}
                                                        step="0.01"
                                                        min="0.00"
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="hostingRenewalPeriod">Hosting Renewal Period</Label>
                                                    <Input
                                                        type="select"
                                                        name="hostingRenewalPeriod"
                                                        id="hostingRenewalPeriod"
                                                        value={formData.hostingRenewalPeriod}
                                                        onChange={handleHostingRenewalPeriodChange}
                                                    >
                                                        <option value="">Select hosting renewal period</option>
                                                        <option value="1">1 Year</option>
                                                        <option value="2">2 Years</option>
                                                        <option value="3">3 Years</option>
                                                        <option value="4">4 Years</option>
                                                        <option value="5">5 Years</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                {/* Hosting Charges */}
                                                <FormGroup>
                                                    <Label for="nextHostingRenewalDate"> Next Renewal Date</Label>
                                                    <Input
                                                        type="text"
                                                        name="nextHostingRenewalDate"
                                                        id="nextHostingRenewalDate"
                                                        value={formData.nextHostingRenewalDate}
                                                        readOnly
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="total-payment">
                                                <Container fluid>
                                                    <Row>
                                                        <Col md={3}>
                                                            <FormGroup>
                                                                <Label for="paymentDate">Payment Date</Label>
                                                                <Input type="date" name="paymentDate" id="paymentDate"
                                                                    value={formData.paymentDate} onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={3}>
                                                            <FormGroup>
                                                                <Label for="totalPayment">Total Payment</Label>
                                                                <Input
                                                                    type="text"
                                                                    name="totalPayment"
                                                                    id="totalPayment"
                                                                    value={formData.totalPayment}
                                                                    readOnly
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={3}>
                                                            <FormGroup>
                                                                <Label for="paymentStatus">Payment Status</Label>
                                                                <Input type="select" name="paymentStatus" id="paymentStatus" value={formData.paymentStatus} onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}>
                                                                    <option value="">Select</option>
                                                                    <option value="Pending">Pending</option>
                                                                    <option value="Overdue">Overdue</option>
                                                                    <option value="Processing">Processing</option>
                                                                    <option value="Paid">Paid</option>
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="d-flex justify-content-end w-100 mt-3">
                                                <Button color="primary" onClick={(e) => handleSubmit(e)} className="me-2">ADD</Button>
                                                <Button color="secondary" onClick={handleCancleClick}>Cancel</Button>
                                            </div>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default NewHost;
