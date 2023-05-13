FROM node

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm","start"]