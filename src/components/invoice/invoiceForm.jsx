import React, { useState } from "react";

export default function InvoiceForm({ addInvoice }) {
  const [fields, setFields] = useState({
    qty: "",
    price: "",
    discountPct: "",
    discount: "",
    taxPct: "",
    tax: "",
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNegative = (event) => {
    const { name, value } = event.target;

    if ((name === "discountPct" || name === "taxPct") && value > 100) {
      alert(`${name} cannot be greater than 100`);
      setFields((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }

    if (value < 0) {
      alert(`Please enter a positive number for ${name}`);
      setFields((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }

    if (name === "qty" && !Number.isInteger(parseFloat(value))) {
      alert(`Quantity must be an integer`);
      setFields((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleAddInvoice = (event) => {
    event.preventDefault();
    const { qty, price, discountPct, taxPct } = fields;
    const subtotal = qty * price;
    const discount = subtotal * (discountPct / 100);
    const tax = (subtotal - discount) * (taxPct / 100);
    const total = subtotal - discount + tax;
    const newInvoice = { ...fields, discount, tax, total };
    addInvoice(newInvoice);
    setFields({
      qty: "",
      price: "",
      discountPct: "",
      discount: "",
      taxPct: "",
      tax: "",
    });
  };

  const resetForm = () => {
    setFields({
      qty: "",
      price: "",
      discountPct: "",
      discount: "",
      taxPct: "",
      tax: "",
    });
  };

  const handleDiscountChange = (event) => {
    const { name, value } = event.target;
    let discount = 0;
    let discountPct = 0;
    if (name === "discount") {
      discount = parseFloat(value);
      discountPct = (discount / (fields.qty * fields.price)) * 100;
      if (discountPct > 100) {
        alert("discount % must be between 0 t0 100 positive");
        discount = 0;
        discountPct = 0;
      }
    } else {
      discountPct = parseFloat(value);
      discount = (discountPct / 100) * (fields.qty * fields.price);
      if (discount < 0) {
        alert("discount must be positive");
        discount = 0;
        discountPct = 0;
      }
    }

    setFields((prevState) => ({
      ...prevState,
      discount: discount,
      discountPct: discountPct,
    }));
  };

  const handleTaxChange = (event) => {
    const { name, value } = event.target;
    let tax = 0;
    let taxPct = 0;
    if (name === "tax") {
      tax = parseFloat(value);
      taxPct = (tax / (fields.qty * fields.price - fields.discount)) * 100;
      if (taxPct > 100) {
        alert("tax % must be between 0 t0 100 positive");
        tax = 0;
        taxPct = 0;
      }
    } else {
      taxPct = parseFloat(value);
      tax = (fields.qty * fields.price - fields.discount) * (taxPct / 100);
      if (tax < 0) {
        alert("tax must be positive");
        tax = 0;
        taxPct = 0;
      }
    }
    setFields((prevState) => ({
      ...prevState,
      tax: tax,
      taxPct: Number(taxPct),
    }));
  };

  return (
    <div>
      <h2>Add fields</h2>
      <form onSubmit={handleAddInvoice}>
        <label htmlFor="qty" class="form-label"></label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">
            Quantity:
          </span>
          <input
            type="number"
            name="qty"
            id="qty"
            class="form-control"
            aria-describedby="basic-addon3 basic-addon4"
            value={fields.qty}
            onChange={handleFieldChange}
            onBlur={handleNegative}
            required
          />
        </div>

        <label htmlFor="price" class="form-label"></label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">
            Price:{" "}
          </span>
          <input
            type="number"
            name="price"
            id="price"
            class="form-control"
            aria-describedby="basic-addon3 basic-addon4"
            value={fields.price}
            onChange={handleFieldChange}
            onBlur={handleNegative}
            required
          />
        </div>

        <label htmlFor="discountPct" class="form-label"></label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">
            Discount %:
          </span>
          <input
            type="number"
            name="discountPct"
            id="discountPct"
            class="form-control"
            aria-describedby="basic-addon3 basic-addon4"
            value={fields.discountPct}
            onChange={handleDiscountChange}
            onBlur={handleNegative}
            required
          />
        </div>

        <label htmlFor="discount" class="form-label"></label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">
            Discount:{" "}
          </span>
          <input
            type="number"
            name="discount"
            id="discount"
            class="form-control"
            aria-describedby="basic-addon3 basic-addon4"
            value={fields.discount}
            onChange={handleDiscountChange}
            onBlur={handleNegative}
            required
          />
        </div>

        <label htmlFor="taxPct" class="form-label"></label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">
            Tax %:{" "}
          </span>
          <input
            type="number"
            name="taxPct"
            id="taxPct"
            class="form-control"
            aria-describedby="basic-addon3 basic-addon4"
            value={fields.taxPct}
            onChange={handleTaxChange}
            onBlur={handleNegative}
            required
          />
        </div>

        <label htmlFor="tax" class="form-label"></label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">
            Tax:{" "}
          </span>
          <input
            type="number"
            name="tax"
            id="tax"
            class="form-control"
            aria-describedby="basic-addon3 basic-addon4"
            value={fields.tax}
            onChange={handleTaxChange}
            onBlur={handleNegative}
            required
          />
        </div>

        <button type="submit" class="btn btn-success">
          Submit
        </button>
        <button type="button" class="btn btn-warning" onClick={resetForm}>
          Reset Form
        </button>
      </form>
    </div>
  );
}
