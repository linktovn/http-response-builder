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
npm install @linkto/http-response-builder
# or
yarn add @linkto/http-response-builder
```

## Usage

### Basic Usage

```typescript
import { HttpResponseBuilder, HttpStatusCode, HttpStatusMessage } from '@linkto/http-response-builder';

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
import { HttpResponseBuilder, Paging } from '@linkto/http-response-builder';

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

## Adding Custom Status Codes

To add custom status codes, you need to update the `HttpStatusCode` and `HttpStatusMessage` enums in the source code:

1. Open `src/index.ts`
2. Add your custom status code to `HttpStatusCode` enum:
```typescript
export enum HttpStatusCode {
    // ... existing codes ...
    
    // Custom Status Codes
    YOUR_CUSTOM_CODE = 5000, // Use numbers >= 4000 for custom codes
}
```

3. Add corresponding message to `HttpStatusMessage` enum:
```typescript
export enum HttpStatusMessage {
    // ... existing messages ...
    
    // Custom Status Messages
    YOUR_CUSTOM_CODE = "Your custom message",
}
```

4. Update the mapping in `getHttpStatusMessage` function:
```typescript
export function getHttpStatusMessage(code: HttpStatusCode): HttpStatusMessage | undefined {
    const mapping: Record<HttpStatusCode, HttpStatusMessage> = {
        // ... existing mappings ...
        
        [HttpStatusCode.YOUR_CUSTOM_CODE]: HttpStatusMessage.YOUR_CUSTOM_CODE,
    };
    return mapping[code];
}
```

5. After making changes, rebuild and publish the package:
```bash
npm run build
npm version patch  # or minor/major depending on changes
npm publish
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
import { HttpResponseBuilder, Paging } from '@linkto/http-response-builder';

interface UserDTO {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  @Get()
  async getUsers(): Response<UserDTO[]> {
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
  async getUser(): Response<UserDTO> {
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
const app = express();
import { HttpResponseBuilder, Paging, Response } from "@linkto/http-response-builder";

var server = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

var photoList = [
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

app.get("/api/photo/list", function (req, res, next) {
  const results = HttpResponseBuilder.ok().setData(photoList).setMessage("Get photo list");
  res.json(results);
});
```

## Pagination Support

The `Paging` class provides pagination functionality:

```typescript
const paging = new Paging(1, 10, 100);  // page 1, 10 items per page, 100 total items
const response = HttpResponseBuilder.ok<UserDTO[]>()
    .setData(users)
    .setPaging(paging)
    .build();
```

## Metadata Support

You can include additional metadata in your response:

```typescript
const metadata = {
    timestamp: new Date(),
    version: '1.0.0'
};

const response = HttpResponseBuilder.ok<UserDTO>()
    .setData(user)
    .setMetadata(metadata)
    .build();
```

## Predefined Status Codes

The builder includes methods for common HTTP status codes:

- `HttpResponseBuilder.ok()`
- `HttpResponseBuilder.created()`
- `HttpResponseBuilder.badRequest()`
- `HttpResponseBuilder.unauthorized()`
- `HttpResponseBuilder.forbidden()`
- `HttpResponseBuilder.notFound()`
- `HttpResponseBuilder.internalServerError()`
  And many more...

## Custom Response

You can create a custom response with any status code:

```typescript
const response = HttpResponseBuilder.customResponse<UserDTO>()
    .setStatus(418)  // I'm a teapot
    .setMessage("Custom message")
    .setData(user)
    .build();
```

## Error Handling

The builder includes validation and will throw TypeError for invalid inputs:

- Invalid status codes (must be between 100 and 599)
- Invalid message types (must be string)
- Invalid paging instance
- Invalid metadata type (must be object)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License