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

const newHireExists = async (id) => {
  const { data, error } = await supabase
    .from("new_hires")
    .select("new_hire_id")
    .eq("new_hire_id", id)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
};

const getAllNewHires = async () => {
  const { data, error } = await supabase
    .from("new_hires")
    .select(
      "new_hire_id, new_hire_name, new_hire_start_date, new_hire_stage, approval_status, job:jobs(job_name, departments(department_name))"
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const getNewHireDetails = async (id) => {
  const { data, error } = await supabase
    .from("new_hires")
    .select(
      "new_hire_id, new_hire_name, new_hire_email, new_hire_phone, new_hire_start_date, new_hire_stage, approval_status, job:jobs(job_name, departments(department_name)), manager:employees!manager_id(employee_name, employee_email), hr_owner:employees!hr_owner_id(employee_name, employee_email), documents(document_id, document_name, document_type, status, sent_date)"
    )
    .eq("new_hire_id", id)
    .order("sent_date", { referencedTable: "documents", ascending: true })
    .maybeSingle();
  if (error) throw error;
  return data;
};

module.exports = { 
  getAllJobs, 
  getEmployeesByRole, 
  createNewHire,
  getNewHireForApproval,
  setApprovalStatus,
  newHireExists,
  getAllNewHires,
  getNewHireDetails
};