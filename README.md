# HC Dashboard

HC Dashboard provides an easy overview of patient data, for a healthcare professional.

## Patient Overview

This is where a healthcare professional can see all of his/her patients and their most current data.

### Risk score

A risk score is calculated from the amount of times a patients data is above a threshold. A 14 day average is also calculated from the risk scores.

### Specific patient

To go to the overview of a specific patient, just click on the name of the patient in the table.

## Patient Data

This is where a healthcare professional can get a better overview of a specific patients data and how it evolves.

### Edit threshold

To edit the thresholds for a specific data type on the patient, just click the "Threshold" button next to the specific data type in the table. This will open a modal where you can make the changes.

### Date select/Compare/Graph view

To view more options for data comparison and viewing the dat: click the arrow above the table to open more options.

### Comparison

Toggle comparison to get the option to compare the current data with data from an earlier period of data.

## Adding a patient

If the healthcare professional wants to add a new patient to their list of patients. They can go to the "Add patient" page. Here they are asked to enter a patients email address.

A verification email is sent to the patient, and if verified they will be added to the healthcare professional.

## For developers

### Routes

Should you want to add a new route to the application, all you have to do is add a new subfolder to the "routes" folder. The subfolder name will be the name of the route.

In this subfolder you add a "+page.svelte" file with the necessary code. You can also add a "+page.server.ts" file to the subfolder, should you want to execute code on the server side of the application.

Official Svelte docs: https://kit.svelte.dev/docs/routing

### Components

To add a component add a "[componentName].svelte" file to the "Components" folder.
