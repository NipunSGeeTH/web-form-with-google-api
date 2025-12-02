# SvelteKit Login and Form Submission with JWT

This is a SvelteKit project that provides a login form with JWT-based authentication. Upon successful login, users are redirected to a form with 4 input fields (name, email, phone, address). The form data is stored in a Google Sheet, and all requests after login are validated using JWT tokens.

## Features
- **Login**: Authenticate with username and password (hardcoded users with bcrypt hashes).
- **JWT Authentication**: Secure sessions with HTTP-only cookies.
- **Protected Form**: Accessible only after login, with JWT validation.
- **Google Sheets Integration**: Store login timestamps and form submissions.

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```

2. Set up Google Sheets API and JWT:
   - Create a new Google Sheet and note its ID (from the URL).
   - Go to Google Cloud Console, create a project, enable Google Sheets API.
   - Create a service account, download the JSON key.
   - Set environment variables in `.env`:
     ```
     GOOGLE_SHEET_ID=your-sheet-id
     GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email
     GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     ```
     Note: The private key should be the full key with newlines as \n.
   - Add `JWT_SECRET` to `.env` with a strong secret key.

3. Hardcoded users:
   - user1 to user4, password: 'password'.

## Running
```sh
npm run dev
```
- Login at `/` with user1/password.
- After login, redirected to `/form` to submit data.

## Google Sheet Structure
- Column A: Username
- Column B: Login Timestamp
- Column C: Name
- Column D: Email
- Column E: Phone
- Column F: Address
- Column G: Submission Timestamp
