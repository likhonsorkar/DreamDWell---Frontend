# 🏠 DreamDwell - Premium Property Rental Ecosystem

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dreamdwell.vercel.app)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)

> A modern, full-stack property rental platform designed with a focus on seamless user experience, visual elegance, and robust functionality.

---

## 📖 Project Overview

**DreamDwell** is a sophisticated property rental ecosystem designed to bridge the gap between tenants and property owners. Built with a focus on high-end aesthetics and zero-friction interactions, it provides a comprehensive suite of tools for discovering homes, managing listings, and streamlining the rental process.

### → What it does
DreamDwell transforms the often chaotic rental market into a structured, visually-driven experience. It allows property owners to create detailed listings with high-resolution galleries, while tenants can search with precision and submit rental requests in seconds. The platform serves as a centralized hub for the entire rental lifecycle—from initial discovery to final rental acceptance.

---

## ✨ Key Features

### 🌟 For Tenants
- **Advanced Discovery:** Filter properties by category (Family, Bachelor, Office, etc.), price range, bedrooms, and location.
- **Visual Exploration:** Interactive property details with high-quality image galleries powered by Swiper.
- **Smart Requests:** Integrated "Request to Rent" system with real-time status tracking.
- **Trusted Reviews:** Community-driven feedback and rating system for informed decision-making.

### 🏢 For Property Owners
- **Intuitive Dashboard:** A centralized command center to manage listings, track requests, and monitor property performance.
- **Multi-Step Listing Creation:** A streamlined process for adding property details followed by batch image uploads.
- **Request Management:** Accept or cancel rental requests with automated status updates.
- **Financial Overview:** Integrated wallet system and payment history tracking.

### 🛡️ For Administrators
- **Verification Pipeline:** Review and approve property listings to ensure platform quality.
- **User Governance:** Manage user roles and maintain platform integrity.
- **Platform Analytics:** High-level overview of system activity and growth.

---

## 🚀 Tech Stack

- **Core:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS 4.0, DaisyUI (Premium components)
- **State & Data:** TanStack Query (React Query) for server-state, Context API for UI-state
- **Routing:** React Router 7 (Data APIs)
- **Animations:** Framer Motion (Staggered entrances, layout transitions)
- **Icons:** Lucide React
- **Forms:** React Hook Form (with Zod-like validation patterns)
- **Networking:** Axios with centralized interceptors

---

## 🔌 API Integration Overview

DreamDwell utilizes a centralized service layer to maintain clean separation between UI and data logic.

- **Centralized Client:** An `apiClient` (Axios) manages base URLs and global configurations.
- **JWT Authentication:** Automatic token injection via request interceptors:
  ```javascript
  config.headers.Authorization = `JWT ${access}`;
  ```
- **Error Handling:** Global response interceptors handle 401 Unauthorized errors and token expirations.
- **Service Hooks:** Custom hooks (like `useAuth`) encapsulate complex API logic, providing a clean interface for components to interact with backend resources (Ads, Reviews, Profiles).
- **Multipart Data:** Specialized handling for image uploads using `FormData` and batch processing.

---

## 🧠 Challenges & Solutions

### 1. Synchronous Multi-Image Uploading
**Challenge:** Property listings require multiple high-resolution images, which can lead to UI blocking or partial failures if handled incorrectly.
**Solution:** Implemented a batch upload strategy using `Promise.all` with `FormData`. This ensures that all images are processed as a single logical unit while providing progress feedback to the user.

### 2. Complex State Management in Dashboards
**Challenge:** Managing real-time updates for rental requests, property status, and user profiles across different dashboard views.
**Solution:** Leveraged **TanStack Query** for efficient caching and "stale-while-revalidate" data fetching. This reduced redundant API calls and ensured that the dashboard always reflects the latest backend state without manual refreshes.

### 3. Dynamic Multi-Step Forms
**Challenge:** The `AddProperty` process involves multiple steps (details first, then assets), requiring persistent state between views.
**Solution:** Structured the `AddProperty` component as a state-driven machine. Upon successful property creation, the `adsId` is stored in local state, triggering a smooth transition to the gallery upload interface without navigating away, thus preserving context.

### 4. Responsive Data Tables & Grids
**Challenge:** Displaying complex property data and request lists across mobile and desktop devices.
**Solution:** Created a custom grid-based layout using Tailwind 4, transitioning from simplified list views on mobile to comprehensive data tables on desktop, ensuring no loss of functionality on smaller screens.

---

## 🎨 Design Philosophy

DreamDwell is built with a **Premium Minimalist** aesthetic:
- **Glassmorphism:** Subtle blur effects and layered UI for a modern depth.
- **Micro-interactions:** Smooth, staggered entrance animations powered by Framer Motion.
- **Skeleton Loading:** Intelligent placeholder states for zero-friction data fetching.

---

## 📄 License

This project is licensed under the MIT License.

<p align="center">
  Made with ❤️ by <strong>MD. Likhon Sorkar</strong> Website: <a href="https://www.likhon.com.bd">Likhon.com.bd</a>
</p>
