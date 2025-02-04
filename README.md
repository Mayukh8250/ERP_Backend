# Plutos ERP Backend API Documentation

# 🏢 Plutos ERP Backend

Version 1.0 | February 2025

RESTful API documentation for Donation and Offline Billers management system.

## 🔐 Authentication Flow

### 1. Biller Login

**Endpoint:** POST http://localhost:3000/biller/login/

```json
{
    "email": "mayukh@gmail.com",
    "password": "123456"
}
```

**Response:**

```json
{
    "_id": "679c600262ab7357d36b5a53",
    "billerId": "NFPL00000NATZB",
    "email": "mayukh@gmail.com",
    "billerName": "Normal Finance",
    "billerCategory": "offline",
    "password": "$2b$10$6n.1Vs7QaGkv9LwZIdnsaemG6mdxfYO8OKdRhNf92t",
    "__v": 0
}
```

<aside>
⚠️ Important: Store billerId in frontend state management (Redux) for subsequent requests

</aside>

### 2. Get Customer Details

**Endpoint:** GET http://localhost:3000/customer/

```json
{
    "billerId": "RFPL00000NATZB"
}
```

**Response:**

```json
[
    {
        "_id": "67a08d4393db21ecd64fbfb1",
        "customerName": "NADHIYA",
        "customerIdentifier": "96-60-100308",
        "billerId": "RFPL00000NATZB",
        "bills": [
            "67a08d4393db21ecd64fbfc0",
            "67a0adebc1f5767c2940e6fc"
        ],
        "__v": 0
    }
]
```

<aside>
⚠️ Important: Store customerId in frontend for bill retrieval

</aside>

## 📤 File Upload

**Endpoint:** POST [http://localhost:3000/customer/upload/${billerId}](http://localhost:3000/customer/upload/$%7BbillerId%7D)

**Body:** Form-data with file attachment

### Features:

- Uploads customer file using billerId
- Extracts and saves customer data with current bills
- Automatically expires old bills for existing customers

## 📃 Get Bills

**Endpoint:** GET [http://localhost:3000/bills/${customerId}](http://localhost:3000/bills/$%7BcustomerId%7D)

**Request Body:**

```json
{
    "expired": true/false
}
```

**Description:**

- Set expired=true to retrieve expired bills
- Set expired=false to retrieve active bills

## 💱 Transaction Flow

### 1. Create Transaction

**Endpoint:** POST http://localhost:3000/transaction/

```json
{
    "amount": "${amount}",
    "type": "${type}",
    "billerId": "${billerId}",
    "customerIdentifier": "${customerIdentifier}",
    "transactionRefId": "${transactionRefId}",
    "refId": "${refId}"
}
```

**Features:**

- Receives transaction data from biller proxy server
- Saves transaction information in database
- Supports subsequent read and update operations

## 📞 Support

For technical assistance, please contact the Plutos Technical Team.
