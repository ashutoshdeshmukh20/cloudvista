import React from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Card,
  CardBody,
  Col,
} from "reactstrap";
import Breadcrumbs from "Components/Common/Breadcrumb";

const SubOrg = (props: any) => {
  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="clientData" breadcrumbItem="Add Suborg" />

            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <Form>
                      <FormGroup>
                        <Label for="subOrgName">Name</Label>
                        <Input
                          type="text"
                          id="subOrgName"
                          placeholder="Enter sub-organization name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="parentOrg">Parent Organization</Label>
                        <Input
                          type="text"
                          id="parentOrg"
                          placeholder="Enter parent organization"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="subOrgDescription">Description</Label>
                        <Input
                          type="textarea"
                          id="subOrgDescription"
                          placeholder="Enter sub-organization description"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="contactInfo">Contact Information</Label>
                        <Input
                          type="text"
                          id="contactInfo"
                          placeholder="Enter contact information"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="members">Members</Label>
                        <Input
                          type="text"
                          id="members"
                          placeholder="Enter members"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="permissions">Permissions/Roles</Label>
                        <Input
                          type="text"
                          id="permissions"
                          placeholder="Enter permissions/roles"
                        />
                      </FormGroup>
                      <Button color="primary">Submit</Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </>
  );
};

export default SubOrg;
