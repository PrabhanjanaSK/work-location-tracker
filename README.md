# Work Location Tracker

## What this project is about

## Project Vision

The vision of **Work Location Tracker** is to provide a simple, reliable, and transparent way for teams and individuals to track work locations (such as office, remote, or hybrid) without unnecessary complexity.

This project aims to:
- Make work location tracking easy to understand and use
- Help teams maintain clarity and accountability around where work is happening
- Serve as a learning-friendly, open-source project for contributors of all experience levels
- Encourage clean design, readable code, and thoughtful documentation

In the long term, **Work Location Tracker** strives to grow into a flexible and extensible solution that can adapt to different team workflows while remaining lightweight and beginner-friendly.

The project is built incrementally, starting with a backend-first approach.

---

## How We Use This in Our Team

In our team, we use **Work Location Tracker** as part of our daily Scrum routine.

During the daily Scrum meeting:
- We maintain a dummy work item dedicated to updating work location data
- This item is time-boxed to approximately 1 minute
- We treat it like any other regular work item
- Team members update their work location information
- Once updated, we move on to discuss the next work item

This approach keeps work location data up to date without adding extra meetings or overhead, and it naturally fits into our existing Scrum workflow.
This is just one way to use the tool. Teams are encouraged to adapt it to their own workflows.

---

## Project Structure

work-location-tracker/
├── backend/
├── frontend/
├── db/
└── README.md

---
## Database Setup
Execute this if you had previously run the container
docker compose down -v
To start the container
docker compose up -d
docker exec <docker flags> <container> <cmd to run inside the container>
Example:
docker exec -it worktracker-db psql -U postgres -d worktracker

## Backend Setup

### Install dependencies

```bash
cd backend
bun install
```

### Setup environment

Create a .env file inside the backend folder:

PORT=4000
DATABASE_URL=postgres://<user>:<password>@localhost:<port>/<database>

### Run backend

bun run dev

## Frontend setup

### Install dependencies

cd frontend
bun install

### Run frontend

Create a .env file inside the frontend folder:
VITE_API_URL=<Domain:Port>
Example:
VITE_API_URL=http://localhost:4000
bun run dev

---
## End User Guide?
Admin team has populated the DB with team's data (Team Member and Manager). 
Team members can signup and login and fill data.
Manager users cannot signup and can visualise data of their team members.
