{
    "version": 2,
    "builds": [
      { "src": "index.js", "use": "@vercel/node" },
      { "src": "/public/**/*", "use": "@vercel/static" }
    ],
    "routes": [
      {
        "src": "/css/(.*)",
        "dest": "/public/css/$1"
      },
      {
        "src": "/img/(.*)",
        "dest": "/public/img/$1"
      },
      {
        "src": "/js/(.*)",
        "dest": "/public/js/$1"
      },
      {
        "src": "/(.*)",
        "dest": "/index.js"
      }
    ]
  }