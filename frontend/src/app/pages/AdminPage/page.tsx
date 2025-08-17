// Define the admin menu array with additional functionalities
const adminMenu = [
    { name: "Manage Users", url: "/admin/manage-users", icon: () => <Image src="/assets/project.png" alt="User Icon" width={24} height={24} /> },
    { name: "Statistics", url: "/admin/statistics", icon: () => <Image src="/assets/stats.png" alt="Statistics Icon" width={24} height={24} /> },
    { name: "Create Exam", url: "/admin/create-post", icon: () => <Image src="/assets/exam.png" alt="Create Post Icon" width={24} height={24} /> },
    { name: "Create Contest", url: "/admin/create-contest", icon: () => <Image src="/assets/competition.png" alt="Create Contest Icon" width={24} height={24} /> },
];

import AdminCreateListeningTest from "@/app/pages/AdminPage/components/Create_Exam";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import Image from "next/image";
// This is the main admin page component that renders the sidebar and the content area in English
export const AdminPage = () => (

    <SidebarProvider className="bg-[#FFFFFF]">

        <Sidebar className="bg-[#64C5B1]">

            <SidebarContent className="bg-[#64C5B1]">

                <SidebarGroup className="gap-9">

                    <SidebarGroupLabel className="text-3xl text-white text-bold">Admin Menu</SidebarGroupLabel>

                    <SidebarGroupContent>

                        <SidebarMenu className="gap-5">

                            {adminMenu.map((menuItem: { name: string; url: string; icon: React.ElementType }) => (

                                <SidebarMenuItem key={menuItem.name} className="">

                                    <SidebarMenuButton asChild>

                                        <a href={menuItem.url} className="flex items-center gap-1 hover:bg-customRed text-white">
                                            {<menuItem.icon />}
                                            <span>{menuItem.name}</span>
                                        </a>

                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>

                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter className="bg-[#64C5B1] ">

                <SidebarMenu>

                    <SidebarMenuItem className="">

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>

                                <SidebarMenuButton className="text-lg font-bold flex items-center gap-1 bg-[#C56478] text-white border-customRed">

                                    <User2 size={20} /> Username

                                    <ChevronUp className="ml-auto" size={20} />

                                </SidebarMenuButton>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width] bg-white text-black border-[#A1A4B9]"
                            >
                                <DropdownMenuItem className="hover:bg-customRed">
                                    <span>Account</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="hover:bg-customRed">
                                    <span>Setting</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="hover:bg-[#C56478]">
                                    <span>Sign out</span>
                                </DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenu>

                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarFooter>

        </Sidebar>

        <AdminCreateListeningTest />

    </SidebarProvider>

);

export default AdminPage;
