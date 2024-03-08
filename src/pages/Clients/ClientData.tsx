import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {
  Container, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane,
  Button, Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';
import Breadcrumbs from 'Components/Common/Breadcrumb';
import classnames from 'classnames';
import { dummyData } from './index';

const ClientData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState('');
  const [orgClients, setOrgClients] = useState(dummyData);
  const [editable, setEditable] = useState(false);
  const [activeTab, setActiveTab] = useState('1');


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const orgQueryParam = searchParams.get('org');
    if (orgQueryParam) {
      setOrgName(orgQueryParam);
      const filteredClients = dummyData.filter(client => client.org.includes(orgQueryParam));
      setOrgClients(filteredClients);
    }
  }, [location.search]);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleViewClients = () => {
    navigate("/clients");
  }



  return (
    <div className="page-content">
      <Container fluid={true}>
        <Breadcrumbs title="Clients" breadcrumbItem="Client Details" />
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between mb-3">
              <h1 className="card-title">{orgName} :</h1>
              <Button color="primary" onClick={handleViewClients}>View Clients</Button>
            </div>
            <Nav tabs className='nav-tabs-custom nav-justified'>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggleTab('1'); }}
                >
                  Client Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggleTab('2'); }}
                >
                  Contact person
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
            </Nav>
            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="1">
                {orgClients.map(client => (
                  <Form key={client.id}>
                    <FormGroup>
                      <Label for={`name${client.id}`}>Name</Label>
                      <Input type="text" name={`name${client.id}`} id={`name${client.id}`} defaultValue={client.CompanyName} readOnly={!editable} />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`email${client.id}`}>Email</Label>
                      <Input type="text" name={`email${client.id}`} id={`email${client.id}`} defaultValue={client.companyEmail} readOnly={!editable} />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`add${client.id}`}>Address</Label>
                      <Input type="text" name={`add${client.id}`} id={`add${client.id}`} defaultValue={client.address} readOnly={!editable} />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`mobile${client.id}`}>Contact No.</Label>
                      <Input type="text" name={`mobile${client.id}`} id={`mobile${client.id}`} defaultValue={client.mobile} readOnly={!editable} />
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                      <Button color="danger" type="button" onClick={() => setEditable(false)}>Cancel</Button>
                      <Button color='primary' type='button' className='mx-2' onClick={toggleEditable}>{editable ? 'Save' : 'Edit'}</Button>
                    </div>
                  </Form>
                ))}
              </TabPane>
              <TabPane tabId="2">
                {orgClients.map(client => (
                  <Form key={client.id}>
                    <FormGroup>
                      <Label for={`name${client.id}`}>Name</Label>
                      <Input type="text" name={`name${client.id}`} id={`name${client.id}`} defaultValue={client.name} readOnly={!editable} />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`email${client.id}`}>Email</Label>
                      <Input type="text" name={`email${client.id}`} id={`email${client.id}`} defaultValue={client.email} readOnly={!editable} />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`mobile${client.id}`}>Mobile</Label>
                      <Input type="text" name={`mobile${client.id}`} id={`mobile${client.id}`} defaultValue={client.mobile} readOnly={!editable} />
                    </FormGroup>
                    <FormGroup>
                      <Label for={`designation${client.id}`}>Designation</Label>
                      <Input type="text" name={`designation${client.id}`} id={`designation${client.id}`} defaultValue={client.designation} readOnly={!editable} />
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                      <Button color="danger" type="button" onClick={() => setEditable(false)}>Cancel</Button>
                      <Button color='primary' type='button' className='mx-2' onClick={toggleEditable}>{editable ? 'Save' : 'Edit'}</Button>
                    </div>
                  </Form>
                ))}
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  {orgClients.map(client => (
                    <Col md="5" key={client.id}>
                      <Form>
                        <FormGroup>
                          <div className="d-flex flex-column mt-3">
                            {client.services.map((service, index) => (
                              <FormGroup check key={`${client.id}_${index}`}>
                                <Label check>
                                  <Input type="checkbox" name={`service_${index}`} checked={true} className="form-check-input-md" />
                                  {service}
                                </Label>
                              </FormGroup>
                            ))}
                          </div>
                        </FormGroup>
                      </Form>
                    </Col>
                  ))}
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
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Form>
                  <FormGroup>
                    <Label for="clientName">Client Name</Label>
                    <Input type="text" name="clientName" id="clientName" placeholder="Enter client name for billing" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="billingAddress">Billing Address</Label>
                    <Input type="text" name="billingAddress" id="billingAddress" placeholder="Enter billing address" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="creditCardNumber">Credit Card Number</Label>
                    <Input type="text" name="creditCardNumber" id="creditCardNumber" placeholder="Enter credit card number" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="expirationDate">Expiration Date</Label>
                    <Input type="text" name="expirationDate" id="expirationDate" placeholder="Enter expiration date (MM/YY)" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="cvv">CVV</Label>
                    <Input type="text" name="cvv" id="cvv" placeholder="Enter CVV" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="billingAmount">Billing Amount</Label>
                    <Input type="number" name="billingAmount" id="billingAmount" placeholder="Enter billing amount" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="paymentMethod">Payment Method</Label>
                    <Input type="select" name="paymentMethod" id="paymentMethod">
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>PayPal</option>
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                    </Input>
                  </FormGroup>
                  <Button color="primary" type="submit">Pay Now</Button>
                </Form>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ClientData;
