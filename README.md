# JournalMatcher

## How to install

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository and run `npm install` to install the dependencies.

2. Run `npm run dev` to start the development server.

3. Create a `.env` file in the root of the project and add the variables according to the `.env.example` file.

4. Open your browser and navigate to `http://localhost:3000`

## Thought Process

After reading carefully through the task requirements, I immediately started to think how I could structure this project.

### Authentication

I began by planning the authentication system and decided to create an authProvider. This provider will manage the application's state and display the JournalMatcher form only if the user is authenticated. Initially, the app will send a request to the API to fetch tokens and store them as httpOnly cookies. The provider will check for these tokens in the cookies; if they are absent, it will request them from the API and set them as cookies. Additionally, the provider will obtain the client's IP address and include it in the state, which will be used when creating a submission.

### Submissions

Once the user is authenticated, they will be presented with a form where they can enter their journal's title and abstract. Upon form submission, a request will be sent to the API to create a submission. If the request is successful, the user will be redirected to the results page with an ID parameter. This parameter will be used by the results page to retrieve all available journal results for the submission.

### Results

After obtaining the results, I decided to set them in their own provider (resultsProvider) to manage state and provide functions for manipulating the results to all descendant components. This provider includes functions for sorting and filtering the results based on user preferences. The filters, such as language and journal access, are rendered according to the available results. The user can select the filters they want to apply, and the results will be updated accordingly.

## Improvements and Future Enhancements

If I had more time, I would have made other enhancements to the application, such as:

1. Form Validation:

   - I would have added real-time validation to provide instant feedback to users as they fill out the form fields by adding a state for each field and updating it as the user types.

2. Use `swr` or `tanStack query` libraries to handle the data fetching and cache the results for better performance.

3. Implement an action that uses the refresh token mechanism to keep the user authenticated for each request. The refresh token is stored in the cookies but is not used in the current implementation.

4. Add tests to ensure the application works as expected.

## Demo

Here is a link to the deployed application:

- [Journal Matcher](https://ubiquity-coding-test.vercel.app/)
