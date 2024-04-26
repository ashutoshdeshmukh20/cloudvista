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
// eslint-disable-next-line 
  const onClickDelete = (user: any): void => {
    const updatedData = data.filter((item: any) => item.id !== user.id);
    setData(updatedData);
  };
  // eslint-disable-next-line 
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
    [handleView,onClickDelete]
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