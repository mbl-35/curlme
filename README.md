# curlme

Dockerfile of johndstein/curlme published to the public
[Docker Registry](https://registry.hub.docker.com/u/johndstein/curlme/).

Quickie file server. Stores files in ```/data/files``` on image.
Deletes files immediately on download.
A bit like https://curl.io

## Usage

Upload a file.

    $ curl -F "file=@my.file" localhost:5000/my.file.with.unique.name

Secure upload.

    $ gpg -c my.file && \
      curl -F "file=@my.file.gpg" \
      localhost:5000/my.file.with.unique.name

Download a file.

    $ curl -O localhost:5000/my.file.with.unique.name

## Running the Image

    $ docker run -d \
      -p 5000:5000 \
      -v /home/ubuntu:/data/files \
      --restart=always \
      johndstein/curlme
