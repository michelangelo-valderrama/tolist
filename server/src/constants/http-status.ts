const HTTP_STATUS = {
	/**
	 * Standard response for successful HTTP requests.
	 */
	OK: 200,
	/**
	 * The request has been fulfilled, resulting in the creation of a new resource.
	 */
	CREATED: 201,
	/**
	 * The request has been accepted for processing, but the processing has not been completed.
	 */
	NO_CONTENT: 204,
	/**
	 * The server successfully processed the request, but is not returning any content.
	 */
	BAD_REQUEST: 400,
	/**
	 * The request requires user authentication.
	 */
	UNAUTHORIZED: 401,
	/**
	 * The server understood the request, but refuses to authorize it.
	 */
	FORBIDDEN: 403,
	/**
	 * The server has not found anything matching the Request-URI.
	 */
	NOT_FOUND: 404,
	/**
	 * The server encountered an unexpected condition that prevented it from fulfilling the request.
	 */
	INTERNAL_SERVER_ERROR: 500,
	/**
	 * The server does not support the functionality required to fulfill the request.
	 */
	NOT_IMPLEMENTED: 501
}

export default HTTP_STATUS
