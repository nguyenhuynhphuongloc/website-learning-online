'use client'
import Image from "next/image" // Import Image từ Next.js
export function HeaderHomePage() {
    return (
        <header className="mx-auto bg-white">
            <div className="flex items-center justify-between mx-20">
                <a>
                    <Image
                        src={`/assets/header/logo.svg`}
                        alt={``}
                        height={104}
                        quality={100}
                        width={190}
                        className=""
                    />
                </a>
               
            </div>
        </header>
    );
}
