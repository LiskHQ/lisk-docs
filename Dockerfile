FROM node:lts

WORKDIR /app/website

EXPOSE 3000 35729
COPY . .
RUN yarn install
RUN yarn build

CMD ["yarn", "serve"]
