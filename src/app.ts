import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { logger } from "utils/logger";
import { morganConfig } from "middlewares/morgan";
import { getPrismaClient } from "utils/get-prisma-client";

export const startServer = () => {
	const app = express();
	const PORT = process.env["PORT"];

	const prismaInstance = getPrismaClient();

	prismaInstance.admin
		.findMany({
			select: {
				id: true,
			},
		})
		.then((a) => logger.info(a))
		.catch((e) => logger.info(e));

	app.use(cors());
	app.use(express.json());
	app.use(
		fileUpload({
			useTempFiles: true,
		})
	);

	app.use(morganConfig);

	app.get("/", (req, res) => {
		return res.status(200).json({
			success: true,
			message: "Welcome to One Med API...",
		});
	});

	app.listen(PORT, () => logger.info(`App is running at port: ${PORT}`));
};
