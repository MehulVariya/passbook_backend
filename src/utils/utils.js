
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
        conn.execute(query, fields).then(
            ([result]) => {
                console.log(result);
                if (result.affectedRows == 0 || result.length == 0) {
                    reject("Id not found");
                    return;
                }
                resolve(result);
            }
        ).catch(err =>  {
            console.log(err);
            reject("Id not found");
        });
    });
}

module.exports = { sendResponse, sendResponseAsError, sendResponseMassage, executeQuery }