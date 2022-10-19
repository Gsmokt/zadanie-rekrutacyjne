import ballerina/http;

listener http:Listener httpListener = new (8080);

type User record {
    string email;
    string password;
    string id;
};

type UserLogin record {
    string email;
    string password;
};

type UserEmail record {
    string email;
};

User[] users = [
    {id: "ada787ds8adua89dys8dhsd98", email: "jacek@jacek.pl", password: "Password123"},
    {id: "ada787ds8adua89dys8dhd8ng", email: "adam@adam.pl", password: "Password123"},
    {id: "ada787ds8adua89dys8d73gbf", email: "karol@karol.pl", password: "Password123"}
];

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:4200"],
        allowCredentials: false,
        allowHeaders: [],
        exposeHeaders: [],
        maxAge: 84900
    }
}

service / on httpListener {

    resource function get users(http:Caller caller) returns error? {
        http:Response res = new;
        res.setJsonPayload(users.toJson());
        res.statusCode = 200;
        check caller->respond(res);
    }

    resource function get users/[string id](http:Caller caller) returns error? {
        http:Response res = new;
        User[] usr = users.filter(item => item.id === id);
        if usr.length() > 0 {
            res.setJsonPayload(usr[0].toJson());
            res.statusCode = 200;
        } else {
            res.setJsonPayload({"msg": "Nie znaleziono uzytkownika o podanym id."});
            res.statusCode = 404;
        }
        check caller->respond(res);
    }

    resource function post users(@http:Payload json payload, http:Caller caller) returns error? {
        json resp = payload.cloneReadOnly();
        User response = <User>resp;
        users.push(response);
        http:Response res = new;
        res.setJsonPayload({"msg": "Konto uzytkownika zostalo utworzone."});
        res.statusCode = 200;
        check caller->respond(res);
    }

    resource function post users/resetPassword(@http:Payload json payload, http:Caller caller) returns error? {
        json resp = payload.cloneReadOnly();
        UserEmail response = <UserEmail>resp;
        User[] usr = users.filter(item => item.email === response.email);
        http:Response res = new;
        if usr.length() > 0 {
            res.setJsonPayload({"msg": "Link do zmiany hasla zostal wyslany!"});
            res.statusCode = 202;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            check caller->respond(res);
        } else {
            res.setJsonPayload({"msg": "Wprowadzono niepoprawny email!"});
            res.statusCode = 400;
            check caller->respond(res);
        }
    }

    resource function post auth/login(@http:Payload json payload, http:Caller caller) returns error? {
        json resp = payload.cloneReadOnly();
        UserLogin response = <UserLogin>resp;
        User[] usr = users.filter(item => item.email === response.email && item.password === response.password);
        http:Response res = new;
        if usr.length() > 0 {
            res.setJsonPayload({"msg": "Zostales poprawnie zalogowany!"});
            res.statusCode = 200;
            check caller->respond(res);
        } else {
            res.setJsonPayload({"msg": "Wpisałes niepoprawny email lub haslo!"});
            res.statusCode = 401;
            check caller->respond(res);
        }
    }
}

