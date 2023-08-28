import React from 'react';
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const Veritas = (props: any) => {
    //meta title
    document.title="Veritas";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs title="OEM" breadcrumbItem="Veritas" />
                    {/* write Html code or structure */}
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Veritas;