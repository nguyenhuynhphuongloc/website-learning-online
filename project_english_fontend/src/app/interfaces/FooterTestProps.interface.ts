import { SectionInfo } from "@/app/interfaces/Section.interface";

export interface FooterTestProps {
    setActiveSectionIndex: (index: number) => void;
    sectionInfo: SectionInfo[];
}