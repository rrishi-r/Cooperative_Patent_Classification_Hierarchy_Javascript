/**
 * This function splits Patents with multiple CPC attributions into individual normalized records, one per CPC
 * Author:      Rishi Raghav
 * Create date: 08-20-2021
 * Description: To Normalize Patent Dataset repository extracted European Patent Office
 * Details:		Normalize by Applicant  Attribution
 * Comments: 	Normalized data will be used in Patent Analytics platorm with particular focus on CPC
 * JS File Name: splitCPC.js
 */
const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: 'C:\\instant-client_12' });
const config = require('./config');

async function run() {
    // Open Oracle Connection
    let connection;
    try {
        connection = await oracledb.getConnection(config);
        // Create Patent Analytics Table Objects
        const result = await connection.execute(`select patent_seq_id,sub_seq_id,cpc from pat_extract_data`);
        for (const row of result.rows)
        {
            // Split CPC String Pattern into tokens of individual CPC
            console.log(row[2]);
            // iterate through tokenized CPC array and insert into CPC table
            const substrings = row[2].split(' ');
            for (const substring of substrings) {
                const insert = await connection.execute(`insert into pat_cpc_split_data 
                                                                (pat_seq_id, sub_seq_id, cpc)
                                                                values (:x,:y,:z)`, [row[0], row[1], substring]);
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