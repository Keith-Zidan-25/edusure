import { NextResponse } from "next/server";
import { Project } from '@/model/Project';
import { dbConnect } from "@/lib/database";

const openSourceProjects = [
  {
    projectTitle: "OpenAI Chatbot Integration for NGOs",
    description:
      "A customizable open-source chatbot framework to help NGOs with rapid response and information dissemination.",
    tags: ["Python", "TensorFlow", "React"],
    raised: 8000,
    goal: 15000,
    imageGradient: "bg-gradient-to-br from-indigo-900 to-purple-900",
  },
  {
    projectTitle: "Community Event Management System",
    description:
      "A full-stack Application to streamline local community events, from registration to feedback collection.",
    tags: ["Node.js", "Express", "MongoDB", "Angular"],
    raised: 10000,
    goal: 10000,
    fullyFunded: true,
    imageGradient: "bg-gradient-to-br from-gray-400 to-gray-600",
  },
  {
    projectTitle: "AI-Powered Research Assistant",
    description:
      "An open-source tool leveraging AI and NLP to help students and researchers synthesize data efficiently.",
    tags: ["Python", "NLP", "Research"],
    raised: 2500,
    goal: 20000,
    imageGradient: "bg-gradient-to-br from-blue-900 to-indigo-900",
  },
];

const researchStudies = [
  {
    projectTitle: "Impact of Digital Literacy on Community Engagement",
    description:
      "Research paper exploring how digital literacy correlates with higher community participation.",
    tags: ["Research", "Social"],
    raised: 4500,
    goal: 8000,
    imageGradient: "bg-gradient-to-br from-orange-700 to-red-700",
  },
  {
    projectTitle: "Sustainable Urban Farming Practices in Arid Regions",
    description:
      "Study of techniques and technologies for urban farming in regions facing water scarcity.",
    tags: ["Environment", "Agriculture"],
    raised: 5000,
    goal: 5000,
    fullyFunded: true,
    imageGradient: "bg-gradient-to-br from-green-600 to-teal-600",
  },
  {
    projectTitle: "Advancements in Renewable Energy Storage Solutions",
    description:
      "Comprehensive review of breakthroughs in battery technologies and energy storage systems.",
    tags: ["Energy", "Technology"],
    raised: 1500,
    goal: 12000,
    imageGradient: "bg-gradient-to-br from-blue-800 to-cyan-800",
  },
];

export async function POST() {
    try {
        await dbConnect();

        const allProjects = [...openSourceProjects, ...researchStudies];
        const savedProjects = [];

        for (const proj of allProjects) {
            const { hederaAccountId, hederaPrivateKey, hederaPublicKey } = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createChainAcc`)).json();
            const newProject = await Project.create({
                ...proj,
                hederaAccountId,
                hederaPrivateKey,
                hederaPublicKey
            });

            savedProjects.push(newProject);
        }

        return NextResponse.json(
            { success: true, count: savedProjects.length, projects: savedProjects },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error seeding projects:", error);
        return NextResponse.json(
        { success: false, error: error },
        { status: 500 }
        );
    }
}
