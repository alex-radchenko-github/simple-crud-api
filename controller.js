const data = require("./data");
const {v4, validate} = require('uuid')


class Controller {
    async getAllUsers() {
        return new Promise((resolve, _) => resolve(data));
    }

    async getOneUser(id) {
        return new Promise((resolve, reject) => {
            let user
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    user = data[i]
                }
            }


            if (user) {
                resolve(user);
            } else {
                reject(`User with id ${id} not found `);
            }
        });
    }

    // creating a todo
    async createTodo(user) {
        return new Promise((resolve, _) => {
            let newUser = {
                id: v4(),
                ...user,
            }
            data.push(newUser)
            // return the new created todo
            resolve(newUser);

        });
    }

    // updating a todo
    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            //else, update it by setting completed to true
            todo["completed"] = true;
            // return the updated todo
            resolve(todo);
        });
    }

    // deleting a todo
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            // else, return a success message
            resolve(`Todo deleted successfully`);
        });
    }
}

module.exports = Controller;
