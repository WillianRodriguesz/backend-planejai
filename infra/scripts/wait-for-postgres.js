const { exec } = require('node:child_process')

function checkPostgres() {
    exec('docker exec postgres-planejai pg_isready', handleReturn)

    function handleReturn(error, stdout, stderr) {
        if (stdout.search('accepting connections') === -1) {
            process.stdout.write('.')
            setTimeout(checkPostgres, 1000)
            return
        }

        console.log("\n🟢 Postgres is ready and accepting connections!\n")
    }
}


process.stdout.write('\n\n🔴 Waiting for postgres to accept connections')

checkPostgres()

