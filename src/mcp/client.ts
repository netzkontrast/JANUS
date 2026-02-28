import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

/**
 * Interface to communicate with the Jules MCP Server.
 */
export class JulesMCPClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;

  constructor() {
    this.client = new Client(
      { name: "tinyclaw-orchestrator", version: "1.0.0" },
      { capabilities: {} }
    );
  }

  async connect() {
    // Note: In a real Vercel deployment, we would use SSE or WebSocket transport
    // to communicate with the external Jules cloud VM. Stdio is mock setup for local testing.
    this.transport = new StdioClientTransport({
      command: "node",
      args: ["mock-jules-mcp-server.js"]
    });

    await this.client.connect(this.transport);
    console.log("Connected to Jules MCP Server");
  }

  /**
   * Delegates the task to Jules.
   */
  async createTask(prompt: string, repoUrl: string) {
    try {
      const response = await this.client.callTool({
        name: "jules_create_task",
        arguments: { prompt, repoUrl }
      });
      console.log("Task created:", response);
      return response;
    } catch (error) {
      console.error("Failed to create task", error);
    }
  }

  /**
   * Monitor progress.
   */
  async getTask(taskId: string) {
     try {
       const response = await this.client.callTool({
         name: "jules_get_task",
         arguments: { taskId }
       });
       return response;
     } catch(error) {
       console.error(`Failed to get task ${taskId}`, error);
     }
  }

  /**
   * Approves the proposed structural architectural modifications.
   */
  async approvePlan(taskId: string) {
     try {
       const response = await this.client.callTool({
         name: "jules_approve_plan",
         arguments: { taskId }
       });
       return response;
     } catch(error) {
       console.error(`Failed to approve plan for task ${taskId}`, error);
     }
  }
}
