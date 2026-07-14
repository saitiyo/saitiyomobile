import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

import colors from '../../constants/colors';
import CustomTextInput from '../../screens/customTextInput/customTextInput';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import CustomButton from '../CustomButton/CustomButton';
import Spacer from '../Spacer/Spacer';

export const ADD_SUPPORT_TEAM_MEMBER = gql`
  mutation AddSupportTeamMember(
    $siteId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $mobileNumber: String!
    $gender: Gender!
  ) {
    addSupportTeamMember(
      siteId: $siteId

      firstName: $firstName

      lastName: $lastName

      email: $email

      mobileNumber: $mobileNumber

      gender: $gender
    ) {
      _id
    }
  }
`;

interface Props {
  siteId: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),

  gender: Yup.string().required('Gender is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),

  phoneNumber: Yup.string()
    .min(9, 'Phone number is too short')
    .required('Phone number is required'),
});

const AddSupportTeamMember = ({ onCancel,onSuccess,siteId }: Props) => {

  const [addSupportMember, { loading,error }] = useMutation(ADD_SUPPORT_TEAM_MEMBER);

  useEffect(()=>{
     if(error){
      ToastAndroid.show("Something has gone wrong!",4000)
     }
  },[error])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Formik
        initialValues={{
          fullName: '',
          gender: '',
          email: '',
          phoneNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const names = values.fullName

              .trim()

              .split(' ');

            const firstName = names[0];

            const lastName = names.slice(1).join(' ');

            await addSupportMember({
              variables: {
                siteId,

                firstName,

                lastName,

                email: values.email,

                mobileNumber: values.phoneNumber,

                gender: values.gender,
              },
            });

            resetForm();

            onSuccess();
          } catch (error: any) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldValue,
          handleSubmit,
        }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            <Text style={styles.title}>Add Support Member</Text>

            <Text style={styles.subtitle}>
              Create a support team member for this construction site.
            </Text>

            {/* Full Name */}

            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>

              <CustomTextInput
                placeholder="John Doe"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
              />

              {touched.fullName && errors.fullName && (
                <Text style={styles.error}>{errors.fullName}</Text>
              )}
            </View>

            {/* Gender */}

            <View style={styles.field}>
              <Text style={styles.label}>Gender</Text>

              <View style={styles.picker}>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={value => setFieldValue('gender', value)}
                >
                  <Picker.Item label="Select Gender" value="" />

                  <Picker.Item label="Male" value="MALE" />

                  <Picker.Item label="Female" value="FEMALE" />
                </Picker>
              </View>

              {touched.gender && errors.gender && (
                <Text style={styles.error}>{errors.gender}</Text>
              )}
            </View>

            {/* Email */}

            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>

              <CustomTextInput
                keyboardType="email-address"
                placeholder="john@example.com"
                value={values.email}
                onChangeText={handleChange('email')}
              />

              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>

            {/* Phone */}

            <View style={styles.field}>
              <Text style={styles.label}>Phone Number</Text>

              <View style={styles.phoneContainer}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryText}>+256</Text>
                </View>

                <TextInput
                  style={styles.phoneInput}
                  keyboardType="phone-pad"
                  placeholder="7XXXXXXXX"
                  placeholderTextColor={colors.gray300}
                  value={values.phoneNumber}
                  onBlur={handleBlur('phoneNumber')}
                  onChangeText={handleChange('phoneNumber')}
                />
              </View>

              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}
            </View>

            {/* Buttons */}
              <CustomButton 
               title='Add Member'
               onPress={() => handleSubmit()}
               loading={loading}
              />
              
              <Spacer height={40} />
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default AddSupportTeamMember;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    color: colors.textGray,
    fontSize: 14,
  },

  field: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: colors.textDark,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    color: colors.textDark,
  },

  picker: {
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },

  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 12,
    backgroundColor: colors.white,
  },

  countryCode: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.gray100,
    height: 52,
  },

  countryText: {
    fontWeight: '600',
    color: colors.textDark,
  },

  phoneInput: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    color: colors.textDark,
  },

  error: {
    marginTop: 5,
    fontSize: 12,
    color: colors.danger,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },

  cancelButton: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.gray100,
    marginRight: 10,
  },

  submitButton: {
    flex: 1,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
  },

  cancelText: {
    color: colors.textDark,
    fontWeight: '600',
  },

  submitText: {
    color: colors.white,
    fontWeight: '700',
  },
});
