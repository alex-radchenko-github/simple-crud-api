# simple-crud-api

Link for task:
https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/simple-crud-api.md

The application runs on the 5000 port.

How to start the application (At startup, copy only commands without "-"):

- npm install
- Start options (<-This is not a command):
    - npm run start:dev
    - npm run start:prod
    - npm run build
    - npm run test

Как проверить 500 ошибку:
Ошибка 500 (Internal Server Error) — это внутренняя проблема сервера. Она возникает, когда браузер или другой клиент отправляет серверу запрос, а тот не может его правильно обработать.
Например у нас что-то не работает, не правильно работает, или просто что-то упустили.

Шаги:
- В postman в POST запросе пытаемся отправить запрос с ошибкой в JSON в body https://take.ms/SBZgo3 ,(удалена последняя фигурная скобка)
- получаем 500 ошибку тк у этого запроса нет валидации (Забыли например) JSON запрос что приводит к какой-то ошибке.

ЗА ЭТО БАЛЛЫ НЕ СНИЖАЮТСЯ, ТК НЕТ ТРЕБОВАНИЙ 400 ОШИБКИ ПРИ ВАЛИДАЦИИ JSON В ЗАПРОСЕ И ЭТО СДЕЛАНО СПЕЦИАЛЬНО ДЛЯ ПРИМЕРА 500 ОШИБКИ.

В PUT запросе валидация JSON уже присутствует и неправильный JSON запрос вызовит 400 ошибку https://take.ms/1FCKm , те ту которую мы ожидаем.