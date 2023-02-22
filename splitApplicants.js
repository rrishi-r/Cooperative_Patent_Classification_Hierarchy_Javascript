/**
 * This function Splits Patents with multiple Applicant Attributions into individual Normalized Records per Applicant
 * Author:      Rishi Raghav
 * Create date: 08-20-2021
 * Description: To Normalize Patent Dataset repository extracted European Patent Office
 * Details:		Normalize by Applicant  Attribution
 * Comments: 	Normalized data will be used in Patent Analytics platorm with particular focus on CPC
 * JS File Name: splitApplicants.js
 */
const oracledb = require('oracledb');
const config = require('./config');
oracledb.initOracleClient({ libDir: 'C:\\instant-client_12' });

async function run() {
    // Open Oracle Connection
    let connection;
    try {
        connection = await oracledb.getConnection(config);
        // Select data from Patent Extract Table and iterate through records
        const result = await connection.execute(`select patent_seq_id,sub_seq_id,applicants from pat_extract_data`);
        for (const row of result.rows)
        {
            // Split Applicants String Pattern into tokens of individual applicants
            const substrings = row[2].split(' ');
            // iterate through tokenized applicant array and insert into Applicant table
            for (const substring of substrings) {
                const insert = await connection.execute(`insert into pat_applicants_split_data 
                                                                (pat_seq_id, sub_seq_id, applicants)
                                                                VALUES (:x,:y,:z)`, [row[0], row[1], substring]);
                await connection.commit();
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                // Close connection
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
run();