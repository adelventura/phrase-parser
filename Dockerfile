FROM node:14

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV FILENAME="./moby-dick.txt"

CMD ["node", "index.js"]