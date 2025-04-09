
# 📁 Simple Project Management with Laravel, Pusher, and PrimeReact

This is a simple project management system built with **Laravel** (backend) and **React** (frontend), using **PrimeReact** for UI components.

---

## 🛠️ Tech Stack
- **Laravel**: v12  
- **React**: v19  
- **PHP**: 8.3.17  
- **Node**: 22.6.0

---


## 🚀 Installation

### 📦 Backend (Laravel)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sharp0904/CLink_TEST.git
   cd server
    ```
2. **Install PHP dependencies:**
    ```bash
    composer install
    ```
3. **Set up environment variables:**
    ```bash
    cp .env.example .env
    ```
4. **Generate application key:**
    ```bash
    php artisan key:generate
    ```
5. **Configure your database:**
    ```ini
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    ```
6. **Run database migrations and seed:**
    ```bash
    php artisan migrate
    php artisan db:seed --class=ProjectTaskSeeder
    ```
7. **Configure Pusher:**
    ```bash
    PUSHER_APP_ID=your_pusher_app_id
    PUSHER_APP_KEY=your_pusher_app_key
    PUSHER_APP_SECRET=your_pusher_app_secret
    PUSHER_APP_CLUSTER=your_pusher_cluster
    ```
8. **Start the backend server:**
    ```bash
    php artisan serve
    ```
    Laravel backend will be running at http://localhost:8000

### 💻 Frontend (React)

1. **Navigate to the frontend directory:**
    ```bash
    cd ../client
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start the frontend server:**
   ```bash
    npm start
    ```
    React frontend will be running at http://localhost:3000

### 📋 Usage
- The backend handles API requests.
- The frontend communicates with the backend and displays task/project data.
- Open http://localhost:3000 to start managing your projects.

### 🤝 Contributing
I would appreciate any feedback or contributions!
Feel free to fork the repo, create a pull request, or open an issue.

### 🙏 Thanks!
Thank you for checking out this project!
Happy building! 🚀