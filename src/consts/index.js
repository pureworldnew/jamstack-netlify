import { LabelChip } from "components/label-chip/LabelChip";
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

export const STRESS_STATUS_OPTIONS = [
  { value: "finished", label: "Finished" },
  { value: "notFinished", label: "Not Finished" },
  { value: "inProgress", label: "In progress" },
  { value: "holding", label: "Holding" },
];

export const PLAN_STATUS_OPTIONS = [
  { value: "notFinished", label: "Not Finished" },
  { value: "finished", label: "Finished" },
  { value: "inProgress", label: "In progress" },
  { value: "holding", label: "Holding" },
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

export const STRESS_COLUMNS = [
  {
    Header: "Stress Information",
    columns: [
      {
        Header: "Stress Title",
        accessor: "stressTitle",
      },
      {
        Header: "Stress Description",
        accessor: "stressDescription",
      },
      {
        Header: "Stress Starting Date",
        accessor: "stressStartDate",
      },
      {
        Header: "Stress Ending Date",
        accessor: "stressEndDate",
      },
    ],
  },
  {
    Header: "Stress Status / Reason / Solution",
    columns: [
      {
        Header: "Status",
        accessor: "stressStatus",
      },
      {
        Header: "Reason",
        accessor: "stressReason",
      },
      {
        Header: "Solution",
        accessor: "stressSolution",
      },
    ],
  },
];

export const TRACK_COLUMNS = [
  {
    Header: "What to do ?",
    columns: [
      {
        Header: "Project",
        accessor: "projectId",
      },
      {
        Header: "Task",
        accessor: "taskId",
      },
      {
        Header: "Tags",
        accessor: "tagIds",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
  },
  {
    Header: "When to do ?",
    columns: [
      {
        Header: "Start",
        accessor: "start",
      },
      {
        Header: "End",
        accessor: "end",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Time Entry Id",
        accessor: "timeEntryId",
        show: false,
      },
    ],
  },
];

export const PLAN_COLUMNS = [
  {
    Header: "What must be done tomorrow?",
    columns: [
      {
        Header: "Title",
        accessor: "planTitle",
      },
      {
        Header: "Description",
        accessor: "planDescription",
      },
      {
        Header: "Tags",
        accessor: "planTags",
      },
      {
        Header: "Result",
        accessor: "planResult",
      },
    ],
  },
  {
    Header: "Status of todos",
    columns: [
      {
        Header: "Status",
        accessor: "planStatus",
        Cell: (props) => {
          if (props.value === "notFinished") {
            return <LabelChip label="Not Finished" color="warning" />;
          } else if (props.value === "holding") {
            return <LabelChip label="Holiding" color="error" />;
          } else if (props.value === "finished") {
            return <LabelChip label="Finished" color="success" />;
          } else if (props.value === "inProgress") {
            return <LabelChip label="In Progress" color="secondary" />;
          }
        },
      },
      {
        Header: "Date",
        accessor: "createDate",
      },
      {
        Header: "Finished Date",
        accessor: "finishedDate",
      },
    ],
  },
];

export const CASH_COLUMNS = [
  {
    Header: "What to buy?",
    columns: [
      {
        Header: "Title",
        accessor: "cashTitle",
      },
      {
        Header: "Value",
        accessor: "cashValue",
      },
    ],
  },
  {
    Header: "For whom?",
    columns: [
      {
        Header: "For whom",
        accessor: "cashForWhom",
      },
    ],
  },
  {
    Header: "Why?",
    columns: [
      {
        Header: "Reason",
        accessor: "cashWhy",
      },
    ],
  },
  {
    Header: "When?",
    columns: [
      {
        Header: "Date",
        accessor: "createDate",
      },
    ],
  },
];
