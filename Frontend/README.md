# Central Public School frontend

## Safe dashboard demo

Open `/demo` to share the interactive school-management preview. It uses fictional sample data and starts without mounting the normal user/student contexts, so it does not make API requests or read from or write to the school database. Demo controls only update the current page's local UI.

The public homepage links to this preview. The existing login and school-management routes continue to use the regular application and backend.

## Development

Run `npm run dev` from this directory to start the Vite development server.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
