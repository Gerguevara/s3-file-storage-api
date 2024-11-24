# run the production server with make run-docker
run-docker:
	docker run --env-file .env -p 3000:3000 nestjs-upload-service