export const suspend = (promise: Promise<any>) => {
  let result: any;
  let status = "pending";

  const suspender = promise.then(
    (response) => {
      status = "success";
      result = response;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return () => {
    switch (status) {
      case "pending": {
        throw suspender;
      }
      case "error": {
        throw result;
      }
      default: {
        return result;
      }
    }
  };
};
