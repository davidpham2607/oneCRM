---
title: "oneCRM Version 1.2.7 Released  -  oneCRM Blog"
description: "Version 1.2.7 is now available. This version comes with a lot improvements. We are trying to give oneCRM buyers the best UI experience and usage.  Vers"
source_path: "/blog/perfex-crm-version-1-2-7-released"
---

<div v-pre>
We are trying to give oneCRM buyers the best UI experience and usage. Version 1.2.7 comes with few improvements for the UI like in the Settings area and the Customer Profile area, minor bugs fixed and new features.

We know that you all want the features you need but unfortunataly this is not possible in such a short time. We are giving our best to optimize and in the same time add new features to the software. Our main goal for this version was to simplify the install process and the update process. For the update process we created new file in application/config/app-config.php to store all the necessary settings that are required for oneCRM to work properly. The installation will come with simple app-config-sample.php file that you dont need to edit and this will be handled in the install proces, after the installer finish the installation this file will be renamed to app-config.php and during the update this file wont be replaced. However **when upgrading to version 1.2.7 you will still need to delete config.php and database.php** after that the update script will handle the necessary changes.

Probably you are asking yourself how this will help the update process? The app-config.php (only app-config-sample.php exists) does not exists in oneCRM core files and will be only for your usage. In future version when you make an upgrade you will only need to replace the files without worrying to delete config.php and database.php because the main values will be stored in app-config.php (In future updates deleting config.php and database.php wont be necessary)

The **install process** is more simple now, you only need to upload your files to the server and go to eq. [http://yourdomain.com/crm/install](http://yourdomain.com/crm/install). The installer will auto edit the file and add the base url. Additionaly base url field is added in the installer in case is needed to be changed. Note that from this version the **install folder is no longer located** in application/controllers/

**Dropbox file choser is added** for most features. Now you will be able to chose files directly from your Dropbox account and save space in your server. Currently oneCRM support Dropbox file chose for the following features: Tasks, Invoices, Estimates, Proposals, Leads, Customer attachments, Contracts.

In the previous versions **there was no ability to edit the notes**, this ability is added in version 1.2.7 including the **ability to edit the proposal comments.**

The **company custom fields** located in Setup->Settings->Company are all moved together with all custom fields in Setup->Custom Fields (the update will handle this). Moving the fields with the other custom fields gives the ability users to add non alpha numeric characters there because the custom fields for company were limited.

**Added password email templates** to Setup->Email Templates. These templates were located in files you can read more [here](https://onecrm.example.com/docs/classic/3.x/customization/customers-templates). However the **new email templates will be using after you delete the my_email (if you have overwrited the password templates) and email folder from application/views/**. Its not possible to handle the update for the files located email templates and **you will need to transfer the content manualy to Setup->Email Templates**, once you transfer and **delete the folder my_email (if you have overwrited the password templates) and email the system will start using the password email templates located in Setup->Email Templates**. oneCRM will continue to support the folders email templates if exists for a specific time. Its highly recomended to switch to database related email templates..

A couple **new email templates** addeed including sending welcome email to staff when you create the staff member including the password, **new template and option is also added to send email to customer contacts when creating/editing the projects that new project is added to their company.**

You can read more about all changes [here](https://onecrm.example.com/docs/classic/3.x/changelog/version-1-2-7-released).

We will continue developing new features and improving the existing ones in time.

Last but not least, we want say thank you for all our buyers that support oneCRM and understand the development process. oneCRM now have **1000+ sales** and we hope will continue to grow.

## myDATA AADE connector module

myDATA AADE connector will take care of a complete synchronization between your oneCRM’s Invoices and Ανεξάρτητη Αρχή Δημοσίων Εσόδων (Α...

## PayTR Payment Gateway for oneCRM

We had a lot of requests for a Turkish payment gateway to be included in oneCRM and finally, it’s here. In collaboration with paytr.com...

## What’s New In oneCRM Version 2.2.0

oneCRM version 2.2.0 comes with new improvements and new features that will make working with oneCRM easier. Version 2.2.0 is releas...

</div>
