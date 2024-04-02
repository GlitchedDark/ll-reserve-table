import { z } from 'zod'

export const ReservationSchema = z.object({
    firstName: z
        .string().trim()
        .min(1, "First name is required"),
    lastName: z
        .string().trim()
        .min(1, "Last name is required"),
    email: z
        .string().min(1, "Email is required").email("Invalid email address").trim().toLowerCase(),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    guests: z.string().min(1, "Amount of guests is required"),
    occasion: z.string().optional(),
    comments: z.string().optional(),
})

export type ReservationType = z.infer<typeof ReservationSchema>