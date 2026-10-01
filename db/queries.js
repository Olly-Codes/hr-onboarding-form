const supabase = require("./supabase");

const getAllJobs = async () => {
  const { data, error } = await supabase
    .from("jobs")
    .select("job_id, job_name")
    .order("job_name");
  if (error) throw error;
  return data;
};

const getEmployeesByRole = async (role) => {
  const { data, error } = await supabase
    .from("employees")
    .select("employee_id, employee_name")
    .eq("employee_role", role)
    .order("employee_name");
  if (error) throw error;
  return data;
};

const createNewHire = async (newHire) => {
  const { error } = await supabase.from("new_hires").insert(newHire);
  if (error) throw error;
};

module.exports = { getAllJobs, getEmployeesByRole, createNewHire };