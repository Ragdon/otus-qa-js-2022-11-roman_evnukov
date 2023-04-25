import config from "../framework/config/config.js";
import account from "../framework/services/user.js";

describe("Библиотеки для тестирования API", () => {
  const credentials = config.credentials;
  let user = {};
  let token = '';
  test("Создание пользователя, положительный тест", async () => {
    const res = await account.user(credentials);
    expect(res.status).toEqual(201);
    user = res.body;
    token = await account.getAuthToken(credentials);
    console.log(user)
  });
  test("Создание пользователя, отрицательный тест (ошибка 406)", async () => {
    const body = {
      "code": "1204",
      "message": "User exists!"
    };
    const res = await account.user(credentials);
    expect(res.status).toEqual(406);
    expect(res.body).toEqual(body);
  });
  test("Создание пользователя, отрицательный тест (ошибка 400)", async () => {
    const body = {
      code: "1300",
      message: "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    }
    const res = await account.user({
      userName: 'ragdonit',
      password: 'Tfdjfk[ '
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual(body);
  });
  test("Получение токена", async () => {
    const payload = {
      userName: 'ragdonit',
      password: 'Sufurrs7890#'
    }
    const userData = await account.user(payload);
    const res = await account.generateToken(payload);
    await account.deleteUser(userData.body.userID, res.body.token);
    expect(res.status).toEqual(200);
    expect(res.body.token).not.toBe(null);
    expect(typeof res.body.token).toEqual('string')
  });
  test("Получение токена для несуществующего пользователя", async () => {
    const res = await account.generateToken({
      userName: 'ragdonitddfer',
      password: 'Tfdjfk[ '
    });
    expect(res.status).toEqual(200);
    expect(res.body.token).toBe(null);
  });
  test("Прорверка авторизации пользователя", async () => {
    const res = await account.authorized(credentials);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(true);
  });

  test("Прорверка авторизации пользователя без данных", async () => {
    const res = await account.authorized();
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ code: '1200', message: 'UserName and Password required.' });
  });

  test(`Получение информации о пользователе`, async () => {
    const res = await account.userInfo(user.userID, token);
    console.log(user.userID, token)
    expect(res.status).toEqual(200);
    expect(res.body.username).toEqual(user.username);
  });
  test(`Ошибка получении информации о пользователе, не верный ID`, async () => {
    const res = await account.userInfo("?:98709", token);
    expect(res.status).toEqual(302);
    //console.log("result   ", res.body)
    expect(res.body).toEqual({});
  });
  test(`Ошибка получении информации о пользователе, не верный токен`, async () => {
    const res = await account.userInfo(user.userID, "message");
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1200", message: "User not authorized!" });
  });
  test(`Ошибка удаления пользователя, не верный токен`, async () => {
    const res = await account.deleteUser(user.userID, "message");
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1200", message: "User not authorized!" });
  });
  test(`Ошибка удаления пользователя, не верный ID`, async () => {
    const res = await account.deleteUser("98709", token);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ code: "1207", message: "User Id not correct!" });
  });
  test(`Удачное удаление пользователя`, async () => {
    const res = await account.deleteUser(user.userID, token);
    expect(res.status).toEqual(204);
  });

  test("Проверка, что пользователя нет", async () => {
    const res = await account.authorized({
      userName: credentials.userName,
      password: credentials.password
    });
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ "code": "1207", "message": "User not found!" });
  });
});