import { BadRequestException, Injectable, NotFoundException, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import aqp from "api-query-params";
import { FilterQuery, Model, Types } from "mongoose";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { User } from "src/schemas/User.schemas";
import { MailService } from "src/mails/mail.service";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from "src/modules/User/dto/CreateUser.dto";
import { UpdateUserDto } from "src/modules/User/dto/UpdateUser.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { hassPassword } from "src/helpers/util";
import { WalletService } from "src/modules/Walet/wallet.service";



@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,

        private maileService: MailService,

        private readonly walletService: WalletService

    ) { }

    async CheckEmailExist(Email: string) {

        const user = await this.userModel.exists({ email: Email })

        return user ? true : false;
    }

    async createUser(createUserDto: CreateUserDto) {
        // Kiểm tra nếu email đã tồn tại
        if (await this.CheckEmailExist(createUserDto.email)) {
            throw new BadRequestException(`Email already exists: ${createUserDto.email}`);
        }

        const createdUser = new this.userModel(createUserDto);


        createdUser.password = await hassPassword(createUserDto.passWord);

        // Lưu người dùng vào cơ sở dữ liệu và chờ kết quả
        const savedUser = await createdUser.save();  // Đợi save xong và trả về giá trị

        await this.walletService.create({

            amount: "0",

            userId: savedUser._id.toString()

        });

        console.log("successful")

        return { _id: savedUser._id, username: savedUser.username };

    }

    @UseInterceptors(CacheInterceptor) // tự động cache
    async getUsers(): Promise<User[]> {

        console.log("successful");

        return this.userModel.find().exec();
    }

    async getUser(query: FilterQuery<User>) {

        const user = (await this.userModel.findOne(query)).toObject();

        if (!user) throw new NotFoundException('User not found')

        return user;
    }

    async getProfile(userId: string) {
        // Kiểm tra xem userId có phải là ObjectId hợp lệ không
        const isValid = Types.ObjectId.isValid(userId);
        if (!isValid) throw new NotFoundException('User not found');

        // Tìm kiếm người dùng theo userId
        const user = await this.userModel.findById(userId).select(
            'gender firstName lastName dob email phoneNumber'
        );

        if (!user) throw new NotFoundException('User not found in database');

        return user;

    }

    async findAll(query: any) {
        const { filter, sort } = aqp(query); // Parse lọc và sắp xếp từ query string
        let { current, pageSize } = query; // Lấy current page và page size từ query string


        current = parseInt(current) || 1;
        pageSize = parseInt(pageSize) || 1;

        console.log('Filter:', filter);
        console.log('Sort:', sort);

        // Tổng số items phù hợp với điều kiện lọc
        const totalItems = await this.userModel.countDocuments(filter);

        // Tính tổng số trang
        const totalPages = Math.ceil(totalItems / pageSize);

        // Bỏ qua (skip) số lượng items dựa trên trang hiện tại
        const skip = (current - 1) * pageSize;

        // Lấy danh sách kết quả từ MongoDB
        const results = await this.userModel
            .find(filter) // Áp dụng điều kiện lọc
            .limit(pageSize) // Giới hạn số lượng kết quả
            .skip(skip) // Bỏ qua số lượng kết quả đầu
            .sort(sort as any); // Áp dụng sắp xếp

        return {
            results, // Kết quả trả về
            pagination: {
                current, // Trang hiện tại
                pageSize, // Kích thước trang
                totalItems, // Tổng số mục
                totalPages, // Tổng số trang
            },
        };
    }

    async updateHashedRefeshToken(userId: string, refreshtoken: string | null) {
        return await this.userModel.findByIdAndUpdate(
            userId,
            { hashedRefreshToken: refreshtoken },
            { new: true }
        );
    }


    async getUserByid(userId: string) {

        const objectId = new Types.ObjectId(userId);

        const user = await this.userModel.findById(objectId);

        if (!user) throw new NotFoundException('User not found in database');

        return user;

    }

    async updateUser(id: string, updateUser: UpdateUserDto) {

        console.log("successful");
        return await this.userModel.findByIdAndUpdate(id, updateUser);
    }

    async findByEmail(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({ username })
    }

    async DeleteUser(id: string) {
        console.log("successful");
        return this.userModel.findByIdAndDelete(id);
    }

    async Register(registerDto: CreateAuthDto) {
        // Kiểm tra email đã tồn tại
        if (await this.CheckEmailExist(registerDto.email)) {
            throw new BadRequestException(`Email already exists: ${registerDto.email}`);
        }

        // Hash password
        const hashedPassword = await hassPassword(registerDto.password);

        // Tạo user mới với thuộc tính mặc định
        const createdUser = await this.userModel.create({
            ...registerDto,
            password: hashedPassword, // Cập nhật mật khẩu đã hash
            active: true, // Gán giá trị mặc định cho active
            codeId: uuidv4()
        });


        await this.walletService.create({
            amount: '0', // hoặc 0 nếu bạn xử lý ép kiểu trong DTO
            userId: createdUser._id.toString()
        });


        // Gửi email (nếu cần)
        console.log(`Welcome email sent to: ${createdUser.email}`);

        await this.maileService.sendUserConfirmation(createdUser)


    }

    async updateProfile(userId: string, updateUser: UpdateUserDto) {
        // Kiểm tra xem userId có phải là ObjectId hợp lệ không
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            updateUser,
            { new: true }
        );


        return user;
    }


}