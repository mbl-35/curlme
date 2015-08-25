# curlme

Dockerfile of johndstein/curlme published to the public
[Docker Registry](https://registry.hub.docker.com/u/johndstein/curlme/).

Quickie file server.
A bit like https://curl.io
Deletes files immediately on download.

## Usage

Upload a file.

    $ curl -T my.file localhost:5000/my.file.with.unique.name

Secure upload.

    $ gpg -c my.file && \
      curl -T my.file.gpg \
      localhost:5000/my.file.with.unique.name

Download a file.

    $ curl -O localhost:5000/my.file.with.unique.name

## Running the Image

    $ docker run -d \
      -p 5000:5000 \
      --restart=always \
      johndstein/curlme
