
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
let content = '';
try {
    content = fs.readFileSync(envPath, 'utf8');
} catch (e) {
    process.exit(1);
}

const env = {};
content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let value = match[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        }
        env[match[1].trim()] = value;
    }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function testTable(tableName) {
    const msg = `Testing table: ${tableName}\n`;
    fs.appendFileSync('db-result.txt', msg);

    const { data, error } = await supabase.from(tableName).select('*').limit(1);
    if (error) {
        fs.appendFileSync('db-result.txt', `Error querying ${tableName}: ${error.message}\n`);
    } else {
        fs.appendFileSync('db-result.txt', `Success! Found ${data.length} rows in ${tableName}\n`);
        if (data.length > 0) {
            fs.appendFileSync('db-result.txt', `Sample row keys: ${JSON.stringify(Object.keys(data[0]))}\n`);
        }
    }
}

async function run() {
    fs.writeFileSync('db-result.txt', '');
    await testTable('category');
    await testTable('ProductCategory');
    await testTable('product_categories');
    await testTable('materials');
}

run();
