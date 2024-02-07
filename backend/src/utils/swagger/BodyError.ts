export const bodyErrorSwagger = (code: number, type_error: string) => {
  return {
    properties: {
      statusCode: { type: 'number', example: code },
      error: { type: 'string', example: type_error },
      message: {
        type: 'array',
        items: { type: 'string' },
      },
    },
  };
};
