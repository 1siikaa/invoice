import { useState } from "react";
import InvoiceForm from "./components/invoice/invoiceForm";
import InvoiceGrid from "./components/invoice/invoiceGrid";

export default function App() {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const deleteInvoice = (index) => {
    const newInvoices = invoices.filter((_, i) => i !== index);
    setInvoices(newInvoices);
  };

  const editInvoice = (index, editedInvoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice, i) => (i === index ? editedInvoice : invoice))
    );
  };

  return (
    <div>
      <InvoiceForm addInvoice={addInvoice} />
      <InvoiceGrid
        invoices={invoices}
        deleteInvoice={deleteInvoice}
        editInvoice={editInvoice}
        setInvoices={setInvoices}  // pass setInvoices down as a prop
      />
     

    </div>
  );
}





  