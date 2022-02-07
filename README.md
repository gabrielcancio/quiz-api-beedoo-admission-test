## :computer: Project
This project was developed for a selective process of a Job at Beedoo. Basically, this project is an api developed in Node.js to register questions and alternatives(quizz). 

---

## :rocket: Stack
### **Main:**
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Knex.js](https://knexjs.org/)
- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [ESLint](https://eslint.org/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)

### **Software development process**
- Test-driven development

---

## :zap: Running
1. You can run the application running the follow command:
```bash
$ docker-compose up -d
```
2. You can view the application logs with the following command:
```bash
$ docker-compose logs app
```
3. If you have any problem run the following command:
```bash
$ docker-compose restart app
*Obs: (You need the [docker](https://www.docker.com/) and the [docker-compose](https://docs.docker.com/compose/) already have been installed).*

---

## ⚙️ Functional Requirements and Business Rules
<br>
- Listar todas as PERGUNTAS com suas respectivas opções de RESPOSTA.

- It should be able to create a new question.
    - It should not be able to create a question with invalid content(Empty).
- It should be able to list all questions
- It should be able to update the content property of an existing question.
    - It should not be able to update the content of a non-existent question.
    - It should not be able to update an invalid content(Empty).
- It should be able to delete an question.
    - It should not be able to delete a non-existent question.
---
- It should be able to create a new alternative.
    - It should not be able to create a alternative to a non-existent question.
    - It should not be able to create a alternative with a invalid content.
    - It should not be able to create a alternative with a content already was used.
- It should be able to list alternatives of a specific question.
    - It should not be able to list question of a non-existing question.
- It should be able to update the content property of an existing alternative.
    - It should not be able to update the content of a non-existent alternative.
    - It should not be able to update an invalid content(Empty).
- It should be able to delete an alternative.
    - It should not be able to delete a non-existent alternative.

---
Developed with :green_heart: by Gabriel Cancio!