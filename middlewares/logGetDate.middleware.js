
export const logGetDate = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(`[GET Request] Time: ${req.currentDate}`);
    }
    next();
}