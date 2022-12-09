import React from 'react'

const TableProducts = () => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Purchased Price</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Number</th>
                    <th>Category</th>
                    <th>Barcode</th>
                    <th>Selling Price</th>
                    <th>Update/Delete</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>testname</td>
                    <td>123</td>
                    <td>testImage</td>
                    <td>desc</td>
                    <td>testNumber</td>
                    <td>groceries</td>
                    <td>12312412</td>
                    <td>123123</td>
                    <td>2 btns</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableProducts