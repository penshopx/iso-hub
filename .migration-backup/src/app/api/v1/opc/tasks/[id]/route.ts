import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { opcTasks, opcTaskSteps } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taskId = parseInt(id);

    if (isNaN(taskId)) {
      return NextResponse.json({ success: false, error: "Invalid task ID" }, { status: 400 });
    }

    const [task] = await db.select().from(opcTasks).where(eq(opcTasks.id, taskId)).limit(1);

    if (!task) {
      return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 });
    }

    const steps = await db.select()
      .from(opcTaskSteps)
      .where(eq(opcTaskSteps.taskId, taskId))
      .orderBy(desc(opcTaskSteps.stepOrder));

    return NextResponse.json({
      success: true,
      data: {
        ...task,
        steps,
      },
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch task" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const taskId = parseInt(id);

    if (isNaN(taskId)) {
      return NextResponse.json({ success: false, error: "Invalid task ID" }, { status: 400 });
    }

    const [task] = await db.select().from(opcTasks).where(eq(opcTasks.id, taskId)).limit(1);

    if (!task) {
      return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 });
    }

    await db.delete(opcTaskSteps).where(eq(opcTaskSteps.taskId, taskId));
    await db.delete(opcTasks).where(eq(opcTasks.id, taskId));

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ success: false, error: "Failed to delete task" }, { status: 500 });
  }
}
