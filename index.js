const Router = require("./src/Router.js");
const Application = require("./src/Application");
const PORT = process.env.PORT || 5000;

const app = new Application()

const router = new Router();

router.get('/person', (req, res) => {
    res.end('path /person')
})

app.addRouter(router)

app.listen(PORT, () => console.log(`Server start on ${PORT}`))

// const {v4, validate} = require('uuid');
// console.log(v4())
// console.log(validate('14b59bef-d968-4043-842d-d5d9f92179c8'))
// 14b59bef-d968-4043-842d-d5d9f92179 c8

