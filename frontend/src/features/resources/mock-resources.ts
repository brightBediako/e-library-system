export type ResourceCategory =
  | "All Resources"
  | "Lecture Notes"
  | "Research Papers"
  | "Past Exams";

export interface DigitalResource {
  id: string;
  title: string;
  course: string;
  label: string;
  category: ResourceCategory;
  icon: string;
  iconWrapperClass: string;
}

export const mockResources: DigitalResource[] = [
  {
    id: "resource-1",
    title: "Advanced Quantum Mechanics: Lecture Series 04",
    course: "Course: PHY402 - Theoretical Physics",
    label: "PDF Document",
    category: "Lecture Notes",
    icon: "picture_as_pdf",
    iconWrapperClass: "bg-error-container/20 text-error",
  },
  {
    id: "resource-2",
    title: "Digital Humanities: Curating the Virtual Museum",
    course: "Course: ART215 - Digital Culture",
    label: "Note Pack",
    category: "Lecture Notes",
    icon: "description",
    iconWrapperClass: "bg-primary/10 text-primary",
  },
  {
    id: "resource-3",
    title: "Microeconomics Finals 2022-2023 Comprehensive",
    course: "Course: ECO101 - Economics Foundation",
    label: "Exam Archive",
    category: "Past Exams",
    icon: "quiz",
    iconWrapperClass: "bg-tertiary-fixed/30 text-tertiary",
  },
  {
    id: "resource-4",
    title: "Latin American Literature: Essential Dataset",
    course: "Course: LIT330 - Global Narratives",
    label: "Resource Pack",
    category: "Research Papers",
    icon: "folder_zip",
    iconWrapperClass: "bg-secondary-container text-on-secondary-container",
  },
  {
    id: "resource-5",
    title: "Neural Network Architectures for Linguistic Patterns",
    course: "Course: CSC550 - Artificial Intelligence",
    label: "Research",
    category: "Research Papers",
    icon: "menu_book",
    iconWrapperClass: "bg-error-container/20 text-error",
  },
  {
    id: "resource-6",
    title: "Historical Demographic Shifts: 1850-1920",
    course: "Course: HIS204 - Modern History",
    label: "Dataset",
    category: "All Resources",
    icon: "table_chart",
    iconWrapperClass: "bg-green-100 text-green-800",
  },
];
