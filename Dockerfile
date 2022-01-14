FROM node:lts as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:lts

WORKDIR /app

COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "yarn", "start" ]