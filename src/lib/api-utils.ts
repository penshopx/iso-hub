import { db } from "@/db";
import { activityLogs, notifications } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  status?: string;
  category?: string;
  fromDate?: Date;
  toDate?: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function logActivity(
  userId: number | undefined,
  action: string,
  entity: string,
  entityId?: number,
  description?: string,
  metadata?: Record<string, unknown>
) {
  try {
    await db.insert(activityLogs).values({
      userId,
      action,
      entity,
      entityId,
      description,
      metadata: metadata ? JSON.stringify(metadata) : undefined,
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}

export async function createNotification(
  userId: number,
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info",
  link?: string
) {
  try {
    await db.insert(notifications).values({
      userId,
      title,
      message,
      type,
      link,
    });
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
}

export function generateCode(prefix: string, sequence: number): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const seq = String(sequence).padStart(4, "0");
  return `${prefix}-${year}${month}-${seq}`;
}

export function calculateRiskLevel(probability: number, impact: number): string {
  const score = probability * impact;
  if (score >= 16) return "critical";
  if (score >= 12) return "high";
  if (score >= 6) return "medium";
  return "low";
}

export function calculateKpiAchievement(actual: number, target: number, direction: string): number {
  if (direction === "higher_better") {
    return (actual / target) * 100;
  }
  return (target / actual) * 100;
}

export function getStatusFromAchievement(achievement: number): string {
  if (achievement >= 100) return "excellent";
  if (achievement >= 80) return "good";
  if (achievement >= 60) return "needs_improvement";
  return "poor";
}

export interface ValidationRule {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean;
}

export function validateInput(data: Record<string, unknown>, rules: ValidationRule[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const rule of rules) {
    const value = data[rule.field];

    if (rule.required && (value === undefined || value === null || value === "")) {
      errors.push(`${rule.field} is required`);
      continue;
    }

    if (value && typeof value === "string") {
      if (rule.minLength && value.length < rule.minLength) {
        errors.push(`${rule.field} must be at least ${rule.minLength} characters`);
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        errors.push(`${rule.field} must be at most ${rule.maxLength} characters`);
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(`${rule.field} has invalid format`);
      }
    }

    if (rule.custom && value !== undefined) {
      if (!rule.custom(value)) {
        errors.push(`${rule.field} is invalid`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function parseFilters(searchParams: URLSearchParams): FilterParams {
  return {
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") || undefined,
    category: searchParams.get("category") || undefined,
    fromDate: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate")!) : undefined,
    toDate: searchParams.get("toDate") ? new Date(searchParams.get("toDate")!) : undefined,
  };
}

export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  return {
    page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1,
    limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20,
    sort: searchParams.get("sort") || undefined,
    order: searchParams.get("order") === "asc" ? "asc" : "desc",
  };
}

export function successResponse<T>(data: T, meta?: ApiResponse["meta"]): ApiResponse<T> {
  return {
    success: true,
    data,
    meta,
  };
}

export function errorResponse(error: string, statusCode: number = 400): Response {
  return Response.json(
    {
      success: false,
      error,
    },
    { status: statusCode }
  );
}

export function paginatedResponse<T>(
  data: T,
  total: number,
  page: number,
  limit: number
): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
