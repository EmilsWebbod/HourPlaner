import * as xl from 'excel4node';
import {Files, Folders} from '../files';

export interface IExcelModel {
  title: string;
  header: Array<string>; /** Header of Excel */
  rowsTitle: Array<string>; // Usually name of employee
  rows: Array<Array<string>>
}


export namespace FileCtrl {

  function createSimpleXL() {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('page 1');
    const style = wb.createStyle({
      alignment: {
        horizontal: 'center',
        shrinkToFit: true
      },
      font: {
        color: '#000000',
        size: 12
      }
    });
    return {wb: wb, ws: ws, style: style};
  }

  /** Require a worksheet and data to be filled */
  function fillCells(excel: any, data: IExcelModel) {

    const ws = excel.ws;
    const style = excel.style;

    /** Set start row and col. Will change after adding data all the time */
    let r = 2;
    let c = 2;

    /** Start with filling out the title if there are any */
    // ws.cell(r, c).string(data.title || 'No Title');
    r += 2;

    /** Writing header */
    data.header.forEach((x, i) => ws.cell(r, c+i).string(x).style(style));

    let rowC = r;
    data.rows.forEach(row => {
      ws.cell(r+1, c-1).string(data.rowsTitle[r - rowC]).style(style);
      ++r;
      row.forEach((cell, i) => {
        ws.cell(r, c + i).string(cell).style(style);
      })
    })
  }

  export function exportExcel(data: IExcelModel, res) { return new Promise(res => {
    console.log('data', data);
    const excel = createSimpleXL();
    fillCells(excel, data);
    excel.wb.write(Files.fromFiles(`Plan_${Date.now()}.xlsx`), res);
  })}
}
