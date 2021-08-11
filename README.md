# Sticky Snippets

A CRUD-application that handles code snippets.<br/>
This application was developed as part of the course 1dv023 at Linnaeus University.

## ⚡️ Quick start

First of all, clone the repository in the terminal to get started.

```bash
git clone git@github.com:Effeboii/Sticky-Snippets.git (SSH)
git clone https://github.com/Effeboii/Sticky-Snippets.git (HTTPS)
```

```bash
# Enter the folder
cd Sticky-Snippets

# Install the packages
npm install

# Create a .env file in the root directory with the following properties
COOKIE_NAME = "YOUR_COOKIE_NAME_HERE"
COOKIE_SECRET = "YOUR_COOKIE_SECRET_HERE"
DB_CONNECTION_STRING = "YOUR_MONGODB_CONNECTION_STRING_HERE"

# Start the application
npm start

# Navigate to localhost
[localhost:3000](http://localhost:3000)
```

That's all you need to know to start! 🎉

## 💻 Techniques

The application was built with

- CSS
- HTML
- Handlebars
- Express
- Mongoose
- MongoDB

## ✅ Features

The application supports the following features

- Login/registration
- Add snippet with tags
- Edit/delete snippets
- View other users snippets
