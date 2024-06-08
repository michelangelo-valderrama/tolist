const HTTP_STATUS = {
	/**
	 * Standard response for successful HTTP requests.
	 */
	OK_200: 200,
	/**
	 * The request has been fulfilled, resulting in the creation of a new resource.
	 */
	CREATED_201: 201,
	/**
	 * The request has been accepted for processing, but the processing has not been completed.
	 */
	NO_CONTENT_204: 204,
	/**
	 * The server successfully processed the request, but is not returning any content.
	 */
	BAD_REQUEST_400: 400,
	/**
	 * The request requires user authentication.
	 */
	UNAUTHORIZED_401: 401,
	/**
	 * The server understood the request, but refuses to authorize it.
	 */
	FORBIDDEN_403: 403,
	/**
	 * The server has not found anything matching the Request-URI.
	 */
	NOT_FOUND_404: 404,
	/**
	 * The request could not be completed due to a conflict with the current state of the resource.
	 */
	CONFLICT_409: 409,
	/**
	 * The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.
	 */
	UNPROCESSABLE_ENTITY_422: 422,
	/**
	 * The server encountered an unexpected condition that prevented it from fulfilling the request.
	 */
	INTERNAL_SERVER_ERROR_500: 500,
	/**
	 * The server does not support the functionality required to fulfill the request.
	 */
	NOT_IMPLEMENTED_501: 501
}

export default HTTP_STATUS
