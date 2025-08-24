# ---------- Build stage ----------
FROM node:22-alpine3.22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN npx prisma generate

# ---------- Production stage ----------
FROM node:22-alpine3.22 AS prod

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app/prisma ./prisma

COPY --from=build /app/src ./src
COPY --from=build /app/package*.json ./

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && node src/server.js"]