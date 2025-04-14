import { HttpResponseBuilder, HttpStatusCode, HttpStatusMessage, Paging } from '../index';

interface TestData {
  message: string;
}

interface UserData {
  id: number;
  name: string;
}

interface ErrorData {
  error: string;
}

describe('HttpResponseBuilder', () => {
  describe('Basic Response', () => {
    it('should create a success response with data', () => {
      const response = HttpResponseBuilder
        .ok<TestData>()
        .setData({ message: 'Hello World' })
        .build();

      console.log('Success Response:', JSON.stringify(response, null, 2));
      expect(response).toEqual({
        status: HttpStatusCode.OK,
        message: HttpStatusMessage.OK,
        data: { message: 'Hello World' }
      });
    });

    it('should create a custom response', () => {
      const response = HttpResponseBuilder
        .customResponse<UserData>()
        .setStatus(HttpStatusCode.OK)
        .setMessage('Custom success message')
        .setData({ id: 1, name: 'Test' })
        .build();

      console.log('Custom Response:', JSON.stringify(response, null, 2));
      expect(response).toEqual({
        status: HttpStatusCode.OK,
        message: 'Custom success message',
        data: { id: 1, name: 'Test' }
      });
    });
  });

  describe('Response with Pagination', () => {
    it('should create a response with pagination', () => {
      const paging = new Paging(1, 10, 100);
      const response = HttpResponseBuilder
        .ok<number[]>()
        .setData([1, 2, 3])
        .setPaging(paging)
        .build();

      console.log('Response with Pagination:', JSON.stringify(response, null, 2));
      expect(response).toEqual({
        status: HttpStatusCode.OK,
        message: HttpStatusMessage.OK,
        data: [1, 2, 3],
        paging: {
          page: 1,
          size: 10,
          total: 100
        }
      });
    });
  });

  describe('Response with Metadata', () => {
    it('should create a response with metadata', () => {
      const metadata = {
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      };

      const response = HttpResponseBuilder
        .ok<Record<string, never>>()
        .setData({})
        .setMetadata(metadata)
        .build();

      console.log('Response with Metadata:', JSON.stringify(response, null, 2));
      expect(response).toEqual({
        status: HttpStatusCode.OK,
        message: HttpStatusMessage.OK,
        data: {},
        metadata: metadata
      });
    });
  });

  describe('Error Responses', () => {
    it('should create a not found response', () => {
      const response = HttpResponseBuilder
        .notFound<null>()
        .setData(null)
        .build();

      console.log('Not Found Response:', JSON.stringify(response, null, 2));
      expect(response).toEqual({
        status: HttpStatusCode.NOT_FOUND,
        message: HttpStatusMessage.NOT_FOUND,
        data: null
      });
    });

    it('should create a bad request response', () => {
      const response = HttpResponseBuilder
        .badRequest<ErrorData>()
        .setData({ error: 'Invalid input' })
        .build();

      console.log('Bad Request Response:', JSON.stringify(response, null, 2));
      expect(response).toEqual({
        status: HttpStatusCode.BAD_REQUEST,
        message: HttpStatusMessage.BAD_REQUEST,
        data: { error: 'Invalid input' }
      });
    });

    it('should create a custom error response', () => {
      const response = HttpResponseBuilder
        .customResponse<ErrorData>()
        .setStatus(HttpStatusCode.INVALID_EMAIL)
        .setMessage(HttpStatusMessage.INVALID_EMAIL)
        .setData({ error: 'Email format is invalid' })
        .build();

      console.log('Custom Error Response:', JSON.stringify(response, null, 2));
      expect(response).toEqual({
        status: HttpStatusCode.INVALID_EMAIL,
        message: HttpStatusMessage.INVALID_EMAIL,
        data: { error: 'Email format is invalid' }
      });
    });
  });


  it('should handle any object data type', () => {
    const anyData = {
        name: "Test",
        age: 30,
        items: [1, 2, 3],
        nested: {
            field1: "value1",
            field2: 123
        },
        isActive: true
    };

    const response = HttpResponseBuilder.ok()
        .setData(anyData)
        .build();

    console.log('Handle any object data type:', JSON.stringify(response, null, 2));
    expect(response.toJSON()).toEqual({
        status: HttpStatusCode.OK,
        message: HttpStatusMessage.OK,
        data: anyData
    });
});

it('should handle pagination data without type definition', () => {
    const paginationData = {
        data: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" }
        ],
        total: 2,
        next: false,
        totalPage: 1
    };

    const response = HttpResponseBuilder.ok()
        .setData(paginationData)
        .build();

    expect(response.toJSON()).toEqual({
        status: HttpStatusCode.OK,
        message: HttpStatusMessage.OK,
        data: paginationData
    });
});
}); 