# ReactMovieApp

## Description

ReactMovieApp is a web application that allows users to discover and search for movies. It utilizes the TMDB API to fetch movie data and provides a user-friendly interface for browsing trending movies and searching for specific titles. The application is built with React, Tailwind CSS, and Appwrite for backend services.

**This application is live at: [https://mhtbtanvir.github.io/ReactMovieApp/](https://mhtbtanvir.github.io/ReactMovieApp/)**

## Technologies Used

*   React
*   JavaScript
*   Tailwind CSS
*   Vite
*   Appwrite
*   TMDB API

## Setup/Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/mhtbtanvir/ReactMovieApp.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd my-first-react-app
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env` file in the project root and add your TMDB API key:

    ```
    VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY
    ```

    Replace `YOUR_TMDB_API_KEY` with your actual TMDB API key. You can obtain one from [https://www.themoviedb.org/](https://www.themoviedb.org/).

5.  Configure Appwrite:

    *   Set up an Appwrite account and create a new project.
    *   Create a database and a collection in Appwrite.
    *   Add `https://mhtbtanvir.github.io` as a platform in your Appwrite project settings (Platforms -> Add Web App). This is crucial for CORS to work correctly.
    *   Update the `src/appwrite.js` file with your Appwrite project ID, database ID, and collection ID.

## Usage

1.  Start the development server:

    ```bash
    npm run dev
    ```


3.  Browse trending movies on the homepage.

4.  Use the search bar to find specific movies by title.

## Project Structure



<pre>```📁 Project Structure├── public/│   ├── hero-bg.png           # Background image│   └── vite.svg              # Vite logo├── src/│   ├── components/│   │   ├── MovieCard.jsx     # Component for displaying movie information│   │   ├── Search.jsx        # Search bar component│   │   └── Spinner.jsx       # Loading spinner component│   ├── App.jsx               # Main application component│   ├── appwrite.js           # Appwrite configuration and functions│   ├── index.css             # Global styles│   └── main.jsx              # Entry point for the React application├── .env                      # Environment variables├── tailwind.config.js        # Tailwind CSS configuration├── vite.config.js            # Vite configuration├── package.json              # Project dependencies and scripts├── README.md                 # Project documentation└── ...```</pre>
## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

*   This project uses the TMDB API.
*  Appwrite for providing backend services.
