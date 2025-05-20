
# Translate App (Vue.js)

A single-page Vue.js application that translates English text to Hindi (and other languages) using the Free Google Translator API from RapidAPI.  
The app also maintains a history of the last 10 translated words/phrases in localStorage.

---

## Features

- Translate text between multiple languages (default English to Hindi)
- Displays translated text instantly
- Maintains a history of last 10 translations
- History persists across page reloads using localStorage
- Clear translation history button
- Language selection for source and target languages
- Text-to-speech functionality for translated text
- Proper error handling for API failures

---

## Demo

link:https://translate-app-self-nine.vercel.app/

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- A RapidAPI account with access to the [Free Google Translator API](https://rapidapi.com/ahmadrezaei/api/free-google-translator/)

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/translate-app.git
cd translate-app

2. Install dependencies:

npm install

3. Create a `.env` file in the project root and add your RapidAPI key:

VITE_RAPIDAPI_KEY=your_rapidapi_key_here

> **Note:** Never commit your `.env` file or API keys to version control.

4. Run the development server:

npm run dev

5. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

---

## Usage

- Enter the English text in the input box.
- Select the source and target languages.
- Click the **Translate** button.
- The translated text will appear below.
- Your translation history will show the last 10 translations.
- Use the **Clear** button to clear the history.
- Click the speaker icon to hear the translated text.

---

## Project Structure

![image](https://github.com/user-attachments/assets/612ae558-0743-44fb-8d11-7710ef6140b7)


---

## Testing

Unit tests are written using Vitest and Vue Test Utils.

Run tests with:

npm run test:unit

---

## Deployment

You can deploy this app easily on platforms like Netlify, Vercel, or Heroku.

Make sure to set the environment variable `VITE_RAPIDAPI_KEY` in your deployment settings.

---

## Contributing

Feel free to fork the repository and submit pull requests.

---

## License

MIT License

---

## Acknowledgments

- [Vue.js](https://vuejs.org/)
- [RapidAPI Free Google Translator](https://rapidapi.com/ahmadrezaei/api/free-google-translator/)


---

## Contact

For any queries, contact Aman Kumar Bind.
