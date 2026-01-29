"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from "@/lib/definitions";
import { createSession, deleteSession, decrypt } from "@/lib/session";
import db from "@/lib/db";

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

  const { name, email, password } = validatedFields.data;

  // 2. Check if email already exists
  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);
  if (existing) {
    return { message: "Email already registered." };
  }

  // 3. Hash password and insert user
  let userId: number;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db
      .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
      .run(name, email, hashedPassword);
    userId = result.lastInsertRowid as number;
  } catch (error) {
    console.error("Signup error:", error);
    return { message: "Something went wrong. Please try again." };
  }

  // 4. Create session
  await createSession(userId);

  // 5. Redirect
  redirect("/");
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

  const { email, password } = validatedFields.data;

  // 2. Look up user by email
  let user: { id: number; name: string; email: string; password: string } | undefined;
  try {
    user = db
      .prepare("SELECT id, name, email, password FROM users WHERE email = ?")
      .get(email) as typeof user;
  } catch (error) {
    console.error("Login DB error:", error);
    return { message: "Something went wrong. Please try again." };
  }

  if (!user) {
    return { message: "Invalid email or password." };
  }

  // 3. Verify password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { message: "Invalid email or password." };
  }

  // 4. Create session
  await createSession(user.id);

  // 5. Redirect
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getSessionUser(): Promise<{
  id: number;
  name: string;
  email: string;
} | null> {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  const user = db
    .prepare("SELECT id, name, email FROM users WHERE id = ?")
    .get(session.userId) as
    | { id: number; name: string; email: string }
    | undefined;

  return user ?? null;
}
