import React from "react";
import { LabelChip } from "components/label-chip/LabelChip";

export const DRAWER_WIDTH = 240;
export const TOAST_CONFIG = {
   position: "top-center",
   autoClose: 500,
};
export const STACKBAR_COLORS = [
   "#54bebe",
   "#76c68f",
   "#00bfff",
   "#54504c",
   "#dedad2",
];
export const CHART_OPTIONS = [
   { value: "time_track", label: "Time Track" },
   { value: "account_track", label: "Account Track" },
   { value: "social_track", label: "Social Track" },
   { value: "total_track", label: "Total Track" },
];
export const STATUS_OPTIONS = [
   { value: "Job Apply & Waiting", label: "Job Apply & Waiting" },
   { value: "RTR Confirmation", label: "RTR Confirmation" },
   { value: "Recruiter Interview", label: "Recruiter Interview" },
   { value: "Home Assessment", label: "Home Assessment" },
   { value: "HR Interview", label: "HR Interview" },
   { value: "Technical Interview", label: "Technical Interview" },
   { value: "Final Interview", label: "Final Interview" },
   { value: "Offer", label: "Offer" },
   { value: "Onboarding", label: "Onboarding" },
   { value: "First Payment", label: "First Payment" },
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
   { value: "Jonathan Samayoa", label: "Jonathan Samayoa" },
   { value: "James Larro", label: "James Larro" },
   { value: "Travis Dalton", label: "Travis Dalton" },
   { value: "Richard Correa", label: "Richard Correa" },
];
export const ACCOUNT_DETAILS = {
   "Jonathan Samayoa": {
      address: "Amarillo, TX",
      email: "temp@temp.com",
      phone: "+1-806-576-1063",
      linkedin: "linkedin.com/in/jonathan-samayoa/",
      currentPosition: "With-meetwithanyone.com",
      currentLength: "5",
      collegeName: "Texas State University",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegePeriod: "2009-2013",
      companyInfo: [
         {
            name: "With-meetwithanyone.com",
            position: "Full stack developer",
            fromWhenTo: "05.2018 ~ 05.2023",
         },
         {
            name: "Sky Republic Inc",
            position: "Senior Frontend Developer",
            fromWhenTo: "10.2016 ~ 04.2018",
         },
         {
            name: "Allsocial",
            position: "Web Developer",
            fromWhenTo: "09.2013 ~ 09.2016",
         },
      ],
   },
   "James Larro": {
      address: "Orlando, FL",
      email: "temp@temp.com",
      phone: "+1-407-815-2419",
      linkedin: "linkedin.com/in/james-larro/",
      currentPosition: "Mend",
      currentLength: "5",
      collegeName: "New College of Florida",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegePeriod: "2009-2013",
      companyInfo: [
         {
            name: "Mend",
            position: "Senior Software Developer",
            fromWhenTo: "05.2018 ~ 05.2023",
         },
         {
            name: "iSpot.tv",
            position: "Full-stack Developer",
            fromWhenTo: "09.2016 ~ 04.2018",
         },
         {
            name: "Ganic",
            position: "Web Developer",
            fromWhenTo: "10.2013 ~ 08.2016",
         },
      ],
   },
   cleve_ambrose: {
      address: "Baltimore, MD",
      email: "temp@temp.com",
      phone: "+1-781-609-7575",
      linkedin: "linkedin.com/in/amcleverose/",
      currentPosition: "UCLA, Los Angeles, California.",
      currentLength: "5",
      collegeName: "Bowie State University",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegePeriod: "2009-2013",
      companyInfo: [
         {
            name: "UCLA, Los Angeles, California.",
            position: "Full stack React/Node developer",
            fromWhenTo: "05.2018 ~ 05.2023",
         },
         {
            name: "BMR Thermal Inc, Portsmouth, NH.",
            position: "Full-stack Developer",
            fromWhenTo: "02.2016 ~ 04.2018",
         },
         {
            name: "Formless, Portsmouth, NH.",
            position: "Web Developer",
            fromWhenTo: "11.2013 ~ 02.2016",
         },
      ],
   },
};
export const JOB_BOARD_OPTIONS = [
   { value: "Linkedin", label: "Linkedin" },
   { value: "Indeed", label: "Indeed" },
   { value: "Dice", label: "Dice" },
   { value: "ZipRecruiter", label: "ZipRecruiter" },
   { value: "Glassdoor", label: "Glassdoor" },
];

export const WORK_COLUMNS = [
   {
      Header: "Job Details",
      columns: [
         {
            Header: "Position",
            accessor: "position",
         },
      ],
   },
   {
      Header: "Company Information",
      columns: [
         {
            Header: "Direct Company",
            accessor: "directCompany",
         },
      ],
   },
   {
      Header: "Application Information",
      columns: [
         {
            Header: "Account",
            accessor: "account",
         },
         {
            Header: "Job Board",
            accessor: "jobBoard",
         },
         {
            Header: "Status",
            accessor: "status",
         },
         {
            Header: "Date",
            accessor: "createDate",
         },
      ],
   },
];

export const ADMIN_COLUMNS = [
   {
      Header: "Profile Meta Information",
      columns: [
         {
            Header: "Profile Name",
            accessor: "profileName",
         },
         {
            Header: "Profile Email",
            accessor: "profileEmail",
         },
         {
            Header: "Profile Linkedin",
            accessor: "profileLinkedIn",
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
            Cell: ({ value }) => {
               if (value === "notFinished") {
                  return <LabelChip label="Not Finished" color="warning" />;
               }
               if (value === "holding") {
                  return <LabelChip label="Holding" color="error" />;
               }
               if (value === "finished") {
                  return <LabelChip label="Finished" color="success" />;
               }
               if (value === "inProgress") {
                  return <LabelChip label="In Progress" color="secondary" />;
               }
               return <LabelChip label="Not Finished" color="warning" />;
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
