import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

export default class MyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Description', 'Quantity', 'Amount', 'Units', 'Date'],
      tableData: props.data,
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    function _getRow(row_data: Object) {
      console.log(row_data)
      let els = [];
      for (let item in row_data) {
        if (row_data.hasOwnProperty(item)){
          els.push(<Cell
                  key={item}
                  data={row_data[item]}
                  style={styles.text}
                />);
        }
      }
      return els;
    }

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row
            data={state.tableHead}
            style={styles.head}
          />

          {state.tableData.map((rowData, index) => {
          return(
            <TableWrapper key={index} style={styles.row}>
              <Cell key={'index'} style={styles.text}>Hiiiiiii</Cell>
            </TableWrapper>)
          })}
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#021a2f'},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6, color: '#000'},
  row: {flexDirection: 'row', backgroundColor: '#1e475e'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#000'},
});
