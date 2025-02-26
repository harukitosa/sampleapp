# Next.js and Supabase Starter Kit

Welcome to the Next.js and Supabase Starter Kit! This project provides a robust foundation for building applications with Next.js and Supabase, featuring authentication, company management, and more.

## Features

- **Authentication**: Secure user authentication with Supabase.
- **Company Management**: Manage company profiles and details.
- **Profile Input**: User profile input and management.
- **Theming**: Light and dark mode support with a theme switcher.
- **Environment Checks**: Automatic checks for necessary environment variables.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Rename `.env.example` to `.env.local` and update the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **Home Page**: Displays the hero component and main features.
- **Profile Input**: Accessible via `/profile-input`.
- **Companies**: Manage companies at `/companies`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
