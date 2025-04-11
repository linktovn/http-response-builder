export class Paging {
    private page?: number;
    private size?: number;
    private total?: number;

    constructor(page?: number, size?: number, total?: number) {
        this.setPage(page);
        this.setSize(size);
        this.setTotal(total);
    }

    setPage(page?: number) {
        if (page !== undefined) {
            if (page < 0) {
                throw new TypeError('Page number cannot be negative');
            }
            this.page = page;
        }
        return this;
    }

    setSize(size?: number) {
        if (size !== undefined) {
            if (size <= 0) {
                throw new TypeError('Page size must be greater than 0');
            }
            this.size = size;
        }
        return this;
    }

    setTotal(total?: number) {
        if (total !== undefined) {
            if (total < 0) {
                throw new TypeError('Total count cannot be negative');
            }
            this.total = total;
        }
        return this;
    }

    getPage() : number | undefined {
        return this.page;
    }

    getSize() : number | undefined {
        return this.size;
    }

    getTotal() : number | undefined {
        return this.total;
    }
}


export class Response<T> {
    private status?: number;
    private message?: string;
    private data?: T;
    private paging?: Paging;
    private metadata?: Record<string, any>;


    constructor(builder: HttpResponseBuilder<T>) {
        this.status = builder.getStatus();
        this.message = builder.getMessage();
        this.data = builder.getData();
        this.paging = builder.getPaging();
        this.metadata = builder.getMetadata();
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            data: this.data,
            ...(this.paging && { paging: this.paging }),
            ...(this.metadata && { metadata: this.metadata })
        };
    }
}


export class HttpResponseBuilder<T> {
    private status?: number;
    private message?: string;
    private data?: T;
    private paging?: Paging;
    private metadata?: Record<string, any>;

    constructor(status?: number, message?: string) {
        this.setStatus(status)
        this.setMessage(message)
    }

    static customResponse<T = never>() {
        return new HttpResponseBuilder<T>();
    }

    static continue<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.CONTINUE, HttpStatusMessage.CONTINUE);
    }

    static switchingProtocols<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.SWITCHING_PROTOCOLS, HttpStatusMessage.SWITCHING_PROTOCOLS);
    }

    static processing<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PROCESSING, HttpStatusMessage.PROCESSING);
    }

    static ok<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.OK, HttpStatusMessage.OK);
    }

    static created<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.CREATED, HttpStatusMessage.CREATED);
    }

    static accepted<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.ACCEPTED, HttpStatusMessage.ACCEPTED);
    }

    static nonAuthoritativeInformation<T = never>() {
        return new HttpResponseBuilder<T>(
            HttpStatusCode.NON_AUTHORITATIVE_INFORMATION,
            HttpStatusMessage.NON_AUTHORITATIVE_INFORMATION
        );
    }

    static noContent<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NO_CONTENT, HttpStatusMessage.NO_CONTENT);
    }

    static resetContent<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.RESET_CONTENT, HttpStatusMessage.RESET_CONTENT);
    }

    static partialContent<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PARTIAL_CONTENT, HttpStatusMessage.PARTIAL_CONTENT);
    }

    static multipleChoices<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.MULTIPLE_CHOICES, HttpStatusMessage.MULTIPLE_CHOICES);
    }

    static movedPermanently<T = never>()  {
        return new HttpResponseBuilder<T>(HttpStatusCode.MOVED_PERMANENTLY, HttpStatusMessage.MOVED_PERMANENTLY);
    }

    static found<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.FOUND, HttpStatusMessage.FOUND);
    }

    static seeOther<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.SEE_OTHER, HttpStatusMessage.SEE_OTHER);
    }

    static notModified<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NOT_MODIFIED, HttpStatusMessage.NOT_MODIFIED);
    }

    static temporaryRedirect<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.TEMPORARY_REDIRECT, HttpStatusMessage.TEMPORARY_REDIRECT);
    }

    static permanentRedirect<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PERMANENT_REDIRECT, HttpStatusMessage.PERMANENT_REDIRECT);
    }

    static badRequest<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.BAD_REQUEST, HttpStatusMessage.BAD_REQUEST);
    }

    static unauthorized<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.UNAUTHORIZED, HttpStatusMessage.UNAUTHORIZED);
    }

    static paymentRequired<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PAYMENT_REQUIRED, HttpStatusMessage.PAYMENT_REQUIRED);
    }

    static forbidden<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.FORBIDDEN, HttpStatusMessage.FORBIDDEN);
    }

    static notFound<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND);
    }

    static internalServerError<T = never>() {
        return new HttpResponseBuilder<T>(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            HttpStatusMessage.INTERNAL_SERVER_ERROR
        );
    }

    static notImplemented<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NOT_IMPLEMENTED, HttpStatusMessage.NOT_IMPLEMENTED);
    }

    static badGateway<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.BAD_GATEWAY, HttpStatusMessage.BAD_GATEWAY);
    }

    static serviceUnavailable<T = never>() {
        return new HttpResponseBuilder<T>(
            HttpStatusCode.SERVICE_UNAVAILABLE,
            HttpStatusMessage.SERVICE_UNAVAILABLE
        );
    }

    static gatewayTimeout<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.GATEWAY_TIMEOUT, HttpStatusMessage.GATEWAY_TIMEOUT);
    }

    setData(data: T) {
        this.data = data;
        return this;
    }

    setMessage(msg: string | undefined) {
        if(typeof msg === "undefined"){
            return this;
        }

        if (typeof msg !== 'string') {
            throw new TypeError('Message must be a string');
        }

        this.message = msg;
        return this;
    }

    setStatus(status: number | undefined) {

        if(typeof status === "undefined"){
            return this;
        }

        if (typeof status === 'number') {
            if(status >= 100 && status <= 599){
                this.status = status;
                return this;
            }else{
                throw new TypeError('Invalid status: Status code must be between 100 and 599');
            }
        }

        throw new TypeError("Status must be a number");
    }

    setPaging(paging: Paging) {
        if (paging !== null && paging !== undefined) {
            if (!(paging instanceof Paging)) {
                throw new TypeError(`Invalid type: Expected instance of Paging, received ${typeof paging}`);
            }
            this.paging = paging;
        }
        return this;
    }

    setMetadata(metadata : Record<string, any>) {
        if (typeof metadata !== 'object' || metadata === null || Array.isArray(metadata)) {
            throw new TypeError('Invalid metadata: Metadata must be a non-null object');
        }
        this.metadata = metadata;
        return this;
    }

    build(): Response<T> {
        return new Response(this);
    }

    getMetadata(): any | undefined {
        return this.metadata;
    }

    getStatus(): number | undefined {
        return this.status;
    }

    getMessage(): string | undefined {
        return this.message;
    }

    getData(): T | undefined {
        return this.data;
    }

    getPaging(): Paging | undefined {
        return this.paging;
    }
}

export enum HttpStatusCode {
    // 1xx: Information
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,

    // 2xx: Success
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,

    // 3xx: Redirection
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    // 4xx: Client Error
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    TOO_EARLY = 425,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,

    // 5xx: Server Error
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511,

    // Custom Status Codes
    SUCCESS = 4000,
    INVALID_MAIL_FORMAT = 4001,
    ACCOUNTALREADY = 4002,
    EMAIL_ALREADY_EXISTS = 4003,
    USER_NOT_FOUND = 4004,
    WRONG_PASS = 4005,
    EMAIL_TIMEOUT = 4006,
    AUTHEN_NOT_MATCH = 4007,
    INVALID_EMAIL = 4008,
}

export enum HttpStatusMessage {
    // 1xx: Information
    CONTINUE = "Continue",
    SWITCHING_PROTOCOLS = "Switching Protocols",
    PROCESSING = "Processing",

    // 2xx: Success
    OK = "OK",
    CREATED = "Created",
    ACCEPTED = "Accepted",
    NON_AUTHORITATIVE_INFORMATION = "Non-Authoritative Information",
    NO_CONTENT = "No Content",
    RESET_CONTENT = "Reset Content",
    PARTIAL_CONTENT = "Partial Content",

    // 3xx: Redirection
    MULTIPLE_CHOICES = "Multiple Choices",
    MOVED_PERMANENTLY = "Moved Permanently",
    FOUND = "Found",
    SEE_OTHER = "See Other",
    NOT_MODIFIED = "Not Modified",
    TEMPORARY_REDIRECT = "Temporary Redirect",
    PERMANENT_REDIRECT = "Permanent Redirect",

    // 4xx: Client Error
    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Unauthorized",
    PAYMENT_REQUIRED = "Payment Required",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    METHOD_NOT_ALLOWED = "Method Not Allowed",
    NOT_ACCEPTABLE = "Not Acceptable",
    PROXY_AUTHENTICATION_REQUIRED = "Proxy Authentication Required",
    REQUEST_TIMEOUT = "Request Timeout",
    CONFLICT = "Conflict",
    GONE = "Gone",
    LENGTH_REQUIRED = "Length Required",
    PRECONDITION_FAILED = "Precondition Failed",
    PAYLOAD_TOO_LARGE = "Payload Too Large",
    URI_TOO_LONG = "URI Too Long",
    UNSUPPORTED_MEDIA_TYPE = "Unsupported Media Type",
    RANGE_NOT_SATISFIABLE = "Range Not Satisfiable",
    EXPECTATION_FAILED = "Expectation Failed",
    I_AM_A_TEAPOT = "I'm a teapot",
    UNPROCESSABLE_ENTITY = "Unprocessable Entity",
    LOCKED = "Locked",
    FAILED_DEPENDENCY = "Failed Dependency",
    TOO_EARLY = "Too Early",
    UPGRADE_REQUIRED = "Upgrade Required",
    PRECONDITION_REQUIRED = "Precondition Required",
    TOO_MANY_REQUESTS = "Too Many Requests",
    REQUEST_HEADER_FIELDS_TOO_LARGE = "Request Header Fields Too Large",
    UNAVAILABLE_FOR_LEGAL_REASONS = "Unavailable For Legal Reasons",

    // 5xx: Server Error
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    NOT_IMPLEMENTED = "Not Implemented",
    BAD_GATEWAY = "Bad Gateway",
    SERVICE_UNAVAILABLE = "Service Unavailable",
    GATEWAY_TIMEOUT = "Gateway Timeout",
    HTTP_VERSION_NOT_SUPPORTED = "HTTP Version Not Supported",
    VARIANT_ALSO_NEGOTIATES = "Variant Also Negotiates",
    INSUFFICIENT_STORAGE = "Insufficient Storage",
    LOOP_DETECTED = "Loop Detected",
    NOT_EXTENDED = "Not Extended",
    NETWORK_AUTHENTICATION_REQUIRED = "Network Authentication Required",

    // Custom Status Messages
    SUCCESS = "SUCCESS",
    INVALID_MAIL_FORMAT = "Invalid mail format",
    ACCOUNTALREADY = "This account has already been withdrawn",
    EMAIL_ALREADY_EXISTS = "This email is already",
    USER_NOT_FOUND = "User not found",
    WRONG_PASS = "Wrong email or password",
    EMAIL_TIMEOUT = "email authentication is time out",
    AUTHEN_NOT_MATCH = "The authentication code does not match.",
    INVALID_EMAIL = "Invalid email format",
}

export function getHttpStatusMessage(code: HttpStatusCode): HttpStatusMessage | undefined {
    const mapping: Record<HttpStatusCode, HttpStatusMessage> = {
        [HttpStatusCode.CONTINUE]: HttpStatusMessage.CONTINUE,
        [HttpStatusCode.SWITCHING_PROTOCOLS]: HttpStatusMessage.SWITCHING_PROTOCOLS,
        [HttpStatusCode.PROCESSING]: HttpStatusMessage.PROCESSING,

        [HttpStatusCode.OK]: HttpStatusMessage.OK,
        [HttpStatusCode.CREATED]: HttpStatusMessage.CREATED,
        [HttpStatusCode.ACCEPTED]: HttpStatusMessage.ACCEPTED,
        [HttpStatusCode.NON_AUTHORITATIVE_INFORMATION]: HttpStatusMessage.NON_AUTHORITATIVE_INFORMATION,
        [HttpStatusCode.NO_CONTENT]: HttpStatusMessage.NO_CONTENT,
        [HttpStatusCode.RESET_CONTENT]: HttpStatusMessage.RESET_CONTENT,
        [HttpStatusCode.PARTIAL_CONTENT]: HttpStatusMessage.PARTIAL_CONTENT,

        [HttpStatusCode.MULTIPLE_CHOICES]: HttpStatusMessage.MULTIPLE_CHOICES,
        [HttpStatusCode.MOVED_PERMANENTLY]: HttpStatusMessage.MOVED_PERMANENTLY,
        [HttpStatusCode.FOUND]: HttpStatusMessage.FOUND,
        [HttpStatusCode.SEE_OTHER]: HttpStatusMessage.SEE_OTHER,
        [HttpStatusCode.NOT_MODIFIED]: HttpStatusMessage.NOT_MODIFIED,
        [HttpStatusCode.TEMPORARY_REDIRECT]: HttpStatusMessage.TEMPORARY_REDIRECT,
        [HttpStatusCode.PERMANENT_REDIRECT]: HttpStatusMessage.PERMANENT_REDIRECT,

        [HttpStatusCode.BAD_REQUEST]: HttpStatusMessage.BAD_REQUEST,
        [HttpStatusCode.UNAUTHORIZED]: HttpStatusMessage.UNAUTHORIZED,
        [HttpStatusCode.PAYMENT_REQUIRED]: HttpStatusMessage.PAYMENT_REQUIRED,
        [HttpStatusCode.FORBIDDEN]: HttpStatusMessage.FORBIDDEN,
        [HttpStatusCode.NOT_FOUND]: HttpStatusMessage.NOT_FOUND,
        [HttpStatusCode.METHOD_NOT_ALLOWED]: HttpStatusMessage.METHOD_NOT_ALLOWED,
        [HttpStatusCode.NOT_ACCEPTABLE]: HttpStatusMessage.NOT_ACCEPTABLE,
        [HttpStatusCode.PROXY_AUTHENTICATION_REQUIRED]: HttpStatusMessage.PROXY_AUTHENTICATION_REQUIRED,
        [HttpStatusCode.REQUEST_TIMEOUT]: HttpStatusMessage.REQUEST_TIMEOUT,
        [HttpStatusCode.CONFLICT]: HttpStatusMessage.CONFLICT,
        [HttpStatusCode.GONE]: HttpStatusMessage.GONE,
        [HttpStatusCode.LENGTH_REQUIRED]: HttpStatusMessage.LENGTH_REQUIRED,
        [HttpStatusCode.PRECONDITION_FAILED]: HttpStatusMessage.PRECONDITION_FAILED,
        [HttpStatusCode.PAYLOAD_TOO_LARGE]: HttpStatusMessage.PAYLOAD_TOO_LARGE,
        [HttpStatusCode.URI_TOO_LONG]: HttpStatusMessage.URI_TOO_LONG,
        [HttpStatusCode.UNSUPPORTED_MEDIA_TYPE]: HttpStatusMessage.UNSUPPORTED_MEDIA_TYPE,
        [HttpStatusCode.RANGE_NOT_SATISFIABLE]: HttpStatusMessage.RANGE_NOT_SATISFIABLE,
        [HttpStatusCode.EXPECTATION_FAILED]: HttpStatusMessage.EXPECTATION_FAILED,
        [HttpStatusCode.I_AM_A_TEAPOT]: HttpStatusMessage.I_AM_A_TEAPOT,
        [HttpStatusCode.UNPROCESSABLE_ENTITY]: HttpStatusMessage.UNPROCESSABLE_ENTITY,
        [HttpStatusCode.LOCKED]: HttpStatusMessage.LOCKED,
        [HttpStatusCode.FAILED_DEPENDENCY]: HttpStatusMessage.FAILED_DEPENDENCY,
        [HttpStatusCode.TOO_EARLY]: HttpStatusMessage.TOO_EARLY,
        [HttpStatusCode.UPGRADE_REQUIRED]: HttpStatusMessage.UPGRADE_REQUIRED,
        [HttpStatusCode.PRECONDITION_REQUIRED]: HttpStatusMessage.PRECONDITION_REQUIRED,
        [HttpStatusCode.TOO_MANY_REQUESTS]: HttpStatusMessage.TOO_MANY_REQUESTS,
        [HttpStatusCode.REQUEST_HEADER_FIELDS_TOO_LARGE]: HttpStatusMessage.REQUEST_HEADER_FIELDS_TOO_LARGE,
        [HttpStatusCode.UNAVAILABLE_FOR_LEGAL_REASONS]: HttpStatusMessage.UNAVAILABLE_FOR_LEGAL_REASONS,

        [HttpStatusCode.INTERNAL_SERVER_ERROR]: HttpStatusMessage.INTERNAL_SERVER_ERROR,
        [HttpStatusCode.NOT_IMPLEMENTED]: HttpStatusMessage.NOT_IMPLEMENTED,
        [HttpStatusCode.BAD_GATEWAY]: HttpStatusMessage.BAD_GATEWAY,
        [HttpStatusCode.SERVICE_UNAVAILABLE]: HttpStatusMessage.SERVICE_UNAVAILABLE,
        [HttpStatusCode.GATEWAY_TIMEOUT]: HttpStatusMessage.GATEWAY_TIMEOUT,
        [HttpStatusCode.HTTP_VERSION_NOT_SUPPORTED]: HttpStatusMessage.HTTP_VERSION_NOT_SUPPORTED,
        [HttpStatusCode.VARIANT_ALSO_NEGOTIATES]: HttpStatusMessage.VARIANT_ALSO_NEGOTIATES,
        [HttpStatusCode.INSUFFICIENT_STORAGE]: HttpStatusMessage.INSUFFICIENT_STORAGE,
        [HttpStatusCode.LOOP_DETECTED]: HttpStatusMessage.LOOP_DETECTED,
        [HttpStatusCode.NOT_EXTENDED]: HttpStatusMessage.NOT_EXTENDED,
        [HttpStatusCode.NETWORK_AUTHENTICATION_REQUIRED]: HttpStatusMessage.NETWORK_AUTHENTICATION_REQUIRED,

        [HttpStatusCode.SUCCESS]: HttpStatusMessage.SUCCESS,
        [HttpStatusCode.INVALID_MAIL_FORMAT]: HttpStatusMessage.INVALID_MAIL_FORMAT,
        [HttpStatusCode.ACCOUNTALREADY]: HttpStatusMessage.ACCOUNTALREADY,
        [HttpStatusCode.EMAIL_ALREADY_EXISTS]: HttpStatusMessage.EMAIL_ALREADY_EXISTS,
        [HttpStatusCode.USER_NOT_FOUND]: HttpStatusMessage.USER_NOT_FOUND,
        [HttpStatusCode.WRONG_PASS]: HttpStatusMessage.WRONG_PASS,
        [HttpStatusCode.EMAIL_TIMEOUT]: HttpStatusMessage.EMAIL_TIMEOUT,
        [HttpStatusCode.AUTHEN_NOT_MATCH]: HttpStatusMessage.AUTHEN_NOT_MATCH,
        [HttpStatusCode.INVALID_EMAIL]: HttpStatusMessage.INVALID_EMAIL,
    };

    return mapping[code];
}







