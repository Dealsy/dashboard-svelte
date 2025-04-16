import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Enable CORS with specific configuration
	app.enableCors({
		origin: 'http://localhost:5173', // Your SvelteKit frontend URL
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
		exposedHeaders: ['Authorization'],
		maxAge: 86400 // 24 hours
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			exceptionFactory: (errors) => {
				const messages = errors.map((error) => {
					const constraints = error.constraints;
					return Object.values(constraints || {}).join(', ');
				});
				return new BadRequestException(messages.join('; '));
			}
		})
	);

	await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
