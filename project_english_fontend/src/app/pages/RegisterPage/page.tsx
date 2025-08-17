import Footer from "@/app/Shared/Footer/page";
import { RegisterForm } from "@/app/pages/RegisterPage/register-form";



export default function RegisterPage() {


    return (
        <div className="mt-10 mb-10 bg-[#f7f7f7]">
            <div className="flex justify-center items-center h-2/6 p-8">
                <RegisterForm />
            </div>
            <Footer />
        </div>
    )
}
