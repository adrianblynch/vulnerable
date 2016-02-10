# Vulnerable

Let's make an application that's open to all sorts of bad stuff.

## Why?

To learn my friend, to learn!

## Getting started

Install and start the server:

`npm install && npm start`

Now follow along below.

## What have you got?

### Directory traversals

`/files` lists the files we want to potentially serve: `["1.html", "2.html", "3.html"]`

`/files/1.html` kicks off a download of `1.html`.

Our application is so well known, people out there know that a `passwords.txt` file exists in the route of the application.

I wonder what this will do [http://localhost:8000/files/%2e%2e%2fpasswords.txt](http://localhost:8000/files/%2e%2e%2fpasswords.txt)?

We've effectively walked the directory back a level and chosen a different file to download.

Don't care for passwords? [Download some source code!](http://localhost:8000/files/%2e%2e%2findex.js)

More on [directory traversals](https://en.wikipedia.org/wiki/Directory_traversal_attack).

### Accidental file exposure

Similar to the above, accidentally exposing files is another thing to watch out for.

The list of files from `/files` is filtered to only show HTML files but...

[http://localhost:8000/files/.hidden](http://localhost:8000/files/.hidden)
