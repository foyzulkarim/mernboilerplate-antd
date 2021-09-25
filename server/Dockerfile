FROM node:lts-alpine
RUN apk add --no-cache python g++ make
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk --no-cache --virtual build-dependencies add \
        python \
        make \
        g++
ENV NODE_ENV=production
RUN npm ci
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]