"use client";
import { useParams } from "next/navigation";

export default function ActiveLink({ }) {
  const params = useParams();
  console.log(params)
  return (
    <div>
      <h1>Paper:</h1>
    </div>
  );
}

