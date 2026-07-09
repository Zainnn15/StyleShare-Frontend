# Style Share

Full-stack MERN research platform built for Seneca Polytechnic (Feb 2024 to Feb 2025) to track garment wear, tear, and wash data across role-based user groups. Served **100+ users** in a live production deployment.

> This repository contains the React frontend. I built the platform as a Research Assistant and Full-Stack Developer under a supervising professor, coordinating a team of four junior developers.

## What it does

- **Garment tracking**: users log wear, tear, and wash events for garments in their wardrobe, and the research team analyzes usage patterns across the user base
- **Role-based access**: JWT authentication with distinct roles, where owners manage their own garments and admins oversee group-level data and analytics
- **Data export**: a Python pipeline generates Excel reports of garment usage and wear metrics, replacing the research team's manual data collection

## Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), React Router |
| Backend | Node.js, Express |
| Database | MongoDB |
| Auth | JWT, role-based authorization |
| Reporting | Python (Excel export pipeline) |

## My role

- Designed and implemented the role-based authentication and authorization model
- Built the data-export pipeline used by the research team
- Broke requirements into actionable tasks, reviewed code from four junior developers, and translated technical constraints into plain-language updates for the supervising professor

## Running locally

```bash
npm install
npm run dev
```

Requires the Style Share API running locally. Set the API base URL in `.env`.
