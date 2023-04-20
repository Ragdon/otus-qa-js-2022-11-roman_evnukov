const axios = require('axios').default;
let userid, usertoken
test('Создание пользователя c ошибкой, логин уже используется', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "ragdon",
            "password": "34stringH#"
        },
        headers: {},
    };
    try {
        const resp = await axios(config);
    }
    catch (e) {
        expect(e.response.status).toEqual(406);
        expect(e.response.data.message).toEqual("User exists!");
    }
});

test('Создание пользователя c ошибкой, пароль не подходит', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "ragdon",
            "password": "34string"
        },
        headers: {},
    };
    try {
        const resp = await axios(config);
    }
    catch (e) {
        expect(e.response.status).toEqual(400);
        expect(e.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    }
});
test('Создание пользователя успешно', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "ragdonssss",
            "password": "356stringH#"
        },
        headers: {},
    };
    const resp = await axios(config);
    expect(resp.status).toEqual(201);
    userid = resp.data.userID
});
test('Генерация токена успешно', async () => {

    const resp_token = await axios({
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "ragdonssss",
            "password": "356stringH#"
        },
        headers: {},
    })
    expect(resp_token.status).toEqual(200);
    expect(resp_token.data.status).toBe("Success");
    usertoken = resp_token.data.token;
});


test('Генерация токена c ошибкой', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "ragdon",
            "password": "356stringH"
        },
        headers: {},
    };
    try {
        const resp = await axios(config);
    }
    catch (e) {
        expect(e.response.status).toEqual(400);
        expect(e.response.data.message).toEqual("User authorization failed.");
    }
});

test('Удаление пользователя', async () => {
    try {
        const config = {
            method: 'delete',
            url: `https://bookstore.demoqa.com/Account/v1/User/${userid}`,
            data: {
                "userName": "ragdonssss",
                "password": "356stringH#"
            },
            headers: { Authorization: `Bearer ${usertoken}` },
        };
        const resp = await axios(config);
        expect(resp.status).toEqual(204);
        expect(resp.statusText).toBe("No Content")
    }
    catch (error) {
        expect(error).toBe('error')
    }
});