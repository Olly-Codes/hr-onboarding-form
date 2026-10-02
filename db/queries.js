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

const getNewHireForApproval = async (id) => {
  const { data, error } = await supabase
    .from("new_hires")
    .select(
      "new_hire_id, new_hire_name, new_hire_start_date, approval_status, job:jobs(job_name, departments(department_name))"
    )
    .eq("new_hire_id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
};

const setApprovalStatus = async (id, status) => {
  const { error } = await supabase
    .from("new_hires")
    .update({ approval_status: status })
    .eq("new_hire_id", id)
    .eq("approval_status", "Pending");
  if (error) throw error;
};

module.exports = { 
  getAllJobs, 
  getEmployeesByRole, 
  createNewHire,
  getNewHireForApproval,
  setApprovalStatus 
};