"use client";

import { useParams } from "next/navigation";
import CourseDetailPage from "@/components/CourseDetailPage";

export default function CourseDetail() {
  const { id } = useParams();
  
  return <CourseDetailPage courseId={id} />;
}