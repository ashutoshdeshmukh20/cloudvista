import React, { useState, useEffect, useMemo } from "react";
import { APIClient } from "../../helpers/api_helper";
import TableContainer from "Components/Common/TableContainer";
import Breadcrumbs from "Components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "Components/Common/Pagination";
export const dummyData = [
  {
    id: 1,
    name: "John Doe",
    designation: "CEO",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    services: ["Consulting", "Marketing"],
    CompanyName: "AWS",
    org: ["AWS"],
    subOrgs: ["EC2", "S3", "Lambda"],
    subClients: [
      {
        id: 1,
        name: "Sub Client 1",
        email: "subclient1@example.com",
        mobile: "111-222-3333",
        subDesignation: "Junior Developer",
      },
    ],
    address: "123 Main Street, City, Country",
    companyEmail: "contact@aws.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "CFO",
    email: "jane.smith@example.com",
    mobile: "987-654-3210",
    services: ["Accounting", "Financial Planning"],
    CompanyName: "Azure",
    org: ["Azure"],
    subOrgs: ["Virtual Machines", "Blob Storage", "Azure Functions"],
    subClients: [
      {
        id: 2,
        name: "Sub Client 2",
        email: "subclient2@example.com",
        mobile: "222-333-4444",
        subDesignation: "Senior Developer",
      },
    ],
    address: "456 Oak Avenue, City, Country",
    companyEmail: "contact@azure.com",
  },
  {
    id: 3,
    name: "Bob Johnson",
    designation: "COO",
    email: "bob.johnson@example.com",
    mobile: "555-123-4567",
    services: ["Operations", "Supply Chain"],
    CompanyName: "Google Cloud",
    org: ["Google Cloud"],
    subOrgs: ["Compute Engine", "Cloud Storage", "Cloud Functions"],
    subClients: [
      {
        id: 3,
        name: "Sub Client 3",
        email: "subclient3@example.com",
        mobile: "333-444-5555",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "789 Pine Street, City, Country",
    companyEmail: "contact@googlecloud.com",
  },
  {
    id: 4,
    name: "Alice Adams",
    designation: "CMO",
    email: "alice.adams@example.com",
    mobile: "999-888-7777",
    services: ["Marketing", "Public Relations"],
    CompanyName: "IBM Cloud",
    org: ["IBM Cloud"],
    subOrgs: ["Virtual Private Cloud", "Object Storage", "Watson AI"],
    subClients: [
      {
        id: 4,
        name: "Sub Client 4",
        email: "subclient4@example.com",
        mobile: "444-555-6666",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "321 Elm Street, City, Country",
    companyEmail: "contact@ibmcloud.com",
  },
  {
    id: 5,
    name: "Bob Brown",
    designation: "CTO",
    email: "Bob.Brown@example.com",
    mobile: "111-222-3333",
    services: ["Development", "Product Management"],
    CompanyName: "Alibaba Cloud",
    org: ["Alibaba Cloud"],
    subOrgs: [
      "Elastic Compute Service",
      "Object Storage Service",
      "Function Compute",
    ],
    subClients: [
      {
        id: 5,
        name: "Sub Client 5",
        email: "subclient5@example.com",
        mobile: "555-666-7777",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "567 Maple Avenue, City, Country",
    companyEmail: "contact@alibabacloud.com",
  },
  {
    id: 6,
    name: "Charlie Campbell",
    designation: "CTO",
    email: "charlie.c@example.com",
    mobile: "444-555-6666",
    services: ["IT", "Network Security"],
    CompanyName: "Oracle Cloud",
    org: ["Oracle Cloud"],
    subOrgs: ["Compute", "Database", "Networking"],
    subClients: [
      {
        id: 6,
        name: "Sub Client 6",
        email: "subclient6@example.com",
        mobile: "666-777-8888",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Pine Street, City, Country",
    companyEmail: "contact@oraclecloud.com",
  },
  {
    id: 7,
    name: "David Davis",
    designation: "CIO",
    email: "David.d@example.com",
    mobile: "777-888-9999",
    services: ["Cloud Computing", "Data Analytics"],
    CompanyName: "DigitalOcean",
    org: ["DigitalOcean"],
    subOrgs: ["Droplets", "Block Storage", "Kubernetes"],
    subClients: [
      {
        id: 7,
        name: "Sub Client 7",
        email: "subclient7@example.com",
        mobile: "777-777-7777",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "987 Oak Avenue, City, Country",
    companyEmail: "contact@digitalocean.com",
  },
  {
    id: 8,
    name: "Eva Evans",
    designation: "CMO",
    email: "eva.evans@example.com",
    mobile: "111-222-3333",
    services: ["Marketing", "Brand Management"],
    CompanyName: "Salesforce",
    org: ["Salesforce"],
    subOrgs: ["Sales Cloud", "Service Cloud", "Marketing Cloud"],
    subClients: [
      {
        id: 8,
        name: "Sub Client 8",
        email: "subclient8@example.com",
        mobile: "888-888-8888",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "654 Main Street, City, Country",
    companyEmail: "contact@salesforce.com",
  },
  {
    id: 9,
    name: "Frank Fisher",
    designation: "CFO",
    email: "frank.fisher@example.com",
    mobile: "444-555-6666",
    services: ["Financial Planning", "Accounting"],
    CompanyName: "VMware",
    org: ["VMware"],
    subOrgs: ["vSphere", "vSAN", "NSX"],
    subClients: [
      {
        id: 9,
        name: "Sub Client 9",
        email: "subclient9@example.com",
        mobile: "999-999-9999",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "234 Cedar Street, City, Country",
    companyEmail: "contact@vmware.com",
  },
  {
    id: 10,
    name: "Grace Green",
    designation: "CTO",
    email: "grace.green@example.com",
    mobile: "777-888-9999",
    services: ["Software Development", "Quality Assurance"],
    CompanyName: "Red Hat",
    org: ["Red Hat"],
    subOrgs: ["OpenShift", "Ansible", "JBoss"],
    subClients: [
      {
        id: 10,
        name: "Sub Client 10",
        email: "subclient10@example.com",
        mobile: "101-010-1010",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Maple Avenue, City, Country",
    companyEmail: "contact@redhat.com",
  },
  {
    id: 11,
    name: "Henry Hill",
    designation: "CIO",
    email: "henry.hill@example.com",
    mobile: "111-222-3333",
    services: ["IT Management", "Infrastructure Services"],
    CompanyName: "HP",
    org: ["HP"],
    subOrgs: ["HP ProLiant", "HP Storage", "HP Networking"],
    subClients: [
      {
        id: 11,
        name: "Sub Client 11",
        email: "subclient11@example.com",
        mobile: "111-111-1111",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "543 Cedar Street, City, Country",
    companyEmail: "contact@hp.com",
  },
  {
    id: 12,
    name: "Isabel Inman",
    designation: "CMO",
    email: "isabel.inman@example.com",
    mobile: "444-555-6666",
    services: ["Marketing Strategy", "Advertising"],
    CompanyName: "Cisco",
    org: ["Cisco"],
    subOrgs: ["Networking", "Security", "Collaboration"],
    subClients: [
      {
        id: 12,
        name: "Sub Client 12",
        email: "subclient12@example.com",
        mobile: "121-212-1212",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "123 Elm Street, City, Country",
    companyEmail: "contact@cisco.com",
  },
  {
    id: 13,
    name: "Jack Jackson",
    designation: "CFO",
    email: "jack.jackson@example.com",
    mobile: "777-888-9999",
    services: ["Financial Analysis", "Risk Management"],
    CompanyName: "Dell",
    org: ["Dell"],
    subOrgs: ["Dell EMC", "Dell Technologies", "Dell Networking"],
    subClients: [
      {
        id: 13,
        name: "Sub Client 13",
        email: "subclient13@example.com",
        mobile: "131-313-1313",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Pine Street, City, Country",
    companyEmail: "contact@dell.com",
  },
  {
    id: 14,
    name: "Karen King",
    designation: "CEO",
    email: "karen.king@example.com",
    mobile: "111-222-3333",
    services: ["Leadership", "Management"],
    CompanyName: "Adobe",
    org: ["Adobe"],
    subOrgs: ["Creative Cloud", "Document Cloud", "Experience Cloud"],
    subClients: [
      {
        id: 14,
        name: "Sub Client 14",
        email: "subclient14@example.com",
        mobile: "141-414-1414",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "567 Oak Avenue, City, Country",
    companyEmail: "contact@adobe.com",
  },
  {
    id: 15,
    name: "Larry Lambert",
    designation: "CTO",
    email: "larry.lambert@example.com",
    mobile: "444-555-6666",
    services: ["Technology", "Innovation"],
    CompanyName: "NVIDIA",
    org: ["NVIDIA"],
    subOrgs: ["Graphics", "Data Center", "Autonomous Machines"],
    subClients: [
      {
        id: 15,
        name: "Sub Client 15",
        email: "subclient15@example.com",
        mobile: "151-515-1515",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "543 Maple Avenue, City, Country",
    companyEmail: "contact@nvidia.com",
  },
  {
    id: 16,
    name: "Monica Morris",
    designation: "CFO",
    email: "monica.morris@example.com",
    mobile: "777-888-9999",
    services: ["Finance", "Investments"],
    CompanyName: "Tesla",
    org: ["Tesla"],
    subOrgs: ["Electric Vehicles", "Energy Generation", "Energy Storage"],
    subClients: [
      {
        id: 16,
        name: "Sub Client 16",
        email: "subclient16@example.com",
        mobile: "161-616-1616",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "765 Cedar Street, City, Country",
    companyEmail: "contact@tesla.com",
  },
  {
    id: 17,
    name: "Nathan Newman",
    designation: "CMO",
    email: "nathan.newman@example.com",
    mobile: "111-222-3333",
    services: ["Marketing", "Advertising"],
    CompanyName: "Netflix",
    org: ["Netflix"],
    subOrgs: ["Content Creation", "Content Distribution", "Content Delivery"],
    subClients: [
      {
        id: 17,
        name: "Sub Client 17",
        email: "subclient17@example.com",
        mobile: "171-717-1717",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "765 Pine Street, City, Country",
    companyEmail: "contact@netflix.com",
  },
  {
    id: 18,
    name: "Olivia Olsen",
    designation: "CIO",
    email: "olivia.olsen@example.com",
    mobile: "444-555-6666",
    services: ["IT", "Information Security"],
    CompanyName: "Intel",
    org: ["Intel"],
    subOrgs: ["Processors", "Motherboards", "Graphics Cards"],
    subClients: [
      {
        id: 18,
        name: "Sub Client 18",
        email: "subclient18@example.com",
        mobile: "181-818-1818",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "654 Maple Avenue, City, Country",
    companyEmail: "contact@intel.com",
  },
  {
    id: 19,
    name: "Peter Peterson",
    designation: "CMO",
    email: "peter.peterson@example.com",
    mobile: "777-888-9999",
    services: ["Marketing", "Brand Management"],
    CompanyName: "Facebook",
    org: ["Facebook"],
    subOrgs: ["Facebook App", "Instagram", "WhatsApp"],
    subClients: [
      {
        id: 19,
        name: "Sub Client 19",
        email: "subclient19@example.com",
        mobile: "191-919-1919",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Oak Avenue, City, Country",
    companyEmail: "contact@facebook.com",
  },
  {
    id: 20,
    name: "Quinn Quinn",
    designation: "CFO",
    email: "quinn.quinn@example.com",
    mobile: "111-222-3333",
    services: ["Financial Management", "Budgeting"],
    CompanyName: "Amazon",
    org: ["Amazon"],
    subOrgs: ["Amazon Web Services", "Amazon Prime", "Amazon Marketplace"],
    subClients: [
      {
        id: 20,
        name: "Sub Client 20",
        email: "subclient20@example.com",
        mobile: "202-020-2020",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "987 Cedar Street, City, Country",
    companyEmail: "contact@amazon.com",
  },
  {
    id: 21,
    name: "Rachel Rice",
    designation: "CEO",
    email: "rachel.rice@example.com",
    mobile: "444-555-6666",
    services: ["Leadership", "Strategy"],
    CompanyName: "Microsoft",
    org: ["Microsoft"],
    subOrgs: ["Windows", "Office", "Azure"],
    subClients: [
      {
        id: 21,
        name: "Sub Client 21",
        email: "subclient21@example.com",
        mobile: "212-121-2121",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Elm Street, City, Country",
    companyEmail: "contact@microsoft.com",
  },
  {
    id: 22,
    name: "Steve Stevens",
    designation: "CTO",
    email: "steve.stevens@example.com",
    mobile: "777-888-9999",
    services: ["Technology", "Innovation"],
    CompanyName: "Apple",
    org: ["Apple"],
    subOrgs: ["iPhone", "Mac", "iPad"],
    subClients: [
      {
        id: 22,
        name: "Sub Client 22",
        email: "subclient22@example.com",
        mobile: "222-222-2222",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "123 Pine Street, City, Country",
    companyEmail: "contact@apple.com",
  },
  {
    id: 23,
    name: "Tina Taylor",
    designation: "CIO",
    email: "tina.taylor@example.com",
    mobile: "111-222-3333",
    services: ["IT Management", "Security"],
    CompanyName: "Samsung",
    org: ["Samsung"],
    subOrgs: ["Mobile", "Electronics", "Semiconductors"],
    subClients: [
      {
        id: 23,
        name: "Sub Client 23",
        email: "subclient23@example.com",
        mobile: "232-323-2323",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Maple Avenue, City, Country",
    companyEmail: "contact@samsung.com",
  },
  {
    id: 24,
    name: "Ursula Underwood",
    designation: "CMO",
    email: "ursula.underwood@example.com",
    mobile: "444-555-6666",
    services: ["Marketing", "Branding"],
    CompanyName: "Sony",
    org: ["Sony"],
    subOrgs: ["PlayStation", "Electronics", "Movies"],
    subClients: [
      {
        id: 24,
        name: "Sub Client 24",
        email: "subclient24@example.com",
        mobile: "242-424-2424",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "543 Elm Street, City, Country",
    companyEmail: "contact@sony.com",
  },
  {
    id: 25,
    name: "Vincent Vaughn",
    designation: "CFO",
    email: "vincent.vaughn@example.com",
    mobile: "777-888-9999",
    services: ["Finance", "Accounting"],
    CompanyName: "Uber",
    org: ["Uber"],
    subOrgs: ["Uber Eats", "Uber Ride", "Uber Freight"],
    subClients: [
      {
        id: 25,
        name: "Sub Client 25",
        email: "subclient25@example.com",
        mobile: "252-525-2525",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "765 Maple Avenue, City, Country",
    companyEmail: "contact@uber.com",
  },
  {
    id: 26,
    name: "Wendy Wilson",
    designation: "CTO",
    email: "wendy.wilson@example.com",
    mobile: "111-222-3333",
    services: ["Technology", "Innovation"],
    CompanyName: "Netflix",
    org: ["Netflix"],
    subOrgs: ["Content Creation", "Content Distribution", "Content Delivery"],
    subClients: [
      {
        id: 26,
        name: "Sub Client 26",
        email: "subclient26@example.com",
        mobile: "262-626-2626",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "987 Elm Street, City, Country",
    companyEmail: "contact@netflix.com",
  },
  {
    id: 27,
    name: "Xavier Xavier",
    designation: "CIO",
    email: "xavier.xavier@example.com",
    mobile: "444-555-6666",
    services: ["IT Management", "Cybersecurity"],
    CompanyName: "Google",
    org: ["Google"],
    subOrgs: ["Search", "Advertising", "Cloud Computing"],
    subClients: [
      {
        id: 27,
        name: "Sub Client 27",
        email: "subclient27@example.com",
        mobile: "272-727-2727",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Cedar Street, City, Country",
    companyEmail: "contact@google.com",
  },
  {
    id: 28,
    name: "Yvonne York",
    designation: "CMO",
    email: "yvonne.york@example.com",
    mobile: "777-888-9999",
    services: ["Marketing", "Digital Strategy"],
    CompanyName: "Twitter",
    org: ["Twitter"],
    subOrgs: ["Social Media", "Microblogging", "Advertising"],
    subClients: [
      {
        id: 28,
        name: "Sub Client 28",
        email: "subclient28@example.com",
        mobile: "282-828-2828",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "654 Elm Street, City, Country",
    companyEmail: "contact@twitter.com",
  },
  {
    id: 29,
    name: "Zack Zimmerman",
    designation: "CTO",
    email: "zack.zimmerman@example.com",
    mobile: "111-222-3333",
    services: ["Technology", "Innovation"],
    CompanyName: "LinkedIn",
    org: ["LinkedIn"],
    subOrgs: ["Professional Network", "Recruitment", "Learning"],
    subClients: [
      {
        id: 29,
        name: "Sub Client 29",
        email: "subclient29@example.com",
        mobile: "292-929-2929",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "543 Pine Street, City, Country",
    companyEmail: "contact@linkedin.com",
  },
  {
    id: 30,
    name: "Willie Welch",
    designation: "CIO",
    email: "willie.welch@example.com",
    mobile: "444-555-6666",
    services: ["IT Management", "Cybersecurity"],
    CompanyName: "Snapchat",
    org: ["Snapchat"],
    subOrgs: ["Snapchat App", "Spectacles", "Bitmoji"],
    subClients: [
      {
        id: 30,
        name: "Sub Client 30",
        email: "subclient30@example.com",
        mobile: "303-030-3030",
        subDesignation: "Frontend Developer",
      },
    ],
    address: "876 Maple Avenue, City, Country",
    companyEmail: "contact@snapchat.com",
  },
];

const api = new APIClient();

function Clients(props: any) {
  const [data, setData] = useState([]);
  const [currentpages, setCurrentpages] = useState<any>(data)
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("list-clients", undefined);
      setData(response.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onClickDelete = (user: any): void => {
    const updatedData = data.filter((item: any) => item.id !== user.id);
    setData(updatedData);
  };
  const handleView = (id: number) => {  
    navigate(`/ClientDetail/${id}`);
  };
  const handleAdd = () =>{
    navigate("/addclientpage");
  }

  const columns = useMemo(
    () => [
      {
        Header: "Client ID",
        disableFilters: true,
        filterable: true,
        Filter: false,
        accessor: "id",
      },
      {
        Header: "Name",
        disableFilters: true,
        filterable: true,
        Filter: false,
        accessor: "client_name",
      },
      {
        Header: "Address",
        disableFilters: true,
        filterable: true,
        Filter: false,
        accessor: "address_line_2",
      },
      {
        Header: "Email",
        disableFilters: true,
        filterable: true,
        Filter: false,
        accessor: "email",
      },
      {
        Header: "Mobile",
        disableFilters: true,
        filterable: true,
        Filter: false,
        accessor: "phone_number",
      },
      {
        Header: "Action",
        Filter: false,
        filterable: false,
        Cell: (cellProps: any) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="card-drop">
                {" "}
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem onClick={(event) => handleView(cellProps.row.original.id)}>
                  <i
                    className="mdi mdi-account-details font-size-18 text-success me-1"
                    id="edittooltip"
                  ></i>{" "}
                  View
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    {" "}
                    View{" "}
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    const userData = cellProps.row.original;
                    onClickDelete(userData);
                  }}
                >
                  <i
                    className="mdi mdi-trash-can font-size-16 text-danger me-1"
                    id="deletetooltip"
                  ></i>
                  Delete
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    {" "}
                    Delete
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Clients" breadcrumbItem="Clients" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={handleAdd}
                    >
                      <i className="bx bx-user-plus font-size-16 align-middle me-2"></i>{" "}
                      Add New
                    </button>
                  </div>
                  <TableContainer
                    columns={columns}
                    data={currentpages || []} 
                    customPageSize={10}
                    tableClass="table-striped display-all"
                  />
                  <Pagination
                    perPageData={10}
                    data={data}
                    setCurrentpages={setCurrentpages}
                    currentpages={currentpages}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Clients;