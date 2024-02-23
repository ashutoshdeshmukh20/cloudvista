import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Breadcrumbs from "Components/Common/Breadcrumb";

const AddClient = (props: any) => {
  document.title = "Add Client";
  const navigate = useNavigate();
  const handleViewClients = () => {
    navigate("/clientdata");
  };

  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: ""
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.designation) {
      alert("Please fill in all fields");
      return;
    }
    // Add your form submission logic here
    console.log("Form submitted!", formData);
  };

  // Handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Clients" breadcrumbItem="Add Clients" />
          <form className="d-flex justify-content-end">
                <div className="mb-3 ms-auto">
                    <button type="button" className="btn btn-primary me-3" onClick={handleViewClients}> <i className="mdi mdi-account-details-outline font-size-16 align-middle me-2"></i> View Clients</button>
                </div>
            </form>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 90XXXXXX"
              />
            </FormGroup>
            <FormGroup>
              <Label for="designation">Designation</Label>
              <Input
                type="text"
                name="designation"
                id="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Your Designation"
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddClient;
