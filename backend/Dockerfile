# ---- Build stage ----
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY database ./database

RUN npm run build

# ---- Production stage ----
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/database ./database

USER node

EXPOSE 4000

CMD ["node", "dist/server.js"]