import React, { useMemo, useState } from "react";
import {
    Card, CardBody, CardTitle, Col, Container, Row, UncontrolledTooltip,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "Components/Common/TableContainer";
import { Link } from "react-router-dom";
import { Email, Services, Mobile } from "./clientlistCol";
import BarChart from "./barchart"


const Clients = (props: any) => {
    //meta title
    document.title = "Clients";
/*

    const [modal, setModal] = useState<boolean>(false);
    const toggle = useCallback(() => {
        setModal(!modal);
    }, [modal]);

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

        toggle();
    }, [toggle]);

*/
    const columns = useMemo(
        () => [
            {
                Header: "Client #",
                disableFilters: true,
                filterable: true,
                Filter: false,
                accessor: (cellProps: any) => (
                    <>
                        {!cellProps.img ? (
                            <div className="avatar-xs">
                                <span className="avatar-title rounded-circle">{cellProps.name.charAt(0)} </span>
                            </div>
                        ) : (
                            <div>
                                <img className="rounded-circle avatar-xs" src={cellProps.img} alt="" />
                            </div>
                        )}
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
                            <h5 className='font-size-14 mb-1'>
                                <Link to='#' className='text-dark'>{cellProps.name}</Link>
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
                Header: "Action",
                Filter: false,
                Cell: (cellProps: any) => {
                    return (
                        <div className="d-flex gap-3">
                            <Link to="#" className="text-success"
                                /* onClick={() => {
                                    //const userData = cellProps.row.original;
                                    //   handleUserClick(userData);
                                }} >*/ 
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                                <UncontrolledTooltip placement="top" target="edittooltip"> Edit </UncontrolledTooltip>
                            </Link>
                            <Link to="#" className="text-danger"
                                /*onClick={() => {
                                    // const userData = cellProps.row.original;
                                    //   onClickDelete(userData.id);
                                }}  > */
                                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                                <UncontrolledTooltip placement="top" target="deletetooltip"> Delete </UncontrolledTooltip>
                            </Link>
                        </div>
                    );
                },
            },
        ],[]
    );
    

    return (
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
                                        <button type="button" className="btn btn-primary ">
                                            <i className="bx bx-user-plus font-size-16 align-middle me-2"></i>{" "}
                                            Add New Client
                                        </button>
                                    </div>
                                    <TableContainer
                                        columns={columns}
                                        data={[]}
                                        customPageSize={10}
                                        tableClass="table-striped display-all"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h4" className="mb-4">Top Billing Clients - {new Date().getFullYear()} </CardTitle>
                                    <BarChart dataColors='["--bs-success"]' />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
};

export default Clients;
