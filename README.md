# HR Onboarding Form

The HR web application for the **HR Onboarding and Compliance Automation** project. HR staff use it to log a new hire, hiring managers use it to approve or reject the request, and HR tracks every onboarding on a dashboard.

**Live:** https://hr-onboarding-form.onrender.com/form

> The live site runs on Render's free tier, which sleeps when idle. The first visit after a quiet period can take up to about a minute to load.

## New onboarding request form
<img width="1920" height="957" alt="New onboarding request - Form" src="https://github.com/user-attachments/assets/dce46935-1fca-43c6-9608-380a42eaba7c" />

## Dashboard
<img width="1920" height="957" alt="Onboarding dashboard" src="https://github.com/user-attachments/assets/62ca3ba7-f87b-492e-8158-c623f340a88b" />

## What it does

| Page | Address | Used by | Purpose |
| --- | --- | --- | --- |
| Request form | `/form` | HR employee | Logs a new onboarding request |
| Approval page | `/approve/:id` | Hiring manager | Approves or rejects a request (the link is sent by email) |
| Dashboard | `/dashboard` | HR | KPI cards and a table of all new hires with their onboarding stage |
| New hire details | `/hires/:id` | HR | Details, people and the status of each document |

This app is one part of a larger solution. Once a request is logged, Zapier, DocuSign and an Infobip chatbot carry the new hire through signing their offer letter, employment contract and policy documents. This app only creates the request, records the manager's decision and displays progress. The rest is written to the database by the Zaps.

## Tech stack

- Node.js 22 and Express 5
- EJS templates (pages are rendered on the server)
- Supabase (PostgreSQL) through `@supabase/supabase-js`
- `express-validator` for form validation
- `dotenv` for local settings

## Getting started

### Prerequisites

- Node.js 22 and npm
- A Supabase project with the HR onboarding tables created and seeded with at least one job, one manager and one HR employee. The table definitions are in section 6.3 of the project documentation (Build and configuration guide).

### Install and run

```bash
git clone https://github.com/Olly-Codes/hr-onboarding-form.git
cd hr-onboarding-form
npm install
cp .env     # then fill in the two values
npm start
```

Open http://localhost:3000. You are redirected to `/form`, and the job and employee dropdowns should be filled from the database.

### Environment variables

| Variable | Description |
| --- | --- |
| `SUPABASE_URL` | The Supabase project URL |
| `SUPABASE_SECRET_KEY` | The Supabase secret key. It bypasses row level security, so keep it on the server and never commit it |
| `PORT` | Optional. Defaults to `3000`. Render sets it automatically |

## Project structure

```
├── app.js                      Starts the server, registers settings and routes
├── routes/indexRouter.js       Maps each address to a controller function
├── controllers/                Form, approval and dashboard logic
├── db/
│   ├── supabase.js             The shared database connection
│   └── queries.js              Every database query the app makes
├── utils/                      Dashboard calculations and the UUID check
├── views/                      EJS pages and the shared navigation partial
└── public/                     Stylesheet, form script and logo
```

The code follows the MVC pattern: routes decide where a request goes, controllers decide what happens, `db/` reads and writes data, and views produce the HTML.

## Routes

| Method | Address | Description |
| --- | --- | --- |
| GET | `/` | Redirects to `/form` |
| GET, POST | `/form` | Show the request form, validate and save a request |
| GET, POST | `/approve/:id` | Show a request, record Approved or Rejected (only while Pending) |
| GET | `/dashboard` | Dashboard |
| GET | `/hires/:id` | One new hire in detail |

## Deployment

Deployed as a Render web service connected to this repository.

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Build command | `npm install` |
| Start command | `npm start` |
| Environment | `SUPABASE_URL`, `SUPABASE_SECRET_KEY` |

Pushes to `main` redeploy automatically.

## Known limitations

- **No login.** This was built as a demonstration. Anyone with the address can use the form and dashboard, and anyone holding an approval link can decide that request.
- **Limited server-side validation.** Only the email address and phone number (`+27 12 345 6789`) are validated on the server. Required fields rely on the browser.
- **No automated tests.** The complete flow was tested by hand.
- **Free hosting.** The Render free tier sleeps when idle.

## Related

- Landing page and chat widget: https://github.com/Olly-Codes/hr-onboarding-assistant-landing
- Full setup, architecture and code documentation: see the project documentation package (sections 6 and 7).
