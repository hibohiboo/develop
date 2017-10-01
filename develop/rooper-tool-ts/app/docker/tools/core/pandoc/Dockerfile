FROM haskell:8.0

# will ease up the update process
# updating this env variable will trigger the automatic build of the Docker image
ENV PANDOC_VERSION "1.19.2.1"

# install pandoc
RUN cabal update
RUN cabal install pandoc-${PANDOC_VERSION}
WORKDIR /home/workdir