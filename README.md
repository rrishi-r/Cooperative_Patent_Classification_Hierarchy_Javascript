# Patent Analytics Program Setup & Walkthrough (For Javascript)
## Install
1) This project uses node.js and node-oracle db. 
2) Install Node.js by downloading the 64-bit MSI package. 
3) Install node-oracledb

## Oracle Cloud
1) Install Oracle Database XE or provision an Oracle Automomous Database Cloud instance. 
2) Download Oracle XE Client for Windows or Mac. 
3) Create a Node.js application called Patent Analytics. 
4) Import the .js files from this repository into the project. 
5) Modify config.js to update the Oracle connection of your provisioned instance. 

## Running the Program
1) Run createObjects.js to setup the database tables
2) Import patent raw data Patent_Application_Extract_by_CPC.dat into PAT_EXTRACT_DATA
3) Run splitCPC.js from node.js 
4) Run splitApplicants.js from node.js
5) Run ANALYTICS_EXTRACT.sql to export normalized Patent Analytics data to Excel
6) Import Excel into Zoho analytics platform
