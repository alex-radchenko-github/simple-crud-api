const request = require("supertest")


const baseUrl = 'http://localhost:5000/person';


describe('E2E tests', () => {
    beforeAll(async () => {
        const allUsers = await request(baseUrl).get('');
        if (allUsers.body !== []) {
            for (let i = 0; i < Object.keys(allUsers.body).length; i++) {

                const response5 = await request(baseUrl)
                    .delete(`/${allUsers.body[i].id}`)
                expect(response5.statusCode).toBe(204);
            }
        }

    })
    afterAll(async () => {
        const allUsers = await request(baseUrl).get('');
        if (allUsers.body !== []) {
            for (let i = 0; i < Object.keys(allUsers.body).length; i++) {

                const response5 = await request(baseUrl)
                    .delete(`/${allUsers.body[i].id}`)
                expect(response5.statusCode).toBe(204);
            }
        }

    })
    it('E2E from cross-check', async () => {
        const response = await request(baseUrl).get('');
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject([])

        const response2 = await request(baseUrl)
            .post('')
            .send({"name": "test_E2E_name", "age": 333, "hobbies": ["333", "333"]});
        expect(response2.statusCode).toBe(201);
        expect(response2.body).toMatchObject({"name": "test_E2E_name", "age": 333, "hobbies": ["333", "333"]})

        const response3 = await request(baseUrl).get(`/${response2.body.id}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body).toMatchObject({
            "age": 333, "hobbies": ["333", "333"], "id": `${response2.body.id}`, "name": "test_E2E_name"
        })

        const response4 = await request(baseUrl)
            .put(`/${response2.body.id}`)
            .send({"name": "test_E2E_name_put", "age": 333, "hobbies": ["333", "333"]});
        expect(response4.statusCode).toBe(200);
        expect(response4.body).toMatchObject(
            {"id": `${response2.body.id}`, "name": "test_E2E_name_put", "age": 333, "hobbies": ["333", "333"]}
        )

        const response5 = await request(baseUrl)
            .delete(`/${response2.body.id}`)
        expect(response5.statusCode).toBe(204);

        const response6 = await request(baseUrl).get(`/${response2.body.id}`);
        expect(response6.statusCode).toBe(404);

    });
    it('E2E schema check', async () => {
        const response2 = await request(baseUrl)
            .post('')
            .send({"name": "E2E schema check", "age": 333, "hobbies": ["333", "333"]});
        expect(response2.statusCode).toBe(201);
        expect(response2.body).toMatchObject({"name": "E2E schema check", "age": 333, "hobbies": ["333", "333"]})

        const response3 = await request(baseUrl).get(`/${response2.body.id}`);
        expect(response3.statusCode).toBe(200);
        expect(response3.body).toMatchObject({
            "age": 333, "hobbies": ["333", "333"], "id": `${response2.body.id}`, "name": "E2E schema check"
        })
        expect(Object.keys(response3.body).length).toEqual(4)


    });
    it('E2E schema check after put', async () => {
        const response1 = await request(baseUrl)
            .post('')
            .send({"name": "E2E schema check after put", "age": 333, "hobbies": ["333", "333"]});
        expect(response1.statusCode).toBe(201);
        expect(response1.body).toMatchObject({
            "name": "E2E schema check after put",
            "age": 333,
            "hobbies": ["333", "333"]
        })


        const response2 = await request(baseUrl)
            .put(`/${response1.body.id}`)
            .send({"name": "test_E2E_name_put", "age": 333, "hobbies": ["333", "333"]});
        expect(response2.statusCode).toBe(200);
        expect(response2.body).toMatchObject(
            {"id": `${response2.body.id}`, "name": "test_E2E_name_put", "age": 333, "hobbies": ["333", "333"]}
        )
        expect(Object.keys(response2.body).length).toEqual(4)


    });


})
