require('dotenv').config();

module.exports = {
    apps: [
        {
            name: 'Viribus-unitis',
            script: 'dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            env: {
                NODE_ENV: 'production',
                JWT_SECRET: process.env.JWT_SECRET,
                ADMIN_EMAIL: process.env.ADMIN_EMAIL,
                TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
                TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
                TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
                TYPEORM_PORT: process.env.TYPEORM_PORT,
                PORT: process.env.PORT,
            },
        },
        {
            name: 'Viribus-unitis-stage',
            script: 'dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            env: {
                NODE_ENV: 'development',
                JWT_SECRET: process.env.JWT_SECRET,
                ADMIN_EMAIL: process.env.ADMIN_EMAIL,
                TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
                TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
                TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
                TYPEORM_PORT: process.env.TYPEORM_PORT,
                PORT: process.env.PORT,
            },
        },
    ],
};

// im test
