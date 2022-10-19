
// import ballerina/http;

// listener http:Listener httpListener = new (8080);

// type User record {
//     string author;
//     string todo;
// };

// User[] users = [{author: "jacek", todo: "pis tresci"}];

// service / on httpListener {
//     resource function get users() returns User[]|error? {

//         http:Response res = new;
//         res.statusCode = 200;
//         return users;
//     }
//     resource function get users/[string id]() returns int|error? {
//         // users.filter()
//         http:Response res = new;
//         res.statusCode = 200;
//         return res.statusCode;
//     }
//     resource function post users(@http:Payload json payload) returns int|error? {
//         json resp = payload.cloneReadOnly();
//         User response = <User>resp;
//         users.push(response);
//         http:Response res = new;
//         res.statusCode = 200;
//         return res.statusCode;
//     }
//     resource function post users/resetPassword(@http:Payload json payload) returns int|error? {
//         http:Response res = new;
//         res.statusCode = 200;
//         return res.statusCode;
//     }
//     resource function post auth/login(@http:Payload json payload) returns int|error? {
//         http:Response res = new;
//         res.statusCode = 200;
//         return res.statusCode;
//     }
// }
