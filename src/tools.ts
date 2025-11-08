/**
 * Tool definitions for the AI chat agent
 * Tools can either require human confirmation or execute automatically
 */
import { tool, type ToolSet } from "ai";
import { z } from "zod/v3";

import type { Chat } from "./server";
import { getCurrentAgent } from "agents";
import { scheduleSchema } from "agents/schedule";

/**
 * Weather information tool that requires human confirmation
 * When invoked, this will present a confirmation dialog to the user
 */
export const resume = `
Kartikay Luthra  
----------------------------------------
Education
Queen Mary University of London, MSc Artificial Intelligence and Machine Learning, 2024 – 2025
SRM Institute of Science and Technology, B.Tech Electronics and Communication, 2019 – 2023

Work Experience
Fusionpact Technologies – Software Developer (July 2023 – April 2024)
- Built event-driven NLP pipelines using Kafka
- Reduced model inference latency by 3x
- Deployed ML models via Docker on AWS

Fusionpact Technologies – Software Developer Intern (Jan 2023 – July 2023)
- Built Java/Scala microservices for 15,000+ daily requests
- Optimized SQL queries by 15%
- Improved ETL pipelines

Projects & Open-Source Contributions
- NYT Connections Solver Bot
- Real-Time News Sentiment Analysis
- NFL Big Data Bowl 2026
- Quant Risk Engine
- AI Trading Repository

Skills & Certifications
Languages: Python, Java, Scala, C++
Frameworks & Tools: FastAPI, Flask, Spring Boot, Kafka, Docker, Git
Cloud: AWS (EC2, S3), PostgreSQL, Snowflake, MongoDB
Certifications: HackerRank (DS, Software Engineer, SQL)
`;

const getInformation = tool({
  description: "tells a bit about Kartikay",
  inputSchema: z.object({ name: z.string() }),
  execute: async ({}) => {
    console.log("fetching results ...");
    return "Kartikay Luthra is a software engineer with a strong focus on distributed systems, real-time data processing, and applied machine learning. He advocates for an open and accessible internet, enabling individuals to build, learn, and innovate without barriers.";
  }
  // Omitting execute function makes this tool require human confirmation

});

/**
 * Local time tool that executes automatically
 * Since it includes an execute function, it will run without user confirmation
 * This is suitable for low-risk operations that don't need oversight
 */
const getExperience = tool({
  description: "tells about Kartikay's experience",
  inputSchema: z.object({ name: z.string() }),
  execute: async ({ name}) => {
    console.log(`Getting experience for ${name}`);
    return "Kartikay Luthra worked for a year at Fusionpact Technologies as a Software Engineer, collaborating with financial sector clients and building scalable data-driven systems using Apache Kafka, RDBMS, NoSQL databases, and advanced NLP libraries. During his time there, he built event-driven NLP pipelines that reduced model inference latency by 3x and deployed ML models via Docker on AWS. As an intern prior to that, he developed Java and Scala-based microservices processing over 15,000 daily requests, optimized SQL queries for performance gains, and enhanced ETL pipelines for reliability and efficiency. Kartikay’s experience bridges the gap between backend engineering, data infrastructure, and applied machine learning — combining a strong understanding of distributed systems with practical deployment experience in cloud environments.";

  }
});

const getProjects = tool({
  description: "tells about Kartikay's project",
  inputSchema: z.object({ name: z.string() }),
  execute: async ({ name}) => {
    console.log(`Getting projects for ${name}`);
    return "Kartikay has developed projects spanning applied machine learning, data science, NLP, and AI research. His portfolio includes work on a NYT Connections Solver Bot, Real-Time News Sentiment Analysis, an NFL Big Data Bowl 2026 analytics project, a Quant Risk Engine, and an AI Trading Repository. These projects demonstrate his focus on scalable AI systems, data-driven insights, and model interpretability. You can explore his work further at his GitHub: https://github.com/kartikxx07";
    
  }
});

const scheduleameetinglinkwithkartik = tool({
  description: "get the projects for Kartikay Luthra",
  inputSchema: z.object({ name: z.string() }),
  execute: async ({ name}) => {
    console.log(`Looking up the schedule for ${name}`);
    return "Kartikay is available that time pls email him at kartikluthra2020@gmail.com";
  }
});

/**
 * Tool to list all scheduled tasks
 * This executes automatically without requiring human confirmation
 */

/**
 * Tool to cancel a scheduled task by its ID
 * This executes automatically without requiring human confirmation
 */

/**
 * Export all available tools
 * These will be provided to the AI model to describe available capabilities
 */
export const tools = {
  getInformation,
  getExperience,
  getProjects,
  scheduleameetinglinkwithkartik
} satisfies ToolSet;

/**
 * Implementation of confirmation-required tools
 * This object contains the actual logic for tools that need human approval
 * Each function here corresponds to a tool above that doesn't have an execute function
 */
export const executions = {};
