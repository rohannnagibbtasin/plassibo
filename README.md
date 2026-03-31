<div align="center">

  <img src="public/logo.svg" alt="Plassibo Logo" width="80" height="80" />

  <h1>Plassibo</h1>

  <p>
    A modern, full-stack task management platform built for teams.<br/>
    Organize work across workspaces, projects, and tasks — with Table, Kanban, and Calendar views.
  </p>

  <p>
    <a href="https://plassibo.vercel.app"><strong>🚀 View Live Demo »</strong></a>
  </p>

  <p>
    <a href="https://plassibo.vercel.app">Live App</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/rohannnagibbtasin/plassibo/issues">Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/rohannnagibbtasin/plassibo/issues">Request Feature</a>
  </p>

  <br/>

  ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
  ![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)
  ![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📸 Screenshots

<div align="center">

| Sign In | Sign Up |
|:---:|:---:|
| ![Sign In](https://github.com/user-attachments/assets/3b3278e5-aa91-4c3d-8de0-69d879520694) | ![Sign Up](https://github.com/user-attachments/assets/1362ab34-64fc-4d97-8ef8-fd1932e6e88e) |

| Workspace Home | Create Workspace |
|:---:|:---:|
| ![Home](https://github.com/user-attachments/assets/770441ea-449f-4fda-a10b-6995e96301cc) | ![Create Workspace](https://github.com/user-attachments/assets/124c8532-cd28-4486-8251-e7de0d716f45) |

| Table View | Kanban View |
|:---:|:---:|
| ![Table](https://github.com/user-attachments/assets/1a2679a1-9959-4c9c-8cfc-32b27e0ed1af) | ![Kanban](https://github.com/user-attachments/assets/71808558-a2dd-4372-962d-5548dae3accb) |

| Calendar View | My Tasks |
|:---:|:---:|
| ![Calendar](https://github.com/user-attachments/assets/d81da799-09d9-4d28-9215-0de19e1fa07c) | ![My Tasks](https://github.com/user-attachments/assets/6015dd3b-f1ab-405e-92be-ee391e8462a6) |

| Create Task | Members |
|:---:|:---:|
| ![Create Task](https://github.com/user-attachments/assets/e86189df-c34a-467e-a395-a87457844c26) | ![Members](https://github.com/user-attachments/assets/6ddbef0f-9705-4bfd-bd3a-7cea8b2252b9) |

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 💡 About The Project

Plassibo is a full-stack task management web application inspired by tools like Jira and Linear. It gives teams a clean, fast workspace to track tasks across projects — with powerful filtering, multiple views, and real-time collaboration built in.

Key motivations behind building Plassibo:

- 🎯 Clean, distraction-free UI for task management
- 🏗️ Demonstrate real-world full-stack architecture with **Next.js App Router** + **HonoJS** backend
- 🔐 Secure, custom auth with **Appwrite** (no third-party auth SaaS dependency)
- ⚡ Type-safe end-to-end with **TypeScript**

---

## ✨ Features

### 🔐 Authentication
- Email/password login and registration
- OAuth via **Google** and **GitHub**
- Protected routes with session management via Appwrite

### 🏢 Workspaces
- Create and manage multiple isolated workspaces
- Invite team members via shareable invite links
- Reset invite links anytime for security
- Custom workspace icon upload
- Workspace settings and danger zone (delete)

### 📁 Projects
- Create projects inside a workspace with a custom icon
- Edit and update project details at any time

### ✅ Tasks
- Create tasks with: name, due date, assignee, status, and project
- Five status stages: **Backlog → Todo → In Progress → In Review → Done**
- Edit, reassign, and share tasks across members
- Advanced filtering by status, assignee, due date, and project

### 👁️ Multiple Task Views
| View | Description |
|------|-------------|
| **Table** | Sortable spreadsheet-style view with all task details |
| **Kanban** | Drag-and-drop board powered by `@hello-pangea/dnd` |
| **Calendar** | Monthly calendar view via `react-big-calendar` |

### 📊 Dashboard
- Live summary: Total, Assigned, Completed, Overdue, and Incomplete tasks
- **My Tasks** page — all your tasks across every project, in one place

### 👥 Members
- View all workspace members
- Workspace owners can manage roles and access

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| [Next.js 15](https://nextjs.org/) | Full-stack React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible, composable UI components |
| [TanStack Query](https://tanstack.com/query) | Server state management & data fetching |
| [Nuqs](https://nuqs.47ng.com/) | URL-based UI state management |
| [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) | Drag-and-drop Kanban board |
| [react-big-calendar](https://github.com/jquense/react-big-calendar) | Calendar task view |

### Backend
| Technology | Role |
|---|---|
| [HonoJS](https://hono.dev/) | Lightweight, fast backend (integrated with Next.js) |
| [Appwrite](https://appwrite.io/) | Auth, database, and file storage |

### DevOps & Deployment
| Technology | Role |
|---|---|
| [Vercel](https://vercel.com/) | Deployment & hosting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [Docker](https://www.docker.com/) | Containerization (local dev) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `v18+`
- **npm** or **yarn**
- An [Appwrite Cloud](https://cloud.appwrite.io) account or self-hosted Appwrite instance

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rohannnagibbtasin/plassibo.git
cd plassibo
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables** (see below)

4. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Environment Variables

Create a `.env.local` file in the root of the project and fill in your Appwrite credentials:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id

# Collection IDs
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=your_workspaces_collection_id
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=your_members_collection_id
NEXT_PUBLIC_APPWRITE_PROJECTS_ID=your_projects_collection_id
NEXT_PUBLIC_APPWRITE_TASKS_ID=your_tasks_collection_id

# Storage
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=your_images_bucket_id

# Server-side API Key (never expose this publicly)
APPWRITE_KEY=your_appwrite_api_key
```

> ⚠️ **Never commit your `.env.local` file.** It is already included in `.gitignore`.

---

## 📁 Project Structure

```
plassibo/
├── app/
│   ├── (auth)/                 # Public auth pages (sign-in, sign-up)
│   └── (dashboard)/            # Protected workspace pages
│       └── workspaces/
│           ├── [workspaceId]/  # Workspace home, tasks, members, settings
│           └── projects/
│               └── [projectId]/# Project task views
├── src/
│   ├── components/             # Shared UI components
│   ├── features/               # Feature-based modules
│   │   ├── auth/               # Auth hooks, forms, API
│   │   ├── workspaces/         # Workspace CRUD, invite, settings
│   │   ├── projects/           # Project management
│   │   ├── tasks/              # Task creation, views (table/kanban/calendar)
│   │   └── members/            # Member management
│   ├── hooks/                  # Global custom React hooks
│   └── lib/                    # Appwrite client, utility functions
├── public/                     # Static assets
├── screenshots/                # README screenshots
└── ...config files
```

---

## 🗺️ Roadmap

- [x] Workspace & project management
- [x] Table, Kanban, and Calendar views
- [x] Member invitations via invite links
- [x] Advanced task filtering
- [ ] Real-time task updates via WebSockets
- [ ] Task comments and activity log
- [ ] File attachments on tasks
- [ ] Notifications system
- [ ] Mobile responsive improvements

See the [open issues](https://github.com/rohannnagibbtasin/plassibo/issues) to propose a feature or report a bug.

---

## 🤝 Contributing

Contributions are what make the open source community great. Any contribution you make is **greatly appreciated**.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 👤 Author

**Rohann Nagibb Tasin** — Full-Stack Web Developer

<p>
  <a href="https://rntasin.online">🌐 Portfolio</a> &nbsp;·&nbsp;
  <a href="https://github.com/rohannnagibbtasin">🐙 GitHub</a> &nbsp;·&nbsp;
  <a href="https://linkedin.com/in/rohannnagibbtasin">💼 LinkedIn</a> &nbsp;·&nbsp;
  <a href="mailto:rntasin@gmail.com">📧 Email</a>
</p>

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">
  <p>If you found this project useful, please consider giving it a ⭐ — it means a lot!</p>
  <p>Built with ❤️ by <a href="https://rntasin.online">Rohann Nagibb Tasin</a></p>
</div>
