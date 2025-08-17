import Footer from "@/app/Shared/Footer/page";
import { LoginForm } from "@/app/pages/LoginPage/login-form";


export default function LoginPage() {
    return (
        <div className="bg-[#f7f7f7] ">
            <div className="flex justify-center items-center h-4/6 p-44">
                <LoginForm />
            </div>
            <Footer />
        </div>
    )
}
