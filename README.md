# What is use case of this repo ?

- This repository is implemented in nestjs, mysql, prisma
- This repository implemented for testing of company to improve skill and ability
- So Come on lets do it now ...

# What tools and third party package use in this test ?

- Prisma (ORM)
- NestJS (Framework)
- Redis (In Memory Database)
- MySQL (Database)
- Supertest (E2E)
- Docker (Containerized Project And Dep)

# How can i use and run this project
- Well well well , docker is shine . with docker, you dont need to do anything, just install docker and docker-compose and after that run command below
- sudo docker-compose up --build -d
- above command, run created image for you and run the application and database and also redis

# What prisma module do ?
- The prisma module must config prisma core, means we want to add some configuration that must effect on all the application forexample instead of handle any single endpoint for 404 exception, we use middleware in prisma to do it for us 