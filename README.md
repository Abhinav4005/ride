# User Registration API Documentation

This documentation provides details about the `/user/register` endpoint, including its purpose, expected request data, response format, and status codes.

---

## **Endpoint**: `/user/register`

### **Description**
This endpoint is used to register a new user in the system. It validates the input data, hashes the user's password, creates a new user in the database, and returns an authentication token.

---

## **Request**

### **Method**
`POST`

### **Content-Type**
`application/json`

### **Request Body**
The following fields are **required** in the request body:

| Field       | Type     | Required | Description                                                        |
|-------------|----------|----------|--------------------------------------------------------------------|
| `firstName` | `string` | Yes      | First name of the user. Must be at least 3 characters long.       |
| `lastName`  | `string` | Yes      | Last name of the user. Must be at least 3 characters long.        |
| `email`     | `string` | Yes      | User's email address. Must be a valid email format.               |
| `password`  | `string` | Yes      | User's password. Must be at least 6 characters long. Will be hashed. |

### **Example Request**
```json```
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "securepassword123"
}

## **Success Response**

### **Status Code**
`201`

### **Description**
User successfully registered.

### **Example Success Response**
```json```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "socketId": null
  }
}

# Error Responses

## **Validation Error**

### **Status Code**
`400`

### **Description**
Validation failed due to invalid input.

### **Example**
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First name must be at least 3 characters long", "param": "firstName", "location": "body" }
  ]
}
