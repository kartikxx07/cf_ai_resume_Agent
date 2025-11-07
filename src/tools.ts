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
  description: "get personal information",
  inputSchema: z.object({ name: z.string() }),
  execute: async ({}) => {
    console.log("fetching results ...");
    return "Kartikay Luthra is a great engineer who believes in a open and free internet access for everyone and hopes that people can make themselves by using internet";
  }
  // Omitting execute function makes this tool require human confirmation

});

/**
 * Local time tool that executes automatically
 * Since it includes an execute function, it will run without user confirmation
 * This is suitable for low-risk operations that don't need oversight
 */
const getExperience = tool({
  description: "get the experience for the candidate",
  inputSchema: z.object({ name: z.string() }),
  execute: async ({ name}) => {
    console.log(`Getting experience for ${name}`);
    return "";
  }
});

const getProjects = tool({
  description: "get the projects for the candidate",
  inputSchema: z.object({ name: z.string() }),
  execute: async ({ name}) => {
    console.log(`Getting projects for ${name}`);
    return "";
  }
});

const scheduleTask = tool({
  description: "A tool to schedule a task to be executed at a later time",
  inputSchema: scheduleSchema,
  execute: async ({ when, description }) => {
    // we can now read the agent context from the ALS store
    const { agent } = getCurrentAgent<Chat>();

    function throwError(msg: string): string {
      throw new Error(msg);
    }
    if (when.type === "no-schedule") {
      return "Not a valid schedule input";
    }
    const input =
      when.type === "scheduled"
        ? when.date // scheduled
        : when.type === "delayed"
          ? when.delayInSeconds // delayed
          : when.type === "cron"
            ? when.cron // cron
            : throwError("not a valid schedule input");
    try {
      agent!.schedule(input!, "executeTask", description);
    } catch (error) {
      console.error("error scheduling task", error);
      return `Error scheduling task: ${error}`;
    }
    return `Task scheduled for type "${when.type}" : ${input}`;
  }
});

/**
 * Tool to list all scheduled tasks
 * This executes automatically without requiring human confirmation
 */
const getScheduledTasks = tool({
  description: "List all tasks that have been scheduled",
  inputSchema: z.object({}),
  execute: async () => {
    const { agent } = getCurrentAgent<Chat>();

    try {
      const tasks = agent!.getSchedules();
      if (!tasks || tasks.length === 0) {
        return "No scheduled tasks found.";
      }
      return tasks;
    } catch (error) {
      console.error("Error listing scheduled tasks", error);
      return `Error listing scheduled tasks: ${error}`;
    }
  }
});

/**
 * Tool to cancel a scheduled task by its ID
 * This executes automatically without requiring human confirmation
 */
const cancelScheduledTask = tool({
  description: "Cancel a scheduled task using its ID",
  inputSchema: z.object({
    taskId: z.string().describe("The ID of the task to cancel")
  }),
  execute: async ({ taskId }) => {
    const { agent } = getCurrentAgent<Chat>();
    try {
      await agent!.cancelSchedule(taskId);
      return `Task ${taskId} has been successfully canceled.`;
    } catch (error) {
      console.error("Error canceling scheduled task", error);
      return `Error canceling task ${taskId}: ${error}`;
    }
  }
});

/**
 * Export all available tools
 * These will be provided to the AI model to describe available capabilities
 */
export const tools = {
  getInformation,
  getExperience,
  cancelScheduledTask,
  getScheduledTasks,
  getProjects
} satisfies ToolSet;

/**
 * Implementation of confirmation-required tools
 * This object contains the actual logic for tools that need human approval
 * Each function here corresponds to a tool above that doesn't have an execute function
 */
export const executions = {};
