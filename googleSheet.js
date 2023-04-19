const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs =require('fs');

module.exports.getInformation = async function start(data){
    try {
        const {client_email, private_key} = JSON.parse(fs.readFileSync('./credentions.json'));
        const doc = new GoogleSpreadsheet('1B90Z9gIBN8KnQUUq9KDZbN46Egc4HtbpCvu6Px2fw1Y')
        await doc.useServiceAccountAuth({client_email, private_key})
        await doc.loadInfo();
        const sheet = await doc.sheetsByTitle['Апрель'];
        await sheet.loadCells();
        let numberOfSalesPerDay;
        let cumulativeNumberOfSales;
        let marginPerDay;
        let cumulativeMarginPerDay;

        for (let i = 0; i < 40; i++){

            let dataOfSheet = new Date((await sheet.getCellByA1('A' + (2 + i)).value - (365*70+19))*8.64e+7);
            dataOfSheet = dataOfSheet.getDate().toString().padStart(2,'0')
                +'.'+(dataOfSheet.getMonth()+1).toString().padStart(2,'0')
                +'.'+dataOfSheet.getFullYear()

            if(dataOfSheet === data){
                numberOfSalesPerDay = 'B' + (2 + i);
                cumulativeNumberOfSales = 'C' + (2 + i);
                marginPerDay = 'D' + (2 + i);
                cumulativeMarginPerDay = 'E' + (2 + i);
                break;
            }
        }

        numberOfSalesPerDay = await sheet.getCellByA1(numberOfSalesPerDay).value;
        cumulativeNumberOfSales = await  sheet.getCellByA1(cumulativeNumberOfSales).value;
        marginPerDay = await  sheet.getCellByA1(marginPerDay).value;
        cumulativeMarginPerDay = await sheet.getCellByA1(cumulativeMarginPerDay).value;

        if (typeof numberOfSalesPerDay === 'object'){
           numberOfSalesPerDay = 'ОШИБКА -> Запрос не вернул никаких результатов';
        }

        if(marginPerDay !== null){
            marginPerDay = '$' + marginPerDay.toFixed(2);
        }

        return 'количество продаж в день ' + numberOfSalesPerDay + '\n' +
            'накопительное количество продаж ' + cumulativeNumberOfSales + '\n' +
            'маржинальная прибыль в день ' + marginPerDay + '\n' +
            'накопительная маржинальная прибыль в день $' + cumulativeMarginPerDay.toFixed(2)
    }
    catch (e){
        console.log(e)
    }
}


