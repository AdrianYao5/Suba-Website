import express from "express";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var siteData = {};
var careersData = {};
var countryList = {};

function hasCategory(job, keyCategory) {
  return job.department === keyCategory;
}

function containsTerm(job, keyTerm) {
  let jobTitle = job.title.toLowerCase();
  let searchTerm = keyTerm.toLowerCase();
  return jobTitle.includes(searchTerm);
}

function getJSONData(filename) {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}

function getSiteData(req, res, next) {
  siteData = getJSONData(__dirname + "/data/siteData.json");
  careersData = getJSONData(__dirname + "/data/jobApplicationData.json");
  countryList = getJSONData(__dirname + "/data/countries.json");
  next();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(getSiteData);

app.get("/", (req, res) => {
  res.locals = { serviceList: siteData.services, industriesList: siteData.industries };
  res.render("index.ejs");
});

app.get("/industries", (req, res) => {
  res.locals = { industriesList: siteData.industries };
  res.render("industries.ejs");
});

app.get("/services", (req, res) => {
  res.locals = { serviceList: siteData.services };
  res.render("services.ejs");
});

app.get("/services/supplyChain", (req, res) => {
  res.locals = { service: siteData.services["SC"] };
  res.render("services-template.ejs");
});

app.get("/services/quickTurnPrototype", (req, res) => {
  res.locals = { service: siteData.services["QTP"] };
  res.render("services-template.ejs");
});

app.get("/services/advancedManufacturingServices", (req, res) => {
  res.locals = { service: siteData.services["AMS"] };
  res.render("services-template.ejs");
});

app.get("/services/qualityAssurance", (req, res) => {
  res.locals = { service: siteData.services["QA"] };
  res.render("services-template.ejs");
});

app.get("/services/valueAddEngineering", (req, res) => {
  res.locals = { service: siteData.services["VAE"] };
  res.render("services-template.ejs");
});

app.get("/services/fulfillment", (req, res) => {
  res.locals = { service: siteData.services["FILL"] };
  res.render("services-template.ejs");
});

app.get("/services/afterSaleServices", (req, res) => {
  res.locals = { service: siteData.services["AS"] };
  res.render("services-template.ejs");
});

app.get("/ourCompany", (req, res) => {
  res.locals = { personnel: siteData.personnel };
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/careers", (req, res) => {
  res.render("careers.ejs");
});

app.get("/careers/jobOpenings", (req, res) => {
  res.locals = { 
    jobs: careersData.jobs, 
    departments: [...new Set(careersData.jobs.map(job => job.department))] 
  };
  res.render("job-openings.ejs");
});

app.post("/careers/jobOpenings", (req, res) => {
  // get submitted data
  let filteredJobs = careersData.jobs;
  let keyTerm = req.body.keyTerm || "";
  let keyCategory = req.body.keyCategory || "All Departments";
  
  // filter content
  if (keyTerm === "") {
    if (keyCategory !== "All Departments") {
      filteredJobs = careersData.jobs.filter(job => {
        return hasCategory(job, keyCategory);
      });
    }
  }
  else {
    if (keyCategory === "All Departments") {
      filteredJobs = careersData.jobs.filter(job => {
        return containsTerm(job, keyTerm);
      });
    }
    else {
      filteredJobs = careersData.jobs.filter(job => {
        return containsTerm(job, keyTerm) && hasCategory(job, keyCategory);
      });
    }
  }

  res.locals = { 
    jobs: filteredJobs, 
    departments: [...new Set(careersData.jobs.map(job => job.department))] 
  };
  res.render("job-openings.ejs");
});

app.post("/applicationForm", (req, res) => {
  res.locals = { 
    selectedJob: careersData.jobs.find(job => job.job_id === parseInt(req.body.jobID)),
    form: "partials/applicationFormPage1.ejs",
    countries: countryList.countries
  };
  res.render("application-form.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
