import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';

import Screen from '../../components/Common/Screen';
import OnboardCarousel from '../../components/Auth/OnboardCarousel';

import {AuthStackScreenProps} from '../../../types';

const Onboarding = ({
  navigation,
}: AuthStackScreenProps<'Onboarding'>): JSX.Element => {
  return (
    <Screen>
      <OnboardCarousel />

      {/*<TouchableOpacity
        disabled={false}
        // size={Button.sizes.large}
        backgroundColor={Colors.primary}
        color={Colors.white}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        marginT-50
        marginB-10
        onPress={}
        title={'Login with Phone'}></TouchableOpacity>*/}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <View style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
          <Text style={{color: 'white', textAlign: 'center'}}>Press Me</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <View style={{backgroundColor: 'blue', padding: 10, borderRadius: 5}}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            New User? Register
          </Text>
        </View>
      </TouchableOpacity>
      {/*<TouchableOpacity
        disabled={false}
        // size={Button.sizes.large}
        backgroundColor={Colors.transparent}
        color={Colors.text}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        onPress={() => navigation.navigate('Register')}
        title={'New User? Register'}
      />*/}
    </Screen>
  );
};

export default Onboarding;
