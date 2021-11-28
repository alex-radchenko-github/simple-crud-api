function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                try {
                    JSON.parse(body)
                    resolve(body);
                } catch (e) {
                    resolve('BAD JSON')
                }


            });

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {getReqData};
