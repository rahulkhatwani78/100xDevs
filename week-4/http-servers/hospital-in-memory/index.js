const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const PORT = 3000;

const users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
  {
    name: "Jack",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.use(bodyParser.json());

const getPatientDetails = (req, res) => {
  const name = req?.body?.patientName;
  if (!name) {
    res.status(400).send({
      error: `Please provide the patient name`,
    });
    return;
  }
  const patientDetails = users?.filter((user) => {
    return user?.name === name;
  });
  if (patientDetails?.length === 0) {
    res.status(400).send({
      error: `No patient found with the provided patient name`,
    });
    return;
  }
  const numberOfKidneys = patientDetails?.[0]?.kidneys?.length || 0;
  const numberOfHealthyKidneys =
    patientDetails?.[0]?.kidneys?.filter((kidney) => {
      return kidney?.healthy;
    })?.length || 0;

  return {
    patientName: name,
    numberOfKidneys,
    numberOfHealthyKidneys,
  };
};

app.get("/listAllPatients", (req, res) => {
  const allPatientDetails = [];
  users?.forEach((user) => {
    req.body = {
      patientName: user?.name || "",
    };
    const finalPatientDetails = getPatientDetails(req, res);
    if (finalPatientDetails) allPatientDetails?.push(finalPatientDetails);
  });
  res.send(allPatientDetails);
});

app.get("/getKidneyHealth", (req, res) => {
  const patientDetails = getPatientDetails(req, res);
  if (patientDetails) res.send(patientDetails);
});

app.post("/addPatientDetails", (req, res) => {
  const {
    patientName,
    numberOfKidneys = 0,
    numberOfHealthyKidneys = 0,
  } = req?.body || {};
  if (!patientName) {
    res.status(400).send({
      error: `Please provide the patient name`,
    });
    return;
  }

  const patientDetails = users?.filter((user) => {
    return user?.name === patientName;
  });
  if (patientDetails?.length !== 0) {
    res.status(400).send({
      error: `Patient with the provided patient name already exists`,
    });
    return;
  }

  if (numberOfKidneys > 2 || numberOfHealthyKidneys > 2) {
    res.status(400).send({
      error: `Number of kidneys can't be greater than 2`,
    });
    return;
  }

  if (numberOfHealthyKidneys > numberOfKidneys) {
    res.status(400).send({
      error: `Number of healthy kidneys can't be greater than total number of kidneys`,
    });
    return;
  }

  const patient = {
    name: patientName,
    kidneys: [],
  };

  for (let i = 0; i < numberOfKidneys; i++) {
    patient?.kidneys?.push({
      healthy: false,
    });
  }

  for (let i = 0; i < numberOfHealthyKidneys; i++) {
    patient.kidneys[i].healthy = true;
  }
  users.push(patient);
  const finalPatientDetails = getPatientDetails(req, res);
  if (finalPatientDetails) res.send(finalPatientDetails);
});

app.put("/updatePatientDetails", (req, res) => {
  const { patientName, numberOfKidneys, numberOfHealthyKidneys } =
    req?.body || {};
  if (!patientName) {
    res.status(400).send({
      error: `Please provide the patient name`,
    });
    return;
  }

  const patientDetails = users?.filter((user) => {
    return user?.name === patientName;
  });

  if (patientDetails?.length === 0) {
    res.status(400).send({
      error: `No patient found with the provided patient name`,
    });
    return;
  }

  if (numberOfKidneys > 2 || numberOfHealthyKidneys > 2) {
    res.status(400).send({
      error: `Number of kidneys can't be greater than 2`,
    });
    return;
  }

  const patient = patientDetails?.[0];
  let numberOfOldKidneys = patientDetails?.[0]?.kidneys?.length || 0;
  let numberOfOldHealthyKidneys =
    patientDetails?.[0]?.kidneys?.filter((kidney) => {
      return kidney?.healthy;
    })?.length || 0;

  if (numberOfKidneys !== null && numberOfKidneys !== undefined) {
    numberOfOldKidneys = numberOfKidneys;
  }

  if (numberOfHealthyKidneys !== null && numberOfHealthyKidneys !== undefined) {
    numberOfOldHealthyKidneys = numberOfHealthyKidneys;
  }

  if (numberOfOldKidneys < numberOfOldHealthyKidneys) {
    res.status(400).send({
      error: `Number of healthy kidneys can't be greater than total number of kidneys`,
    });
    return;
  }

  patient.kidneys.length = 0;
  for (let i = 0; i < numberOfOldKidneys; i++) {
    patient?.kidneys?.push({
      healthy: false,
    });
  }

  for (let i = 0; i < numberOfOldHealthyKidneys; i++) {
    patient.kidneys[i].healthy = true;
  }

  users.forEach((user, index) => {
    if (user?.name === patient?.name) {
      users[index] = patient;
    }
  });

  const finalPatientDetails = getPatientDetails(req, res);
  if (finalPatientDetails) res.send(finalPatientDetails);
});

app.delete("/deletePatientDetails", (req, res) => {
  const patientName = req?.body?.patientName;
  if (!patientName) {
    res.status(400).send({
      error: `Please provide the patient name`,
    });
    return;
  }

  let indexOfDeletingPatient = -1;
  users?.forEach((user, index) => {
    if (user?.name === patientName) {
      indexOfDeletingPatient = index;
    }
  });

  if (indexOfDeletingPatient < 0) {
    res.status(400).send({
      error: `No patient found with the provided patient name`,
    });
    return;
  }

  const deletedPatientDetails = getPatientDetails(req, res);
  users?.splice(indexOfDeletingPatient, 1);

  res.send({
    message: "Patient details deleted successfully",
    deletedPatientDetails,
  });
});

app.listen(PORT, () => {
  console.log("Server Listening on Port", PORT);
});
