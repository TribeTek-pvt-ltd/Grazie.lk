"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validation
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
            setError("Please fill all fields");
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || "Registration failed. Please try again.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                    <div className="mb-4 text-green-600 text-5xl">✓</div>
                    <h2 className="text-2xl font-bold mb-4 text-green-600">
                        Registration Successful!
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Your admin account has been created successfully.
                    </p>
                    <p className="text-sm text-gray-500">
                        Redirecting to login page...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Admin Registration
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full mb-4 p-3 border rounded"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full mb-4 p-3 border rounded"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password (min 6 characters)"
                    required
                    className="w-full mb-4 p-3 border rounded"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="w-full mb-6 p-3 border rounded"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                />

                <button
                    type="submit"
                    className="w-full bg-gold text-soft py-3 rounded font-semibold disabled:opacity-50 mb-4"
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-gold hover:underline">
                        Login here
                    </Link>
                </div>
            </form>
        </div>
    );
}
