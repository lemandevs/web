FROM node:lts as builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]