/**
 * Table Creation Script
 * Author:      Rishi Raghav
 * Create date: 08-20-2021
 * Description: To Create Table Objects needed for Patent Analytics
 * JS File Name: createObjects.js
 */
const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: 'C:\\instant-client_21_9' });

async function run() {

    let connection;
    try {
        // Open Oracle Connection
        connection = await oracledb.getConnection(config);

        // Drop Patent Analytics Table Objects to initialize

        await connection.execute(`begin
                                execute immediate 'drop table PAT_EXTRACT_DATA';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);


        await connection.execute(`begin
                                execute immediate 'drop table PAT_CPC_SPLIT_DATA';
                                exception when others then if sqlcode <> -942 then raise; end if;
                              end;`);

        await connection.execute(`begin
                                execute immediate 'drop table PAT_COUNTRY_CODE';
                                exception when others then if sqlcode <> -942 then raise; end if;
                                end;`);

        await connection.execute(`begin
                                execute immediate 'drop table PAT_APPLICANTS_SPLIT_DATA';
                                exception when others then if sqlcode <> -942 then raise; end if;
                                end;`);

        // Patent Extract Data table
        await connection.execute(`create table PAT_EXTRACT_DATA (PATENT_SEQ_ID NUMBER, 
                                                                 SUB_SEQ_ID NUMBER, 
                                                                 TEXT_FILE_NAME VARCHAR2(150), 
                                                                 TITLE_NAME VARCHAR2(500), 
                                                                 INVENTORS varchar2(4000), 
                                                                 APPLICANTS VARCHAR2(4000), 
                                                                 PUBLICATION_NUMBER VARCHAR2(4000), 
                                                                 EARLIEST_PRIORITY VARCHAR2(150),
                                                                 IPC VARCHAR2(4000), 
                                                                 CPC VARCHAR2(4000), 
                                                                 PUBLICATION_DATE VARCHAR2(4000), 
                                                                 EARLIEST_PUBLICATION VARCHAR2(4000), 
                                                                 FAMILY_NUMBER VARCHAR2(4000))`
                                        );
        // Patent Country Master table
        await connection.execute(`create table PAT_COUNTRY_CODE (COUNTRY_CODE VARCHAR2(50),
                                                         COUNTRY_DESC VARCHAR2(150),
                                                         TYPE VARCHAR2(150 BYTE))`
                                );
        // CPC Split Table
        await connection.execute(`create table PAT_CPC_SPLIT_DATA (PAT_SEQ_ID NUMBER,
                                                         SUB_SEQ_ID NUMBER,
                                                         CPC VARCHAR2(500 BYTE))`
        );

        // Applicants Split Table
        await connection.execute(`create table PAT_APPLICANTS_SPLIT_DATA (PAT_SEQ_ID NUMBER,
                                                         SUB_SEQ_ID NUMBER,
                                                         APPLICANTS VARCHAR2(500 BYTE))`
        );

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