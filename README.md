# Next.js Therapist Chatbot

This is a demonstration of using Meta's LLaMA 3.5 model through [OpenRouter.ai](https://openrouter.ai/) to create a therapist chatbot. The application showcases the power of prompt engineering and LLM API usage.

## Live Demo

The app is hosted on Vercel. Check out the live demo [here](https://your-vercel-link).

## Features

- **Next.js** for the front-end framework.
- **Meta's LLaMA 3.5** for natural language processing.
- **OpenRouter.ai** API integration.
- Chatbot designed to simulate a therapy session.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- npm or yarn
- API key from [OpenRouter.ai](https://openrouter.ai/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abhinavpklg/AI-Therapist.git
   cd AI-Therapist
   ```
2. **Install the dependencies:**
   ```
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   ```
   touch .env.local
   ```

   Add the following line to the .env.local file:
   ```
   OPENROUTER_API_KEY=your-api-key
   ```
   Replace your-api-key with your actual API key from OpenRouter.ai.


### Running the App Locally

1. **Start the development server:**
   ```
   npm run dev
   # or
   yarn dev
   ```
2. **Open http://localhost:3000 in your browser to view the app**


### Deployment

   The app is set up to be deployed on Vercel. You can deploy it by connecting the GitHub repository to Vercel.