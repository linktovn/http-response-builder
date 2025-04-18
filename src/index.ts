import { getEnumKeyByValue, HttpStatusCode } from "./response-code";

export {
    HttpStatusCode
};

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
    private data?: T | any;
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
    private status?: HttpStatusCode;
    private message?: string;
    private data?: T | any;
    private paging?: Paging;
    private metadata?: Record<string, any>;

    constructor(status?: HttpStatusCode) {

        const result = getEnumKeyByValue(HttpStatusCode, status);
        this.setStatus(status)
        this.setMessage(result?.key)
    }

    static customResponse<T = any>() {
        return new HttpResponseBuilder<T>();
    }

    static continue<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.CONTINUE);
    }

    static switchingProtocols<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.SWITCHING_PROTOCOLS);
    }

    static processing<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PROCESSING);
    }

    static ok<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.OK);
    }
    static success<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.SUCCESS);
    }

    static created<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.CREATED);
    }

    static accepted<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.ACCEPTED);
    }

    static nonAuthoritativeInformation<T = never>() {
        return new HttpResponseBuilder<T>(
            HttpStatusCode.NON_AUTHORITATIVE_INFORMATION,
    
        );
    }

    static noContent<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NO_CONTENT);
    }

    static resetContent<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.RESET_CONTENT);
    }

    static partialContent<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PARTIAL_CONTENT);
    }

    static multipleChoices<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.MULTIPLE_CHOICES);
    }

    static movedPermanently<T = never>()  {
        return new HttpResponseBuilder<T>(HttpStatusCode.MOVED_PERMANENTLY);
    }

    static found<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.FOUND);
    }

    static seeOther<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.SEE_OTHER);
    }

    static notModified<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NOT_MODIFIED);
    }

    static temporaryRedirect<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.TEMPORARY_REDIRECT);
    }

    static permanentRedirect<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PERMANENT_REDIRECT);
    }

    static badRequest<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.BAD_REQUEST);
    }

    static unauthorized<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.UNAUTHORIZED);
    }

    static paymentRequired<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.PAYMENT_REQUIRED);
    }

    static forbidden<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.FORBIDDEN);
    }

    static notFound<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NOT_FOUND);
    }

    static internalServerError<T = never>() {
        return new HttpResponseBuilder<T>(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
    
        );
    }

    static notImplemented<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.NOT_IMPLEMENTED);
    }

    static badGateway<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.BAD_GATEWAY);
    }

    static serviceUnavailable<T = never>() {
        return new HttpResponseBuilder<T>(
            HttpStatusCode.SERVICE_UNAVAILABLE,
    
        );
    }

    static gatewayTimeout<T = never>() {
        return new HttpResponseBuilder<T>(HttpStatusCode.GATEWAY_TIMEOUT);
    }

    setData(data: T | any) {
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

    setStatus(status?: HttpStatusCode) {
        if(typeof status === "undefined"){
            return this;
        }

        if (typeof status === 'number') {
            if((status >= 100 && status <= 599) || status >= 4000){
                this.status = status;
                return this;
            }else{
                throw new TypeError('Invalid status: Status code must be between 100 and 599, or >= 4000 for custom codes');
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
        if (!this.message && this.status) {
            const statusMessage = getEnumKeyByValue(HttpStatusCode,this.status)?.key;
            if (statusMessage) {
                this.message = statusMessage;
            }
        }
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

    getData(): T | any | undefined {
        return this.data;
    }

    getPaging(): Paging | undefined {
        return this.paging;
    }
}









