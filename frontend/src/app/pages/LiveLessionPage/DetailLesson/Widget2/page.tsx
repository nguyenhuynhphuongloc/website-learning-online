import Image from "next/image" // Import Image từ Next.js
export default function Widget2(){
    return (
        <div className="mt-5 max-w-full w-full">
            <div className="flex flex-wrap justify-center gap-5">
                {[
                    {
                        title: "Study wherever and whenever you want",
                        description:
                            "Our learning platform uses the latest in learning technology, so you can study anytime and anywhere and on any device you want.",
                    },
                    {
                        title: "Taught by IELTS Experts from UK",
                        description:
                            "We are a strong team of experienced IELTS teachers and examiners from across the world.",
                    },
                    {
                        title: "Strengthen all 4 IELTS skills",
                        description:
                            "The content covers a wide range of topics covered in the IELTS exam.",
                    },
                    {
                        title: "Updated regularly and lifetime access",
                        description:
                            "We will update the package regularly with all the latest IELTS lessons delivered on IOT.",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-4 bg-customelightWhite rounded-xl space-y-3 w-full max-w-[279px] h-auto box-border"
                    >
                        <Image
                            src={`/assets/DetailLesson/buy-reason-2_LE_upscale_digital_art_x4_LE_upscale_balanced_x4_light_ai_50_remove_background_general_clip_to_object_off.png`}
                            alt={item.title}
                            height={80}
                            quality={100}
                            width={120}
                            className="rounded-lg"
                        />
                        <h2 className="text-customBlue text-xl font-bold text-center break-words">
                            {item.title}
                        </h2>
                        <span className="text-sm text-center text-[#282828] leading-6 break-words">
                            {item.description}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}