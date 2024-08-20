const wrapAsync = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) =>
            next(err)
        );
    };
};

export { wrapAsync };
