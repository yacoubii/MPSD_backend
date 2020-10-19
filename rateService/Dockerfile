FROM node:10
WORKDIR /app/rateService
COPY package.json /app/rateService
RUN npm install
COPY . /app/rateService
CMD ["npm","start"]