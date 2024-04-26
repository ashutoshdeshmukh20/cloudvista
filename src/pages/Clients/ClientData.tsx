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
interface ClientData {
  client_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone_number: string;
  email: string;
  logo: string;
  currency: number;
  timezone: string;
  credit_period: number;
  created_timestamp: string;
  tax_number: string;
}

const api = new APIClient();

const Webdetails = (props: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ClientData, setClientData] = useState<ClientData | null>(null);
  const [CustomerData, setCustomerData] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await api.get(`list-clients/${id}`, undefined);
          setClientData(response.result);
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
    console.log("Edited data:", ClientData);
  };

  const handleCancleClick = () => {
    navigate("/clients");
  };

  const handleCustomerChange = (e: any) => {
    const selectedId = e.target.value;
    setSelectedCustomerId(selectedId);

    const selectedClient = CustomerData.find(
      (customer) => customer.id === selectedId
    );
    if (selectedClient) {
      setClientData(selectedClient);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Services" breadcrumbItem="Client Details" />
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
                        defaultValue={selectedCustomerId}
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
                      <Label for="phone">Phone</Label>
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        defaultValue={ClientData?.phone_number || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="email">email</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={ClientData?.email || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="reg_date">Registerd Date</Label>
                      <Input
                        type="text"
                        name="reg_date"
                        id="reg_date"
                        defaultValue={ClientData?.created_timestamp || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="address_line_1">Add Line 1</Label>
                      <Input
                        type="text"
                        name="address_line_1"
                        id="address_line_1"
                        defaultValue={ClientData?.address_line_1 || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="address_line_2">Add Line 2</Label>
                      <Input
                        type="text"
                        name="address_line_2"
                        id="address_line_2"
                        defaultValue={ClientData?.address_line_2 || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        defaultValue={ClientData?.city || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="state">State</Label>
                      <Input
                        type="text"
                        name="state"
                        id="state"
                        defaultValue={ClientData?.state || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="country">Country</Label>
                      <Input
                        type="text"
                        name="country"
                        id="country"
                        defaultValue={ClientData?.country || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="zip_code">zip_code</Label>
                      <Input
                        type="text"
                        name="zip_code"
                        id="zip_code"
                        defaultValue={ClientData?.zip_code || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="currency">Currency</Label>
                      <Input
                        type="text"
                        name="currency"
                        id="currency"
                        defaultValue={ClientData?.currency || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="timezone">Timezone</Label>
                      <Input
                        type="text"
                        name="timezone"
                        id="timezone"
                        defaultValue={ClientData?.timezone || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="tax_number">TAX_No.</Label>
                      <Input
                        type="text"
                        name="tax_number"
                        id="tax_number"
                        defaultValue={ClientData?.tax_number || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="logo">Logo</Label>
                      <Input
                        type="text"
                        name="logo"
                        id="logo"
                        defaultValue={ClientData?.logo || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="paymentStatus">Credit period</Label>
                      <Input
                        type="text"
                        name="credit_period"
                        id="credit_period"
                        defaultValue={ClientData?.credit_period || ""}
                        readOnly={!editMode}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      color="danger"
                      type="button"
                      onClick={handleCancleClick}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      type="button"
                      className="mx-2"
                      onClick={handleSaveClick}
                    >
                      {editMode ? "Save" : "Edit"}
                    </Button>
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
