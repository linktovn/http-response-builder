/**
 * Enum representing HTTP status codes.
 *
 * This enum includes standard HTTP status codes as well as custom application-specific codes.
 */
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
  INVALID_MAIL_FORMAT = 4001,
  ACCOUNTALREADY = 4002,
  EMAIL_ALREADY_EXISTS = 4003,
  USER_NOT_FOUND = 4004,
  WRONG_PASS = 4005,
  SUCCESS = 4000,
  EMAIL_TIMEOUT = 4006,
  AUTHEN_NOT_MATCH = 4007,
  REQUIRED_TYPE = 4010,
  BAD_REQUEST_TYPE = 4008,
  CONFLICT_NICKNAME = 4009,
  NICKNAME_INVALID = 4011,
  NICKNAME_ALREADY_TAKEN = 4012,
  NO_DATA_EXISTS = 4013,

  // error 41xx
  FAIL = 4100,
  BUSSINED_INFO_ERROR = 4101,
  PLEASE_TRY_AGAIN_LATER = 4102,
  INVALID_EMAIL = 4108,
  INVALID_PHONE_NUMBER_FORMAT = 4109,
  INVALID_PASSWORD = 4110,

  // error 42xx
  SOURCING_REQUEST_FAILED_CREATE = 4200,
  CREATE_MALL_FAILED = 4201,

  // error 43xx
  TOKEN_EXPIRED = 4300,

  // error 45xx
  CALL_AXIOS_ERROR = 4500,
  // error 49xx
  CONFLICT_CODE = 4900,
  // error 50xx
  INTERNAL_SERVER_ERROR_CODE = 5000,
  REDIS_ERROR = 5001,
  // error 51xx
  SMS_OTP_FAILD = 5100,
  // error 70xx
  CONFLICT_CELEB = 7001,

  LT_BADREQUEST = 400000,
  /**Sai dữ liệu user */
  LT_BADREQUEST_USER = 400001,
  /**Sai dữ liệu yêu cầu */
  LT_BADREQUEST_SOURCING_REQUEST = 400002,
  /**Sai dữ liệu sản phẩm contract */
  LT_BADREQUEST_MATCHING_CONTRACT_DEAL = 400003,
  /**Sai dữ liệu giới hạn */
  LT_BADREQUEST_LIMIT = 400004,
  /**Sai dữ liệu danh mục */
  LT_BADREQUEST_CATEGORY = 400005,
  /**Sai dữ liệu sản phẩm */
  LT_BADREQUEST_PRODUCT = 400006,
  /**Đang cập nhật dữ liệu user,*/
  LT_BADREQUEST_USER_CRAWLING = 400007,
  /**Đang cập nhật dữ liệu sản phẩm*/
  LT_BADREQUEST_PRODUCT_CRAWLING = 400008,
  /**Dữ liệu sns không hợp lệ. vùi long cập nhật lại thông tin sns */
  LT_BADREQUEST_USER_CRAWLING_FALSE = 400009,
  /**Sourcing request đã được hoàn thành*/
  LT_BADREQUEST_SOURCING_REQUEST_IS_COMPELED = 400010,
  /**Sản phẩm hiện chưa có chính sách vận chuyển. Vui lòng thêm chính sách vận chuyển vào sản phẩm */
  LT_BADREQUEST_SHIPPING_POLICY = 400011,
  /**Đường dẫn không hợp lệ*/
  LT_BADREQUEST_PATH_INVALID = 400012,
  /**Địa chỉ không khả dụng. (bao gồm cả những từ bị cấm)*/
  LT_BADREQUEST_PATH_FORBIDDEN = 400013,
  /**Có sản phẩm có số lượng hàng tồn kho không đủ. Vui lòng kiểm tra lại số lượng sản phẩm và thử lại.*/
  LT_BADREQUEST_PRODUCT_INSUFFICIENT_STOCK = 400014,
  /**Bạn không có đủ điểm quy đổi*/
  LT_BADREQUEST_POINT_INSUFFICIENT = 400015,
  /**Không hỗ trợ phân tích bài viết này*/
  LT_BAD_REQUEST_ARTICLE_NOT_SUPPORTED = 400016,
  /**Sản phẩm không còn được bán.*/
  LT_BADREQUEST_PRODUCT_NOT_ON_SALE = 400017,
  /**Google Vertex AI Invalid Argument*/
  LT_BADREQUEST_GOOGLE_VERTEX_INVALID_ARGUMENT = 400018,
  /**Google Vertex AI Failed Precondition*/
  LT_BADREQUEST_GOOGLE_VERTEX_FAILED_PRECONDITION = 400019,
  /**Kho hàng này đang được sử dụng */
  LT_BADREQUEST_WAREHOUSE_USED = 400020,
  /**Bạn chưa cài đặt hoa hồng bán lại của sản. vui lòng tạo yêu cầu mới*/
  LT_BADREQUEST_RESELL_COMMISSION_NOT_SET = 400021,
  /**Vui lòng chọn seller*/
  LT_BADREQUEST_SELLER_NOT_SELECTED = 400022,
  /**Chưa xác thực otp*/
  LT_BADREQUEST_NOT_VERIFY_OTP = 400023,
  /**Sourcing request đã hoàn thành, không thể cập nhật thêm*/
  LT_BADREQUEST_SOURCING_REQUEST_COMPLETED = 400024,
  /**URL đã hết hạn*/
  LT_BADREQUEST_URL_EXPIRED = 400025,
  /**OTP đã hết hạn*/
  LT_BADREQUEST_OTP_EXPIRED = 400026,
  /**OTP không hợp lệ*/
  LT_BADREQUEST_OTP_INVALID = 400027,
  /**Đang có sản phẩm sử dụng chính sách này. Vui lòng đổi các sản phẩm sang chính sách khác.*/
  LT_BADREQUEST_SHIPPING_POLICY_DELETE = 400028,
  /**Bạn không có quyền xóa chính sách vận này*/
  LT_BADREQUEST_SHIPPING_POLICY_DELETE_NOT_ALLOWED = 400029,

  LT_NOTFOUND = 404000,
  /**Không tìm thấy user*/
  LT_NOTFOUND_USER = 404001,
  /**Không tìm thấy yêu cầu*/
  LT_NOTFOUND_SOURCING_REQUEST = 404002,
  /**Không tìm thấy sản phẩm contract*/
  LT_NOTFOUND_MATCHING_CONTRACT_DEAL = 404003,
  /** Không tìm thấy sản phẩm */
  LT_NOTFOUND_PRODUCT = 404004,
  /** Không tìm thấy chính sách vận chuyển */
  LT_NOTFOUND_SHIPPING_POLICY = 404005,
  /** Không tìm thấy danh mục */
  LT_NOTFOUND_CATEGORY = 404006,
  /**Không có dữ liệu về chính sách bán hàng.*/
  LT_NOTFOUND_SALE_POLICY = 404007,
  /**Chưa có prompt sản phẩm, vui lòng tạo một prompt cho sản phẩm*/
  LT_NOTFOUND_PRODUCT_PROMPT = 404008,
  /**Google Vertex AI Not Found*/
  LT_NOTFOUND_GOOGLE_VERTEX_NOT_FOUND = 404009,
  /**Không tìm thấy vận đơn*/
  LT_NOTFOUND_SHIPMENT = 404010,

  LT_CONFLICT = 409000,
  /**User đã tồn tại*/
  LT_CONFLICT_USER = 409001,
  /**Bạn đã tạo yêu cầu*/
  LT_CONFLICT_SOURCING_REQUEST = 409002,
  /** Bạn không thể tạo yêu cầu sản phẩm ứng vì sản phẩm đã được bán chung */
  LT_CONFLICT_MATCHING_CONTRACT_DEAL = 409003,
  /**Domain đã tồn tại*/
  LT_CONFLICT_PATH = 409004,
  /**nickname đã tồn tại*/
  LT_CONFLICT_NICKNAME = 409005,
  /**Đã tồn tại chính sách*/
  LT_CONFLICT_SHIPPING_POLICY = 409006,
  /**Đang có sản phẩm sử dụng chính sách này. Vui lòng đổi các sản phẩm sang chính sách khác.*/
  LT_CONFLICT_SHIPPING_POLICY_DELETE = 409007,
  /**This order cannot be processed.*/
  LT_CONFLICT_ORDER_NOT_PROCESSED = 409008,

  /**Bạn không có quyền truy cập*/
  LT_FORBIDDEN_ACCESS = 403001,
  /**Token không có quyền truy cập*/
  LT_FORBIDDEN_ACCESS_TOKEN = 403002,
  /**Google Vertex AI Permission Denied*/
  LT_FORBIDDEN_GOOGLE_VERTEX_PERMISSION_DENIED = 403003,

  /**Access token hến hạn, cần được cấp lại mới*/
  LT_RESET_CONTENT_TOKEN = 205001,

  /**Google Vertex AI Resource Exhausted*/
  LT_TOO_MANY_REQUESTS_GOOGLE_VERTEX_RESOURCE_EXHAUSTED = 429001,

  /**Google Vertex AI Cancelled*/
  LT_BADREQUEST_GOOGLE_VERTEX_CANCELLED = 499002,

  /**Unknown error*/
  LT_UNKNOWN_GOOGLE_VERTEX_ERROR = 500001,

  /**Unavailable error*/
  LT_UNAVAILABLE_GOOGLE_VERTEX_ERROR = 503001,

  /**Deadline exceeded*/
  LT_DEADLINE_GOOGLE_VERTEX_EXCEEDED = 504001,
}

export function getEnumKeyByValue<T extends { [key: string]: any }>(
  enumObj: T,
  value?: number
): { key?: string; value?: number } | null {
  const key = Object.keys(enumObj).find((k) => enumObj[k] === value);

  if (!key) {
    return null;
  }

  return {
    key,
    value,
  };
}
