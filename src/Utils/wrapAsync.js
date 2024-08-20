export default (fn) => {
    return async (req, res, next) => {
        try {
            const result = await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export { wrapAsync };
