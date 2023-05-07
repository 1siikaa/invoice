import React, { useState } from 'react';

export default function InvoiceForm({ addInvoice}) {
  const [fields, setFields] = useState({
    qty: '',
    price: '',
    discountPct: '',
    discount: '',
    taxPct: '',
    tax: '',
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
      qty: '',
      price: '',
      discountPct: '',
      discount: '',
      taxPct: '',
      tax: '',
    });
  };

  const resetForm = () => {
    setFields({
      qty: '',
      price: '',
      discountPct: '',
      discount: '',
      taxPct: '',
      tax: '',
    });
  };

  const handleDiscountChange = (event) => {
    const { name, value } = event.target;
    let discount = 0;
    let discountPct = 0;
    if (name === "discount") {
      discount = parseFloat(value);
      discountPct = (discount / (fields.qty * fields.price)) * 100;
    } else {
      discountPct = parseFloat(value);
      discount = (discountPct / 100) * (fields.qty * fields.price);
    }
    setFields((prevState) => ({
      ...prevState,
      discount: discount.toFixed(2),
      discountPct: discountPct.toFixed(2),
    }));
  };
  
  const handleTaxChange = (event) => {
    const { name, value } = event.target;
    let tax = 0;
    let taxPct = 0;
    if (name === "tax") {
      tax = parseFloat(value);
      taxPct = (tax / (fields.qty * fields.price - fields.discount)) * 100;
    } else {
      taxPct = parseFloat(value);
      tax = ((fields.qty * fields.price - fields.discount) * (taxPct / 100));
    }
    setFields((prevState) => ({
      ...prevState,
      tax: tax,
      taxPct: Number(taxPct.toFixed(2)),
    }));
  };
  
  
  return (
    <div>
      <h2>Add fields</h2>
      <form onSubmit={handleAddInvoice}>
        <label htmlFor="qty">Qty</label>
        <input
          type="number"
          name="qty"
          id="qty"
          value={fields.qty}
          onChange={handleFieldChange}
          onBlur={handleNegative}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={fields.price}
          onChange={handleFieldChange}
          onBlur={handleNegative}
          required
        />

        <label htmlFor="discountPct">Discount %</label>
        <input
          type="number"
          name="discountPct"
          id="discountPct"
          value={fields.discountPct}
          onChange={handleDiscountChange}
          onBlur={handleNegative}
          required
        />

        <label htmlFor="discount">Discount</label>
        <input
          type="number"
          name="discount"
          id="discount"
          value={fields.discount}
          onChange={handleDiscountChange}
          onBlur={handleNegative}
          required
        />

        <label htmlFor="taxPct">Tax %</label>
        <input
          type="number"
          name="taxPct"
          id ="taxPct"
          value={fields.taxPct}
          onChange={handleTaxChange}
          onBlur={handleNegative}
        />
    
        <label htmlFor="tax">Tax</label>
        <input
          type="number"
          name="tax"
          id="tax"
          value={fields.tax}
          onChange={handleTaxChange}
          onBlur={handleNegative}
          required
        />
    
        <button type="submit">Submit</button>
        <button type="button" onClick={resetForm}>Reset Form</button>
      </form>
    </div>
    );
    }















//     import React, { useState } from 'react';

// export default function InvoiceForm({ addInvoice }) {
//   const [fields, setFields] = useState({
//     qty: '',
//     price: '',
//     discountPct: '',
//     discount: '',
//     taxPct: '',
//     tax: '',
//   });

//   const handleFieldChange = (event) => {
//     const { name, value } = event.target;
//     setFields((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAddInvoice = (event) => {
//     event.preventDefault();
//     const { qty, price, discountPct, taxPct } = fields;
//     const subtotal = qty * price;
//     const discount = subtotal * (discountPct / 100);
//     const tax = (subtotal - discount) * (taxPct / 100);
//     const total = subtotal - discount + tax;
//     const newInvoice = { ...fields, discount, tax, total };
//     addInvoice(newInvoice);
//     setFields({
//       qty: '',
//       price: '',
//       discountPct: '',
//       discount: '',
//       taxPct: '',
//       tax: '',
//     });
//   };

//   const resetForm = () => {
//     setFields({
//       qty: '',
//       price: '',
//       discountPct: '',
//       discount: '',
//       taxPct: '',
//       tax: '',
//     });
//   };

//   const handleDiscountChange = (event) => {
//     const { name, value } = event.target;
//     let discount = 0;
//     let discountPct = 0;
//     if (name === "discount") {
//       discount = parseFloat(value);
//       discountPct = (discount / (fields.qty * fields.price)) * 100;
//     } else {
//       discountPct = parseFloat(value);
//       discount = (discountPct / 100) * (fields.qty * fields.price);
//     }
//     setFields((prevState) => ({
//       ...prevState,
//       discount: discount.toFixed(2),
//       discountPct: discountPct.toFixed(2),
//     }));
//   };
  
//   const handleTaxChange = (event) => {
//     const { name, value } = event.target;
//     let tax = 0;
//     let taxPct = 0;
//     if (name === "tax") {
//       tax = parseFloat(value);
//       taxPct = (tax / (fields.qty * fields.price - fields.discount)) * 100;
//     } else {
//       taxPct = parseFloat(value);
//       tax = ((fields.qty * fields.price - fields.discount) * (taxPct / 100)).toFixed(2);
//     }
//     setFields((prevState) => ({
//       ...prevState,
//       tax: tax,
//       taxPct: taxPct.toFixed(2),
//     }));
//   };
  
//   return (
//     <div>
//       <h2>Add Invoice</h2>
//       <form onSubmit={handleAddInvoice}>
//         <label htmlFor="qty">Qty</label>
//         <input
//           type="number"
//           name="qty"
//           id="qty"
//           value={fields.qty}
//           onChange={handleFieldChange}
//         />

//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           name="price"
//           id="price"
//           value={fields.price}
//           onChange={handleFieldChange}
//         />

//         <label htmlFor="discountPct">Discount %</label>
//         <input
//           type="number"
//           name="discountPct"
//           id="discountPct"
//           value={fields.discountPct}
//           onChange={handleDiscountChange}
//         />

//         <label htmlFor="discount">Discount</label>
//         <input
//           type="number"
//           name="discount"
//           id="discount"
//           value={fields.discount}
//           onChange={handleDiscountChange}
//         />

//         <label htmlFor="taxPct">Tax %</label>
//         <input
//           type="number"
//           name="taxPct"
//           id ="taxPct"
//           value={fields.taxPct}
//           onChange={handleTaxChange}
//         />
    
//         <label htmlFor="tax">Tax</label>
//         <input
//           type="number"
//           name="tax"
//           id="tax"
//           value={fields.tax}
//           onChange={handleTaxChange}
//         />
    
//         <button type="submit">Submit</button>
//         <button type="button" onClick={resetForm}>Reset Form</button>
//       </form>
//     </div>
//     );
//     }
