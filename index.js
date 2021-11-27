const http = require("http");
const User = require("./controller");
const {getReqData} = require("./utils");
const {v4, validate} = require('uuid')


const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {

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

            } else {
                const user = await new User().getOneUser(id);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(user));


            }

        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    }

    // /api/todos/:id : DELETE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[2];
            // delete todo
            let message = await new User().deleteTodo(id);
            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the message
            res.end(JSON.stringify({message}));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, {"Content-Type": "application/json"});
            // send the error
            res.end(JSON.stringify({message: error}));
        }
    }

    // /api/todos/:id : UPDATE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[2];
            // update todo
            let updated_todo = await new User().updateTodo(id);
            // set the status code and content-type
            res.writeHead(200, {"Content-Type": "application/json"});
            // send the message
            res.end(JSON.stringify(updated_todo));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, {"Content-Type": "application/json"});
            // send the error
            res.end(JSON.stringify({message: error}));
        }
    } else if (req.url === "/person" && req.method === "POST") {
        try {
            let todo_data = await getReqData(req);
            let todo = await new User().createTodo(JSON.parse(todo_data));
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(todo));

        } catch (e) {
            res.writeHead(500, {"Content-Type": "application/json"});
            //send the todo
            res.end(JSON.stringify('500 ошибка'));
        }


        // // get the data sent along
        // let todo_data = await getReqData(req);
        // // create the todo
        // let todo = await new User().createTodo(JSON.parse(todo_data));
        // // set the status code and content-type
        // res.writeHead(201, {"Content-Type": "application/json"});
        // //send the todo
        // res.end(JSON.stringify(todo));
    }

    // No route present
    else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Route not found"}));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
