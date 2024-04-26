

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
const AMcCharges = (cell: any) => {
    return cell.value !== null ? cell.value : 'N/A';
 };

export { Domain, SSL, Newrenew, Payment_status, AMC,AMcCharges };