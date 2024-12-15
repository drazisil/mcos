# specify the node base image with your desired version node:<version>
FROM node:20.17.0
# replace this with your application's default port
EXPOSE 3000 6660 7003 8228 8226 8227 
EXPOSE 9000 9001 9002 9003 9004 9005 9006 9007 9008 9009 9010 9011 9012 9013 9014 
EXPOSE 43200 43300 43400 53303

RUN corepack enable
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

USER node

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/


# Set the entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]