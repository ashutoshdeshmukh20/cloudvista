import React, { useCallback, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { Route ,Router,Routes,} from "react-router-dom";

// Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "Components/Common/TableContainer";
//import Pagination from "Components/Common/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { Email, Services, Mobile,Org } from "./clientlistCol";
import BarChart from "./barchart";
const Clients = (props: any) => {
  // Meta title
  document.title = "Clients";
  const navigate = useNavigate();

  const [contact, setContact] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);
  const [DummyData, setDummyData] = useState<any[]>([]); // State variable for dummy data
  const [pageIndex, setPageIndex] = useState<number>(0); // Current page index
  const pageSize = 10; // Number of items per page

  const handleAddClientClick = () => {
    navigate("/addclientpage");
  };

  const handleUserClick = useCallback((arg: any) => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggleModal();
  }, []);

  // Deletion logic
  const onClickDelete = (clientID: number): void => {
    try {
      console.log("Deleting user with ID:", clientID);
      const updatedData = DummyData.filter(
        (client: any) => client.id !== clientID
      );
      console.log("Updated Data after deletion:", updatedData);

      console.log("Updated Data after deletion:", updatedData);
      // Updated data after  deleting the selected item from list view
      alert("User has been deleted");
      setDummyData(updatedData);
    } catch (error) {
      console.error("Error occurred while deleting user:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Client ID",
        disableFilters: true,
        filterable: true,
        Filter: false,
        accessor: (cellProps: any) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {cellProps.id}
              </Link>
            </h5>
          </>
        ),
      },
      {
        Header: "Name",
        filterable: true,
        Filter: false,
        accessor: (cellProps: any) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link to="#" className="text-dark">
                  {cellProps.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">{cellProps.designation}</p>
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Mobile {...cellProps} />;
        },
      },
      {
        Header: "Services",
        accessor: "services",
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Services {...cellProps} />;
        },
      },
      {
        Header: "Org",
        accessor: "org",
        filterable: true,
        Filter: false,
        Cell: (cellProps: any) => {
          return <Org {...cellProps}/>;
        },
      },
      {
        Header: "Action",
        Filter: false,
        Cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="/clientdata"
                className="text-success"
                onClick={() => handleUserClick(cellProps.row.original)}
              >
                <i className="mdi mdi-account-details font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  {" "}
                  View{" "}
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => onClickDelete(cellProps.row.original.id)}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  {" "}
                  Delete{" "}
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const dummyData = [
    {
        "id": 1,
        "name": "John Doe",
        "designation": "CEO",
        "email": "john.doe@example.com",
        "mobile": "123-456-7890",
        "services": ["Consulting", "Marketing"],
        "org": ["YourOrg"],
        "subOrgs": ["Sub Org 1", "Sub Org 2"]
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "designation": "CFO",
        "email": "jane.smith@example.com",
        "mobile": "987-654-3210",
        "services": ["Accounting", "Financial Planning"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 3,
        "name": "Bob Johnson",
        "designation": "COO",
        "email": "bob.johnson@example.com",
        "mobile": "555-123-4567",
        "services": ["Operations", "Supply Chain"],
        "org": ["Aws"],
        "subOrgs": ["Sub Org 3", "Sub Org 4"]
    },
    {
        "id": 4,
        "name": "Alice Adams",
        "designation": "CMO",
        "email": "alice.adams@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 5,
        "name": "Bob Brown",
        "designation": "CMO",
        "email": "Bob.Brown@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": ["Sub Org 5"]
    },
    {
        "id": 6,
        "name": "Charlie Campbell",
        "designation": "CMO",
        "email": "chalie.c@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 7,
        "name": "David Davis",
        "designation": "CMO",
        "email": "David.d@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": ["Sub Org 6", "Sub Org 7"]
    },
    {
        "id": 8,
        "name": "Eva Evans",
        "designation": "CMO",
        "email": "alice.adams@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 9,
        "name": "Frank Fisher",
        "designation": "CMO",
        "email": "alice.adams@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 10,
        "name": "Henry Hill",
        "designation": "CMO",
        "email": "alice.adams@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": ["Sub Org 8"]
    },
    {
        "id": 11,
        "name": "Jhonny Bairstow",
        "designation": "CMO",
        "email": "Jhon12@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 12,
        "name": "Michael Johnson",
        "designation": "CTO",
        "email": "michael.j@example.com",
        "mobile": "999-888-7777",
        "services": ["Technology", "Software Development"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 13,
        "name": "Olivia Taylor",
        "designation": "CIO",
        "email": "olivia.t@example.com",
        "mobile": "999-888-7777",
        "services": ["IT Management", "Cloud Services"],
        "org": ["YourOrg"],
        "subOrgs": ["Sub Org 9"]
    },
    {
        "id": 14,
        "name": "Robert Williams",
        "designation": "COO",
        "email": "robert.w@example.com",
        "mobile": "999-888-7777",
        "services": ["Operations", "Supply Chain"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 15,
        "name": "Sophia Brown",
        "designation": "CFO",
        "email": "sophia.b@example.com",
        "mobile": "999-888-7777",
        "services": ["Finance", "Accounting"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 16,
        "name": "William Davis",
        "designation": "CEO",
        "email": "william.d@example.com",
        "mobile": "999-888-7777",
        "services": ["Management", "Leadership"],
        "org": ["YourOrg"],
        "subOrgs": ["Sub Org 10"]
    },
    {
        "id": 17,
        "name": "Isabella Martinez",
        "designation": "CMO",
        "email": "isabella.m@example.com",
        "mobile": "999-888-7777",
        "services": ["Marketing", "Public Relations"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 18,
        "name": "Alexander Rodriguez",
        "designation": "CTO",
        "email": "alexander.r@example.com",
        "mobile": "999-888-7777",
        "services": ["Technology", "Software Development"],
        "org": ["YourOrg"],
        "subOrgs": []
    },
    {
        "id": 19,
        "name": "Mia Wilson",
        "designation": "CIO",
        "email": "mia.w@example.com",
        "mobile": "999-888-7777",
        "services": ["IT Management", "Cloud Services"],
        "org": ["YourOrg"],
        "subOrgs": ["Sub Org 11"]
    },
    {
        "id": 20,
        "name": "James Lee",
        "designation": "COO",
        "email": "james.l@example.com",
        "mobile": "999-888-7777",
        "services": ["Operations", "Supply Chain"],
        "org": ["YourOrg"],
        "subOrgs": []
    }
]



  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    return dummyData.slice(startIndex, startIndex + pageSize);
  }, [dummyData, pageIndex]);

  // Calculate total pages
  const totalPages = useMemo(
    () => Math.ceil(dummyData.length / pageSize),
    [dummyData, pageSize]
  );

  // Function to handle next page
  const nextPage = useCallback(() => {
    setPageIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  }, [totalPages]);

  // Function to handle previous page
  const previousPage = useCallback(() => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Clients" breadcrumbItem="Clients" />
          {/* write Html code or structure */}
          <Row>
            <Col lg="8">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end align-items-center">
                    <button
                      className="btn btn-primary"
                      onClick={handleAddClientClick}
                    >
                      <i className="bx bx-user-plus font-size-16 align-middle me-2"></i>{" "}
                      Add New Client
                    </button>
                  </div>
                  <TableContainer
                    columns={columns}
                    data={paginatedData} // Pass paginated data here
                    customPageSize={pageSize}
                    tableClass="table-striped display-all"
                  />
                  {/* Pagination */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      onClick={previousPage}
                      disabled={pageIndex === 0}
                      className="btn btn-secondary"
                      style={{ marginRight: "10px" }}
                    >
                      Previous
                    </button>
                    <span>
                      Page {pageIndex + 1} of {totalPages}
                    </span>
                    <button
                      onClick={nextPage}
                      disabled={pageIndex === totalPages - 1}
                      className="btn btn-secondary margin-right:10px"
                      style={{ marginLeft: "10px" }}
                    >
                      Next
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h4" className="mb-4">
                    Top Billing Clients - {new Date().getFullYear()}{" "}
                  </CardTitle>
                  <BarChart dataColors='["--bs-success"]' />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );

};

export default Clients;
