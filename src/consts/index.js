export const DRAWER_WIDTH = 240;
export const STATUS_OPTIONS = [
  { value: "job_apply_waiting", label: "Job Apply & Waiting" },
  { value: "rtr_confirmation", label: "RTR Confirmation" },
  { value: "recruiter_interview", label: "Recruiter Interview" },
  { value: "home_assessment", label: "Home Assessment" },
  { value: "hr_interview", label: "HR Interview" },
  { value: "tech_interview", label: "Technial Interview" },
  { value: "final_interview", label: "Final Interview" },
  { value: "get_offer", label: "Offer" },
  { value: "onboarding", label: "Onboarding" },
  { value: "first_payment", label: "First Payment" },
];
export const ACCOUNT_OPTIONS = [
  { value: "dante_roland", label: "Dante Roland" },
  { value: "travis_dalton", label: "Travis Dalton" },
  { value: "ardavan_tari", label: "Ardavan Tari" },
];
export const JOB_BOARD_OPTIONS = [
  { value: "linkedin", label: "Linkedin" },
  { value: "zip_recruiter", label: "ZipRecruiter" },
  { value: "indeed", label: "Indeed" },
  { value: "dice", label: "Dice" },
  { value: "company_website", label: "Company website" },
];

export const WORK_COLUMNS = [
  {
    Header: "Company Information",
    columns: [
      {
        Header: "Direct Company",
        accessor: "directCompany",
      },
      {
        Header: "Agency Company",
        accessor: "agencyCompany",
      },
      {
        Header: "Company Website",
        accessor: "companyUrl",
      },
    ],
  },
  {
    Header: "Application Information",
    columns: [
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Account",
        accessor: "account",
      },
      {
        Header: "Job Board",
        accessor: "jobBoard",
      },
      {
        Header: "Date",
        accessor: "createDate",
      },
    ],
  },
  {
    Header: "Job Details",
    columns: [
      {
        Header: "Position",
        accessor: "position",
      },
      {
        Header: "Job Description",
        accessor: "jobDescription",
      },
    ],
  },
];

export const TRACK_COLUMNS = [
  {
    Header: "Company Information",
    columns: [
      {
        Header: "Direct Company",
        accessor: "directCompany",
      },
      {
        Header: "Agency Company",
        accessor: "agencyCompany",
      },
      {
        Header: "Company Website",
        accessor: "companyUrl",
      },
    ],
  },
  {
    Header: "Application Information",
    columns: [
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Account",
        accessor: "account",
      },
      {
        Header: "Job Board",
        accessor: "jobBoard",
      },
      {
        Header: "Date",
        accessor: "createDate",
      },
    ],
  },
];
