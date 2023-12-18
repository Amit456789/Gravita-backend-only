
# GRAVITA OASIS LMS BACKEND

This is the backend for the LMS which encapsulates all the APIS alongwith database and much more.

## Table of Contents

- [Authentication and Authorization](#authentication-and-authorization)
  - [Introduction](#introduction)
  - [Authentication](#authentication)
    - [Local Authentication](#local-authentication)
    - [Third-Party Authentication](#third-party-authentication)
  - [Authorization](#authorization)
  - [Dependencies](#dependencies)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Usage](#usage)
    - [Authentication Endpoints](#authentication-endpoints)
    - [Authorization Middleware](#authorization-middleware)
  - [Examples](#examples)
  - [Contributing](#contributing)
  - [License](#license)

## Authentication and Authorization

### Introduction

Welcome to GRAVITA OASIS LMS

Get started on your journey with us by registering for an account. Our streamlined process includes email OTP verification, ensuring your account's security.

### Authentication

Registering a user is the primary step to access the website. This is achieved through email OTP (e.g., email/password) and third-party authentication methods (e.g., OAuth) verification and confirming the user's existence in the database.

#### Local Authentication

Local authentication is a fundamental part of our system, providing a secure and straightforward way for users to access our platform. With local authentication, users can register, log in, and manage their accounts directly through our website.

With Mongo DB locally

#### Third-Party Authentication

Explain the integration of third-party authentication providers if applicable (e.g., Google, Facebook, GitHub).

### Authorization

This system is entirely admin-specific, granting the owner exclusive authority to allocate permissions to users. The administrator holds the rights to define and manage user access, ensuring a controlled and secure environment.

### Dependencies

Not Yet released

<!-- List any external dependencies or libraries related to authentication and authorization. -->

### Getting Started

Go the sign up page proceed with OTP and be a member

#### Installation

## Installation

### Step 1: Navigate to the Clone Folder

```bash
cd path/to/clone-folder
```

### Step 2: Install the dependencies

```bash
npm install --legacy-peer-deps
```

### Step 1: Start the server

```teminal
npm run dev
```

#### Configuration

An env file must be there outside of src

## Authentication Endpoints

### 1. Register a New User

- **Endpoint:** `POST /api/v1/user/sendOtp`
- **Description:** Register a new user in the system.
- **Request:**
- Body:
  ```json
  {
    "email": "user@example.com"
  }
  ```

### 2. Confirming OTP

- **Endpoint:** `POST /api/v1/user/addUser`
- **Description:** Confirming OTP with Database.
- **Request:**
  - Body (Form Data):
    - `email: user@example.com`
    - `password: securePassword123`
    - `username: amit420`
    - `fullName: Amit Bhandari`
    - `avatar: Profile photo in jpg`
    - `otp: XXXXXX`
- **Response:**
  - Success (Status Code: 201):
    ```json
    {
      "message": "User registered successfully."
    }
    ```
  - Error (Status Code: 400):
    ```json
    {
      "error": "Invalid request. Please check your input."
    }
    ```

### 2. User Login

- **Endpoint:** `POST /api/v1/user/loginUser`
- **Description:** Authenticate an existing user.
- **Request:**

  - Body:

  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

  <font color="red">**Note:** Ensure that Google reCaptcha is also there.</font>

- **Response:**
  - Success (Status Code: 200):
    ```json
    {
      "ACCESS_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "userId": "123",
      "message": "Login successful."
    }
    ```
  - Error (Status Code: 401):
    ```json
    {
      "error": "Invalid credentials. Please try again."
    }
    ```

### 3. Admin Login

- **Endpoint:** `POST /api/v1/user/loginAdmin`
- **Description:** Authenticate an existing admin.
- **Request:**

  - Body:

  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

  <font color="red">**Note:** 1. Ensure that Google reCaptcha is also there. </br> 2. This is admin specific, user can not access it since it is protected with middlewares to not allow any student to get into the admin panel. </font>

- **Response:**
  - Success (Status Code: 200):
    ```json
    {
      "ACCESS_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "userId": "123",
      "message": "Login successful."
    }
    ```
  - Error (Status Code: 401):
    ```json
    {
      "error": "Invalid credentials. Please try again."
    }
    ```

### 4. Logout

- **Endpoint:** `POST /api/v1/user/logout`
- **Description:** Terminate the user's current session <font color="red">and clearing the cookie data</font>.
- **Request:** None
- **Response:**
  - Success (Status Code: 200):
    ```json
    {
      "message": "Logout successful."
    }
    ```
  - Error (Status Code: 401):
    ```json
    {
      "error": "Internal Server Error."
    }
    ```

### 5. Reset Password

- **Endpoint:** `POST /api/v1/user/forgetPasswordSendOtp`
- **Description:** Send a password reset email to the user's registered email address.
- **Request:**
  - Body (Form Data):
    - `email: user@example.com`
- **Response:**
  - Success (Status Code: 200):
    ```json
    {
      "message": "Password reset email sent successfully."
    }
    ```
  - Error (Status Code: 404):
    ```json
    {
      "error": "User not found. Please check your email address."
    }
    ```

<!-- Add more endpoints as needed -->

#### Authorization Middleware

Yet to coe

### Examples

Images

## Authors

- [@Amit Bhandari]()
- [@Saksham Kothari]()
- [@Gaurav Rajput]()

## Contributing

//hold

<!-- Provide guidelines for those who want to contribute to your project. Include information about coding standards, pull request procedures, and other relevant details. -->

## License

Specify the license under which your project is distributed.
