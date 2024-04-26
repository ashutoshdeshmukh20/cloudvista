import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Form,
} from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { APIClient } from "../../helpers/api_helper";
interface WebsiteData {
  domain: string;
  ssl: string;
  created_timestamp: string;
  amc: string;
  amc_charges: number;
  amc_renewal_period: string;
  hosting: string;
  hosting_charges: number;
  hosting_renewal_period: string;
  hosting_renewal_date: string;
  total_charges: number;
  payment_date: string;
  payment_status: string;
}

const api = new APIClient();

const Webdetails = (props: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [CustomerData, setCustomerData] = useState<any>([]);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await api.get(`list-websites/${id}`, undefined);
          setWebsiteData(response.result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("list-clients", undefined);
        setCustomerData(response.result);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSaveClick = () => {
    setEditMode(!editMode);
    console.log("Edited data:", websiteData);
  };

  const handleCancleClick = () => {
    navigate("/websites");
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCustomerId = e.target.value;
    setCustomerData(selectedCustomerId);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Services" breadcrumbItem="Website Details" />
          <Card>
            <CardBody>
              <Form>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="customer">Customer Name</Label>
                      <Input
                        type="select"
                        name="customer"
                        id="customer"
                        defaultValue={CustomerData || ""}
                        readOnly={!editMode}
                        onChange={handleCustomerChange}
                      >
                        <option value="">Select Customer</option>
                        {CustomerData.map((customer: any) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.client_name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="domain">Domain</Label>
                      <Input
                        type="text"
                        name="domain"
                        id="domain"
                        defaultValue={ websiteData?.domain || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="ssl">SSL</Label>
                      <Input
                        type="text"
                        name="ssl"
                        id="ssl"
                        defaultValue={websiteData?.ssl || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="amc">Registerd Date</Label>
                      <Input
                        type="text"
                        name="amc"
                        id="amc"
                        defaultValue={websiteData?.created_timestamp || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="amc">AMC</Label>
                      <Input
                        type="text"
                        name="amc"
                        id="amc"
                        defaultValue={websiteData?.amc || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="amcCharges">AMC Charges</Label>
                      <Input
                        type="text"
                        name="amcCharges"
                        id="amcCharges"
                        defaultValue={websiteData?.amc_charges || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="amcCharges">AMC Renewal period</Label>
                      <Input
                        type="text"
                        name="amc_renewal_period"
                        id="amc_renewal_period"
                        defaultValue={websiteData?.amc_renewal_period || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="hostingRenewalPeriod">
                        AMC Renewal Date
                      </Label>
                      <Input
                        type="text"
                        name="hostingRenewalPeriod"
                        id="hostingRenewalPeriod"
                        defaultValue={websiteData?.hosting_renewal_date || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="hosting">Hosting with us</Label>
                      <Input
                        type="text"
                        name="hosting"
                        id="hosting"
                        defaultValue={websiteData?.hosting || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="hostingCharges">Hosting Charges</Label>
                      <Input
                        type="text"
                        name="hostingCharges"
                        id="hostingCharges"
                        defaultValue={websiteData?.hosting_charges || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="hostingRenewalPeriod">
                        Hosting Renewal Period
                      </Label>
                      <Input
                        type="text"
                        name="hostingRenewalPeriod"
                        id="hostingRenewalPeriod"
                        defaultValue={websiteData?.hosting_renewal_period || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="hostingRenewalDate">
                        Hosting Renewal Date
                      </Label>
                      <Input
                        type="text"
                        name="hostingRenewalDate"
                        id="hostingRenewalDate"
                        defaultValue={websiteData?.hosting_renewal_date || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="paymentDate">Payment Date</Label>
                      <Input
                        type="text"
                        name="paymentDate"
                        id="paymentDate"
                        defaultValue={websiteData?.payment_date || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="totalCharges">Total Charges</Label>
                      <Input
                        type="text"
                        name="totalCharges"
                        id="totalCharges"
                        defaultValue={websiteData?.total_charges || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="paymentStatus">Payment Status</Label>
                      <Input
                        type="text"
                        name="paymentStatus"
                        id="paymentStatus"
                        defaultValue={websiteData?.payment_status || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <div className="d-flex justify-content-end">
                      <Button color="danger" type="button" onClick={handleCancleClick}>Cancel</Button>
                      <Button color='primary' type='button' className='mx-2' onClick={handleSaveClick}>{editMode ? 'Save' : 'Edit'}</Button>
                    </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Webdetails;
