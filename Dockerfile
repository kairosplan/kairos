# BUILD
FROM --platform=linux/amd64 node:lts AS build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# RUNTIME
FROM --platform=linux/amd64 node:lts-slim AS runtime

WORKDIR /app
COPY --from=build /app/package.json .
RUN npm install --production
COPY --from=build /app/dist ./dist
USER node

# Expose port
EXPOSE 4321

# Environment variables
ENV HOST=0.0.0.0
ENV PORT=4321

# START THE SERVER
CMD ["node", "./dist/server/entry.mjs"]