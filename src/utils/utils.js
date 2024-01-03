
const sendResponse = (res, data) => {
    const response = { "error": 0, "message": "", "data": data }
    res.json(response);
}

const sendResponseMassage = (res, message, data) => {
    const response = { "error": 0, "message": message, "data": data }
    res.json(response);
}


const sendResponseAsError = (res, err) => {
    console.log(err);
    const response = { "error": 1, "message": err, "data": [] }
    res.json(response);
}

function executeQuery(conn, query, fields) {
    return new Promise((resolve, reject) => {
        conn.query(query, fields, (err, result) => {
            if (err) {
                reject(err.message);
                return;
            }
            if (result.affectedRows == 0 || result.length == 0) {
                reject("Id not found");
                return;
            }
            resolve(result);
        });
    });
}

module.exports = { sendResponse, sendResponseAsError, sendResponseMassage, executeQuery }