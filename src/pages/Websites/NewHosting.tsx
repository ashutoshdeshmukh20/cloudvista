import React, { useState } from "react";
import Breadcrumbs from "Components/Common/Breadcrumb";
import {
  Container,
  Card,
  CardBody,
  Form,
  Row,
  Label,
  Col,
  Input,
  Button,
} from "reactstrap";
import { APIClient } from "../../helpers/api_helper";
import { useNavigate } from "react-router-dom";
const api = new APIClient();
const NewHosting = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });

//validation schema

const calculateNextRenewalDate = (amc_renewal_period: number, created_timestamp: string) => {
  if (!created_timestamp) return ""; // If registered date is not provided, return empty string
  const currentDate = new Date(created_timestamp);
  const nextRenewalDate = new Date(currentDate.getFullYear() + parseInt(amc_renewal_period.toString()), currentDate.getMonth(), currentDate.getDate());
  return nextRenewalDate.toLocaleDateString();
};

const handleRenewalPeriodChange = (e: { target: { value: any; }; }) => {
  const { value } = e.target;
  const nextRenewalDate = value ? calculateNextRenewalDate(parseInt(value), formData.created_timestamp) : " ";
  setFormData({
      ...formData,
      amc_renewal_period: value,
      hosting_renewal_date: nextRenewalDate
  });
};

const handleHostingRenewalPeriodChange = (e: { target: { value: any; }; }) => {
  const { value } = e.target;
  const nextHostingRenewalDate = value ? calculateNextRenewalDate(parseInt(value), formData.created_timestamp) : " ";
  setFormData({
      ...formData,
      hosting_renewal_period: value,
      hosting_renewal_date: nextHostingRenewalDate
  });
};

const handleAMCChargesChange = (e: { target: { value: any; }; }) => {
  const { value } = e.target;
  const amcCharges = parseFloat(value);
  const totalPayment = amcCharges + formData.hosting_charges;

  setFormData({
      ...formData,
      amc_charges:amcCharges,
      total_charges: totalPayment
  });
};

const handleHostingChargesChange = (e: { target: { value: any; }; }) => {
  const { value } = e.target;
  const hostingCharges = parseFloat(value);
  const totalPayment = formData.amc_charges + hostingCharges;

  setFormData({
      ...formData,
      hosting_charges:hostingCharges,
      total_charges: totalPayment
  });
};


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.create("add-websites", formData);
      console.log("Response from server:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancleClick = () => {
    navigate("/websites");
}

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Services" breadcrumbItem="Add New Web Hosting" />
          <Card>
            <CardBody>
              <div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                  <Col md={3}>
                      <Label htmlFor="name">Customer Name:</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="domain">Domain:</Label>
                      <Input
                        type="text"
                        id="domain"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="ssl">SSL:</Label>
                      <Input
                        id="ssl"
                        type="select"
                        name="ssl"
                        value={formData.ssl}
                        onChange={handleChange}
                      >
                        <option value="select">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </Col>

                    <Col md={3}>
                      <Label htmlFor="created_timestamp">Reg Date:</Label>
                      <Input
                        type="date"
                        id="created_timestamp"
                        name="created_timestamp"
                        value={formData.created_timestamp}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Label htmlFor="amc">AMC:</Label>
                      <Input
                        id="amc"
                        type="select"
                        name="amc"
                        value={formData.amc}
                        onChange={handleChange}
                      >
                        <option value="select">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="amc_charges">AMC Charges:</Label>
                      <Input
                        type="number"
                        id="amc_charges"
                        name="amc_charges"
                        value={formData.amc_charges}
                        onChange={handleAMCChargesChange}
                      />
                    </Col>

                    <Col md={3}>
                      <Label htmlFor="amc_renewal_period">
                        AMC Renewal Period:
                      </Label>
                      <Input
                        type="select"
                        id="amc_renewal_period"
                        name="amc_renewal_period"
                        value={formData.amc_renewal_period}
                        onChange={handleRenewalPeriodChange}
                      >
                        <option value="select">Select</option>
                        <option value="1Yr">1 Yr</option>
                        <option value="3Yr">3 Yr</option>
                        <option value="4Yr">4 Yr</option>
                        <option value="5Yr">5 Yr</option>
                      </Input>
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="amc_renewal_date">
                        AMC Renewal Date:
                      </Label>
                      <Input
                        type="text"
                        id="amc_renewal_date"
                        name="amc_renewal_date"
                        value={formData.hosting_renewal_date}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Label htmlFor="hosting">Hosting:</Label>
                      <Input
                        id="hosting"
                        type="select"
                        name="hosting"
                        value={formData.hosting}
                        onChange={handleChange}
                      >
                        <option value="select">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Input>
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="hosting_charges">Hosting Charges:</Label>
                      <Input
                        type="number"
                        id="hosting_charges"
                        name="hosting_charges"
                        value={formData.hosting_charges}
                        onChange={handleHostingChargesChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="hosting_renewal_period">
                        Hosting Renewal Period:
                      </Label>
                      <Input
                        type="select"
                        id="hosting_renewal_period"
                        name="hosting_renewal_period"
                        value={formData.hosting_renewal_period}
                        onChange={handleHostingRenewalPeriodChange}
                      >
                        <option value="select">Select</option>
                        <option value="1Yr">1 Yr</option>
                        <option value="3Yr">3 Yr</option>
                        <option value="4Yr">4 Yr</option>
                        <option value="5Yr">5 Yr</option>
                      </Input>
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="hosting_renewal_date">
                        Hosting Renewal Date:
                      </Label>
                      <Input
                        type="text"
                        id="hosting_renewal_date"
                        name="hosting_renewal_date"
                        value={formData.hosting_renewal_date}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={3}>
                      <Label htmlFor="payment_date">Payment Date:</Label>
                      <Input
                        type="date"
                        id="payment_date"
                        name="payment_date"
                        value={formData.payment_date}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="total_charges">Total Charges:</Label>
                      <Input
                        type="number"
                        id="total_charges"
                        name="total_charges"
                        value={formData.total_charges}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={3}>
                      <Label htmlFor="payment_status">Payment Status:</Label>
                      <Input
                        type="select"
                        id="payment_status"
                        name="payment_status"
                        value={formData.payment_status}
                        onChange={handleChange}
                      >
                        <option value="select">Select</option>
                        <option value="Unpaid">Unnpaid</option>
                        <option value="Paid">Paid</option>
                        <option value="pending">Pending</option>
                      </Input>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <div className="d-flex justify-content-end w-100 mt-3">
                      <Button type="submit" color="success" className="me-2">Submit</Button>
                      <Button type="button" color="danger" onClick={handleCancleClick}>Cancel</Button>
                    </div>
                  </Row>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NewHosting;
