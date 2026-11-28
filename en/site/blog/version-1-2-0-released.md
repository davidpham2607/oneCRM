---
title: "Version 1.2.0 Released  -  oneCRM Blog"
description: "Full change log Version 1.2.0 is released. This version comes with a lot improvements and bug fixes together with some new features. Choose PDF document fo"
source_path: "/blog/version-1-2-0-released"
---

<div v-pre>

Version 1.2.0 is released. This version comes with a lot improvements and bug fixes together with some new features.

### **Choose PDF document format A4 or LETTER.**

oneCRM will auto calculate the document width and align the text elements to the necessary positions.

If you are using your own eq. [my_invoicepdf.php](/en/docs/classic/3.x/customization/edit-view-files-without-messing-the-core-view-files) you will need to switch the the core file to see the changes.

### **Ability to link invoice to project from the invoice create/edit area.**

In version 1.2.0 you will have ability to link the invoice directly to the project. While before[ linking invoice to project](/en/docs/classic/3.x/projects/invoicing-project) was only available from the projects area by clickin on the invoice project button.

Note: The project dropdown will be shown only if there is projects associated with the selected customer.

### **Task timesheets will be shown in the task modal with ability to add new timesheet directly from the modal.**

The manualy record timesheet function is changed. This function will accept full date format for Start Time and End Time.

This change is affected on the project timesheet area too. While before the date selection for Start Time and End Time was with dropdown fields. Selecting dates from calendar will faster the manualy creating task timesheets.

### **Project Gantt Chart will show tasks together with milestones.**

The project Gantt View will show now the milestones. The tasks labels on the right side will be changed based on task conditions.

- Blue - Not Started/In Progress.
- Red - Due Date Passed.
- Green - Finished.

### **Expense detailed report included**

New report added for expenses where all the necessary data will be shown including the expense tax percent and taxname.

This report can be generate by navigating to Reports->Expenses->Detailed Report.

### **Introducing powerful filters**

Most tables filtering will now accept multiple filters and the quick stats for invoices/estimates/expenses will be auto updated based on filter.

* Added filters for estimates,invoices,proposals by assigned/sale agent.
* Added filters for estimates,invoices,contracts,proposals, expenses by years
* Added filters for contracts by months
* Added filters for customers by proposals and projects
* Added filters by ticket assigned members for administrators.
* Added filters for tasks by assigned staff members.
* Invoices/Estimates list will now filter by year and by number.

### **Show/Hide attached files for Invoices/Estimates/Proposals to your customers.**

Ability to upload files to invoices was a feature before but showing to the customer was not. In version 1.2.0 you will have the ability to upload, show and hide the attached files for Invoices/Estimates/Proposals.

## myDATA AADE connector module

myDATA AADE connector will take care of a complete synchronization between your oneCRM’s Invoices and Ανεξάρτητη Αρχή Δημοσίων Εσόδων (Α...

## PayTR Payment Gateway for oneCRM

We had a lot of requests for a Turkish payment gateway to be included in oneCRM and finally, it’s here. In collaboration with paytr.com...

## What’s New In oneCRM Version 2.2.0

oneCRM version 2.2.0 comes with new improvements and new features that will make working with oneCRM easier. Version 2.2.0 is releas...

</div>
