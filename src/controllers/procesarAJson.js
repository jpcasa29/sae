const fs = require('fs');
const path = require('path');
const excelToJson = require('convert-excel-to-json');


const empleadosFilePath = path.join(__dirname, '../data/base a subir sql_prueba.xlsx');

const result = excelToJson({
	sourceFile: empleadosFilePath,
	header: {
		rows: 1
	},
	columnToKey: {
        '*': '{{columnHeader}}'
    },
	//sheet: ['sheet1']
    
});

fs.writeFileSync(path.join(__dirname, '../data/empleadosAsql.json'), JSON.stringify(result));
console.log(result.sheet1[0])