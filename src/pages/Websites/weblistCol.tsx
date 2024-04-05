import React from 'react';
import { Link } from 'react-router-dom';
import { size, map } from "lodash";

const Domain = (cell: any) => {
    return cell.value ? cell.value : '';
};

const SSL = (cell: any) => {
    return cell.value ? "Enabled" : "Disabled";
};

const Newrenew = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Payment_status = (cell: any) => {
    return cell.value ? cell.value : '';
};

const AMC = (cell: any) => {
    return cell.value ? "Active" : "Inactive";
};
const AMC_charges = (cell: any) => {
    return cell.value !== null ? cell.value : 'N/A';
 };

export { Domain, SSL, Newrenew, Payment_status, AMC,AMC_charges };