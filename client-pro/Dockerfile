FROM node:lts-alpine as build
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package*.json ./
COPY . ./
RUN yarn
RUN yarn build

EXPOSE 8001
CMD [ "yarn", "serve" ]

# production environment
# FROM nginx:stable-alpine
# COPY --from=build /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
