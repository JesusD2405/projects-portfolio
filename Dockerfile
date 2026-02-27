FROM node:22-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

# Stage BUILD
FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build

# Stage PRODUCTION
FROM base as production
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
CMD node server.js

# Stage DEVELOPMENT
FROM base as development
ENV NODE_ENV=development
RUN npm i 
COPY . .
CMD npm run dev