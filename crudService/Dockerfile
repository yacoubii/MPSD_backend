FROM node:10
WORKDIR /app/crudService
COPY package.json /app/crudService
RUN npm install
COPY . /app/crudService
CMD ["npm","start"]