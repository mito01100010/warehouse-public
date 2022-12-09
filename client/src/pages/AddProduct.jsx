import axios from 'axios';
import React, { useState } from 'react'

const AddProduct = () => {
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({
    barcode: "",
    name: "",
    description: "",
    purchased_price: "",
    selling_price: "",
    number: "",
    category: "",
  })
  const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg'
  ]
  const [err, setError] = useState(null);

  const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file)
        const res = await axios.post("/upload", formData)
        return res.data;
      } catch (err) {
        setError(err.response.data);
      }
  }

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async e => {
    let imgURL = "";

    e.preventDefault()

    if (!whitelist.includes(file.type)) {
      setError("Only jpeg, jpg and png are allowed")
    } else {
      if (file !== "") {
        imgURL = await upload();
      }

      inputs.image = imgURL;

      try {
        await axios.post("/products/addProduct", inputs)
        window.location.reload();
      } catch (err) {
        setError(err.response.data);
      }
    }
  }

  return (
    <>
      <h1>Add Product</h1>

      <form className='form form--add'>
        <input type="text" placeholder="Product Name" name='name' onChange={handleChange} />

        <input type="number" placeholder="Purchased Price" name='purchased_price' onChange={handleChange} />

        <input type="number" placeholder="Number of Products" name='number' onChange={handleChange} />

        <textarea placeholder="Description" name='description' onChange={handleChange} cols="30" rows="5"></textarea>

        <select name="category" id="category" defaultValue={""} onChange={handleChange}>
          <option value="" disabled hidden>Choose Category</option>
          <option value="groceries">Groceries</option>
          <option value="stationery">Stationery</option>
          <option value="building-materials">Building Materials</option>
        </select>

        <input type="number" placeholder="Barcode" name='barcode' onChange={handleChange} />

        <label htmlFor='file-image'>Upload Image</label>
        <input id='file-image' style={{ display: "none" }} type="file" placeholder="Upload Image" onChange={e => setFile(e.target.files[0])} />

        <input type="number" placeholder="Selling Price" name='selling_price' onChange={handleChange} />

        <button onClick={handleClick}>Add Product</button>

        {err && <p>{err}</p>}
      </form>
    </>
  )
}

export default AddProduct