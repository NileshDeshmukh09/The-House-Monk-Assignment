# Fictional-Online-Store-Server

## SETUP
###### project : https://the-house-monk.vercel.app/
To get started and run the app:



- Clone the project using command : 

` git clone https://github.com/NileshDeshmukh09/The-House-Monk-Assignment.git `

- Run ` npm install ` to install the corresponding node packages

- Give the env variable  
    - Create the .env file 
    - ` PORT : 8000 ` , 
    - ` DB_URL : Enter-DB-URL ` 
    - ` SECRET-KEY :Secret-key-by-Nilesh-Deshmukh`

- Run ` npm start ` to run the app on ` http://localhost:8000 `










## API Reference

- base_url = ` https://the-house-monk.vercel.app `
### USER

#### user-signup

```http
  POST ${base_url}/api/auth/signup
```

| RequestBody | Type     | Description                |
| :-------- | :------- | :------------------------- |
| ` userID ` | `string` | **Required** , **unique** |
| ` name ` | `string` | **Required** |
| ` password ` | `string` | **Required** |

#### user-login

```http
  POST ${base_url}/api/auth/login
```

| RequestBody | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` userID ` | `string` | **Required**  |
| ` password ` | `string` | **Required** |


#### get-user-by-userID

```http
    GET ${base_url}/api/users/${userID}}
 ```

 | Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` userID ` | `string` | **Required**  |


### PRODUCTS

#### add-product

```http
  POST ${base_url}/api/products
```
 - AuthorisedAPI - required `x-access-token` in ` Header `
 
| RequestBody | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` name ` | `string` | **Required**  |
| ` Description ` | `string` | **Required** |
| ` Category ` | `string` | **Required** |
| ` Price ` | `Number` | **Required** |

#### get-product-By-productID

```http
  GET -  ${base_url}/api/products/${productID}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` productID ` | `object` | **Required**  |


#### get-all-products

```http
  GET -  ${base_url}/api/products
```



#### Delete-product-by-productID

```http
  DELETE -  ${base_url}/api/products/${productID}
```

 - AuthorisedAPI - required `x-access-token` in ` Header `

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` productID ` | `object` | **Required**  |



#### update-product-by-productID

```http
  PUT -  ${base_url}/api/products/${productID}
```
 - AuthorisedAPI - required `x-access-token` in ` Header `

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` productID ` | `object` | **Required**  |

--


| RequestBody | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` name ` | `string` | Not-**Required**  |
| ` Description ` | `string` | Not-**Required** |
| ` Category ` | `string` | Not-**Required** |
| ` Price ` | `string` | Not-**Required** |

### ORDER

#### place-order

```http
  POST -  ${base_url}/api/orders/${userID}/place/${productID}

```
 - AuthorisedAPI - required `x-access-token` in ` Header `

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` userID ` | `string` | **Required**  |
| ` productID ` | `object` | **Required** |

--

| RequestBody | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` quantity ` | `Number` | **Required** |

#### get-all-orders

```http
  POST - ${base_url}/api/users/${userID}/orders
```

 - AuthorisedAPI - required `x-access-token` in ` Header `
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` userID ` | `string` | **Required**  |


#### get-order-by-orderID

```http
  POST - ${base_url}/api/users/${userID}/orders/${orderID}
```
 - AuthorisedAPI - required `x-access-token` in ` Header `

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` userID ` | `string` | **Required**  |
| ` orderID ` | `object` | **Required** |

### CART

#### add-to-cart

```http
  POST - ${base_url}api/cart/add
```
 - AuthorisedAPI - required `x-access-token` in ` Header `

| RequestBody | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| ` productID ` | `object` | **Required**  |
| ` quantity ` | `Number` | Default : 1 |


## Thankyou for checking project


