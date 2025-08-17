import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LiveLessonCard() {
    return (
        <div className="flex justify-center items-center mb-8">
            <div className="w-4/5 max-w-5xl mx-auto border border-gray-300 rounded-3xl bg-white shadow-md">
                {/* Phase 1: Time of the lesson */}
                <div className="flex items-center ">
                    <div className="flex-shrink-1 w-1/6 text-center h-52 bg-green-200">
                        <div className="gap-[5px]">
                            <h2 className="text-1xl text-white mb-5 bg-[#327846]">Reading</h2>
                            <h2 className='text-3xl mb-5 text-customBlue'>Monday</h2>
                            <p className="text-gray-700 font-medium">
                                10:00 AM - 12:00 PM
                            </p>
                        </div>
                    </div>


                    {/* Phase 2: Avatar and lesson details */}
                
                    <div className="flex-grow flex flex-col w-4/6 mx-auto pl-28 gap-4">
                        {/* Tiêu đề h2 */}
                        <h2 className="text-customBlue font-bold text-2xl">Reading - Matching Headings</h2>

                        {/* Nội dung Avatar và mô tả */}
                        <div className="flex items-center gap-8">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    className="h-25 w-25"
                                />
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold">Lesson Title</h3>
                                <p className="text-sm text-gray-600">
                                    Short description of the lesson.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Phase 3: Buttons */}
                    <div className="flex-shrink-0 w-2/6 flex justify-center">
                        <div className="flex flex-col gap-3">
                            <Button className="px-32 py-15 bg-customBlue text-white rounded hover:bg-blue-600">
                                Buy
                            </Button>
                            <Button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
