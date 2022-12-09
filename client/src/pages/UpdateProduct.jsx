import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const UpdateProduct = () => {
  const state = useLocation().state
  
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({
    barcode: state.barcode,
    image: state.image,
    name: state.name,
    description: state.description,
    purchased_price: state.purchased_price,
    selling_price: state.selling_price,
    number: state.number,
    category: state.category,
  })

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("/upload", formData)
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async e => {
    let imgURL = inputs.image;

    e.preventDefault()
    
    if (file !== "") {
      imgURL = await upload();
    }

    inputs.image = imgURL;

    try {
      await axios.put(`/products/updateProduct/${state.barcode}`, inputs)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Update Product</h1>

      <form className='form form--add'>
        <input type="text" value={inputs.name} placeholder="Product Name" name='name' onChange={handleChange} />

        <input type="number" value={inputs.purchased_price} placeholder="Purchased Price" name='purchased_price' onChange={handleChange} />

        <input type="number" value={inputs.number} placeholder="Number of Products" name='number' onChange={handleChange} />

        <textarea value={inputs.description} placeholder="Description" name='description' onChange={handleChange} cols="30" rows="5"></textarea>

        <select name="category" id="category" defaultValue={""} onChange={handleChange}>
          <option value="" disabled hidden>Choose Category</option>
          <option value="groceries">Groceries</option>
          <option value="stationery">Stationery</option>
          <option value="building-materials">Building Materials</option>
        </select>

        <input type="number" value={inputs.barcode} placeholder="Barcode" name='barcode' onChange={handleChange} />

        <label htmlFor='file-image'>Change Image</label>
        <input id='file-image' style={{ display: "none" }} type="file" placeholder="Upload Image" onChange={e => setFile(e.target.files[0])} />

        <input type="number" value={inputs.selling_price} placeholder="Selling Price" name='selling_price' onChange={handleChange} />

        <button onClick={handleClick}>Update Product</button>
      </form>
    </>
  )
}

export default UpdateProduct