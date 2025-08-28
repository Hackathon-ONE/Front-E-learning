"use client";

import React from "react";
import CourseDetailPage from "@/components/CourseDetailPage";

export default function Page({ params }) {
  // unwrap params
  const { id } = React.use(params); 

  return <CourseDetailPage courseId={id} />;
}