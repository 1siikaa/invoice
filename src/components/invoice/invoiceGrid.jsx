import React, { useState } from "react";

export default function InvoiceGrid({
  invoices,
  deleteInvoice,
  editInvoice,
  setInvoices,
}) {
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
      discount:
        (editedInvoice.qty * editedInvoice.price * editedInvoice.discountPct) /
        100,
      tax:
        (editedInvoice.qty * editedInvoice.price * editedInvoice.taxPct) / 100,
      total:
        editedInvoice.qty * editedInvoice.price -
        (editedInvoice.qty * editedInvoice.price * editedInvoice.discountPct) /
          100 +
        (editedInvoice.qty * editedInvoice.price * editedInvoice.taxPct) / 100,
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
    let updatedInvoice;
    if ((name === "qty" || name === "price") && value < 0) {
      alert(`please select a positive number for ${name}`);
      updatedInvoice = {
        ...editedInvoice,
        [name]: 0,
      };
    } else {
      updatedInvoice = {
        ...editedInvoice,
        [name]: value,
      };
    }

    if (name === "discountPct") {
      updatedInvoice = {
        ...updatedInvoice,
        discount: (updatedInvoice.qty * updatedInvoice.price * value) / 100,
      };
    }

    if (name === "discount") {
      const discountPct =
        (value / (editedInvoice.qty * editedInvoice.price)) * 100;
      updatedInvoice = {
        ...updatedInvoice,
        discountPct: isNaN(discountPct) ? 0 : discountPct,
        discount: value,
      };
    }

    if (name === "taxPct") {
      if (value > 100 || value < 0) {
        alert("please choose tax percent between o to 100");
        updatedInvoice = {
          ...updatedInvoice,
          tax: 0,
          taxPct: 0,
        };
      } else {
        updatedInvoice = {
          ...updatedInvoice,
          tax: (updatedInvoice.qty * updatedInvoice.price * value) / 100,
        };
      }
    }

    if (name === "tax") {
      let taxPct = (value / (editedInvoice.qty * editedInvoice.price)) * 100;
      if (taxPct > 100) {
        alert("tax percent must be between 0 to 100");
        updatedInvoice = {
          ...updatedInvoice,
          taxPct: 0,
          tax: 0,
        };
      } else {
        updatedInvoice = {
          ...updatedInvoice,
          taxPct: isNaN(taxPct) ? 0 : taxPct,
          tax: value,
        };
      }
    }

    setEditedInvoice(updatedInvoice);
  };

  return (
    <div>
      <h2>Invoices</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr class="table-primary">
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Discount %</th>
              <th scope="col">Discount</th>
              <th scope="col">Tax %</th>
              <th scope="col">Tax</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr class="table-success" key={index}>
                <td class="table-success">
                  {editableIndex === index ? (
                    <input
                      type="number"
                      name="qty"
                      value={editedInvoice.qty}
                      onChange={handleInputChange}
                    />
                  ) : (
                    invoice.qty
                  )}
                </td>
                <td class="table-success">
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
                <td class="table-success">
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
                <td class="table-success">
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
                <td class="table-success">
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
                <td class="table-success">
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
                <td class="table-success">
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
                <td class="table-success">
                  {editableIndex === index ? (
                    <>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => handleSaveClick(index)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={handleCancelEditClick}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <button
                          type="button"
                          class="btn btn-secondary"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => handleDeleteClick(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
