# User Management and Notification Microservices

This project consists of two microservices working together via RabbitMQ:

1. **User Service** – Responsible for user registration, login, and managing user statuses.
2. **Notification Service** – Listens for user-related events and sends push notifications to [https://webhook.site](https://webhook.site).

## Features

- Register and login users
- Admin can update user statuses (e.g., `accepetd`, `rejected`, `pending`, etc.)
- When a user is created or their status is changed, a notification is sent through a delayed job to `https://webhook.site`
- Microservices communicate asynchronously via RabbitMQ
- Swagger API documentation available for the User Service

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Create .env Files
Root .env (used by Docker Compose):

example: 

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=users_db

RABBITMQ_URL=amqp://rabbitmq:5672
RABBITMQ_QUEUE=notification-service-queue

WEBHOOK_URL=https://webhook.site/73459ef1-5a6a-49dd-8e6d-9410de8e0c55

### 3. Run the Project
To build and start all services with Docker Compose:

```agsl
docker-compose up --build
```

### API Documentation
Once the services are up, visit:

Swagger UI: http://localhost:3001/api/docs

Here you can explore and test all available endpoints provided by the User Service.

Microservice Communication Flow
When a user registers, a user.created event is sent to RabbitMQ.

When an admin updates a user's status, a user.status.updated event is sent.

The Notification Service listens to these events and sends a push notification to the webhook URL with a delay.

The notifications include the user's name, email, and current status.

Technologies Used
NestJS

PostgreSQL

RabbitMQ

Bull (for delayed jobs)

Docker & Docker Compose

Swagger (OpenAPI)