# ===========================
# Stage 1: Build Stage
# ===========================
FROM node:18 AS builder

WORKDIR /app

# Copy dependency files for better caching
COPY package*.json ./
COPY yarn.lock ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./

# Detect and install dependencies based on available package manager
RUN if [ -f yarn.lock ]; then \
        corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable && pnpm install --frozen-lockfile; \
    else \
        npm install; \
    fi

# Copy the rest of the app and build
COPY . .
RUN if [ -f yarn.lock ]; then \
        yarn build; \
    elif [ -f pnpm-lock.yaml ]; then \
        pnpm run build; \
    else \
        npm run build; \
    fi

# ===========================
# Stage 2: Production Stage
# ===========================
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy build output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.* ./

# Install only production dependencies
RUN if [ -f yarn.lock ]; then \
        corepack enable && yarn install --production --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable && pnpm install --prod --frozen-lockfile; \
    else \
        npm install --omit=dev; \
    fi

EXPOSE 3000
CMD ["npm", "run", "start"]
