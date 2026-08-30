import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: string;
}

async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const payload = await res.json().catch(() => null) as ApiEnvelope<T> | T | null;
  if (!res.ok) {
    const message = payload && typeof payload === "object" && "error" in payload
      ? String(payload.error)
      : res.statusText || `Error ${res.status}`;
    throw new ApiError(res.status, message);
  }
  if (payload && typeof payload === "object" && "success" in payload && "data" in payload) {
    return payload.data;
  }
  return payload as T;
}

// -- FINDINGS --
export interface Finding {
  id: string | number;
  auditId?: string;
  description: string;
  category: string;
  standard: string;
  context: string;
  severity: string;
  status: string;
  dueDate?: string;
  closedAt?: string;
  createdAt: string;
}

export function useFindings() {
  return useQuery<Finding[], ApiError>({
    queryKey: ["qms-findings"],
    queryFn: () => fetcher("/api/qms/findings"),
  });
}

export function useCreateFinding() {
  const queryClient = useQueryClient();
  return useMutation<Finding, ApiError, Partial<Finding>>({
    mutationFn: (data) =>
      fetcher("/api/qms/findings", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-findings"] });
    },
  });
}

export function useUpdateFinding() {
  const queryClient = useQueryClient();
  return useMutation<Finding, ApiError, { id: string | number; data: Partial<Finding> }>({
    mutationFn: ({ id, data }) =>
      fetcher(`/api/qms/findings/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-findings"] });
    },
  });
}

// -- ACTIONS (CAPA) --
export interface CorrectiveAction {
  id: string | number;
  findingId?: string | number;
  sourceType: "risk" | "finding" | "incident" | "vendor";
  sourceId: string | number;
  action: string;
  responsible: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed";
  evidence?: string;
  effectivenessCheck?: string;
  effectivenessStatus?: "pending" | "verified" | "ineffective";
  verifiedAt?: string;
  completedAt?: string;
}

export function useActions() {
  return useQuery<CorrectiveAction[], ApiError>({
    queryKey: ["qms-actions"],
    queryFn: () => fetcher("/api/qms/actions"),
  });
}

export function useCreateAction() {
  const queryClient = useQueryClient();
  return useMutation<CorrectiveAction, ApiError, Partial<CorrectiveAction>>({
    mutationFn: (data) =>
      fetcher("/api/qms/actions", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-actions"] });
    },
  });
}

export function useUpdateAction() {
  const queryClient = useQueryClient();
  return useMutation<CorrectiveAction, ApiError, { id: string | number; data: Partial<CorrectiveAction> }>({
    mutationFn: ({ id, data }) =>
      fetcher(`/api/qms/actions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-actions"] });
    },
  });
}

// -- KPIs --
export interface KPI {
  id: string | number;
  code: string;
  name: string;
  category: string;
  unit: string;
  target: number;
  direction: "higher_better" | "lower_better";
  owner: string;
  latestMeasurement?: Measurement;
  actual?: number;
  achievement?: number;
  status: "no_data" | "on_track" | "below_target";
}

export interface Measurement {
  id?: string;
  kpiId?: string | number;
  actual: number;
  period: string;
  notes?: string;
}

export function useKPIs() {
  return useQuery<KPI[], ApiError>({
    queryKey: ["qms-kpis"],
    queryFn: () => fetcher("/api/qms/kpis"),
  });
}

export function useCreateKPI() {
  const queryClient = useQueryClient();
  return useMutation<KPI, ApiError, Partial<KPI>>({
    mutationFn: (data) =>
      fetcher("/api/qms/kpis", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-kpis"] });
    },
  });
}

export function useRecordMeasurement() {
  const queryClient = useQueryClient();
  return useMutation<Measurement, ApiError, { kpiId: string | number; data: Measurement }>({
    mutationFn: ({ kpiId, data }) =>
      fetcher(`/api/qms/kpis/${kpiId}/measurements`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-kpis"] });
    },
  });
}

// -- MANAGEMENT REVIEW --
export interface ManagementReview {
  id: string | number;
  title: string;
  period: string;
  status: string;
  notes?: string;
}

export function useManagementReviews() {
  return useQuery<ManagementReview[], ApiError>({
    queryKey: ["qms-management-reviews"],
    queryFn: () => fetcher("/api/qms/management-reviews"),
  });
}

export function useCreateManagementReview() {
  const queryClient = useQueryClient();
  return useMutation<ManagementReview, ApiError, Partial<ManagementReview>>({
    mutationFn: (data) =>
      fetcher("/api/qms/management-reviews", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qms-management-reviews"] });
    },
  });
}
