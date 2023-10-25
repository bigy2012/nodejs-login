module.exports = {
    response: (status, msg, data) => {
        return {
            "success": status,
            "error": status,
            "msg": msg,
            "data": data,
        }
    }
}