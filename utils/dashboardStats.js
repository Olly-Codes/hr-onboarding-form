const getDashboardStats = (hires, now = new Date()) => {
  const today = now.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  const soonDate = new Date(now);
  soonDate.setDate(soonDate.getDate() + 14);
  const soon = soonDate.toISOString().slice(0, 10);

  const isOnboarded = (h) => h.new_hire_stage === "Onboarded";
  const active = hires.filter(
    (h) => h.approval_status !== "Rejected" && !isOnboarded(h)
  );

  return {
    open: hires.filter((h) => h.approval_status === "Approved" && !isOnboarded(h)).length,
    pending: hires.filter((h) => h.approval_status === "Pending").length,
    onboarded: hires.filter(isOnboarded).length,
    overdue: active.filter((h) => h.new_hire_start_date < today).length,
    startingSoon: active.filter(
      (h) => h.new_hire_start_date >= today && h.new_hire_start_date <= soon
    ).length,
  };
};

module.exports = { getDashboardStats };
