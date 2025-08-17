import { z } from "zod";

// Định nghĩa schema
const configSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string(), 
});

// Parse dữ liệu từ process.env
const configProject = configSchema.safeParse(process.env);

// Kiểm tra kết quả và xử lý lỗi
if (!configProject.success) {
    console.error("Invalid configuration:", configProject.error.format());
    throw new Error("Environment variables validation failed!"); 
}

// Nếu thành công, lấy dữ liệu từ schema
const envConfig = configProject.data;

export default envConfig;
