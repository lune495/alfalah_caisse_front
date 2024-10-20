FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .

# ARG env
# RUN npm run build --mode $env
RUN npm run build
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app/alfalah
COPY nginx.conf /etc/nginx/nginx.conf
