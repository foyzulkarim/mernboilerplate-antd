FROM node:latest as build
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
RUN npm install react-scripts
COPY . ./
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]

# production environment
# FROM nginx:stable-alpine
# COPY --from=build /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
