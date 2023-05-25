import React from "react";
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
   { value: "jonathan_samayoa", label: "Jonathan Samayoa" },
   { value: "james_larro", label: "James Larro" },
   { value: "cleve_ambrose", label: "Cleve Ambrose" },
   { value: "richard_correa", label: "Richard Correa" },
];
export const ACCOUNT_DETAILS = {
   jonathan_samayoa: {
      address: "Amarillo, TX",
      email: "jonathandreamdev@gmail.com",
      phone: "+1-806-576-1063",
      linkedin: "linkedin.com/in/jonathan-samayoa/",
      currentPosition: "With-meetwithanyone.com",
      currentLength: "5",
      currentTechnologies: "React, Node, Javascript, AWS",
      collegeName: "Texas State University",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegePeriod: "2010-2014",
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
            fromWhenTo: "09.2014 ~ 09.2016",
         },
      ],
   },
   james_larro: {
      address: "Orlando, FL",
      email: "jamescrmlarro@gmail.com",
      phone: "+1-407-815-2419",
      linkedin: "linkedin.com/in/james-larro/",
      currentPosition: "Mend",
      currentLength: "5",
      currentTechnologies: "Node.js, Express, AWS",
      collegeName: "New College of Florida",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegePeriod: "2010-2014",
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
            fromWhenTo: "04.2014 ~ 08.2016",
         },
      ],
   },
   cleve_ambrose: {
      address: "Baltimore, MD",
      email: "amcleverose@gmail.com",
      phone: "+1-781-609-7575",
      linkedin: "linkedin.com/in/amcleverose/",
      currentPosition: "UCLA, Los Angeles, California",
      currentLength: "5",
      currentTechnologies: "Node.js, Express, AWS",
      collegeName: "Bowie State University",
      collegeDegree: "Bachelor of Science",
      collegeMajor: "Computer Science",
      collegePeriod: "2010-2014",
      companyInfo: [
         {
            name: "UCLA",
            position: "Full stack React/Node developer",
            fromWhenTo: "05.2018 ~ 05.2023",
         },
         {
            name: "BMR Thermal Inc",
            position: "Full-stack Developer",
            fromWhenTo: "02.2016 ~ 04.2018",
         },
         {
            name: "Formless",
            position: "Web Developer",
            fromWhenTo: "04.2014 ~ 02.2016",
         },
      ],
   },
};
export const JOB_BOARD_OPTIONS = [
   { value: "indeed", label: "Indeed" },
   { value: "linkedin", label: "Linkedin" },
   { value: "zip_recruiter", label: "ZipRecruiter" },
   { value: "wellfound", label: "Wellfound" },
   { value: "glassdoor", label: "Glassdoor" },
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
      ],
   },
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
            Cell: ({ value }) => {
               if (value === "notFinished") {
                  return <LabelChip label="Not Finished" color="warning" />;
               }
               if (value === "holding") {
                  return <LabelChip label="Holiding" color="error" />;
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

export const SETTINGS = ["Profile", "Account", "Dashboard", "Logout"];
