# Warehouse

## :clipboard: About
Full stack web application created with React, NodeJS, express and MySQL<br />
Intended for managing warehouse products.

## :star2: Features 
![review gif](./review-images/warehouse-review.gif)

#### Create account and login using your local database.
> Authentication with [JWT](https://www.npmjs.com/package/jsonwebtoken) and [Cookie](https://www.npmjs.com/package/cookie-parser) <br />
> Password encryption with [bcrypt](https://www.npmjs.com/package/bcrypt)
<p align="center">
  <img src="./review-images/login.png" alt="login" width="45%"/>   <img src="./review-images/register.png" alt="register" width="45%"/>
</p>

#### Add and Update product in DB.
> Uploading files with [multer](https://www.npmjs.com/package/multer) <br />
> File extension restriction to jpeg, jpg, and png
<p align="center">
  <img src="./review-images/add-product.png" alt="add-product" width="45%"/>   <img src="./review-images/update-review.gif" alt="update gif" width="45%"/>
</p>

#### Filter and search for product
> Choose category and search by name or find product using unique barcode.
<p align="center">
  <img src="./review-images/find-product.png" alt="find-product" width="45%"/>
</p>