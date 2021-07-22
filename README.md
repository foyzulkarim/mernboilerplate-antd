# Welcome to the RBAC MERN Boilerplate project
### _A MERN boilerplate repository with RBAC feature, following all production best practices._

In this repository I will keep adding the production best practices we should follow in a MERN (MongoDB, Express.js, React.js, and Node.js) project. 

## Technology stack
As the name suggests, this repository is built on top of Express.js and React.js, however in the implementation detail, we will find other supporting technologies as well. 

#### Client side

- [React] - A JavaScript library for building user interfaces
- [MongoDB] - The application data platform
- [Ant Design] - A design system for enterprise-level products. Create an efficient and enjoyable work experience
- [Testing Library] - React Testing Library
- [Axios] - Promise based HTTP client for the browser and node.js
- [Styled Components] - Visual primitives for the component age

#### Server side

- [Node.js] - evented I/O for the backend
- [Express.js] - Fast, unopinionated, minimalist web framework for Node.js
- [Mongoose] - mongoose
- [Swagger]
- [Jest]
- [Super Test]

Details frameworks and packages can be found in the package.json files in server and client directory.

## Run the application
This project can be run basically in two ways. One is using docker, other way is to run manually via vscode.
### Docker
##### Prerequisites
[x] Docker : To run `docker-compose` command

Go to the root of the repository and execute `npm start`. This will spin up the server and client containers along with the MongoDB instance inside of Docker environment. 

```sh
cd project-root
npm start
```

### Visual Studio Code 
##### Prerequisites
[x] Node.js : To run npm packages 
[x] Docker : To run MongoDB database

- To run via vscode, we should run the server and client side projects separately, and also make sure mongodb is up and running.
- Create a `.env` file inside of the `server` directory. Add the below entries
    ```
    DB_HOST=localhost
    DB_PORT=27017
    DB_NAME=appdb
    ```
#### Server commands
```sh
cd server
npm i
npm run db:up
npm start
```
#### Client commands
```sh
cd client
npm i
npm start
```

## Test client app
To view the client, open your browser and visit `http://localhost:3000` url.
For the demo purpose, the authentication and authorization is not controlled from database entry and purely handled in client side.

The system has a `role-based-access-control` system which is controlled by permissions assigned to the role. 
The system supports different types of permissions in the client side. 
Depending on the role, `side menu`, the actual page (`route`) can be visible or not. More of that, any individual control/components can also be enabled / disabled depending on the role as well. 

### Superman in the role of `SuperAdmin` 
To login as `SuperAdmin` we input `superadmin@example.com` as email and put anything as the password.
Upon login, the user should see superadmin's menus (Role, User, Resource, Permission) at the left side.

### Pikachu in the role of `User`
To login as `User`, we input any valid email and anything as password. 
Upon login, the user should see menus (Product, Customer) at the left side. 

### Change the permissions
Ideally we should handle the permissions in server side and store in database (mongodb), but for this demo, we will modify the data in the clint side and mimic the server side behavior. 
To change `User's` permission, go to `client/src/data/user-pikachu.json` and add/update entry in the permissions array. 
A sample permission entry is like 
```json
{
    "_id": "5c8d03505653de3f85aa1ff",
    "resourceName": "customers-add",
    "resourceType": "route",
    "isAllowed": true,
    "isDisabled": false
}
```

To disable a button, we can set `isDisabled  = true` like below
```json
{
    "_id": "5c8d0c505653de3985aa0f1",
    "resourceName": "product-edit-button",
    "resourceType": "button",
    "isAllowed": true,
    "isDisabled": true
}
```


## Test server api

To view the api, open your browser and visit `http://localhost:5000/api-docs` 
Ideally we should add all of the API endpoints into the swagger, but for the demo purpose, we only added Products API endpoint.  
To test the APIs, we can reuse the postman collection. Open `docs/rbac-mern-boilerplate.postman_collection.json` into [Postman](https://www.postman.com/) and you should see the endpoints with appropriate payloads. 

## Scripts

|  Project|Command  | Task | 
|--|--|--|
| root |`npm run build`  | Builds the containers  |
|root|`npm run start`|Start the projects and database in docker containers|
|server|`npm i`           | Install server side dependencies         |
|server|`npm run db:up`   | Start the database in a docker container|
|server|`npm run db:seed` | Seed products data into database|
|server|`npm run test`|Execute tests using `jest`|
|client|`npm i`|Install client side dependencies|
|client|`npm run start`| Start the react app|
|client|`npm run build`|Build the react app in production mode|
|client|`npm run test`|Execute tests using `Testing Library`|


## License
This project is [MIT licensed](https://github.com/facebook/react/blob/main/LICENSE).

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [Express.js]: <http://expressjs.com>
   [Docker]: <https://www.docker.com>
   [React]: <https://reactjs.org/>
   [MongoDB]: <https://www.mongodb.com/>
   [Ant Design]: <https://ant.design/>
   [Testing Library]: <https://testing-library.com/>
   [styled components]: <https://styled-components.com/>
   [Axios]: <https://github.com/axios/axios>
   [Mongoose]: <https://mongoosejs.com/>
   [Swagger]: <https://swagger.io/>
   [Jest]: <https://jestjs.io/>
   [Super test]: <https://github.com/visionmedia/supertest>
   