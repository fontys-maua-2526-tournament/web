## Tournament Project - API
This is part of an educational collaboration project that helps tournament organizers coordinate and run their events.   
### Branch rules
- Only the development branch can pull into the main
- Only pull request into the development branch
- Branch names should contain US# in their name (US1-Guest_view)
- Shared naming between the API and Web repos
### Commit rules
Commits descriptions should report what you did, even if it's a small change. 

Commit titles/summaries should mention what implementation you did (ex. feat: add homePage).
### Branches rules
Branches should be named after the change in the project, if it is an adition (for ex: adding an new page to the project) it should be named a feature/{whatWillBeDone} or a fix (fix/{whatWillBeDone})


## Running the Project Locally

Follow these instructions to get the API running on your local machine for development and testing purposes.

### **Prerequisites**

Before you begin, ensure you have the following installed:
* **Node.js** (v18 or later is recommended)
* **pnpm** package manager

If you don't have pnpm, you can install it globally using npm:
```bash
npm install -g pnpm
```
### **Installation and setup**
1. Clone the repository in your machine:
```bash
git clone https://github.com/fontys-maua-2526-tournament/web.git
cd web
```
2. Install all dependencies using pnpm. This will read the pnpm-lock.yaml file to ensure you have the exact same package versions as the rest of the team.
```bash
pnpm install
```
3. Running the application
```bash
pnpm run dev
```

See the localhost port it is running and access it through the browser
