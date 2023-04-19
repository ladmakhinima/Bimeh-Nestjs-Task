FROM node:18-alpine3.16

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . ./

COPY connector.sh /connector.sh

RUN chmod +x /connector.sh

CMD ["/connector.sh"]

RUN npx prisma db push

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]

EXPOSE 5000