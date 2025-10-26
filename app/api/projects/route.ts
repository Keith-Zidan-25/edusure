import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/database";
import { Project } from "@/model/Project";

export async function GET() {
  try {
    await dbConnect();

    const projects = await Project.find({}).lean();

    const researchStudies = projects.filter((p) =>
      p.tags.some((tag: string) =>
        tag.toLowerCase().includes("research")
      )
    );

    const openSourceProjects = projects.filter(
      (p) => !p.tags.some((tag: string) =>
        tag.toLowerCase().includes("research")
      )
    );

    return NextResponse.json({
        researchStudies,
        openSourceProjects
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
