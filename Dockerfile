# ================================
# Stage 1: Build stage
# ================================
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Install dependencies based on package manager
RUN corepack enable && \
    if [ -f yarn.lock ]; then yarn install; \
    elif [ -f pnpm-lock.yaml ]; then pnpm install; \
    else npm install; fi

# Copy the rest of the project
COPY . .

# Detect framework and build
RUN echo "Detected React/Next/Vite project" && \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
    else npm run build; fi


# ================================
# Stage 2: Production stage
# ================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

# Copy package files
COPY --from=builder /app/package*.json ./

# Copy only existing build outputs (Next.js)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./ 

# Install production dependencies (supports npm, yarn, pnpm)
RUN corepack enable && \
    if [ -f yarn.lock ]; then \
        echo "Using Yarn"; \
        yarn install --production --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then \
        echo "Using PNPM"; \
        pnpm install --prod --frozen-lockfile; \
    else \
        echo "Using NPM"; \
        npm install --omit=dev --legacy-peer-deps; \
    fi

# Default command
CMD ["npm", "start"]
