FROM gitpod/workspace-full

# disable angular analytics
ENV NG_CLI_ANALYTICS=false

# Docker build does not rebuild an image when a base image is changed, increase this counter to trigger it.
ENV TRIGGER_REBUILD 3

RUN npm install -g @angular/cli 