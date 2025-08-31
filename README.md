# 📝 ToDo

![CI](https://img.shields.io/github/actions/workflow/status/Chopperino/ToDo/ci.yml?branch=main&label=CI)

A **RESTful ToDo API** built with **Node.js, Express, Prisma, and JWT authentication**.  
This project demonstrates **practical backend engineering skills** including three-layer architecture, validation, testing, and containerization.

---

## ✨ Features

- 🔐 Authentication & Authorization with **JWT**
- ✅ Request validation using **Zod**
- 📑 API documentation with **Swagger (OpenAPI)**
- 🗂️ Modular project structure (controllers, services, repositories, etc.)
- 🛠️ Database integration with **Prisma ORM**
- 🧪 Unit & Integration testing with **Jest & Supertest**
- 🐳 Dockerized for easy deployment

---

## 📂 Project Structure

```
src
 ├── controllers     # Route controllers (business logic entrypoints)
 ├── docs            # API documentation (Swagger/OpenAPI)
 ├── errors          # Custom error classes/handlers
 ├── middlewares     # Express middlewares (auth, validation, etc.)
 ├── repositories    # Data access layer (Prisma queries)
 ├── routes          # API routes definitions
 ├── schemas         # Validation schemas (Zod)
 ├── services        # Business logic
 ├── tests           # Unit & integration tests
 ├── app.js          # Express app configuration
 └── server.js       # App entry point
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional)
- [PostgreSQL](https://www.postgresql.org/)

### 📥 Installation

```bash
git clone https://github.com/Chopperino/ToDo.git
cd ToDo
npm install
```

### ⚙️ Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

### 🗄️ Database Setup

After installing dependencies, generate the Prisma client:

```bash
npx prisma generate
```

And sync database with schema:

```bash
npx prisma db push
```

---

## ▶️ Running the Project

### Local Development

```bash
node src/server.js
```

### With Docker

```bash
docker compose up --build
```

The server will run at:  
👉 `http://localhost:3000/api/v1/`

---

## 🧪 Testing

Run unit tests:

```bash
npm run test:unit
```

Run integration tests:

```bash
npm run test:int
```

---

## 📖 API Documentation

Once the app is running, Swagger docs are available at:

👉 `http://localhost:3000/api/v1/docs/`

---

## 🛠️ Tech Stack

- **Node.js** + **Express**
- **Prisma ORM**
- **JWT** for authentication
- **Zod** for validation
- **Swagger UI** for docs
- **Jest + Supertest** for testing
- **Docker** for containerization

---

## 👤 Author

- GitHub: [Chopperino](https://github.com/Chopperino)
- LinkedIn: [Denys Mamchyk](https://www.linkedin.com/in/denys-mamchyk-656187348/)

---
