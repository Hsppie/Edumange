# EduManage 
## What the Application is 
--> a comprehensive School Management System web application designed to revolutionize the way educational institutions operate. 
Our solution aims to streamline administrative tasks, enhance communication, and improve the overall learning experience for students, teachers, and parents.

--> A school management system is a software application that is designed to streamline various administrative tasks within a school. 
This system is designed to automate a range of processes such as student enrolment, course scheduling, fee management, library management, attendance tracking, and more.

### Cloning the repository
--> Clone the repository using the command below :
```bash
git clone https://github.com/Hsppie/Edumange.git

```
--> Move into the directory where we have the project files : 
```bash
cd Edumange
```
--> Install packages:
```bash
npm install
```
--> ### Running the App:
```bash
npm run server
```
> ⚠ Then, the development server will be started at http://127.0.0.1:5500/

### Seperation of concerns:
```bash
## server.js
This runs the server

## app.js
Implements pure logic like how we can use middleware
we placed all the express code inside the app.js
```
### tools:
- VS code
- extensions - prettier code
- MongoDB
- Theme on VS code - Night Owl
- API testing with Postman
## app.js
```
Implements pure logic like how we can use middleware
we placed all the express code inside the app.js
```
### App Preview :


### Structure of the project:
```
- MVC design pattern
-> folder structure
    - config
    - app 
    - controllers
    - middlewares
    - routes
    - utils
    - .env
    - server.js
    - package.json
```
## Create server
```bash
- initialize with the npm init --yes
npm is used so we can use other packages like express, nodemon, package.json
package.json manages packages you are going to use for the project
```
## Install express
```bash
- npm i express
npm is used so we can use other packages like express, nodemon, package.json
package.json manages packages you are going to use for the project
```
## Install dependencies
```bash
- npm install nodemon mongoose -D
nodemon helps us restart our server anytime we make changes
```