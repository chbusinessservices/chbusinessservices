import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "~/components/DashboardLayout";
import { useToast } from "~/components/Toast";
import { AnimatedSection } from "~/components/AnimatedSection";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: Settings,
});

function Settings() {
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      addToast("Changes saved successfully!", "success");
    }, 600);
  };

  return (
    <DashboardLayout currentPath="/dashboard/settings">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Settings
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="mt-8 max-w-2xl">
            <div className="card-premium">
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
                <p className="mt-1 text-sm text-gray-500">Your account details.</p>
              </div>
              <div className="space-y-5 px-6 py-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue="Member"
                    className="input-premium mt-1 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="member@chbusinessservices.com"
                    disabled
                    className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-400">Contact support to change your email.</p>
                </div>
              </div>
            </div>

            <div className="card-premium mt-6">
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <p className="mt-1 text-sm text-gray-500">Choose what you want to hear about.</p>
              </div>
              <div className="space-y-4 px-6 py-5">
                {[
                  { id: "email-alerts", label: "Email alerts", desc: "Get notified when new reports match your criteria." },
                  { id: "weekly-digest", label: "Weekly digest", desc: "A weekly summary of new reports and opportunities." },
                  { id: "marketplace-updates", label: "Marketplace updates", desc: "New AI business kit listings and price changes." },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id={item.id}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="btn-primary text-sm disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
