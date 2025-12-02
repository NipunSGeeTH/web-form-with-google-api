# SvelteKit Login to Google Sheets

This is a simple SvelteKit project that provides a login form. Upon successful login, it stores the username and timestamp in a Google Sheet.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Set up Google Sheets API:
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

3. Hardcoded users:
   - user1 to user4, all with password 'password' (for demo).

## Developing

```sh
npm run dev
```

## Building

```sh
npm run build
```
