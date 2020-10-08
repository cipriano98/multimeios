module.exports = {
    apps: [
        {
            name: "Multimeios",
            script: "dist/main.js",
            watch: true,
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 80
            }
        }
    ]
}
