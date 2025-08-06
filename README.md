# Wifmart

## 📌 Overview
Wifmart is an online marketplace that connects **service providers** with **clients**.  
Service providers can create profiles, showcase portfolios, and allow clients to search and hire them.  
The platform will make hiring easier by enabling skill-based and name-based searches.

---

## 🚀 Tech Stack
- **Frontend**: Vite + React (JSX)
- **Styling**: TailwindCSS
- **Backend / Database**: Supabase (Auth, Database, Storage)
- **Email Service**: Mailtrap (for email verification, password reset, and notifications)

---

## 🎯 Features

### 🔑 Authentication
- Sign up with email & password
- Email verification
- Login & logout
- Password reset via email

### 👤 Service Provider Profiles
- Name, bio, skills, and services
- Contact info: phone, WhatsApp, portfolio link
- Profile picture (Supabase Storage)

### 🖼 Portfolio Showcase
- Upload up to **5 images**
- Optional external portfolio/social media links

### 🔍 Search
- **Skill-based** search
- **Name-based** search

### 📬 Email Notifications
- Welcome email
- Email verification
- Password reset

---

## 🗄 Database Structure (Supabase)

### `users` Table
| Column          | Type      | Description |
|----------------|-----------|-------------|
| id             | UUID      | Primary key |
| name           | TEXT      | Full name |
| email          | TEXT      | User email |
| password_hash  | TEXT      | Hashed password |
| bio            | TEXT      | Short description |
| phone          | TEXT      | Contact number |
| whatsapp       | TEXT      | WhatsApp link |
| portfolio_link | TEXT      | Link to external portfolio |
| profile_image  | TEXT      | URL of profile picture |
| created_at     | TIMESTAMP | Signup date |

### `services` Table
| Column      | Type      | Description |
|-------------|-----------|-------------|
| id          | UUID      | Primary key |
| user_id     | UUID      | FK → users.id |
| skill       | TEXT      | Skill name |
| category    | TEXT      | Category of service |
| description | TEXT      | Details of the service |

### `portfolios` Table
| Column      | Type      | Description |
|-------------|-----------|-------------|
| id          | UUID      | Primary key |
| user_id     | UUID      | FK → users.id |
| image_url   | TEXT      | URL to portfolio image |
| link        | TEXT      | Optional external link |

---

## 🗂 Supabase Storage
- **Buckets**
  - `profile-images` → Profile pictures
  - `portfolio-images` → Portfolio samples
- Files named as: `userId_timestamp.extension`
- Public access for portfolios, private (optional) for profile images

---

## 📄 Pages

### Public
- **Home** → Search + featured providers
- **Service List** → Search results & filters
- **Profile View** → Provider details + portfolio

### Auth
- Sign Up (email verification)
- Login
- Forgot Password

### Dashboard (Logged-in Users)
- Profile settings
- Manage services
- Upload/edit portfolio

---

## 📧 Email Integration (Mailtrap)
- **Sign-up verification** email
- **Password reset** email
- **Welcome** email
- SMTP config for testing

---

## 📆 Development Plan
1. Setup Vite + React + Tailwind
2. Configure Supabase + Mailtrap
3. Build authentication flow
4. Create profile management
5. Add services & portfolio upload
6. Implement search
7. Style UI + make responsive
8. Testing & deployment

---

## 🔮 Future Enhancements
- Ratings & reviews
- Location-based search
- Payment integration
- In-app messaging
- Advanced filters

---

## 🏗 Project Goal
To create a fast, easy-to-use marketplace that connects service providers and clients while simplifying the hiring process.

---
