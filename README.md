# How database work ?
- We use MYSQL Database for storing information in some place. for initializing database we use docker container. use can see config in db/docker-compose.yml. 
# What should we do for installing database ?
- cd db
- sudo docker-compose up --build -d
- sudo docker exec -it container_id sh
- mysql -uroot -p -> after enter you must enter root as password
- alter user 'root'@'localhost' identified by 'your_password'
- show databases -> to see bimeh database
- use bimeh -> to enter in database
- GRANT ALL PRIVILEGES ON *.* TO 'bimeh'@'%' WITH GRANT OPTION
- npx prisma db push