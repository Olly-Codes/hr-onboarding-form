// Dashboard helpers. They work on the hires that getAllNewHires() already
// returns, so no extra database queries are needed.

// Order of the onboarding stages, used for the progress bar in the table.
const STAGES = [
  "Request logged",
  "Approved",
  "Offer Sent",
  "Offer Signed",
  "Contract Sent",
  "Contract Signed",
  "Policy Docs Sent",
  "Policy Docs Signed",
  "Survey Sent",
  "Survey Completed",
  "Onboarded",
];

const isoDate = (date) => date.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

// "Active" = still moving through onboarding: not Rejected and not Onboarded.
const isActive = (hire) =>
  hire.approval_status !== "Rejected" && hire.new_hire_stage !== "Onboarded";

const stageProgress = (stage) => {
  const index = STAGES.indexOf(stage);
  return index < 0 ? 0 : Math.round(((index + 1) / STAGES.length) * 100);
};

// KPI cards
//   open         = approved and not yet Onboarded
//   pending      = approval_status is Pending
//   onboarded    = stage is Onboarded
//   overdue      = active, start date has passed
//   startingSoon = active, start date is today or within the next 14 days
const getDashboardStats = (hires, now = new Date()) => {
  const today = isoDate(now);
  const soonDate = new Date(now);
  soonDate.setDate(soonDate.getDate() + 14);
  const soon = isoDate(soonDate);
  const active = hires.filter(isActive);

  return {
    open: hires.filter(
      (h) => h.approval_status === "Approved" && h.new_hire_stage !== "Onboarded"
    ).length,
    pending: hires.filter((h) => h.approval_status === "Pending").length,
    onboarded: hires.filter((h) => h.new_hire_stage === "Onboarded").length,
    overdue: active.filter((h) => h.new_hire_start_date < today).length,
    startingSoon: active.filter(
      (h) => h.new_hire_start_date >= today && h.new_hire_start_date <= soon
    ).length,
  };
};

// Adds `progress` (0-100) and `isOverdue` to each hire for the table.
const addDashboardFields = (hires, now = new Date()) => {
  const today = isoDate(now);
  return hires.map((hire) => ({
    ...hire,
    progress: stageProgress(hire.new_hire_stage),
    isOverdue: isActive(hire) && hire.new_hire_start_date < today,
  }));
};

module.exports = { getDashboardStats, addDashboardFields };
