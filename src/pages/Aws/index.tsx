import React from 'react';
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const Aws = (props: any) => {
    //meta title
    document.title="AWS";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs title="OEM" breadcrumbItem="AWS" />
                    {/* write Html code or structure */}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Aws;