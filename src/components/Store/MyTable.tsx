import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cell,
} from 'react-native-table-component';

/*const CONTENT = {
  // tableHead: props.data,
  tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4'],
  tableData: [
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['a', 'b', 'c'],
  ],
};*/

export default function MyTable(props) {
  const element = (data, index) => (
    <CheckBox
      value={false}
      onValueChange={() => console.log('hi')}
      // color={state.checks[index] ? '#4630EB' : undefined}
    />
  );

  const flexArr = [1, 3, 3];
  const [_data, setData] = useState([]);
  const [tableHead, setTableHead] = useState([]);

  useEffect(() => {
    let temp: Array<object> = [];
    let head_temp: Array<object> = [''];
    // let count: Array<object> = [];
    for (let i = 0; i < props.data.length; i++) {
      let m_temp = [''];
      // count.push(i);
      for (let j = 0; j < props.tableHead.length; j++) {
        m_temp.push(props.data[i][props.tableHead[j].name]);
      }
      temp.push(m_temp);
    }
    for (let i = 0; i < props.tableHead.length; i++) {
      head_temp.push(props.tableHead[i].name);
    }
    setData(temp);
    setTableHead(head_temp);
    // setCount(count);
  }, []);
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <TableWrapper style={styles.row}>
          {tableHead.map((header, index) => (
            <Cell
              key={index}
              data={index === 0 ? element(header, index - 1) : header}
              textStyle={styles.text}
              flex={flexArr[index]}
            />
          ))}
        </TableWrapper>
        {_data.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={cellIndex === 0 ? element(cellData, index - 1) : cellData}
                style={styles.cell}
                textStyle={styles.text}
                flex={flexArr[cellIndex]}
              />
            ))}
          </TableWrapper>
        ))}
        {/*<TableWrapper>

          {_data.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              textStyle={styles.row}
              flexArr={[1, 1]} // Adjust the flex values based on your design
              style={styles.row}
              renderChild={() => <CustomCell rowData={rowData} />}
            />
          ))}

        </TableWrapper>*/}
      </Table>
    </View>
  );
}

/*const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 100, backgroundColor: '#6b0a0a'},
  head: {height: 40, backgroundColor: 'orange'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#2ecc71'},
  row: {height: 28},
  text: {textAlign: 'center'},
});*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ced4da',
    overflow: 'scroll',
  },
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6, color: '#000'},
  // cell: {width: 30},
  row: {flexDirection: 'row', backgroundColor: '#98c6e0'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#000'},
});
