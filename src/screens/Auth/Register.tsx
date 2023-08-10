import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useLazyQuery, useMutation} from '@apollo/client';

import Colors from './../../assets/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import Screen from '../../components/Common/Screen';
import ContactInput from '../../components/Auth/ContactInput';
import {Header} from '../../components/Common/Header';
import {InputText, TextInput} from '../../components/Common/Input';
import {Map} from '../../components/Common/Map';
import {BoldText, Text} from '../../components/Common/Text';
import {OTPInput} from '../../components/Auth/OTPInput';

import {removeUser, setUser} from '../../redux/Common/actions';

// import Sizes from '../../constants/Sizes';
import {TWOFACTOR_AUTH} from '../../apollo/graphql/Common/auth';
import {EDIT_STORE} from '../../apollo/graphql/Store/store';
import {AuthStackScreenProps} from '../../../types';
import {removeStore, setStore} from '../../redux/Store/actions';

export default function Register({
  navigation,
}: AuthStackScreenProps<'Register'>) {
  const dispatch: any = useDispatch();

  const [meta, setMeta] = useState<any>({
    tfaScreen: false,
    upiScreen: false,
    registerScreen: false,
    mapScreen: false,
    date: '',
  });
  const [active, setActive] = useState<boolean>(false);

  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const {location: storeLocation} = useSelector(
    (state: any) => state.locationReducer,
  );

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [contact, setContact] = useState({
    ISD: '+91',
    number: '',
  });

  const [storeData, setStoreData] = useState({
    edit: false,
    storeInfo: {
      name: '',
      upi: '',
      licenseNumber: '',
      address: {
        line1: '',
        location: {
          coordinates: storeLocation,
        },
      },
    },
  });

  const [editStore, {loading: registering}] = useMutation(EDIT_STORE, {
    variables: {
      edit: storeData.edit,
      storeInfo: {
        name: storeData.storeInfo.name,
        licenseNumber: storeData.storeInfo.licenseNumber,
        contact: contact,
        address: storeData.storeInfo.address,
      },
    },
    onCompleted(data) {
      if (data.editStore) {
        dispatch(removeUser());
        dispatch(removeStore());
        var user = {
          id: data.editStore.id,
          name: data.editStore.name,
          contact,
          token: data.editStore.token,
          refreshToken: data.editStore.refreshToken,
        };
        dispatch(setUser(user));
        dispatch(setStore(data.editStore));
      }
    },
    onError(error) {
      console.log({...error});
      Alert.alert(
        'Error occured!',
        'We faced some issue while registering your store. Try again in some time.',
      );
    },
  });

  const [tfAuth, {loading: tfAuthing}] = useLazyQuery(TWOFACTOR_AUTH, {
    variables: {
      contact,
      newAcc: true,
    },
    fetchPolicy: 'no-cache',
    onCompleted(storeData) {
      console.log(storeData);
      if (storeData.twoFactorAuth.error) {
        setError({
          error: storeData.twoFactorAuth.error,
          message: storeData.twoFactorAuth.message,
        });
      } else {
        setMeta({
          ...meta,
          tfaScreen: true,
          date: storeData.twoFactorAuth.date,
        });
      }
    },
    onError(error) {
      console.log({...error});
    },
  });

  useEffect(() => {
    var si = {...storeData};
    si.storeInfo.address.location.coordinates = storeLocation;
    setStoreData(si);
  }, [storeLocation]);

  if (meta.upiScreen) {
    return (
      <Screen>
        <Header
          title="Payment"
          onBack={() => {
            setStoreData({
              ...storeData,
              storeInfo: {
                ...storeData.storeInfo,
                upi: '',
              },
            });
            setMeta({...meta, upiScreen: false, registerScreen: true});
          }}
        />

        <View style={{display: 'flex'}}>
          <Text text70>
            Enter upi address you would like to recieve payments on
          </Text>
          <InputText
            placeholder="Eg. 999990000@paytm"
            title="UPI Address"
            value={storeData.storeInfo.upi}
            onChange={(text: string) =>
              setStoreData({
                ...storeData,
                storeInfo: {
                  ...storeData.storeInfo,
                  upi: text,
                },
              })
            }
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            editStore({
              variables: {
                edit: storeData.edit,
                storeInfo: {
                  ...storeData.storeInfo,
                  contact,
                },
              },
            })
          }
          disabled={registering}>
          <View
            style={{
              color: Colors.white,
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              {registering ? 'Registering...' : 'Confirm & Register'}
            </Text>
          </View>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (meta.registerScreen) {
    return (
      <Screen>
        <Header
          title="Store Info"
          onBack={() => {
            setStoreData({
              ...storeData,
              storeInfo: {
                ...storeData.storeInfo,
                name: '',
                licenseNumber: '',
                address: {
                  ...storeData.storeInfo.address,
                  line1: '',
                },
              },
            });
            setMeta({...meta, registerScreen: false, tfaScreen: false});
          }}
        />
        {meta.mapScreen ? (
          <>
            <View style={{display: 'flex'}}>
              <Text text70>
                Enter your store address below. Drag marker to point precise
                store location.
              </Text>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: active
                    ? Colors.$backgroundDarkElevated
                    : Colors.$backgroundDisabled,
                }}>
                <TextInput
                  autoFocus={true}
                  value={storeData.storeInfo.address.line1}
                  onChangeText={(text: string) =>
                    setStoreData({
                      ...storeData,
                      storeInfo: {
                        ...storeData.storeInfo,
                        address: {
                          ...storeData.storeInfo.address,
                          line1: text,
                        },
                      },
                    })
                  }
                  onBlur={() => setActive(false)}
                  onFocus={() => setActive(true)}
                  style={{flex: 1}}
                  placeholder="Store Address"
                />
                {isKeyboardVisible && (
                  <TouchableOpacity
                    marginL-15
                    disabled={
                      storeData.storeInfo.address.line1.trim().length <= 0
                    }
                    onPress={() => Keyboard.dismiss()}>
                    <AntDesign
                      name="arrowright"
                      color={
                        storeData.storeInfo.address.line1.trim().length <= 0
                          ? Colors.$backgroundDisabled
                          : Colors.primary
                      }
                      // size={Sizes.icon.normal}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {!isKeyboardVisible && <Map />}
              {storeLocation && !isKeyboardVisible && (
                <TouchableOpacity
                  disabled={!storeLocation}
                  // size={Button.sizes.large}
                  style={{color: Colors.white, marginTop: 10}}
                  backgroundColor={Colors.primary}
                  disabledBackgroundColor={Colors.$iconDisabled}
                  borderRadius={10}
                  onPress={() => setMeta({...meta, upiScreen: true})}>
                  Set Payment
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          <>
            <View style={{display: 'flex'}}>
              <Text text70>Enter your store details below.</Text>
              <InputText
                placeholder="Eg. Raj Superstore"
                title="Tamu Patisserie"
                value={storeData.storeInfo.name}
                onChange={(text: string) =>
                  setStoreData({
                    ...storeData,
                    storeInfo: {
                      ...storeData.storeInfo,
                      name: text,
                    },
                  })
                }
              />
              <InputText
                value={storeData.storeInfo.licenseNumber}
                onChange={(text: string) =>
                  setStoreData({
                    ...storeData,
                    storeInfo: {...storeData.storeInfo, licenseNumber: text},
                  })
                }
                placeholder="ISC000000000"
                title="License Number"
              />
            </View>
            <View style={{display: 'flex'}} />
            {!isKeyboardVisible && (
              <>
                <Text text70>
                  Note: Your license number will be used to verify your store.
                  It is not stored with us.
                </Text>
                <TouchableOpacity
                  label={''}
                  disabled={
                    (storeData.storeInfo.name.trim().length ||
                      storeData.storeInfo.licenseNumber.trim().length) <= 0
                  }
                  // size={Button.sizes.large}
                  color={Colors.white}
                  backgroundColor={Colors.primary}
                  disabledBackgroundColor={Colors.$iconDisabled}
                  round={false}
                  borderRadius={10}
                  marginV-10
                  onPress={() => {
                    setActive(false);
                    setMeta({...meta, mapScreen: true});
                  }}>
                  Select Address
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </Screen>
    );
  }

  if (meta.tfaScreen) {
    return (
      <Screen>
        <Header
          title="Register"
          onBack={() => {
            setMeta({...meta, tfaScreen: false});
          }}
        />
        <Text text70>Enter 6 digit code sent to your registered number.</Text>
        <OTPInput
          contact={contact}
          date={meta.date}
          onNew={() =>
            tfAuth({
              variables: {
                contact,
                newAcc: true,
              },
            })
          }
          onNext={() =>
            setMeta({...meta, registerScreen: true, mapScreen: false})
          }
        />
      </Screen>
    );
  }

  if (registering) {
    return (
      <Screen>
        <View style={{display: 'flex', justifyContent: 'center'}}>
          <Text text70>Getting store registeration confirmation ...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Register"
        onBack={() => navigation.navigate('Onboarding')}
      />
      <Text text70>Join with an unregistered mobile number.</Text>
      <ContactInput
        contact={contact}
        loading={tfAuthing}
        onNext={() =>
          tfAuth({
            variables: {
              contact,
              newAcc: true,
            },
          })
        }
        setContact={(text: string) => {
          if (error.error) {
            setError({...error, error: false});
          }
          setContact({...contact, number: text});
        }}
      />
      <View style={{display: 'flex'}} />
      {error.error && (
        <View style={{display: 'flex', marginTop: 10}}>
          <BoldText text70 style={{color: Colors.red30}}>
            {error.message}
          </BoldText>
        </View>
      )}
    </Screen>
  );
}
