const data = require("./data");
const {v4} = require('uuid')


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

    async createUser(user) {
        return new Promise((resolve, _) => {
            let newUser = {
                id: v4(),
                ...user,
            }
            data.push(newUser)
            resolve(newUser);

        });
    }

    async updateUser(id, new_user_data) {
        return new Promise((resolve, reject) => {
            let userIndex
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    userIndex = i
                    break
                }
            }

            let updatedUser = {
                id: id,
                "name": new_user_data.name,
                "age": new_user_data.age,
                "hobbies": new_user_data.hobbies
            }

            if (userIndex === undefined) {
                reject(`No user with id ${id} found`);
            } else {
                data[userIndex] = updatedUser
                resolve(updatedUser);

            }

        });
    }

    async deleteUser(id) {
        return new Promise((resolve, reject) => {

            let userIndex
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    // userIndex = data[i].id
                    userIndex = i
                }
            }

            if (userIndex === undefined) {
                reject(`No user with id ${id} found`);
            } else {
                data.splice(userIndex, 1)


            }
            resolve(`User deleted successfully`);
        });
    }
}

module.exports = Controller;
