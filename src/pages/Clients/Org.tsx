import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Container, Card, CardBody, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from 'reactstrap';
import Breadcrumbs from 'Components/Common/Breadcrumb';
import { dummyData } from './index';

const Org = () => {
    const location = useLocation();
    const [orgName, setOrgName] = useState('');
    const [orgClients, setOrgClients] = useState(dummyData);
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const orgQueryParam = searchParams.get('org');

        if (orgQueryParam) {
            setOrgName(orgQueryParam);
            const filteredClients = dummyData.filter(client => client.org.includes(orgQueryParam));
            setOrgClients(filteredClients);
        }
    }, [location.search]);

    const handleUserClick = useCallback((clientData, subClientId) => {
        navigate(`/subclientData?org=${encodeURIComponent(clientData.org)}&subClientId=${encodeURIComponent(subClientId)}`);
    }, [navigate]);

    const handleDeleteSubClient = (clientId, subClientId) => {
        const updatedOrgClients = orgClients.map(client => {
            if (client.id === clientId) {
                const updatedSubClients = client.subClients.filter(subClient => subClient.id !== subClientId);
                return { ...client, subClients: updatedSubClients };
            }
            return client;
        });

        setOrgClients(updatedOrgClients);
    };

    return (
        <div className="page-content">
            <Container fluid={true}>
                <Breadcrumbs title="Clients" breadcrumbItem="Sub-Clients" />
                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 className="card-title">{orgName} : </h1>
                            <Link to={`/addsub-client?org=${encodeURIComponent(orgName)}`}>
                                <Button className='btn-primary'>Add Subclient</Button>
                            </Link>
                        </div>
                        <br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Subclient Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orgClients.map(client => (
                                    <React.Fragment key={client.id}>
                                        {client.subClients.map(subClient => (
                                            <tr key={subClient.id}>
                                                <td>{subClient.id}</td>
                                                <td>{subClient.name}</td>
                                                <td>{subClient.email}</td>
                                                <td>{subClient.mobile}</td>
                                                <td>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle tag="a" className="card-drop">
                                                            <i className="mdi mdi-dots-horizontal font-size-18"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-end">
                                                            <DropdownItem onClick={() => handleUserClick(client, subClient.id)}>
                                                                <i className="mdi mdi-account-details font-size-18 text-success me-1" id="edittooltip"></i>
                                                                View
                                                                <UncontrolledTooltip placement="top" target="edittooltip"> View </UncontrolledTooltip>
                                                            </DropdownItem>
                                                            <DropdownItem onClick={() => handleDeleteSubClient(client.id, subClient.id)}>
                                                                <i className="mdi mdi-trash-can font-size-16 text-danger me-1" id="deletetooltip"></i>
                                                                Delete
                                                                <UncontrolledTooltip placement="top" target="deletetooltip"> Delete</UncontrolledTooltip>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
};

export default Org;
