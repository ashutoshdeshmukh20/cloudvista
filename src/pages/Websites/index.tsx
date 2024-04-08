import React, {  useMemo, useState,useEffect } from "react";
import {
    Card, CardBody, Col, Container, Row, UncontrolledTooltip, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from "reactstrap";
import { useNavigate } from "react-router-dom";


import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "Components/Common/TableContainer";
import { Link } from "react-router-dom";
import { APIClient } from "../../helpers/api_helper";
import { Domain, Newrenew, SSL, Payment_status, AMC, AMcCharges } from "./weblistCol";

const api = new APIClient();



const Websites = (props: any) => {
    //meta title
    document.title = "Websites";
    const navigate = useNavigate();

    const [contact, setContact] = useState<any>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [Data, setData] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await api.get('list-websites',undefined);
          setData(response.result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    const columns = useMemo(
        () => [
            {
                Header: "Id #",
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
                Header: "Domain",
                accessor: "domain",
                filterable: true,
                Filter: false,
                Cell: (cellProps: any) => {
                    return <Domain {...cellProps} />;
                },
            },
            {
                Header: "SSL",
                accessor: "ssl",
                filterable: true,
                Filter: false,
                Cell: (cellProps: any) => {
                    return <SSL {...cellProps} />;
                },
            },
            {
                Header: "New renewal",
                accessor: "hosting_renewal_date",
                filterable: true,
                Filter: false,
                Cell: (cellProps: any) => {
                    return <Newrenew {...cellProps} />;
                },
            },
            {
                Header: "Payment status",
                accessor: "payment_status",
                filterable: true,
                Filter: false,
                Cell: (cellProps: any) => {
                    return <Payment_status {...cellProps} />;
                },
            },
            {
                Header: "AMC",
                accessor: "amc",
                filterable: true,
                Filter: false,
                Cell: (cellProps: any) => {
                    return <AMC {...cellProps} />;
                },
            },
            {
                Header: "AMC Charges",
                accessor: "amc_charges",
                filterable: true,
                Filter: false,
                Cell: (cellProps: any) => {
                    return <AMcCharges {...cellProps} />;
                },
            },
            {
                Header: "Action",
                Filter: false,
                Cell: (cellProps: any) => {

                    const handleDelete = (userId: number) => {
                        console.log("Deleting user with ID:", userId);
                        const updatedData = Data.filter((user: any) => user.id !== userId);
                        console.log("Updated data after deletion:", updatedData);
                        setData(updatedData);
                    };
                    return (
                        <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="card-drop"> <i className="mdi mdi-dots-horizontal font-size-18"></i></DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                <DropdownItem>
                                    <i className="mdi mdi-account-details font-size-18 text-success me-1" id="edittooltip"></i> Edit
                                    <UncontrolledTooltip placement="top" target="edittooltip"> Edit </UncontrolledTooltip>
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="mdi mdi-close-thick font-size-18 text-success me-1" id="canceltooltip"></i> Cancel
                                    <UncontrolledTooltip placement="top" target="canceltooltip"> Cancel </UncontrolledTooltip>
                                </DropdownItem>

                                <DropdownItem onClick={() => handleDelete(cellProps.row.original.id)}>
                                    <i className="mdi mdi-trash-can font-size-16 text-danger me-2" id="deletetooltip"></i>Delete
                                    <UncontrolledTooltip placement="top" target="deletetooltip"> Delete</UncontrolledTooltip>
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="mdi mdi-account-convert font-size-18 text-success me-1" id="renewtooltip"></i> Renew
                                    <UncontrolledTooltip placement="top" target="renewtooltip"> Renew </UncontrolledTooltip>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    );
                },
            },
        ],
        []
    );

    const handleAddNew = () => {
        navigate("/newhosting");
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Services" breadcrumbItem="Websites" />

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <button type="button" className="btn btn-primary " onClick={handleAddNew}>
                                            <i className="bx bx-user-plus font-size-16 align-middle me-2"></i>{" "}
                                            Add New
                                        </button>
                                    </div>
                                    <TableContainer
                                        columns={columns}
                                        data={Data}
                                        customPageSize={10}
                                        tableClass="table-striped display-all"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Websites;