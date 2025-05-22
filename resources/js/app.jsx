import "../css/styles/Tombol.css";
import '../css/styles/Tabel.css';
import '../css/styles/Background.css';
import '../css/styles/Navbar.css';
import '../css/styles/PopUp.css'

import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'TestCase-Humma';

createInertiaApp({
    title: (title) => title || 'TestCase-Humma',
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#DDA853',
    },
});
