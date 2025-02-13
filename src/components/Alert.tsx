import React from "react";

const Alert = () => {
  return (
    <div className="max-w-md mx-auto mt-4">
      <div
        className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <svg
          className="fill-current w-6 h-6 mr-4 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm.93 12h-1.86v-1.86h1.86V14zm0-3.86h-1.86V6h1.86v4.14z" />
        </svg>
        <span className="block sm:inline">
          Invalid login credentials. Please try again.
        </span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.934 2.935a1 1 0 01-1.414-1.415l2.935-2.934-2.935-2.934a1 1 0 011.414-1.415L10 8.586l2.934-2.935a1 1 0 011.414 1.415L11.414 10l2.935 2.934a1 1 0 010 1.415z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Alert;
