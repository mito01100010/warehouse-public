import React from 'react';
import axios from "axios";
import { useState } from 'react';
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function FindProduct() {
  const [inputs, setInputs] = useState({
    category: "",
    name: "",
    barcode: "",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Purchased Price",
      selector: (row) => row.purchased_price,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={'../upload/' + row.image} width="70%" height="70%" alt="" />
      ),
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Number",
      selector: (row) => row.number,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Barcode",
      selector: (row) => row.barcode,
    },
    {
      name: "Selling Price",
      selector: (row) => row.selling_price,
    },
    {
      name: "Update/Delete",
      selector: (row) => <div className='table-actions'>
        <Link className='btn-link' to={`/updateProduct/${row.barcode}`} state={row}>Update</Link>
        <button onClick={(e) => handleDelete(e, row)}>Delete</button>
      </div>,
    },
  ]
  const customStyles = {
    pagination: {
      style: {
        background: '#b9e6e6',
        marginBottom: '100px'
      },
    },
  };

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const findByName = async () => {
    try {
      setLoading(true);
      const res = await axios.post("products/findProducts", inputs);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  const findByBarcode = async () => {
    try {
      setLoading(true);
      const res = await axios.post("products/findProduct", inputs);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    inputs.barcode === ""
      ? findByName()
      : findByBarcode()
  }

  const handleDelete = async (e, row) => {
    if (window.confirm(`Product ${row.name} will be deleted. Do you want to continue?`)) {
      try {
        setLoading(true);
        const res = await axios.delete("products/deleteProduct", { data: { barcode: row.barcode } });
        res.status === 200 && handleSubmit(e);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
  }


  return (
    <div className="find-product">
      <h1>Find Product</h1>

      <form className='form form--find'>
        <input type="text" placeholder="Product Name" name="name" onChange={handleChange} />

        <select name="category" id="category" onChange={handleChange}>
          <option value="">All</option>
          <option value="groceries">Groceries</option>
          <option value="stationery">Stationery</option>
          <option value="building-materials">Building Materials</option>
        </select>

        <input name="barcode" type="number" placeholder="Barcode" onChange={handleChange} />

        <button onClick={handleSubmit}>Find Product</button>
      </form>

      <DataTable
        customStyles={customStyles}
        title="Data"
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
      />
    </div>
  )
}

export default FindProduct