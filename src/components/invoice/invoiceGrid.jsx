import React, { useState } from 'react';

export default function InvoiceGrid({ invoices, deleteInvoice, editInvoice, setInvoices }) {
  const [editableIndex, setEditableIndex] = useState(-1);
  const [editedInvoice, setEditedInvoice] = useState({});

  const handleEditClick = (index) => {
    setEditableIndex(index);
    setEditedInvoice(invoices[index]);
  };

  const handleCancelEditClick = () => {
    setEditableIndex(-1);
    setEditedInvoice({});
  };

  const handleSaveClick = (index) => {
    const updatedInvoice = {
      ...editedInvoice,
      discount: (editedInvoice.qty * editedInvoice.price * editedInvoice.discountPct) / 100,
      tax: (editedInvoice.qty * editedInvoice.price * editedInvoice.taxPct) / 100,
      total: (editedInvoice.qty * editedInvoice.price) - ((editedInvoice.qty * editedInvoice.price * editedInvoice.discountPct) / 100) + ((editedInvoice.qty * editedInvoice.price * editedInvoice.taxPct) / 100),
    };

    setEditableIndex(-1);
    setEditedInvoice({});
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice, i) => (i === index ? updatedInvoice : invoice))
    );
  };

  const handleDeleteClick = (index) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(index);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let updatedInvoice = {
      ...editedInvoice,
      [name]: value,
    };

    if (name === "discountPct") {
      updatedInvoice = {
        ...updatedInvoice,
        discount: (updatedInvoice.qty * updatedInvoice.price * value) / 100,
      };
    }

    if (name === "discount") {
      const discountPct = (value / (editedInvoice.qty * editedInvoice.price)) * 100;
      updatedInvoice = {
        ...updatedInvoice,
        discountPct: isNaN(discountPct) ? 0 : discountPct,
        discount: value,
      };
    }

    if (name === "taxPct") {
      updatedInvoice = {
        ...updatedInvoice,
        tax: (updatedInvoice.qty * updatedInvoice.price * value) / 100,
      };
    }

    if (name === "tax") {
      const taxPct = (value / (editedInvoice.qty * editedInvoice.price)) * 100;
      updatedInvoice = {
        ...updatedInvoice,
        taxPct: isNaN(taxPct) ? 0 : taxPct,
        tax: value,
      };
    }

    setEditedInvoice(updatedInvoice);
  };
  
  return (
    <div>
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Discount</th>
            <th>Tax %</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td>
                {editableIndex === index ? (
                  <input
                    type="number"
                    name="qty"
                    value={editedInvoice.qty}
                    onChange={handleInputChange}
                  />
                )
            : (
              invoice.qty
            )}
          </td>
          <td>
            {editableIndex === index ? (
              <input
                type="number"
                name="price"
                value={editedInvoice.price}
                onChange={handleInputChange}
              />
            ) : (
              invoice.price
            )}
          </td>
          <td>
            {editableIndex === index ? (
              <input
                type="number"
                name="discountPct"
                value={editedInvoice.discountPct}
                onChange={handleInputChange}
              />
            ) : (
              invoice.discountPct
            )}
          </td>
          <td>
            {editableIndex === index ? (
              <input
                type="number"
                name="discount"
                value={editedInvoice.discount}
                onChange={handleInputChange}
              />
            ) : (
              invoice.discount
            )}
          </td>
          <td>
            {editableIndex === index ? (
              <input
                type="number"
                name="taxPct"
                value={editedInvoice.taxPct}
                onChange={handleInputChange}
              />
            ) : (
              invoice.taxPct
            )}
          </td>
          <td>
            {editableIndex === index ? (
              <input
                type="number"
                name="tax"
                value={editedInvoice.tax}
                onChange={handleInputChange}
              />
            ) : (
              invoice.tax
            )}
          </td>
          <td>
            {editableIndex === index ? (
              <input
                type="number"
                name="total"
                value={editedInvoice.total}
                readOnly
              />
            ) : (
              invoice.total
            )}
          </td>
          <td>
            {editableIndex === index ? (
              <>
                <button onClick={() => handleSaveClick(index)}>Save</button>
                <button onClick={handleCancelEditClick}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditClick(index)}>Edit</button>
                <button onClick={() => handleDeleteClick(index)}>Delete</button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
}