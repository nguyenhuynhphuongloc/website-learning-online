'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteSession, getSession, Session } from "@/lib/session";

export default function Navbar() {

  const router = useRouter();

  const [Session, setSession] = useState<Session | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {

    const session = await getSession(); // <- Gọi Promise ở đây

    setSession(session); // <- Cập nhật kết quả

    setLoading(false);

  };


  useEffect(() => {
    
    fetchSession()
    
  }, []);

  return (
    <nav className="bg-customBlue backdrop-blur-md text-white font-bold text-base relative z-50">
      <NavigationMenu>

        <div className="flex justify-between px-4 mx-auto whitespace-nowrap">
          {/* Left Section */}
          <div className="flex items-center space-x-5">
            {/* Home Button */}
            <div className="text-white font-bold text-xl">
              <button
                className="hover:bg-black p-2 rounded"
                onClick={() => router.push("/pages/HomePage")}
              >
                <MdHome size={30} />
              </button>
            </div>
            {/* Navigation Links */}
            <NavigationMenuList className="flex space-x-6">
              {/* IELTS Exam Library Dropdown */}

              <NavigationMenuItem>

                <NavigationMenuTrigger className="flex items-center text-white hover:text-black focus:outline-none group">
                  IELTS Exam Library
                  <FaChevronDown
                    className="ml-1 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenuTrigger>

                <NavigationMenuContent className="absolute top-7 mt-2 bg-gradient-to-b from-[#b2c7d9] to-[#2d4963] text-white shadow-lg z-50 min-w-[200px]">
                  <ul className="flex flex-col p-4 space-y-3">
                    <li>
                      <Link
                        href="/pages/LibraryTestPage/Listening"
                        passHref
                        legacyBehavior
                      >
                        <NavigationMenuLink className="hover:bg-[rgba(255,255,255,0.15)] p-2 rounded transition-colors duration-200 ease-in-out">
                          Listening Test
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pages/LibraryTestPage/Reading" passHref legacyBehavior>
                        <NavigationMenuLink className="hover:bg-[rgba(255,255,255,0.15)] p-2 rounded transition-colors duration-200 ease-in-out">
                          Reading Test
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pages/LibraryTestPage/Writing" passHref legacyBehavior>
                        <NavigationMenuLink className="hover:bg-[rgba(255,255,255,0.15)] p-2 rounded transition-colors duration-200 ease-in-out">
                          Writing Test
                        </NavigationMenuLink>
                      </Link>
                    </li>
                   
                    
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            
          

              {/* Live Lessons */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center text-white hover:text-black focus:outline-none group">
                  Live Lessons         
                </NavigationMenuTrigger>
               
              </NavigationMenuItem>

              {/*
                IELTS Courses - Now a Two-Level Dropdown
                1) Hover "IELTS Courses" → shows { Các khóa học, Lịch Khai Giảng, IELTS 1V1 }
                2) Hover "Các khóa học" (inside that menu) → shows MasterClass items + Express
              */}
              <NavigationMenuItem className="relative group">
                <NavigationMenuTrigger className="flex items-center text-white hover:text-black focus:outline-none group">
                  IELTS Courses
                </NavigationMenuTrigger>
              </NavigationMenuItem>

              
            </NavigationMenuList>
          </div>

          {/* Right Section */}
          {Session ? (
            // Nếu có token, hiển thị Avatar
      
       
            (<nav className="bg-customBlue text-white font-bold text-base relative p-4">
              <NavigationMenu>
                <NavigationMenuList className=" ">
                  {/* Avatar Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center space-x-2">
                      <Image
                        src="/assets/avatar/avatar.svg" // Đường dẫn ảnh của bạn
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                      />
                    
                    </NavigationMenuTrigger>

                    {/* Menu con */}
                    <NavigationMenuContent className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#f7f7f7] text-black shadow-lg p-4 min-w-max">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#f7f7f7]"></div>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/pages/profile" passHref legacyBehavior>
                            <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100 rounded">
                              Profile
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded" onClick={ 
                            () => { 
                              deleteSession()
                              router.push("/pages/LoginPage"); // chuyển hướng về trang chủ
                               }}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </NavigationMenuContent>

                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>)

          ) : (
            // Nếu không có token, hiển thị Login & Register
            (<div className="flex items-center gap-2">
                <Link href="/pages/LoginPage" passHref legacyBehavior>
                <a className="text-white hover:text-black">Login</a>
              </Link>
                <Link href="/pages/RegisterPage" passHref legacyBehavior>
                <a className="text-white hover:text-black">Register</a>
              </Link>
            </div>)
          )}
        </div>
      </NavigationMenu>
    </nav>
  );
}