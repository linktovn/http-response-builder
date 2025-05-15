# HTTP Response Builder

A TypeScript library for building consistent HTTP responses with support for custom status codes.

## Features

- Builder pattern for constructing HTTP responses
- Type-safe response data handling with generics
- Built-in pagination support
- Metadata support for additional response information
- Comprehensive HTTP status codes and messages
- Fluent interface for method chaining

## Installation

```bash
npm install @ltvn/http-response-builder
# or
yarn add @ltvn/http-response-builder
```

## Usage

### Basic Usage

```typescript
import { HttpResponseBuilder } from '@ltvn/http-response-builder';

// Create a success response
const response = HttpResponseBuilder
    .ok()
    .setData({ message: 'Hello World' })
    .build();

// Result:
// {
//     status: 200,
//     message: "OK",
//     data: { message: "Hello World" }
// }
```

### With Pagination

```typescript
import { HttpResponseBuilder, Paging } from '@ltvn/http-response-builder';

const response = HttpResponseBuilder
    .ok()
    .setData([/* your data */])
    .setPaging(new Paging(1, 10, 100))
    .build();

// Result:
// {
//     status: 200,
//     message: "OK",
//     data: [/* your data */],
//     paging: {
//         page: 1,
//         size: 10,
//         total: 100
//     }
// }
```

### With Metadata

```typescript
const response = HttpResponseBuilder
    .ok()
    .setData({/* your data */})
    .setMetadata({
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    })
    .build();

// Result:
// {
//     status: 200,
//     message: "OK",
//     data: {/* your data */},
//     metadata: {
//         timestamp: "2024-03-14T12:00:00.000Z",
//         version: "1.0.0"
//     }
// }
```

### Custom Response

```typescript
const response = HttpResponseBuilder
    .customResponse()
    .setStatus(418)  // I'm a teapot
    .setMessage("Custom message")
    .setData({ message: "Hello World" })
    .build();
```

## Response Format

All responses follow this format:

```typescript
{
    status: number;      // HTTP status code
    message: string;     // Status message
    data?: T;           // Response data (generic type)
    paging?: {          // Optional pagination info
        page: number;
        size: number;
        total: number;
    };
    metadata?: Record<string, any>;  // Optional additional metadata
}
```

## Available Status Codes

### Standard HTTP Status Codes (100-599)
- 1xx: Information
- 2xx: Success
- 3xx: Redirection
- 4xx: Client Error
- 5xx: Server Error

### Custom Status Codes (>=4000)
- 4000: SUCCESS
- 4001: INVALID_MAIL_FORMAT
- 4002: ACCOUNTALREADY
- 4003: EMAIL_ALREADY_EXISTS
- 4004: USER_NOT_FOUND
- 4005: WRONG_PASS
- 4006: EMAIL_TIMEOUT
- 4007: AUTHEN_NOT_MATCH
- 4008: INVALID_EMAIL

## Usage with NestJS

### Controller Example

```typescript
import { Controller, Get } from '@nestjs/common';
import { HttpResponseBuilder, Paging } from '@ltvn/http-response-builder';

interface UserDTO {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  @Get()
  async getUsers() {
    const users: UserDTO[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
    ];

    const totalUsers = users.length;
    const paging = new Paging(1, 10, totalUsers);

    return HttpResponseBuilder.ok<UserDTO[]>()
      .setData(users)
      .setPaging(paging)
      .setMetadata({ timestamp: new Date() })
      .build();
  }

  @Get(':id')
  async getUser() {
    const user: UserDTO = { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com' 
    };

    return HttpResponseBuilder.ok<UserDTO>()
      .setData(user)
      .build();
  }
}
```

## Usage with Express

### Route Handler Example

```typescript
import express from "express";
import { HttpResponseBuilder } from "@ltvn/http-response-builder";

const app = express();

app.get("/api/photo/list", function (req, res) {
  const photoList = [
    {
      id: "001",
      name: "photo001.jpg",
      type: "jpg",
      dataUrl: "http://localhost:3000/data/photo001.jpg",
    },
    {
      id: "002",
      name: "photo002.jpg",
      type: "jpg",
      dataUrl: "http://localhost:3000/data/photo002.jpg",
    },
  ];

  const response = HttpResponseBuilder.ok()
    .setData(photoList)
    .setMessage("Get photo list")
    .build();
    
  res.json(response);
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Error Handling

The builder includes validation and will throw TypeError for invalid inputs:

- Invalid status codes (must be between 100 and 599, or >= 4000 for custom codes)
- Invalid message types (must be string)
- Invalid paging instance
- Invalid metadata type (must be a non-null object)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## References

This project was inspired by and built upon the work of [@anot/http-response-builder](https://www.npmjs.com/package/@anot/http-response-builder). We would like to acknowledge their contribution to the open-source community.

## License

This project is licensed under the ISC License