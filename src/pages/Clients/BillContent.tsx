import React from 'react';

const BillContent = ({ billData }) => {
    return (
        <div>
            <h4>Billing Information</h4>
            <p>Billing Period: {billData.billingPeriod}</p>
            <p>Billing Date: {billData.billingDate}</p>
            <p>Client Name: {billData.clientName}</p>
            <p>Invoice Number: {billData.invoiceNumber}</p>
            <p>Description: {billData.description}</p>
            <p>Total Amount Due: {billData.totalAmount}</p>
            <p>Payment Terms: {billData.paymentTerms}</p>
            <p>Payment Status: {billData.paymentStatus}</p>
            <p>Taxes and Discounts: {billData.taxesAndDiscounts}</p>
            <p>Additional Notes: {billData.additionalNotes}</p>
            {/* Add other bill fields here */}
        </div>
    );
};

export default BillContent;
