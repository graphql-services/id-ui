FROM node:8.4.0 as builder
COPY . /code
RUN cd /code && yarn && yarn build


FROM inloopx/cra-docker
COPY --from=builder /code/build /app
