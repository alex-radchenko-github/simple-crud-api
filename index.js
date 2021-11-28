const http = require("http");
const User = require("./controller");
const {getReqData} = require("./utils");
const {validate} = require('uuid')
const {checkIdInData} = require("./src/checkIdInData");


const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === "/person" && req.method === "GET") {
            const users = await new User().getAllUsers();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(users));
        } else if (req.url === "/person/" + req.url.split("/")[2] && req.method === "GET") {
            try {
                const id = req.url.split("/")[2];
                if (!validate(id)) {
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    return res.end(`Error: Not valid ID`);

                } else if (checkIdInData(id) === undefined) {
                    res.writeHead(404, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({error: `No user with id ${id} found`}));
                } else {
                    const user = await new User().getOneUser(id);
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(user));
                }
            } catch (e) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify('500 Internal Server Error'));

            }

        } else if (req.url === "/person/" + req.url.split("/")[2] && req.method === "DELETE") {
            try {
                const id = req.url.split("/")[2];
                if (!validate(id)) {
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    return res.end(`Error: Not valid ID`);

                } else if (checkIdInData(id) === undefined) {
                    res.writeHead(404, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({error: `No user with id ${id} found`}));
                } else {
                    let message = await new User().deleteUser(id);
                    res.writeHead(204, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(message));
                }

            } catch (e) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify('500 Internal Server Error'));
            }


        } else if (req.url === "/person/" + req.url.split("/")[2] && req.method === "PUT") {
            try {
                const id = req.url.split("/")[2];
                if (!validate(id)) {
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    return res.end(`Error: Not valid ID`);

                } else if (checkIdInData(id) === undefined) {
                    res.writeHead(404, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({error: `No user with id ${id} found`}));
                } else {
                    let new_user_data = await getReqData(req);
                    if (new_user_data === 'BAD JSON') {
                        res.writeHead(400, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({error: `Unexpected end of JSON input`}));

                    } else {
                        let updated_user = await new User().updateUser(id, JSON.parse(new_user_data));
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify(updated_user));

                    }
                }

            } catch (e) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify('500 Internal Server Error'))
            }

        } else if (req.url === "/person" && req.method === "POST") {
            try {
                let user_data = await getReqData(req);

                let userDataForCheck = JSON.parse(user_data)

                if (!userDataForCheck.name || !userDataForCheck.age || !userDataForCheck.hobbies || Object.keys(userDataForCheck).length > 3) {
                    res.writeHead(400, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({error: `Required fields are missing or wrong request scheme`}));
                } else {
                    let user = await new User().createUser(JSON.parse(user_data));
                    res.writeHead(201, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(user));
                }

            } catch (e) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify('500 Internal Server Error'));
            }

        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: "Route not found"}));
        }

    } catch (e) {
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify('500 Internal Server Error'));
    }

});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
