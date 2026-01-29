"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // 2. Call backend API to register the user
  const { name, email, password } = validatedFields.data;

  const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return {
      message: error.detail || "An error occurred while creating your account.",
    };
  }

  const user = await response.json();

  // 3. Create session
  await createSession(user.id);

  // 4. Redirect
  redirect("/movies");
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // 2. Call backend API to authenticate
  const { email, password } = validatedFields.data;

  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return {
      message: "Invalid email or password.",
    };
  }

  const user = await response.json();

  // 3. Create session
  await createSession(user.id);

  // 4. Redirect
  redirect("/movies");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
