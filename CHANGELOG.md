# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows semantic versioning principles where applicable.

---

## [v1.0.0] - 2026-01-29
### Added
- Initial release of the Work Location Tracker application
- PostgreSQL database schema initialization using `init.sql`
- Support for `pgcrypto` extension for UUID generation
- Core tables for users and work location tracking
- Indexes added to improve query performance on date, location, and user fields
- Dockerized PostgreSQL setup using Docker Compose
- Environment-based configuration for backend connectivity
- Basic frontend-backend integration via configurable API URL

### Infrastructure
- Docker Compose configuration for local development
- Port mapping for local database access
- Standardized environment variables for backend and frontend services

### Notes
- This release establishes the foundational data model and infrastructure
- Future releases will build on this schema and expand API and UI functionality

