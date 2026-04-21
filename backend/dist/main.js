"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const uploadsResourcesDir = (0, node_path_1.join)(process.cwd(), 'uploads', 'resources');
    (0, node_fs_1.mkdirSync)(uploadsResourcesDir, { recursive: true });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const localBrowserOrigin = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i;
    const nodeEnv = process.env.NODE_ENV ?? 'development';
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }
            if (localBrowserOrigin.test(origin)) {
                callback(null, true);
                return;
            }
            if (nodeEnv !== 'production') {
                callback(null, true);
                return;
            }
            const explicit = (process.env.CORS_ORIGINS ?? '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);
            callback(null, explicit.includes(origin));
        },
        credentials: true,
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        maxAge: 86400,
    });
    const port = Number(process.env.PORT ?? 3001);
    const host = process.env.HOST ?? '0.0.0.0';
    await app.listen(port, host);
    const label = host === '0.0.0.0' ? 'localhost' : host;
    new common_1.Logger('NestApplication').log(`Listening at http://${label}:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map