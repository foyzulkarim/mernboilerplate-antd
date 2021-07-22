FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]